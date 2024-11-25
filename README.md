# quarter-datepicker
this Quarterly date picker using mui Date Picker.


#usage

<QuarterPicker
          name={'endDate'}
          openTo={datePickerOpenTo}
          value={selectedEndDate ? moment(selectedEndDate) : null}
          onChange={(newValue) => handleDateChange(newValue, 'endDate')}
          startDate={selectedStartDate ? selectedStartDate : startDate}
          endDate={endDate}
          defaultQuaterDate={selectedEndDate}
          disableFuture />
