import { Center, Grid, GridItem } from "@chakra-ui/react";
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
        const check = data.filter((entry) => entry.date === date).length > 0;
        return (
            <GridItem 
                key={day}
                colSpan={1}
                rowSpan={1}
                borderRadius="6px"
                fontSize={".5rem"}
                backgroundColor={check ? { base: "purple.200", _dark: "purple.900" } : ""}
                onClick={() => onDayClick(date)}
            ><Center>{day}</Center>
                
            </GridItem>
        )
    }
    
    const monthGrid = (month: {name: string, number: number}) => {
        const monthDate = new Date(year, month.number, 1);
        const firstWeekDay = monthDate.getDay()+1;
        const daysInMonth = new Date(year, month.number+1, 0).getDate();
        const prevDays = firstWeekDay >= 7 ? 0 : firstWeekDay;
        return (
            <GridItem key={month.number}>
                <Grid templateColumns="repeat(7, 1fr)" templateRows="repeat(6, 1fr)" gap={2} className="month-grid">
                    <GridItem colSpan={7} rowSpan={1} fontSize={".7rem"}>{month.name}</GridItem>
                    <GridItem colSpan={1} rowSpan={1}>Mon</GridItem>
                    <GridItem colSpan={1} rowSpan={1}></GridItem>
                    <GridItem colSpan={1} rowSpan={1}>Wed</GridItem>
                    <GridItem colSpan={1} rowSpan={1}></GridItem>
                    <GridItem colSpan={1} rowSpan={1}>Fri</GridItem>
                    <GridItem colSpan={1} rowSpan={1}></GridItem>
                    <GridItem colSpan={1} rowSpan={1}>Sun</GridItem>
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
        <Grid
            templateColumns="repeat(6, 1fr)"
            alignContent="space-evenly"
            height="50%"
            p={5}
            borderRadius={20}
            bg="gray.100"
            _dark={{ bg: "gray.900" }}
            gap={5}
            overflow={"auto"}
        >
            <GridItem colSpan={6} rowSpan={1} fontSize={"1rem"} textAlign={"center"}>{year}</GridItem>
            {Array.from({length: 12}, (_, i) => i)
                .map((index) => {
                    if (index <= 5) {
                        return monthGrid(months[index]);
                    } else {
                        console.log("index", index);
                        console.log(12  - (index - 6));
                        return monthGrid(months[11 - (index - 6)]); //index + 6  - (index-6)
                    }
                }
            )}
        </Grid>
    )
};

export default YearDisplay;
