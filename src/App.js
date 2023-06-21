import React, { useState, useEffect } from 'react';
import AddButton from './components/AddButton';
import List from './components/List';
import ModalCreate from './components/ModalCreate';
import ToggleButtons from './components/ToggleButtons';
import db from './firebaseConfig';
import DatePicker from './components/DatePicker';
import { collection, getDocs, query, where, doc, setDoc, onSnapshot, serverTimestamp } from "firebase/firestore";

import './App.css';

const buttons = [
  { label: 'Todos', value: '' },
  { label: 'Não urgente', value: 'Não urgente' },
  { label: 'Pouco urgente', value: 'Pouco urgente' },
  { label: 'Urgente', value: 'Urgente' },
];

export default function App() {
  const [modalState, setModalState] = useState(false);
  const [data, setData] = useState([]);
  const [filter, setFilter] = useState('');
  const [datePicker, setDatePicker] = useState('');
  const [filteredData, setFilteredData] = useState([]);


  const handleModalOpen = () => setModalState(true);
  const handleModalClose = () => setModalState(false);

  useEffect(() => {
    const fetchData = async () => {
      const collectionRef = collection(db, "todoList");

      let filteredRef = collectionRef;

      if (filter !== '') {
        filteredRef = query(collectionRef, where('priority', '==', filter));
      }
      if (datePicker !== '') {
        filteredRef = query(collectionRef, where('creationDate', '==', datePicker));
      }else{
        setDatePicker('')
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
  }, [filter, datePicker]);

  const handleFilterChange = (value) => {
    setFilter(value);
  };

  return (
    <div className="App">
      <div className='Container'>
        <div className="PendingContainer">
          <div>
            <h3>Tarefas pendentes</h3>
          </div>
          <div className="AddButtonContainer">
            <AddButton onClick={handleModalOpen} />
            <ModalCreate open={modalState} onClose={handleModalClose} />
          </div>
          <div className='FilterButtonsContainer'>
            <div style={{ flex: 1 }}>
              <ToggleButtons buttons={buttons} label="Filtro:" value={filter} onChange={handleFilterChange} />
            </div>
            <div className="DatePickerContainer" style={{ flex: 1 }}>
              <DatePicker onChange={setDatePicker} value={datePicker} />
            </div>
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
