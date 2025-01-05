import { React } from 'react';
import { TimePicker } from '@mui/x-date-pickers/TimePicker';
import { createTheme, ThemeProvider } from '@mui/material/styles';

const CustomTimePicker = ({ label, value, onChange }) => {

    const theme = createTheme({
            palette: {
                mode: 'dark',
            },
        });

    return (<>
        <label htmlFor={label}>{label}</label>
        <ThemeProvider theme={theme}>
            <TimePicker
                value={value}
                onChange={(e) => onChange(e)}
                ampm={false}
                timeSteps={{ minutes: 1 }}
                sx={{
                    '& .MuiInputBase-root': {
                        padding: '15px',
                        backgroundColor: 'rgba(255, 255, 255, 0.2)',
                        borderRadius: '15px',
                        color: '#eee',
                        fontSize: '17px',
                        width: '300px', // Adjust width to match genericText
                        boxSizing: 'border-box',
                        height: '51.5px', // Adjust height to match genericText
                        '&:hover .MuiOutlinedInput-notchedOutline': {
                            borderColor: 'rgba(255, 255, 255, 0.2)', // Remove black border on hover
                        },
                    },
                    '& .MuiOutlinedInput-notchedOutline': {
                        borderColor: 'rgba(255, 255, 255, 0.2)',
                    },
                    '& .MuiInputLabel-root': {
                        margin: '10px 0 10px 5px',
                        display: 'block',
                        fontSize: '14px',
                        color: '#eee',
                    },
                    '& .MuiSvgIcon-root': {
                        color: '#eee',
                    },
                    '& .MuiInputBase-input': {
                        padding: 'unset',
                        backgroundColor: 'unset',
                        borderRadius: 'unset',
                        color: '#eee',
                        fontSize: '17px',
                        border: 'unset',
                    },
                    '& .MuiInputBase-input::placeholder': {
                        color: '#bbb',
                    },
                    '& .MuiInputBase-input:focus': {
                        borderColor: 'rgba(52, 152, 219, 1)',
                    },
                }}
            />
        </ThemeProvider>
    </>);
};

export default CustomTimePicker;
