import React from 'react';
import { TimePicker } from '@mui/x-date-pickers/TimePicker';
import { TextField } from '@mui/material';
import './timePicker.scss';

const CustomTimePicker = ({ label, value, onChange }) => {
    console.log(value);
  return (<>
    <label htmlFor={label}>{label}</label>
    <TimePicker
      value={value}
      onChange={(e) => onChange(e)}
      ampm={false}
      className="timepicker-input"
      slots={{ textField: (params) => <TextField {...params} className="timepicker-input" /> }}
    />
  </>);
};

export default CustomTimePicker;
