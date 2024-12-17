import * as React from 'react';
import dayjs from 'dayjs';
import 'dayjs/locale/pt-br';
import utc from 'dayjs/plugin/utc';
import timezone from 'dayjs/plugin/timezone';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';

dayjs.extend(utc);
dayjs.extend(timezone);
dayjs.locale('pt-br')
dayjs.tz.setDefault('America/Sao_Paulo');

export const DateInput = ({
    label,
    selectedDate,
    disabled = false,
    disableFuture = false,
    valueCallback = () => Date,
}) => {
    const [value, setValue] = React.useState(null);

    React.useEffect(() => {
        if (selectedDate) {
            const formattedDate = dayjs(selectedDate).tz('America/Sao_Paulo');
            setValue(formattedDate);
        }
        else if (selectedDate === null) {
            setValue(null)
        }
    }, [selectedDate]);

    return (
        <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale='pt-br'>
            <DatePicker
                label={label}
                value={value}
                disabled={disabled}
                disableFuture={disableFuture}
                inputFormat="DD/MM/YYYY"
                onChange={(newValue) => {
                    setValue(newValue);
                    valueCallback(new Date(newValue));
                }}
            />
        </LocalizationProvider>
    );
};


