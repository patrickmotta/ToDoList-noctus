import React from 'react';
import AddButton from './components/addButton';
import List from './components/List'

import './App.css';

export default function App() {
  return (
    <div className="App">
      <div className='Container'>
        <div className="PendingContainer">
          <div>
            <h3>Tarefas pendentes</h3>
          </div>
          <div className="AddButtonContainer">
            <AddButton onClick={()=>{}}/>
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
