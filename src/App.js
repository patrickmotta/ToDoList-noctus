import React,{useState} from 'react';
import AddButton from './components/AddButton';
import List from './components/List';
import ModalCreate from './components/ModalCreate'

import './App.css';

export default function App() {
  const[modalState, setModalState] = useState(false);

  const handleModalOpen = () => setModalState(true);
  const handleModalClose = () => setModalState(false);
  
  return (
    <div className="App">
      <div className='Container'>
        <div className="PendingContainer">
          <div>
            <h3>Tarefas pendentes</h3>
          </div>
          <div className="AddButtonContainer">
            <AddButton onClick={handleModalOpen}/>
            <ModalCreate open={modalState} onClose={handleModalClose}/>
          </div>
          <div>
            <List />
          </div>
        </div>
        <div className="CompletedContainer">
          <h3>Tarefas concluidas</h3>
        </div>
      </div>
    </div>
  );
}
