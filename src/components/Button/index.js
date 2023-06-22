import React from 'react';
import Button from '@mui/material/Button';

export default function AddButtonComponent({ onClick,color , title, endIcon }) {
   
   return (
      // <Button color='success' variant="contained" onClick={onClick} endIcon={<PlaylistAddIcon />}>
      <Button color={color} variant="contained" onClick={onClick} endIcon={endIcon}>
         {title}
      </Button>
   );
}
