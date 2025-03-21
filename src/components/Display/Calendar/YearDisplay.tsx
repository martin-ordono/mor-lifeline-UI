import { Grid, GridItem } from "@chakra-ui/react";
import { useState } from "react";
import { months } from "../../../utils/constants";
import { Entry } from "../../../models/entry";

interface YearDisplayProps {
    data: Entry[];
    onDayClick: (date: number) => void;
}

const YearDisplay = ({data, onDayClick}: YearDisplayProps) => {
    const [year, setYear] = useState<number>(new Date().getFullYear());

    const dayGrid = (day: number, month: {name: string, number: number}) => {
        const date = year * 10000 + month.number * 100 + day;
        const check = data.filter((entry) => entry.date === date);
        return (
            <GridItem 
                key={day}
                colSpan={1}
                rowSpan={1}
                borderWidth="1px"
                borderRadius="5px"
                fontSize={".5rem"}
                backgroundColor={check.length > 0 ? "green.200" : ""}
                onClick={() => onDayClick(date)}
            >
                {day}
            </GridItem>
        )
    }
    
    const monthGrid = (month: {name: string, number: number}) => {
        const monthDate = new Date(year, month.number, 1);
        const firstWeekDay = monthDate.getDay()+1;
        const daysInMonth = new Date(year, month.number+1, 0).getDate();
        const prevDays = firstWeekDay >= 7 ? 0 : firstWeekDay;
        return (
            <GridItem key={month.number} borderWidth={1} borderColor="gray.200">
                <Grid templateColumns="repeat(7, 1fr)" templateRows="repeat(6, 1fr)">
                    <GridItem colSpan={7} rowSpan={1} textAlign="center">{month.name}</GridItem>
                    <GridItem colSpan={1} rowSpan={1} fontSize=".7rem">Mon</GridItem>
                    <GridItem colSpan={1} rowSpan={1}></GridItem>
                    <GridItem colSpan={1} rowSpan={1} fontSize=".7rem">Wed</GridItem>
                    <GridItem colSpan={1} rowSpan={1}></GridItem>
                    <GridItem colSpan={1} rowSpan={1} fontSize=".7rem">Fri</GridItem>
                    <GridItem colSpan={1} rowSpan={1}></GridItem>
                    <GridItem colSpan={1} rowSpan={1} fontSize=".7rem">Sun</GridItem>
                    {Array.from({length: prevDays}, (_, i) => i + 1).map((day) => {
                        return (<GridItem key={day} colSpan={1} rowSpan={1}></GridItem>)
                    })}
                    {Array.from({length: daysInMonth}, (_, i) => i + 1).map((day) => {
                        return (dayGrid(day, month))
                    })}

                </Grid>
            </GridItem>
        )
    }

    return (
        <Grid templateColumns="repeat(6, 1fr)" alignContent="space-evenly" height="50%">
            {months.map((month) => monthGrid(month))}
        </Grid>
    )
};

export default YearDisplay;
