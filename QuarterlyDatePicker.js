import React, { useEffect, useState } from 'react';
import { AdapterMoment } from '@mui/x-date-pickers/AdapterMoment';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { TextField } from '@mui/material';
import moment from 'moment';
import { createTheme, ThemeProvider } from '@mui/material/styles';

const QuarterlyDatePicker = (props) => {

    // Destructure the startDate and endDate from props
    const { startDate, endDate, defaultQuaterDate } = props;

    // Convert startDate and endDate from props to moment objects
    const getDummyQuarterDate = (date) => {
        const month = date.getMonth();
        const year = date.getFullYear();
        let quarter;
        if (month <= 2) { // January to March
            quarter = 1;
        } else if (month <= 5) {  // April to June
            quarter = 2;
        } else if (month <= 8) { // July to September
            quarter = 3;
        } else { // September to December
            quarter = 4;
        }
        const quarterCustomDate = new Date(`${year}-${quarter}-01`);
        return quarterCustomDate;
    }

    const minDate = () => {
        let minDate = moment(startDate);
        const quarterDate = getDummyQuarterDate(minDate.toDate());
        minDate = moment(quarterDate).clone().startOf('month').format("YYYY-MM-DD");
        minDate = moment(minDate);
        return minDate;
    }


    const maxDate = () => {
        let maxDate = moment(endDate);
        // console.log("endDate", endDate);
        const quarterDate = getDummyQuarterDate(maxDate.toDate());
        maxDate = moment(quarterDate).clone().startOf('month').format("YYYY-MM-DD");
        maxDate = moment(maxDate);
        return maxDate;
    }

    const [selectedDate, setSelectedDate] = useState(null);

    // Custom locale configuration for Quarters (Q1, Q2, Q3, Q4)
    useEffect(() => {
        moment.defineLocale('custom-en', {
            months: ['Q1', 'Q2', 'Q3', 'Q4', '5', '6', '7', '8', '9', '10', '11', '12'],
            monthsShort: ['Q1', 'Q2', 'Q3', 'Q4', '5', '6', '7', '8', '9', '10', '11', '12'],
        });

        moment.locale('custom-en'); // Set the custom locale

        return () => {
            moment.locale('en'); // Revert to the default locale
        };
    }, []);

    useEffect(() => {
        if (defaultQuaterDate) {
            const momentDefaultQuaterDate = moment(defaultQuaterDate);
            const quarter = momentDefaultQuaterDate.quarter(); // Get the quarter of the given date
            // console.log("[useEffect] defaultQuaterDate", defaultQuaterDate, quarter);
            // Logic to set selectedDate based on the quarter
            if (quarter === 1) { // January to March
                setSelectedDate(momentDefaultQuaterDate.clone().month(0).startOf('month')); // January
            } else if (quarter === 2) { // April to June
                setSelectedDate(momentDefaultQuaterDate.clone().month(1).startOf('month')); // February
            } else if (quarter === 3) { // July to September
                setSelectedDate(momentDefaultQuaterDate.clone().month(2).startOf('month')); // March
            } else if (quarter === 4) { // October to December
                setSelectedDate(momentDefaultQuaterDate.clone().month(3).startOf('month')); // April
            }
        }
    }, [defaultQuaterDate]);

    // Handling the quarter change
    const handleDateChange = (newDate) => {
        // console.log("[handleDateChange]", newDate);
        if (!newDate) return;

        const month = newDate.month(); // Get the month of the selected date
        let quarter;

        // Assign months to quarters
        if (month === 0) { // January 
            quarter = 0;  // Q1
        } else if (month === 1) { // Feb 
            quarter = 1;  // Q2
        } else if (month === 2) { // Mar
            quarter = 2;  // Q3
        } else if (month === 3) {// April
            quarter = 3;  // Q4
        }

        // Set the selected date to the first day of the selected quarter's month
        setSelectedDate(newDate);
        const firstMonthOfQuarter = (quarter) * 3;
        const yearQuarter = moment().year(newDate.year()).month(firstMonthOfQuarter).startOf('month');
        props.onChange(yearQuarter, props.name)
        // console.log(`[handleDateChange] Selected Quarter: Q${quarter + 1} ${newDate.year()}`);
    };


    const theme = createTheme({
        components: {
            MuiPickersPopper: {
                styleOverrides: {
                    root: {
                        '.MuiMonthCalendar-root div:nth-of-type(n+5)': {
                            display: 'none',
                        },
                        '.MuiMonthCalendar-root': {
                            height: 'auto !important',
                        },
                        '.MuiDateCalendar-root': {
                            height: 'auto !important',
                        },
                    },
                },
            },
        },
    });

    return (
        <ThemeProvider theme={theme}>
            <LocalizationProvider dateAdapter={AdapterMoment}>
                <DatePicker
                    views={["year", "month"]} // Allows selecting by year and month
                    slotProps={{
                        textField: { size: 'small' },
                        field: { className: 'custom-quaterly-picker' },
                    }}
                    className="date-picker"
                    value={selectedDate}
                    onChange={handleDateChange}
                    monthsPerRow={4}
                    renderInput={(params) => <TextField {...params} />}
                    minDate={minDate()}
                    maxDate={maxDate()}
                    disableFuture
                />
            </LocalizationProvider>
        </ThemeProvider>
    );
};

export default QuarterlyDatePicker;

