import React, { useState } from 'react';
import { ToggleButton, ToggleButtonGroup } from '@mui/material';
import { colors } from '../../colors'

export default function ToggleBttGroupComponent({ onChange, value, label, buttons }) {

   const handlerPriority = (event) => {
      const selected = event.target.value;
      onChange(selected)
   }

   return (
      <div>
         <div>
            <span style={{ color: '#666666' }}>{label}<br /></span>
         </div>
         <ToggleButtonGroup
            size="small"
            color={value === 'Não urgente' ? colors.notUrgent : value === 'Pouco urgente' ? colors.littleUrgent : value === 'Urgente' ? colors.urgent : 'secondary'}
            value={value}
            exclusive
            onChange={handlerPriority}
            aria-label="Platform"
         >
            {
               buttons.map((button) => (
                  <ToggleButton value={button.value}>{button.label}</ToggleButton>
               ))
            }
         </ToggleButtonGroup>
      </div >
   );
}
