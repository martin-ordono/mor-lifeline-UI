import { Checkbox, Flex, Input, NumberInput, Show } from "@chakra-ui/react";
import { useState } from "react";
import { Category } from "../../models/category";

import { Entry } from "../../models/entry";


interface EntryInputProps {
    data: Entry[];
    category: Category;
    dateNum: number;
    onChange: (entry: Entry, toDelete: boolean) => void;
}

const EntryInput = ({data, category, dateNum, onChange}: EntryInputProps) => {
    const entry = data.find((entry) => entry.date === dateNum && entry.category.id === category.id);
    const [checked, setChecked] = useState<boolean>(false);
    const [str, setStr] = useState<string | undefined>(entry?.valueStr);
    const [num, setNum] = useState<string | undefined>(entry?.valueNum !== undefined ? String(entry.valueNum) : undefined);

    if (entry !== undefined && !checked) {
        setChecked(true);
    } else if (entry === undefined && checked) {
        setChecked(false);
    }

    const handleChange = (category: Category) => {
        const check = !checked;
        setChecked(check);
        const newEntry: Entry = {
            date: dateNum,
            category: category,
            valueStr: "",
            valueNum: 0
        }
        onChange(newEntry, !check);
    }

    return (
        <Flex key={category.id} p={2} gap={4} align={"center"} height="2rem">
            <Checkbox.Root
                alignSelf={"center"}
                onCheckedChange={() => handleChange(category)}
                checked={checked}
            >
                <Checkbox.HiddenInput />
                <Checkbox.Label width="75px">{category.name}</Checkbox.Label>
                <Checkbox.Control />
            </Checkbox.Root>
            
            <Show when={category.isNumeric}>
                <NumberInput.Root
                    value={num}
                    onValueChange={(e) => setNum(e.value)}
                    width="100px"
                    size={"xs"}
                    disabled={!checked}
                >
                <NumberInput.Control />
                <NumberInput.Input />
                </NumberInput.Root>
            </Show>
            
            <Show when={category.isStr}>
                <Input
                    name="str"
                    value={str}
                    onChange={(e) => setStr(e.target.value)}
                    width="100px"
                    size={"xs"}
                    disabled={!checked}
                />
            </Show>
            
        </Flex>
    )
};

export default EntryInput;
