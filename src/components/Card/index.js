import React, {useState} from 'react';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import Chip from '@mui/material/Chip';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import Paper from '@mui/material/Paper';
import Checkbox from '@mui/material/Checkbox';
import { colors } from '../../colors';
import db from '../../firebaseConfig';
import { doc, deleteDoc, updateDoc } from "firebase/firestore";
import ModalEdit from '../ModalEdit'

export default function CardComponent({ item }) {
   const { id, title, description, priority, concluded } = item;
   const [modalState, setModalState] = useState(false);

   const handleModalOpen = () => setModalState(true);
   const handleModalClose = () => setModalState(false);


   let deleteDocFirebase = async (docId) => {
      try {
         await deleteDoc(doc(db, "todoList", docId));
         console.log("Documento excluído com sucesso!");
      } catch (error) {
         console.error("Erro ao excluir documento:", error);
      }
   };

   let completeItemFirebase = async (docId) => {
      try {
         const docRef = doc(db, "todoList", docId)
         await updateDoc(docRef, {
            concluded: !concluded
         });
         console.log("Documento editado com sucesso!");
      } catch (error) {
         console.error("Erro ao editar documento:", error);
      }
   };
    return (
    <div style={{ maxWidth: 600, margin: '20px' }}>
      <Paper style={{ display: "flex", flexDirection: "row", alignItems: "center", marginTop: 15 }}>
        <Checkbox defaultChecked={concluded} onChange={() => completeItemFirebase(id)} />
        <div style={{ flex: 1 }}>
          <Accordion style={{ boxShadow: "inset -4px 0 4px -10px rgba(0, 0, 0, 0.1)", maxWidth: '100%' }}>
            <AccordionSummary
              expandIcon={description !== "" ? <ExpandMoreIcon /> : null}
              aria-controls="panel1a-content"
              id="panel1a-header"
            >
              <div>
                <Typography>{item.title}</Typography>
                <Chip variant="outlined" label={priority} size="small" color={priority === 'Não urgente' ? colors.notUrgent : priority === 'Pouco urgente' ? colors.littleUrgent : priority === 'Urgente' ? colors.urgent : 'secondary'} style={{ marginTop: 20 }} />
              </div>
            </AccordionSummary>
            {description !== "" && (
              <AccordionDetails style={{ maxHeight: 200, overflowY: 'auto' }}>
                <Typography>{description}</Typography>
              </AccordionDetails>
            )}
          </Accordion>
        </div>
        <div style={{ width: 40 }}>
          <IconButton size='small' aria-label="delete" onClick={() => deleteDocFirebase(id)}>
            <DeleteIcon />
          </IconButton>
          <IconButton size='small' aria-label="edit" onClick={(() => handleModalOpen())}>
            <EditIcon />
          </IconButton>
        </div>
            <ModalEdit open={modalState} onClose={handleModalClose}  id={id} title={title} description={description} priority={priority}/>
      </Paper>
    </div>
  );
}
