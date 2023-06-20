import React, {useState} from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Input from '../Input'

export default function ModalCreateComponent({open, onClose}) {
  
   const [title, setTitle] = useState();
   const [description, setDescription] = useState();
  
   return (
    <div>
      <Dialog open={open} onClose={onClose}>
        <DialogTitle>Adicionar Tarefa</DialogTitle>
        <DialogContent>
            {/* <DialogContentText></DialogContentText> */}
            <Input type='text' label="Titulo" id="title" onChange={setTitle}/>
            <Input type='text' label="Descrição" id="description" onChange={setDescription}/>

        </DialogContent>
        <DialogActions>
          <Button onClick={onClose}>Cancelar</Button>
          <Button onClick={onClose}>Salvar</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
