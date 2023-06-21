import React, { useState, useEffect } from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import { v4 as uuidv4 } from 'uuid';
import Input from '../Input'
import ToggleButtons from '../ToggleButtons';
import Alert from '../Alert'

import db from '../../firebaseConfig';
import { collection, doc, setDoc, addDoc, getDocs, serverTimestamp } from "firebase/firestore";


export default function ModalCreateComponent({ open, onClose }) {

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [priority, setPriority] = useState("Não urgente");

  const [showAlert, setShowAlert] = useState(false);

  const saveToFirebase = async () => {
    let uuid = uuidv4();
    if(title !== ""){
      await setDoc(doc(db, "todoList",uuid), {
        title: title,
        description: description,
        priority: priority,
        concluded: false,
        dateTimeCreate: serverTimestamp(),
        id:uuid
      })
      onClose();
      
    }else{
      setShowAlert(true)
    }
  }

  useEffect(() => {
    if (!open) {
      setTitle("")
      setShowAlert(false)
    }
  })

  return (
    <div>
      <Dialog open={open} onClose={onClose}>
        <DialogTitle>Adicionar Tarefa</DialogTitle>
        <DialogContent>
          <Input type='text' label="Titulo" id="title" onChange={setTitle} required={true} error={showAlert} />
          <Input type='text' label="Descrição" id="description" onChange={setDescription} />
          <div>
            <ToggleButtons label="Prioridade:" value={priority} onChange={setPriority} />
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
