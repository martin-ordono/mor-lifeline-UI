import { Center, Flex } from "@chakra-ui/react";
import { useState } from "react";
import CategorySelector from "./CategorySelector";
import DisplayChart from "./DisplayChart";

interface DisplayWrapperProps {
    props: any;
}

const DisplayWrapper = ({props}: DisplayWrapperProps) => {
    const [selectedCategories, setSelectedCategories] = useState<number[]>([]);
    const newProps = {...props, selectedCategories: selectedCategories, setSelectedCategories: setSelectedCategories};


    return (
        <Center padding={2} bgColor={"gray.200"} _dark={{bgColor: "gray.900"}} borderRadius="md" boxShadow="lg" overflowY="auto">
            <Flex minW={"50vw"} maxW={"90vw"} minH={"75vh"} maxH={"100vh"} direction={"column"} width="100%" height="100%" padding={2} gap={2}>
                <CategorySelector props={newProps} />
                <DisplayChart props={newProps} />
            </Flex>
        </Center>
    )
};

export default DisplayWrapper;
