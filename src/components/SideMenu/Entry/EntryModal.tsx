import { Collapsible, Flex } from "@chakra-ui/react";
import { Box } from "@chakra-ui/react/box";
import { VscThreeBars } from "react-icons/vsc";
import { Category } from "../../../models/category";
import CalendarInput from "../../Input/calendar";
import EntryInput from "./EntryInput";

import "./Entry.css";


interface EntryModalProps {
    props: any;
}

const EntryModal = ({props}: EntryModalProps) => {
    const categories: Category[] = props.categories;
    const entries = props.entries;
    const date = props.selectedDate;
    const setDate = props.setSelectedDate;
    const handleChange = props.handleEntryChange;

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
                                data={entries}
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
