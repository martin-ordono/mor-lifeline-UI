import { Chart as ChartJS, ChartData, BarElement, CategoryScale, Legend, LinearScale, Title, Tooltip, Colors } from "chart.js";
import { Bar } from "react-chartjs-2";
import { Category } from "../../../models/category";
import { Entry } from "../../../models/entry";
import { colors } from "../../../utils/constants";
import { parseNumberToDate } from "../../../utils/dateUtils";
import { Box } from "@chakra-ui/react";
import { color } from "chart.js/helpers";

interface BarChartProps {
    props: any;
}

const BarChart = ({props}: BarChartProps) => {
    const entries: Entry[] = props.entries;
    const selectedCategories: number[] = props.selectedCategories;
    const categories: Category[] = props.categories;
    ChartJS.register(
        CategoryScale,
        LinearScale,
        BarElement,
        Colors,
        Title,
        Tooltip,
        Legend
      );
    ChartJS.defaults.color = 'white';

    const months: string[] = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

    const buildData = () => {
        const data = {
            labels: months,
            datasets: selectedCategories.map((category) => {
                const filteredEntries = entries.filter((entry) => entry.category.id === category);
                const data = Array(12).fill(0);
                filteredEntries.forEach((entry) => {
                    const month = parseNumberToDate(entry.date).getMonth();
                    data[month] += 1;
                });
                return {
                    label: categories.filter((cat) => cat.id === category)[0].name,
                    backgroundColor: colors[selectedCategories.indexOf(category)],
                    borderColor: colors[selectedCategories.indexOf(category)],
                    data: data
                }
            })
        };
        return data;
    };


    const options = {
        responsive: true,
        plugins: {
          legend: {
            position: 'top' as const,
          },
          title: {
            display: false,
            text: 'Chart.js Bar Chart',
          },
        },
        color: "white"
    };

    return (
        <Box borderRadius="md" bg={"gray.200"} _dark={{ bg: "gray.800" }}>
            <Bar options={options} data={buildData()} />
        </Box>
    )
};

export default BarChart;
