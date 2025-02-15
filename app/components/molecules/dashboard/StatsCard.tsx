import { Text, Flex, Button, Tooltip } from "@chakra-ui/react";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Filler,
  ScriptableContext,
} from "chart.js";
import { ReactNode } from "react";
import { colors } from "~/styles/colors";
import { TbInfoCircle } from "react-icons/tb";
import { useLineDrawAnimation } from "~/hooks/useLineDrawAnimation";

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Filler);

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

/**
 * Hook para animar el trazo de la línea de forma global y continua.
 *
 * Dado un arreglo de valores, se calcula el progreso total (para todos los segmentos)
 * y se interpola entre cada par de puntos. Así, la línea se “dibuja” de forma progresiva,
 * conectando suavemente cada coordenada sin reinicios ni cortes.
 *
 * @param dataValues - Arreglo de valores numéricos (ejemplo: [0, 45, 10, 75, 30, 85, 40])
 * @param durationPerSegment - Duración (ms) asignada a cada segmento
 * @returns Arreglo de puntos en forma { x, y } para dibujar la línea
 */

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
  // Se asigna la duración deseada para cada segmento (en milisegundos).
  const animatedPoints = useLineDrawAnimation(dataValues, 140);

  const chartData = {
    labels: dataLabels,
    datasets: [
      {
        // Usamos los puntos animados para el trazo.
        data: animatedPoints,
        borderColor: trendColor,
        borderWidth: 2,
        fill: {
          target: "origin", // Rellena hasta el eje base (por defecto, y=0)
        },
        backgroundColor: (
          ctx: ScriptableContext<"line">
        ): string | CanvasGradient => {
          const chart = ctx.chart;
          const { ctx: canvas, chartArea } = chart;
          if (!chartArea) return trendColor;
          const gradient = canvas.createLinearGradient(
            0,
            chartArea.bottom,
            0,
            chartArea.top
          );
          gradient.addColorStop(0, `${trendColor}00`);
          gradient.addColorStop(1, `${trendColor}AA`);
          return gradient;
        },
        tension: 0.1,
        pointRadius: 0,
        clip: false as const,
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    // Se desactiva la animación interna de Chart.js para que la animación sea controlada únicamente por nuestro hook.
    animation: false as const,
    scales: {
      x: {
        display: false,
        min: 0,
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

  return (
    <Flex
      p={4}
      width="100%"
      minW={"300px"}
      w={{ base: "300px", sm: "300px", xl: "330px" }}
      minH="154px"
      maxH="150px"
      justifyContent="space-between"
      border={`1px solid ${colors.Gray[100]}`}
      borderRadius="xl"
      bg="white"
      flexDir={"column"}
    >
      <Flex
        flexDir="row"
        gap={2}
        alignItems={"start"}
        wrap={"wrap"}
        justifyContent={"space-between"}
      >
        <Flex flexDir="column" w={"fit-content"} color="black" gap={1}>
          <Text fontSize="md" fontWeight="bold">
            {title}
          </Text>
          <Text fontSize="3xl" fontWeight="bold" lineHeight={"base"}>
            {value}
          </Text>
        </Flex>
        <Flex flexDir={"column"} alignItems={"end"}>
          <Tooltip
            label="Estos datos son el resultado de la comparacion entre la semana anterior y la actual."
            placement="top-start"
            borderRadius={"lg"}
          >
            <Button
              w={"fit-content"}
              p={0}
              color={color}
              bg={"transparent"}
              _hover={{ bg: "transparent" }}
            >
              <TbInfoCircle fontSize={"20px"} />
            </Button>
          </Tooltip>
          <Flex w={"fit-content"} color={color}>
            {trendIcon}
            <Text fontSize={"sm"} fontWeight={"bold"}>
              {percentage}vs
            </Text>
          </Flex>

          <Flex gap={1}>
            <Text fontSize={"sm"} fontWeight={"bold"} textAlign={"center"}>
              semana
            </Text>
            <Text fontSize={"sm"} fontWeight={"bold"} textAlign={"center"}>
              anterior
            </Text>
          </Flex>
        </Flex>
      </Flex>

      <Flex minW="140px" height="90px" overflow="hidden">
        <Line data={chartData} options={chartOptions} />
      </Flex>
    </Flex>
  );
};
