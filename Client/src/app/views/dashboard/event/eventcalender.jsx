import * as React from 'react';

import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import { LocalizationProvider } from '@mui/x-date-pickers-pro';
import { AdapterDateFns } from '@mui/x-date-pickers-pro/AdapterDateFns';
import { DateRangePicker } from '@mui/x-date-pickers-pro/DateRangePicker';
import {DateRange} from "@mui/icons-material";

const Eventcalender = () => {
    const [value, setValue] = React.useState<DateRange<Date>>([null, null]);



        return (
            <LocalizationProvider dateAdapter={AdapterDateFns}>
                <div>
                    <Typography sx={{ mt: 2, mb: 1 }}>1 calendar </Typography>
                    <DateRangePicker
                        calendars={1}
                        value={value}
                        onChange={(newValue) => {
                            setValue(newValue);
                        }}
                        renderInput={(startProps, endProps) => (
                            <React.Fragment>
                                <TextField {...startProps} />
                                <Box sx={{ mx: 2 }}> to </Box>
                                <TextField {...endProps} />
                            </React.Fragment>
                        )}
                    />
                    <Typography sx={{ mt: 2, mb: 1 }}>2 calendars</Typography>
                    <DateRangePicker
                        calendars={2}
                        value={value}
                        onChange={(newValue) => {
                            setValue(newValue);
                        }}
                        renderInput={(startProps, endProps) => (
                            <React.Fragment>
                                <TextField {...startProps} />
                                <Box sx={{ mx: 2 }}> to </Box>
                                <TextField {...endProps} />
                            </React.Fragment>
                        )}
                    />
                    <Typography sx={{ mt: 2, mb: 1 }}>3 calendars</Typography>
                    <DateRangePicker
                        calendars={3}
                        value={value}
                        onChange={(newValue) => {
                            setValue(newValue);
                        }}
                        renderInput={(startProps, endProps) => (
                            <React.Fragment>
                                <TextField {...startProps} />
                                <Box sx={{ mx: 2 }}> to </Box>
                                <TextField {...endProps} />
                            </React.Fragment>
                        )}
                    />
                </div>
            </LocalizationProvider>

);
};

export default Eventcalender;