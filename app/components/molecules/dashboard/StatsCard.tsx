import { Text, Flex } from "@chakra-ui/react";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Tooltip,
} from "chart.js";
import { ReactNode, useMemo } from "react";
import { colors } from "~/styles/colors";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Tooltip
);

interface StatsCardProps {
  title: string;
  value: string;
  percentage: string;
  color: string;
  trendColor: string;
  trendIcon: ReactNode;
  dataLabels: string[];
  dataValues: number[];
}

export const StatsCard = ({
  title,
  value,
  percentage,
  color,
  trendColor,
  trendIcon,
  dataLabels,
  dataValues,
}: StatsCardProps) => {
  const chartData = useMemo(
    () => ({
      labels: dataLabels,
      datasets: [
        {
          data: dataValues,
          borderColor: trendColor,
          borderWidth: 2,
          backgroundColor: "rgba(255, 0, 0, 0.3)", // semitransparente
          fill: true, // true, 'start', 'end', etc
          tension: 0.3,
          pointRadius: 0,
          clip: false as const,
        },
      ],
    }),
    [dataLabels, dataValues, trendColor]
  );

  const chartOptions = useMemo(
    () => ({
      responsive: true,
      maintainAspectRatio: false,
      scales: {
        x: {
          display: false,
        },
        y: {
          display: false,
          // Asegura que la línea esté por encima de 0, y define un max más alto que tu data
          beginAtZero: true,
          min: 0,
          max: 100, // si tus datos rondan < 100. Ajusta según necesites
        },
      },
      plugins: {
        legend: { display: false },
      },
    }),
    []
  );

  return (
    <Flex
      p={4}
      width="100%"
      maxW="375px"
      minH="154px"
      justifyContent="space-between"
      alignItems="end"
      border={`1px solid ${colors.Gray[100]}`}
      borderRadius="2xl"
      boxShadow="base"
      bg="white"
    >
      <Flex flexDir="column" p={2} gap={2}>
        <Flex flexDir="column" color="black" gap={2}>
          <Text fontSize="sm" fontWeight="bold">
            {title}
          </Text>
          <Text fontSize="3xl" fontWeight="bold">
            {value}
          </Text>
        </Flex>
        <Flex align="center" fontSize="xs" color={color}>
          {trendIcon}
          <Text ml={1}>{percentage} vs mes anterior</Text>
        </Flex>
      </Flex>
      <Flex width="140px" height="90px" overflow="hidden">
        <Line data={chartData} options={chartOptions} />
      </Flex>
    </Flex>
  );
};
