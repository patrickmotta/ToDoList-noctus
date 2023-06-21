import React, { useState } from 'react';
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import {colors} from '../../colors'

export default function ToggleBttGroupComponent({ onChange, value, label }) {

   const handlePriority = (event) => {
      const selected = event.target.value;
      onChange(selected)
   }

   return (
      <div style={{marginTop: 20}}>
         <span style={{color: '#666666'}}>{label}<br/></span>
         <ToggleButtonGroup
            color={value === 'Não urgente' ? colors.notUrgent : value === 'Pouco urgente' ? colors.littleUrgent : value === 'Urgente' ? colors.urgent : 'secondary'}
            value={value}
            exclusive
            onChange={handlePriority}
            aria-label="Platform"
         >
            <ToggleButton value="Não urgente">Não urgente</ToggleButton>
            <ToggleButton value="Pouco urgente">Pouco urgente</ToggleButton>
            <ToggleButton value="Urgente">Urgente</ToggleButton>
         </ToggleButtonGroup>
      </div >
   );
}
