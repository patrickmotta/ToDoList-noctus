import React, { useState, useEffect } from 'react';
import AddButton from './components/AddButton';
import List from './components/List';
import ModalCreate from './components/ModalCreate';
import db from './firebaseConfig';
import { collection, doc, setDoc, onSnapshot, serverTimestamp } from "firebase/firestore";

import './App.css';

export default function App() {
  const [modalState, setModalState] = useState(false);

  const handleModalOpen = () => setModalState(true);
  const handleModalClose = () => setModalState(false);

  const [data, setData] = useState([]);

  useEffect(() => {
    const unsubscribe = onSnapshot(collection(db, "todoList"), (snapshot) => {
      const newData = [];

      snapshot.forEach((doc) => {
        const dc = doc.data();
        newData.push(dc);
      });

      setData(newData);
    });

    return () => unsubscribe(); // Remova o ouvinte quando o componente for desmontado
  }, []);

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
            <span>Filtros</span>
          </div>
          <div style={{ width: '80%' }}>
            <List data={data} />
          </div>
        </div>
        <div className="CompletedContainer">
          <h3>Tarefas concluidas</h3>
        </div>
      </div>
    </div>
  );
}
