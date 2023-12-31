import React from 'react';
import TextField from '@mui/material/TextField';

export default function InputComponent({ onChange, type, label, id, required, error, value, autoFocus }) {

   function handleChange(event) {
      let text = event.target.value;
      console.log(text)
      onChange(text);
   }

   return (
      <TextField
         autoFocus={autoFocus }
         required={required}
         error={error}
         margin="dense"
         id={id}
         label={label}
         type={type}
         value={value}
         fullWidth
         variant="standard"
         onChange={handleChange}
      />
   );
}

