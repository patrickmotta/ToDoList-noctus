import React, { useState, useEffect } from 'react';

import { 
  collection, 
  query, 
  where, 
  onSnapshot 
} from "firebase/firestore";

import PlaylistAddIcon from '@mui/icons-material/PlaylistAdd';

import './App.css';
import db from './firebaseConfig';
import List from './components/List';
import Button from './components/Button';
import DatePicker from './components/DatePicker';
import ModalCreate from './components/ModalCreate';
import ToggleButtons from './components/ToggleButtons';


const buttons = [
  { label: 'Todos', value: 'Todos' },
  { label: 'Não urgente', value: 'Não urgente' },
  { label: 'Pouco urgente', value: 'Pouco urgente' },
  { label: 'Urgente', value: 'Urgente' },
];

export default function App() {
  const [modalState, setModalState] = useState(false);
  const [data, setData] = useState([]);
  const [filter, setFilter] = useState('Todos');
  const [datePicker, setDatePicker] = useState('');
  const [filteredData, setFilteredData] = useState([]);


  const handleModalOpen = () => setModalState(true);
  const handleModalClose = () => setModalState(false);
  const handleFilterChange = (value) => {
    setFilter(value);
  };
  const handleResetFilter = () => {
    setFilter('Todos');
    setDatePicker('');
  };



  useEffect(() => {
    const fetchData = async () => {
      const collectionRef = collection(db, "todoList");

      let filteredRef = collectionRef;

      if (filter !== 'Todos') {
        if (datePicker !== '') {
          filteredRef = query(collectionRef, where('priority', '==', filter), where('creationDate', '==', datePicker));
        } else {
          filteredRef = query(collectionRef, where('priority', '==', filter));
        }
      } else if (datePicker !== '') {
        filteredRef = query(collectionRef, where('creationDate', '==', datePicker));
      }

      const unsubscribe = onSnapshot(filteredRef, (snapshot) => {
        const newData = [];
        snapshot.forEach((doc) => {
          newData.push(doc.data());
        });
        setData(newData);
        setFilteredData(newData);
      });

      return () => unsubscribe();
    };

    fetchData();
  }, [filter, datePicker, modalState]);



  return (
    <div className="App">
      <div className='Container'>
        <div className="PendingContainer">
          <div>
            <h3>Tarefas pendentes</h3>
          </div>
          <div className="AddButtonContainer">
            <Button title='Adicionar' color='success' onClick={handleModalOpen} endIcon={<PlaylistAddIcon />}/>
            <ModalCreate open={modalState} onClose={handleModalClose} />
          </div>
          <div className='FilterButtonsContainer'>
            <div>
              <ToggleButtons buttons={buttons} label="Filtro:" value={filter} onChange={handleFilterChange} />
            </div>
            <div className="DatePickerContainer" style={{ flex: 1 }}>
              <DatePicker onChange={setDatePicker} value={datePicker} />
            </div>
          </div>
          <div className="ResetFilterContainer">
            <button onClick={handleResetFilter}>Limpar Filtro</button>
          </div>
          <div className="ListContainer ScrollableContent">
            <List data={filteredData} concluded={false} />
          </div>
        </div>
        <div className="CompletedContainer">
          <h3>Tarefas concluidas</h3>
          <div className="ListContainer ScrollableContent">
            <List data={data} concluded={true} />
          </div>

        </div>
      </div>
    </div>
  );
}
