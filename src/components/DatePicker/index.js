import React from 'react';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import dayjs from 'dayjs';
import 'dayjs/locale/pt-br';

export default function DatePickerComponent({ value, onChange, message, show }) {
   const handleChange = (dt) => {
      const formattedDT = dayjs(dt).format('DD/MM/YYYY');
      onChange(formattedDT);
   }

   return (
      <LocalizationProvider dateAdapter={AdapterDayjs}>
         <DatePicker format='DD/MM/YYYY' onChange={handleChange} value={value} />
      </LocalizationProvider>
   );
}
