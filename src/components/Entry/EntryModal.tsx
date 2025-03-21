import { Collapsible, Flex } from "@chakra-ui/react";
import { Box } from "@chakra-ui/react/box";
import { VscThreeBars } from "react-icons/vsc";
import { Category } from "../../models/category";
import { Entry } from "../../models/entry";
import CalendarInput from "../Input/calendar";
import EntryInput from "./EntryInput";

import "./Entry.css";


interface EntryModalProps {
    categories: Category[];
    onChange: (entry: Entry, toRemove?: boolean) => void;
    data: Entry[];
    date: number;
    setDate: (date: number) => void;
}

const EntryModal = ({onChange, categories, data, date, setDate}: EntryModalProps) => {

    const handleChange = (entry: Entry, toRemove?: boolean) => {
        onChange(entry, toRemove);
    }

    return (
        <Collapsible.Root className="entry-modal">
            <Collapsible.Trigger borderWidth="1px" p={2} borderRadius="md"  _open={{ bg: "gray.200",  _dark: { bg: "gray.800" } }}>
                <VscThreeBars />
            </Collapsible.Trigger>
            <Collapsible.Content>
                <Box p={6} mt="0.2rem" borderWidth="1px" borderRadius="md" maxW="400px" bg={"gray.200"} _dark={{ bg: "gray.900" }}>
                    <CalendarInput selectedDate={date} onChange={(date: any) => setDate(date)} />
                    <Flex 
                        direction="column"
                        justify="flex-start"
                        textAlign="start"
                        gap={6}
                        mt={10}
                    >
                    {categories.map((category) => {
                        return (
                            <EntryInput
                                key={category.id}
                                category={category}
                                dateNum={date}
                                onChange={handleChange}
                                data={data}
                            />
                        )
                    })}
                    </Flex>
                </Box>
            </Collapsible.Content>
        </Collapsible.Root>
        
    )
};

export default EntryModal;
