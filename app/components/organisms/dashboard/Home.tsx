import { Heading, Flex, useDisclosure } from "@chakra-ui/react";
import { useQRCode } from "~/hooks/useQRCode";
import { useUser } from "~/hooks/useUser";
import { ProfilingModal } from "~/components/molecules/profiling/ProfilingModal";
import { useWelcomeAnimation } from "~/hooks/profiling/useWelcomeAnimation";
import { useEffect, useState } from "react";
import { useNavigation } from "~/hooks/useNavigation";
import { colors } from "~/styles/colors";
import { WhatsAppConnectionCard } from "~/components/molecules/dashboard/WhatsAppConnectionCard";
import { StatsCards } from "~/components/molecules/dashboard/StatsCards";
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
  const statsData = [
    { label: "Chats Atendidos", value: 420 },
    { label: "Ventas", value: 57 },
    { label: "Conversiones", value: 30 },
    { label: "Tickets Abiertos", value: 12 },
  ];
  const dataLabels = ["Lun", "Mar", "Mié", "Jue", "Vie", "Sáb", "Dom"];
  const dataValues = [30, 45, 28, 50, 60, 55, 70];
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
      px={4}
      gap={4}
      w={"100%"}
      maxW={"1440px"}
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
          xl: isSidebarCollapsed ? "row" : "column",
          "2xl": "row",
        }}
      >
        <WhatsAppConnectionCard
          qrCode={qrCode}
          isLoading={isLoading}
          countdown={countdown}
          onRefresh={refetch}
        />
        <StatsCards
          statsData={statsData}
          isSidebarCollapsed={isSidebarCollapsed}
        />
      </Flex>
      <Flex gap={4} w="full" justify="space-between" flexWrap="wrap">
        <StatsCard
          title="Ventas Semanales"
          value="$12,500"
          percentage="+12%"
          color="green.500"
          trendColor="#48BB78" // Verde
          trendIcon={<TbArrowUpRight />}
          dataLabels={dataLabels}
          dataValues={dataValues}
        />
      </Flex>
      <Flex
        gap={4}
        flexDir={{
          base: "column",
          xl: isSidebarCollapsed ? "row" : "column",
          "2xl": "row",
        }}
      >
        <WhatsAppConnectionCard
          qrCode={qrCode}
          isLoading={isLoading}
          countdown={countdown}
          onRefresh={refetch}
        />
        <StatsCards
          statsData={statsData}
          isSidebarCollapsed={isSidebarCollapsed}
        />
      </Flex>
      <Flex
        gap={4}
        flexDir={{
          base: "column",
          xl: isSidebarCollapsed ? "row" : "column",
          "2xl": "row",
        }}
      >
        <WhatsAppConnectionCard
          qrCode={qrCode}
          isLoading={isLoading}
          countdown={countdown}
          onRefresh={refetch}
        />
        <StatsCards
          statsData={statsData}
          isSidebarCollapsed={isSidebarCollapsed}
        />
      </Flex>
      <Flex
        gap={4}
        flexDir={{
          base: "column",
          xl: isSidebarCollapsed ? "row" : "column",
          "2xl": "row",
        }}
      >
        <WhatsAppConnectionCard
          qrCode={qrCode}
          isLoading={isLoading}
          countdown={countdown}
          onRefresh={refetch}
        />
        <StatsCards
          statsData={statsData}
          isSidebarCollapsed={isSidebarCollapsed}
        />
      </Flex>
      <Flex
        gap={4}
        flexDir={{
          base: "column",
          xl: isSidebarCollapsed ? "row" : "column",
          "2xl": "row",
        }}
      >
        <WhatsAppConnectionCard
          qrCode={qrCode}
          isLoading={isLoading}
          countdown={countdown}
          onRefresh={refetch}
        />
        <StatsCards
          statsData={statsData}
          isSidebarCollapsed={isSidebarCollapsed}
        />
      </Flex>
      <Flex
        gap={4}
        flexDir={{
          base: "column",
          xl: isSidebarCollapsed ? "row" : "column",
          "2xl": "row",
        }}
      >
        <WhatsAppConnectionCard
          qrCode={qrCode}
          isLoading={isLoading}
          countdown={countdown}
          onRefresh={refetch}
        />
        <StatsCards
          statsData={statsData}
          isSidebarCollapsed={isSidebarCollapsed}
        />
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
