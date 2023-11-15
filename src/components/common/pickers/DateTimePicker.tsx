import React from 'react';
import { PickerProps } from 'antd/lib/date-picker/generatePicker';
import { AppDate } from 'constants/Dates';
import { Calendar, DatePicker } from 'react-persian-datepicker';

type DatePickerProps = PickerProps<AppDate>;

export const DateTimePicker = React.forwardRef<React.Component<DatePickerProps>, DatePickerProps>(
  ({ className, ...props }, ref) => <DatePicker ref={ref} className={className} {...props} />,
  // <DayjsDatePicker ref={ref} className={className} {...props} />,
);
