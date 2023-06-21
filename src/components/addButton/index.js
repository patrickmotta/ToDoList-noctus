import React from 'react';
import Button from '@mui/material/Button';
import PlaylistAddIcon from '@mui/icons-material/PlaylistAdd';

export default function AddButtonComponent({ onClick }) {
   
   return (
      <Button color='success' variant="contained" onClick={onClick} endIcon={<PlaylistAddIcon />}>
         Adicionar
      </Button>
   );
}
