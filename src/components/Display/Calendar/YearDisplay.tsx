import { Center, Checkbox, Flex, Grid, GridItem, IconButton } from "@chakra-ui/react";
import { useState } from "react";
import { AiOutlineLeft, AiOutlineRight } from "react-icons/ai";
import { Category } from "../../../models/category";
import { Entry } from "../../../models/entry";
import { colors, months } from "../../../utils/constants";

interface YearDisplayProps {
    props: any;
}

const YearDisplay = ({props}: YearDisplayProps) => {
    const data: Entry[] = props.entries;
    const categories: Category[] = props.categories;
    const onDayClick = props.onDayClick;

    const [year, setYear] = useState<number>(new Date().getFullYear());
    const [selectedCategories, setSelectedCategories] = useState<Category[]>([]);

    const handleChange = (category: Category) => {
        if (selectedCategories.includes(category)) {
            setSelectedCategories(selectedCategories.filter((c) => c.id !== category.id));
        }
        else {
            setSelectedCategories([...selectedCategories, category]);
        }
    }

    const dayGrid = (day: number, month: {name: string, number: number}) => {
        const date = year * 10000 + month.number * 100 + day;
        const check = data.filter((entry) => entry.date === date && selectedCategories.includes(entry.category)).length > 0;
        const bgColor = colors[selectedCategories.findIndex((c) => c.id === data.find((entry) => entry.date === date)?.category.id) % colors.length];
        return (
            <GridItem 
                key={day}
                colSpan={1}
                rowSpan={1}
                borderRadius="6px"
                fontSize={".5rem"}
                backgroundColor={check ? { base: (bgColor+".200"), _dark: (bgColor+".600") } : ""}
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
        <Flex direction="column" >
            <Grid
                templateColumns="repeat(12, 1fr)"
            >
                {categories.map((category) => {
                    return (
                        <GridItem key={category.id} colSpan={1} rowSpan={1} fontSize={".5rem"}>
                            <Checkbox.Root
                                alignSelf={"center"}
                                onCheckedChange={() => handleChange(category)}
                                checked={selectedCategories.includes(category)}
                            >
                                <Checkbox.HiddenInput />
                                <Checkbox.Label fontSize={".7rem"} width="50px">{category.name}</Checkbox.Label>
                                <Checkbox.Control />
                            </Checkbox.Root>
                        </GridItem>
                    )
                })}
            </Grid>
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
                <GridItem colSpan={1} rowSpan={1} fontSize={"1rem"} textAlign={"left"}>
                    <IconButton variant="ghost" onClick={()=>setYear(year-1)}><AiOutlineLeft /></IconButton>
                </GridItem>
                <GridItem colSpan={4} rowSpan={1} fontSize={"1rem"} textAlign={"center"}>{year}</GridItem>
                <GridItem colSpan={1} rowSpan={1} fontSize={"1rem"} textAlign={"right"}>
                    <IconButton variant="ghost"   onClick={()=>setYear(year+1)} ><AiOutlineRight /></IconButton>
                </GridItem>
                {Array.from({length: 12}, (_, i) => i)
                    .map((index) => {
                        if (index <= 5) {
                            return monthGrid(months[index]);
                        } else {
                            return monthGrid(months[11 - (index - 6)]); //index + 6  - (index-6)
                        }
                    }
                )}
            </Grid>
        </Flex>
    )
};

export default YearDisplay;
