import React from 'react';



export default function InputComponent({ onChange, type, value }) {


   function handleChange(event) {
      let text = event.target.value;
      onChange(text);
   }
   return (
      <input type={type} value={value} onChange={handleChange} />
   );
}

