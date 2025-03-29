import { Center, Flex } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import CategorySelector from "./CategorySelector";
import DisplayChart from "./DisplayChart";

interface DisplayWrapperProps {
    props: any;
}

const DisplayWrapper = ({props}: DisplayWrapperProps) => {
    const [selectedCategories, setSelectedCategories] = useState<number[]>([]);
    const newProps = {...props, selectedCategories: selectedCategories, setSelectedCategories: setSelectedCategories};

    useEffect(() => {
        setSelectedCategories(props.categories.map((category: any) => category.id));
    }, [props.categories]);


    return (
        <Center padding={2} h="100%" bgColor={"gray.200"} _dark={{bgColor: "gray.900"}} borderRadius="md" boxShadow="lg" overflowY="auto">
            <Flex minW={"50vw"} maxW={"90vw"} minH={"50vh"} maxH={"100vh"} direction={"column"} >
                <CategorySelector props={newProps} />
                <DisplayChart props={newProps} />
            </Flex>
        </Center>
    )
};

export default DisplayWrapper;
