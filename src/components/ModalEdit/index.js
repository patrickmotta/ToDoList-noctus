import React, { useState, useEffect } from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import Input from '../Input'
import ToggleButtons from '../ToggleButtons';
import Alert from '../Alert'

import db from '../../firebaseConfig';
import { collection, doc, updateDoc, addDoc, getDocs, serverTimestamp } from "firebase/firestore";

const buttons = [
  { label: 'Não urgente', value: 'Não urgente' },
  { label: 'Pouco urgente', value: 'Pouco urgente' },
  { label: 'Urgente', value: 'Urgente' },
];

export default function ModalEditComponent({ open, onClose, id, title,description , priority }) {

  const [titleValue, setTitleValue] = useState(title);
  const [descriptionValue, setDescriptionValue] = useState(description);
  const [priorityValue, setPriorityValue] = useState(priority);

  const [showAlert, setShowAlert] = useState(false);

  const EditToFirebase = async () => {
    if(titleValue !== ""){
      const docRef = doc(db, "todoList", id);
      await updateDoc(docRef, {
        title: titleValue,
        description: descriptionValue,
        priority: priorityValue,
      })
      onClose();
      
    }else{
      setShowAlert(true)
    }
  }

  useEffect(() => {
    if (!open) {
      // setTitle("")
      // setShowAlert(false)
    }
  })

  return (
    <div>
      <Dialog open={open} onClose={onClose}>
        <DialogTitle>Editar Tarefa</DialogTitle>
        <DialogContent>
          <Input type='text' label="Titulo" id="title" onChange={setTitleValue} value={titleValue} required={true} error={showAlert} />
          <Input type='text' label="Descrição" id="description" onChange={setDescriptionValue} value={descriptionValue}/>
          <div>
            <ToggleButtons buttons={buttons} label="Prioridade:" value={priorityValue} onChange={setPriorityValue} />
          </div>
          <Alert severity='error' show={showAlert} message="Adicione o titulo" />
        </DialogContent>
        <DialogActions>
          <Button onClick={onClose}>Cancelar</Button>
          <Button onClick={EditToFirebase}>Salvar</Button>
        </DialogActions>
      </Dialog>
    </div >
  );
}
