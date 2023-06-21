import React from 'react';
export default function DatePickerComponent({ value, onChange, message, show }) {
   const handleChange = (event) => {
      const dt = event.target.value;
      console.log(dt)
      onChange(dt);
   }

   return (
      <div>
         <input onChange={handleChange} value={value} style={{width: '100%', height: '100%', borderColor: '#F1F1F1', borderStyle: 'solid'}} type="date" />
      </div>
   );
}
