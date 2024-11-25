# quarter-datepicker
this Quarterly date picker using mui Date Picker.


# Usage



    // Handle different date picker open selection based on selectedDateType 
    const datePickerOpenTo = useMemo(() => {
        if (selectedDateType.value === 'annually') return 'year';   // Open to year for annually
        else if (selectedDateType.value === 'monthly') return 'month';  // Open to month for monthly
        // else if (selectedDateType.value === 'quarterly') return 'month';  // Open to month for quarterly (adjust as needed)
        else return 'day';  // Default to day for daily
    }, [selectedDateType]);



    // Code usge. 
    <QuarterPicker
          name={'endDate'}
          openTo={datePickerOpenTo}
          value={selectedEndDate ? moment(selectedEndDate) : null}
          onChange={(newValue) => handleDateChange(newValue, 'endDate')}
          startDate={selectedStartDate ? selectedStartDate : startDate}
          endDate={endDate}
          defaultQuaterDate={selectedEndDate}
          disableFuture />



  ![image](https://github.com/user-attachments/assets/b0cf7352-e337-4a4a-bdf2-04a399b81e5e)


