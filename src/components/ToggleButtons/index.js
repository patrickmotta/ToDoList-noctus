import React, { useState } from 'react';
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';

export default function ToggleBttGroupComponent({ onChange, value, label }) {

   const handlePriority = (event) => {
      const selected = event.target.value;
      onChange(selected)
   }

   return (
      <div style={{marginTop: 20}}>
         <span style={{color: '#666666'}}>{label}<br/></span>
         <ToggleButtonGroup
            color={value === 'not urgent' ? 'success' : value === 'little urgent' ? 'warning' : value === 'urgent' ? 'error' : 'secondary'}
            value={value}
            exclusive
            onChange={handlePriority}
            aria-label="Platform"
         >
            <ToggleButton value="not urgent">Não urgente</ToggleButton>
            <ToggleButton value="little urgent">Pouco urgente</ToggleButton>
            <ToggleButton value="urgent">Urgente</ToggleButton>
         </ToggleButtonGroup>
      </div >
   );
}
