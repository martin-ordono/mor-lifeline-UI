import { Checkbox, Collapsible, Flex, NumberInput, Show } from "@chakra-ui/react";
import { Box } from "@chakra-ui/react/box";
import { useState } from "react";
import { VscThreeBars } from "react-icons/vsc";
import { Category } from "../../models/category";
import { formatDateIntoNum } from "../../utils/dateUtils";
import CalendarInput from "../input/calendar";

import "./EntryModal.css";
import { Entry } from "../../models/entry";


interface EntryInputProps {
    entry: Entry | undefined;
    category: Category;
    dateNum: number;
    onChange: (entry: Entry) => void;
}

const EntryInput = ({entry, category, dateNum, onChange}: EntryInputProps) => {
    const [checked, setChecked] = useState<boolean>(!!entry);
    const [str, setStr] = useState<string | undefined>(entry?.valueStr);
    const [num, setNum] = useState<number | undefined>(entry?.valueNum);

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
};

export default EntryInput;
