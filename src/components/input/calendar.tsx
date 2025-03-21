import React from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { Input, InputElement, Box, Icon, Group } from "@chakra-ui/react";
import { CiCalendar } from "react-icons/ci";
import { formatDateIntoNum, parseNumberToDate } from "../../utils/dateUtils";

interface CalendarInputProps {
  onChange: (date: Number | null) => void;
  selectedDate: Number;
}

const CalendarInput: React.FC<CalendarInputProps> = ({ onChange, selectedDate }) => {

    const handleChange = (date: Date | null) => {
        const dateNum = formatDateIntoNum(date);
        onChange(dateNum);
    }

    return (
        <Box>
            <Group>
                {/* Calendar Icon */}
                <InputElement placement="end" pointerEvents="none">
                    <Icon color="gray.400">
                        <CiCalendar />
                    </Icon>
                </InputElement>

                {/* Date Picker */}
                <DatePicker
                    portalId="root-portal"
                    selected={parseNumberToDate(selectedDate)}
                    onChange={handleChange}
                    dateFormat="dd/MM/yyyy"
                    customInput={
                        <Input placeholder="Select a date" />
                    }
                />
            </Group>
        </Box>
  );
};

export default CalendarInput;
