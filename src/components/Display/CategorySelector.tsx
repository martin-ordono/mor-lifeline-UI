import { Checkbox, Grid, GridItem } from "@chakra-ui/react";
import { Category } from "../../models/category";

interface CategorySelectorProps {
    props: any;
}

const CategorySelector = ({props}: CategorySelectorProps) => {
    const categories: Category[] = props.categories;
    const selectedCategories: number[] = props.selectedCategories;
    const setSelectedCategories: (categories: number[]) => void = props.setSelectedCategories;


    const handleChange = (category: Category) => {
        if (selectedCategories.includes(category.id!)) {
            setSelectedCategories(selectedCategories.filter((c) => c !== category.id));
        }
        else {
            setSelectedCategories([...selectedCategories, category.id]);
        }
    }

    const categoryItem = (category: Category) => {
        return (
            <GridItem key={category.id} colSpan={1} rowSpan={1} >
                <Checkbox.Root
                    borderColor={"red"}
                    alignSelf={"center"}
                    onCheckedChange={() => handleChange(category)}
                    checked={selectedCategories.includes(category.id)}
                >
                    <Checkbox.HiddenInput />
                    <Checkbox.Label fontSize={".7rem"} width="50px">{category.name}</Checkbox.Label>
                    <Checkbox.Control borderRadius="sm" borderColor="gray.700" _dark={{ borderColor: "gray.500" }}/>
                </Checkbox.Root>
            </GridItem>
        );
    };

    return (
        <Grid templateColumns="repeat(6, 1fr)" p={5} borderRadius={"md"} bg={"gray.200"} _dark={{ bg: "gray.800" }} gap={6}>
            {categories.map((category) => {
                return categoryItem(category);
            })}
        </Grid>
    )
};

export default CategorySelector;
