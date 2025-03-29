import { Box } from "@chakra-ui/react";
import { BarElement, CategoryScale, Chart as ChartJS, Colors, Legend, LinearScale, scales, Title, Tooltip } from "chart.js";
import { Bar } from "react-chartjs-2";
import { Category } from "../../../models/category";
import { Entry } from "../../../models/entry";
import { parseNumberToDate } from "../../../utils/dateUtils";

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
    ChartJS.defaults.datasets.line.showLine = false;

    const months: string[] = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

    const buildData = () => {
        const data = {
            labels: months,
            datasets: selectedCategories.map((categoryId) => {
                const category = categories.filter((cat) => cat.id === categoryId)[0];
                const filteredEntries = entries.filter((entry) => entry.category.id === categoryId);
                const data = Array(12).fill(0);
                filteredEntries.forEach((entry) => {
                    const month = parseNumberToDate(entry.date).getMonth();
                    data[month] += 1;
                });
                return {
                    label: category.name,
                    backgroundColor: category.color,
                    data: data,
                }
            })
        };
        return data;
    };


    const options = {
        responsive: true,
        scales: {
          x: {
            stacked: true,
            grid: {
                display: false,
            },
            ticks: {
                color: "white"
            }
          },
          y: {
            stacked: true,
            grid: {
                display: false,
            },
            ticks: {
                color: "white"
            }
          }
        },
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
        <Box borderRadius="md" bg="gray.100" _dark={{ bg: "gray.800" }}>
            <Bar options={options} data={buildData()} />
        </Box>
    )
};

export default BarChart;
