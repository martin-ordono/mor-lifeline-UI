import { Collapsible, Flex } from "@chakra-ui/react";
import { Box } from "@chakra-ui/react/box";
import { useState } from "react";
import { VscThreeBars } from "react-icons/vsc";
import { Category } from "../../models/category";
import { formatDateIntoNum } from "../../utils/dateUtils";
import CalendarInput from "../Input/calendar";

import { Entry } from "../../models/entry";
import "./Entry.css";
import EntryInput from "./EntryInput";


interface EntryModalProps {
    categories: Category[];
    onChange: (entry: Entry, toRemove?: boolean) => void;
    data: Entry[];
}

const EntryModal = ({onChange, categories, data}: EntryModalProps) => {
    const [dateNum, setDateNum] = useState<number>(formatDateIntoNum(new Date())!);

    const handleChange = (entry: Entry, toRemove?: boolean) => {
        onChange(entry, toRemove);
    }

    return (
        <Collapsible.Root className="entry-modal">
            <Collapsible.Trigger borderWidth="1px" p={2} borderRadius="md"  _open={{ bg: "gray.200" }}>
                <VscThreeBars />
            </Collapsible.Trigger>
            <Collapsible.Content>
                <Box p={6} mt="0.2rem" borderWidth="1px" borderRadius="lg" maxW="400px" >
                    <CalendarInput selectedDate={dateNum} onChange={(date: any) => setDateNum(date)} />
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
                                dateNum={dateNum}
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
