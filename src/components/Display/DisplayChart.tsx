import { Tabs } from "@chakra-ui/react";
import YearDisplay from "./Calendar/YearDisplay";
import BarChart from "./Chart/BarChart";

interface DisplayChartProps {
    props: any;
}

const DisplayChart = ({props}: DisplayChartProps) => {
    const tabOptions = ["Calendar", "Bars"];

    return (
        <Tabs.Root defaultValue="Calendar" orientation="horizontal">
            <Tabs.List>
                {tabOptions.map((option, index) => {
                    return (
                        <Tabs.Trigger key={index} value={option}>
                            {option}
                        </Tabs.Trigger>
                    )
                })}
            </Tabs.List>
            <Tabs.Content value="Calendar"><YearDisplay props={props}/> </Tabs.Content>
            <Tabs.Content value="Bars"><BarChart props={props}/> </Tabs.Content>
        </Tabs.Root>
    )
};

export default DisplayChart;
