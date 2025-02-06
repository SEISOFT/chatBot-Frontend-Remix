import { Heading, Flex, useDisclosure } from "@chakra-ui/react";
import { useQRCode } from "~/hooks/useQRCode";
import { useUser } from "~/hooks/useUser";
import { ProfilingModal } from "~/components/molecules/profiling/ProfilingModal";
import { useWelcomeAnimation } from "~/hooks/profiling/useWelcomeAnimation";
import { useEffect, useMemo, useState } from "react";
import { useNavigation } from "~/hooks/useNavigation";
import { colors } from "~/styles/colors";
import { WhatsAppConnectionCard } from "~/components/molecules/dashboard/WhatsAppConnectionCard";
import { ModalBlurOverlay } from "~/components/atoms/profiling/ModalBlurOverlay";
import { WelcomeAnimation } from "~/components/atoms/profiling/WelcomeAnimation";
import { StatsCard } from "~/components/molecules/dashboard/StatsCard";
import { TbArrowUpRight } from "react-icons/tb";

export const Dashboard = () => {
  const { user, refetchUser } = useUser();
  const { qrCode, isLoading, refetch } = useQRCode();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { showWelcomeAnimation, triggerAnimation } = useWelcomeAnimation();
  const [countdown, setCountdown] = useState(0);
  const { isSidebarCollapsed } = useNavigation();
  const QR_DURATION = 50;
  const dataValues = useMemo(() => [0, 45, 10, 75, 30, 85, 40], []);
  const dataLabels = useMemo(
    () => ["Lun", "Mar", "Mié", "Jue", "Vie", "Sáb", "Dom"],
    []
  );

  useEffect(() => {
    if (qrCode) {
      setCountdown(QR_DURATION);
    }
  }, [qrCode]);

  useEffect(() => {
    if (!qrCode || countdown <= 0) return;

    const intervalId = setInterval(() => {
      setCountdown((prev) => prev - 1);
    }, 1000);

    return () => clearInterval(intervalId);
  }, [qrCode, countdown]);

  useEffect(() => {
    if (!user?.profile) onOpen();
    else onClose();
  }, [onClose, onOpen, user?.profile]);

  const handleCompleteProfiling = async () => {
    refetchUser();
    onClose();
    triggerAnimation();
  };

  return (
    <Flex
      flexDir={"column"}
      py={9}
      gap={4}
      w={"100%"}
      pl={{ base: 4, lg: 0 }}
      maxW={"1190px"}
      mx={"auto"}
    >
      <Heading
        as="h1"
        fontSize="24px"
        color={colors.Custom.textBlue}
        fontWeight={"black"}
      >
        ¡Bienvenido, {user?.username ?? "Sharky user"}!
      </Heading>
      <Flex
        gap={4}
        flexDir={{
          base: "column",
          lg: "column",
          xl: isSidebarCollapsed ? "row" : "column",
          "2xl": "row",
        }}
      >
        <Flex
          pr={{ base: 4, lg: 3, "2xl": 0 }}
          pl={{ base: 0, md: 0, lg: 0 }}
          pt={{ base: 0 }}
        >
          <WhatsAppConnectionCard
            qrCode={qrCode}
            isLoading={isLoading}
            countdown={countdown}
            onRefresh={refetch}
          />
        </Flex>
        <Flex
          gap={4}
          w="full"
          flexWrap={{
            base: "nowrap",
            xl: isSidebarCollapsed ? "wrap" : "nowrap",
            "2xl": "wrap",
          }}
          pr={{ base: 4, xl: 0 }}
          pt={{ base: 0 }}
          pb={{ base: 4, xl: isSidebarCollapsed ? 0 : 4 }}
          pl={{ base: 0, md: 0, lg: 0 }}
          overflow={"auto"}
          justifyContent={{ "2xl": "center" }}
        >
          <StatsCard
            title="Ventas"
            value="$120,5M"
            percentage="12%"
            color="green.500"
            trendColor="#48BB78" // Verde
            trendIcon={<TbArrowUpRight fontSize={"18px"} />}
            dataLabels={dataLabels}
            dataValues={dataValues}
          />
          <StatsCard
            title="Ventas"
            value="$12,5K"
            percentage="12%"
            color="green.500"
            trendColor="#48BB78" // Verde
            trendIcon={<TbArrowUpRight fontSize={"18px"} />}
            dataLabels={dataLabels}
            dataValues={dataValues}
          />
          <StatsCard
            title="Chats"
            value="420B"
            percentage="8%"
            color="blue.500"
            trendColor="#4299E1" // Azul
            trendIcon={<TbArrowUpRight fontSize={"18px"} />}
            dataLabels={dataLabels}
            dataValues={dataValues}
          />
          <StatsCard
            title="Conversiones"
            value="30%"
            percentage="5%"
            color="purple.500"
            trendColor="#9F7AEA" // Morado
            trendIcon={<TbArrowUpRight />}
            dataLabels={dataLabels}
            dataValues={dataValues}
          />
          <StatsCard
            title="Chats"
            value="420B"
            percentage="8%"
            color="blue.500"
            trendColor="#4299E1" // Azul
            trendIcon={<TbArrowUpRight fontSize={"18px"} />}
            dataLabels={dataLabels}
            dataValues={dataValues}
          />
          <StatsCard
            title="Conversiones"
            value="30%"
            percentage="5%"
            color="purple.500"
            trendColor="#9F7AEA" // Morado
            trendIcon={<TbArrowUpRight />}
            dataLabels={dataLabels}
            dataValues={dataValues}
          />
        </Flex>
      </Flex>

      {/* Fondo desenfocado siempre activo */}
      {(isOpen || showWelcomeAnimation) && <ModalBlurOverlay />}

      {/* Modal de Perfilamiento */}
      {isOpen && (
        <ProfilingModal isOpen={isOpen} onClose={handleCompleteProfiling} />
      )}
      {/* Animación del Mensaje de Bienvenida */}
      {showWelcomeAnimation && <WelcomeAnimation />}
    </Flex>
  );
};
