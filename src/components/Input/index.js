import React from 'react';
import TextField from '@mui/material/TextField';




export default function InputComponent({ onChange, type, label, id, required, error }) {


   function handleChange(event) {
      let text = event.target.value;
      onChange(text);
   }
   return (
      <TextField
         autoFocus
         required={required}
         error={error}
         margin="dense"
         id={id}
         label={label}
         type={type}
         fullWidth
         variant="standard"
         onChange={handleChange}
      />
   );
}

