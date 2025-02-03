import { Text, Flex } from "@chakra-ui/react";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Tooltip,
  Filler,
  ScriptableContext,
} from "chart.js";
import { ReactNode, useMemo } from "react";
import { colors } from "~/styles/colors";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Tooltip,
  Filler
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
  const chartData = useMemo(() => {
    return {
      labels: dataLabels,
      datasets: [
        {
          data: dataValues,
          borderColor: trendColor,
          borderWidth: 2,
          // Lógica para rellenar
          fill: {
            target: "origin", // Rellena hasta el eje base (por defecto, y=0)
          },
          /**
           * `backgroundColor` como función scriptable que retorna CanvasGradient
           */
          backgroundColor: (ctx: ScriptableContext<"line">) => {
            const chart = ctx.chart;
            const { ctx: canvas, chartArea } = chart;
            // Si chartArea es undefined, significa que la dimensión del canvas aún no está disponible
            if (!chartArea) {
              // Retornamos un color de respaldo
              return trendColor;
            }

            // Creas un gradiente lineal de bottom (chartArea.bottom) a top (chartArea.top)
            const gradient = canvas.createLinearGradient(
              0,
              chartArea.bottom,
              0,
              chartArea.top
            );

            // Añadimos colorStop inferiores y superiores
            gradient.addColorStop(0, `${trendColor}00`); // 00 -> transparencia al 100%
            gradient.addColorStop(1, `${trendColor}AA`); // AA -> ~67% opacidad

            return gradient;
          },
          tension: 0.1,
          pointRadius: 0,
          clip: false as const,
        },
      ],
    };
  }, [dataLabels, dataValues, trendColor]);

  const chartOptions = useMemo(() => {
    return {
      responsive: true,
      maintainAspectRatio: false,
      scales: {
        x: {
          display: false,
        },
        y: {
          display: false,
          beginAtZero: true,
          min: 0,
          max: 100,
        },
      },
      plugins: {
        legend: { display: false },
      },
    };
  }, []);

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
