import { Text, Flex } from "@chakra-ui/react";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Tooltip,
  Legend,
  ScriptableContext,
} from "chart.js";
import { colors } from "~/styles/colors";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Tooltip,
  Legend
);

const months = [
  "Ene",
  "Feb",
  "Mar",
  "Abr",
  "May",
  "Jun",
  "Jul",
  "Ago",
  "Sep",
  "Oct",
  "Nov",
  "Dic",
];

const generateRandomData = () =>
  Array.from({ length: 12 }, () => Math.floor(Math.random() * 100));

const dataSet1 = generateRandomData();
const dataSet2 = generateRandomData();

export const ComparisonChart = () => {
  const chartData = {
    labels: months,
    datasets: [
      {
        label: "Ventas",
        data: dataSet1,
        borderColor: "#582cff",
        fill: {
          target: "origin", // Rellena hasta el eje base (por defecto, y=0)
        },
        backgroundColor: (
          ctx: ScriptableContext<"line">
        ): string | CanvasGradient => {
          const chart = ctx.chart;
          const { ctx: canvas, chartArea } = chart;
          if (!chartArea) return "#582cff";
          const gradient = canvas.createLinearGradient(
            0,
            chartArea.bottom,
            0,
            chartArea.top
          );
          gradient.addColorStop(0, "#582cff00");
          gradient.addColorStop(1, "#582cffAA");
          return gradient;
        },
        pointBackgroundColor: "#582cff",
        borderWidth: 3,
        tension: 0.1,
        pointRadius: 0,
        clip: false as const,
        pointHoverRadius: 5,
      },
      {
        label: "Inversiones",
        data: dataSet2,
        borderColor: "#34b6ff",
        fill: {
          target: "origin", // Rellena hasta el eje base (por defecto, y=0)
        },
        backgroundColor: (
          ctx: ScriptableContext<"line">
        ): string | CanvasGradient => {
          const chart = ctx.chart;
          const { ctx: canvas, chartArea } = chart;
          if (!chartArea) return "#34b6ff";
          const gradient = canvas.createLinearGradient(
            0,
            chartArea.bottom,
            0,
            chartArea.top
          );
          gradient.addColorStop(0, "#34b6ff00");
          gradient.addColorStop(1, "#34b6ffAA");
          return gradient;
        },
        pointBackgroundColor: "#34b6ff",
        borderWidth: 2,
        tension: 0.1,
        pointRadius: 0,
        clip: false as const,
        pointHoverRadius: 5,
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    interaction: {
      mode: "index" as const,
      intersect: false,
    },
    scales: {
      x: {
        grid: {
          drawOnChartArea: false, // only want the grid lines for one axis to show up
        },
      },
      y: {
        beginAtZero: true,
        max: 100,
        grid: {
          drawOnChartArea: true, // only want the grid lines for one axis to show up/*
        },
      },
    },
    plugins: {
      legend: { display: false },
      tooltip: { enabled: true, usePointStyle: true },
    },
  };

  return (
    <Flex direction="column" p={4} bg="white" borderRadius="lg" boxShadow="md" w={"full"}>
      <Text
        fontSize="xl"
        fontWeight="black"
        mb={4}
        color={colors.Custom.textBlue}
      >
        Comparación de Datos Mensuales
      </Text>
      <Flex height="300px">
        <Line data={chartData} options={chartOptions} />
      </Flex>
    </Flex>
  );
};
