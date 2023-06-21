import React from 'react';
import Alert from '@mui/material/Alert';

export default function AlertComponent({ severity, message, show }) {
   
   return (
      show ? 
         <Alert style={{marginTop: 10}} severity={severity}>{message}</Alert>
      :<></>
   );
}
