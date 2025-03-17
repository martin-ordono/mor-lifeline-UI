import { Checkbox, Collapsible, Flex, Input, NumberInput, Show } from "@chakra-ui/react";
import { Box } from "@chakra-ui/react/box";
import { useState } from "react";
import { VscThreeBars } from "react-icons/vsc";
import { Category } from "../../models/category";
import { formatDateIntoNum } from "../../utils/dateUtils";
import CalendarInput from "../input/calendar";

import "./Entry.css";
import { Entry } from "../../models/entry";


interface EntryModalProps {
    categories: Category[];
    onChange: (entry: Entry) => void;
}

const EntryModal = ({onChange, categories}: EntryModalProps) => {
    const [dateNum, setDateNum] = useState<number>(formatDateIntoNum(new Date())!);
    const [checkedCategories, setCheckedCategories] = useState<number[]>([]);

    const handleChange = (category: Category) => {
        const newEntry: Entry = {
            date: dateNum,
            category: category.id,
            id: Math.floor(Math.random() * 1000),
            valueStr: "",
            valueNum: 0
        }
        onChange(newEntry);
        if (checkedCategories.includes(category.id)) {
            setCheckedCategories(checkedCategories.filter((id) => id !== category.id));
        } else {
            setCheckedCategories([...checkedCategories, category.id]);
        }
    }

    return (
        <Collapsible.Root className="entry-modal">
            <Collapsible.Trigger borderWidth="1px" p={2} borderRadius="md"  _open={{ bg: "purple.100" }}>
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
                            <Flex key={category.id} p={2}>
                                <Checkbox.Root
                                    alignSelf={"flex-start"}
                                    onCheckedChange={() => handleChange(category)}
                                    checked={checkedCategories.includes(category.id)}
                                >
                                    <Checkbox.HiddenInput />
                                    <Checkbox.Label width="75px">{category.name}</Checkbox.Label>
                                    <Checkbox.Control />
                                </Checkbox.Root>
                                
                                <Show when={category.isNumeric}>
                                    <NumberInput.Root defaultValue="0" width="200px">
                                    <NumberInput.Control />
                                    <NumberInput.Input />
                                    </NumberInput.Root>
                                </Show>
                                
                                <Show when={category.isStr}>
                                    <Input name="name" onChange={(e) => setName(e.target.value)} />
                                </Show>
                                
                            </Flex>
                        )
                    })}
                    </Flex>
                </Box>
            </Collapsible.Content>
        </Collapsible.Root>
        
    )
};

export default EntryModal;
