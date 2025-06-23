// components/ResponsiveDatePicker.tsx
import { DesktopDatePicker, MobileDatePicker } from "@mui/x-date-pickers";
import { useMediaQuery, TextFieldProps } from "@mui/material";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { Dayjs } from "dayjs";
import "dayjs/locale/ru";

interface ResponsiveDatePickerProps {
  value: Dayjs;
  onChange: (newDate: Dayjs) => void;
  label?: string;
  textFieldProps?: TextFieldProps;
}

export const ResponsiveDatePicker: React.FC<ResponsiveDatePickerProps> = ({
  value,
  onChange,
  label = "Дата",
  textFieldProps,
}) => {
  const isMobile = useMediaQuery("(max-width:600px)");
  const Picker = isMobile ? MobileDatePicker : DesktopDatePicker;

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale='ru'>
      <Picker
        label={label}
        value={value}
        onChange={(newValue) => {
          if (newValue) onChange(newValue);
        }}
        slotProps={{ textField: { size: "small", ...textFieldProps } }}
      />
    </LocalizationProvider>
  );
};
