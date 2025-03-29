import { Button, Checkbox, Collapsible, Field, Fieldset, Input, Stack } from "@chakra-ui/react";
import { useState } from "react";
import { BiBookmark } from "react-icons/bi";
import { Category } from "../../../models/category";

import "./CategoryModal.css";


interface CategoryModalProps {
    onSubmit: (category: Category) => void;
}

const CategoryModal = ({ onSubmit }: CategoryModalProps) => {
    const [name, setName] = useState<string>();
    const [description, setDescription] = useState<string>();
    const [isNum, setIsNum] = useState<boolean>(false);
    const [isStr, setIsStr] = useState<boolean>(false);

    const handleSubmit = () => {
        if(name) {
            const newCategory: Category = {
                id: -1,
                name: name,
                description: description,
                isNumeric: isNum,
                isStr: isStr
            };
            onSubmit(newCategory);
        }
    }


    return (
        <Collapsible.Root className="category-modal">
            <Collapsible.Trigger borderWidth="1px" p={2} borderRadius="md" _open={{ bg: "gray.200",  _dark: { bg: "gray.800" } }}>
                <BiBookmark />
            </Collapsible.Trigger>
            <Collapsible.Content>
                <Fieldset.Root bg={"gray.200"} _dark={{ bg: "gray.900" }} size="lg" maxW="md" borderWidth="1px" borderRadius="md" p={6} mt="0.2rem">
                <Stack>
                    <Fieldset.Legend>Category</Fieldset.Legend>
                    <Fieldset.HelperText>Create a new category</Fieldset.HelperText>
                </Stack>

                <Fieldset.Content>
                    <Field.Root>
                    <Field.Label>Name</Field.Label>
                    <Input borderColor="gray.700" _dark={{ borderColor: "gray.500" }} name="name" onChange={(e) => setName(e.target.value)} />
                    </Field.Root>

                    <Field.Root>
                    <Field.Label>Desccription</Field.Label>
                    <Input borderColor="gray.700" _dark={{ borderColor: "gray.500" }} name="descripition" onChange={(e) => setDescription(e.target.value)} />
                    </Field.Root>

                    <Field.Root>
                    <Checkbox.Root
                        alignSelf={"flex-start"}
                        onCheckedChange={() => setIsNum(!isNum)}
                        checked={!!isNum}
                    >
                        <Checkbox.HiddenInput />
                        <Checkbox.Label>Numeric</Checkbox.Label>
                        <Checkbox.Control borderColor="gray.700" _dark={{ borderColor: "gray.500" }} />
                    </Checkbox.Root>
                    </Field.Root>

                    <Field.Root>
                    <Checkbox.Root
                        alignSelf={"flex-start"}
                        onCheckedChange={() => setIsStr(!isStr)}
                        checked={!!isStr}
                    >
                        <Checkbox.HiddenInput />
                        <Checkbox.Label>Text</Checkbox.Label>
                        <Checkbox.Control borderColor="gray.700" _dark={{ borderColor: "gray.500" }} />
                    </Checkbox.Root>
                    </Field.Root>
                </Fieldset.Content>

                <Button borderColor="gray.700" _dark={{ borderColor: "gray.500" }} variant="outline" type="submit" alignSelf="flex-start" disabled={!name} onClick={handleSubmit}>
                    Submit
                </Button>
                </Fieldset.Root>
            </Collapsible.Content>
        </Collapsible.Root>
        
    )
};

export default CategoryModal;
