import React, { useState, useEffect } from 'react';

import { 
  Button, 
  Dialog, 
  DialogActions, 
  DialogContent, 
  DialogTitle 
} from '@mui/material';


import { format } from 'date-fns';
import { v4 as uuidv4 } from 'uuid';
import Input from '../Input'
import ToggleButtons from '../ToggleButtons';
import Alert from '../Alert'

import db from '../../firebaseConfig';
import { doc, setDoc } from "firebase/firestore";

const buttons = [
  { label: 'Não urgente', value: 'Não urgente' },
  { label: 'Pouco urgente', value: 'Pouco urgente' },
  { label: 'Urgente', value: 'Urgente' },
];

export default function ModalCreateComponent({ open, onClose }) {

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [priority, setPriority] = useState("Não urgente");
  const [showAlert, setShowAlert] = useState(false);

  const currentDate = format(new Date(), 'yyyy-MM-dd');

  const saveToFirebase = async () => {
    let uuid = uuidv4();
    if(title !== ""){
      await setDoc(doc(db, "todoList",uuid), {
        title: title,
        description: description,
        priority: priority,
        concluded: false,
        creationDate: currentDate,
        id:uuid
      })
      onClose();
      
    }else{
      setShowAlert(true)
    }
  }

  useEffect(()=>{
    if(showAlert != ''){
      setShowAlert(false)
    }
    return () => {
      setTitle("")
      // setDescription('')
      setPriority('Não urgente')
      // setShowAlert(false)
    };
  },[onClose, setShowAlert])
  
  return (
    <div>
      <Dialog open={open} onClose={onClose}>
        <DialogTitle>Adicionar Tarefa</DialogTitle>
        <DialogContent>
          <Input type='text' label="Titulo" id="title" onChange={setTitle} required={true} error={showAlert} autoFocus={true} />
          <Input type='text' label="Descrição" id="description" onChange={setDescription} />
          <div>
            <ToggleButtons buttons={buttons} label="Prioridade:" value={priority} onChange={setPriority} />
          </div>
          <Alert severity='error' show={showAlert} message="Adicione o titulo" />
        </DialogContent>
        <DialogActions>
          <Button onClick={onClose}>Cancelar</Button>
          <Button onClick={saveToFirebase}>Salvar</Button>
        </DialogActions>
      </Dialog>
    </div >
  );
}
