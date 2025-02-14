import { Flex, useDisclosure } from "@chakra-ui/react";
import { useQRCode } from "~/hooks/useQRCode";
import { useUser } from "~/hooks/useUser";
import { ProfilingModal } from "~/components/molecules/profiling/ProfilingModal";
import { useWelcomeAnimation } from "~/hooks/profiling/useWelcomeAnimation";
import { useEffect, useMemo, useState } from "react";
import { WhatsAppConnectionCard } from "~/components/molecules/dashboard/WhatsAppConnectionCard";
import { ModalBlurOverlay } from "~/components/atoms/profiling/ModalBlurOverlay";
import { WelcomeAnimation } from "~/components/atoms/profiling/WelcomeAnimation";
import { StatsCard } from "~/components/molecules/dashboard/StatsCard";
import { TbArrowDownRight, TbArrowRight, TbArrowUpRight } from "react-icons/tb";
import { ResumeCard } from "~/components/molecules/dashboard/ResumeCard";
import MarqueeSwiper from "~/components/molecules/dashboard/Marquee";

export const Dashboard = () => {
  const { user, refetchUser } = useUser();
  const { qrCode, isLoading, refetch } = useQRCode();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { showWelcomeAnimation, triggerAnimation } = useWelcomeAnimation();
  const [countdown, setCountdown] = useState(0);
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
      transition="width 0.4s"
      py={6}
      gap={3}
      w={"100%"}
      pl={{ base: 4, lg: 0 }}
      mx={"auto"}
    >
      <MarqueeSwiper>
        <StatsCard
          title="Ventas"
          value="$120,5M"
          percentage="12%"
          color="#4ade80"
          trendColor="#4ade80"
          trendIcon={<TbArrowUpRight fontSize="18px" />}
          dataLabels={dataLabels}
          dataValues={dataValues}
        />
        <StatsCard
          title="Chats"
          value="420B"
          percentage="8%"
          color="#de4a4a"
          trendColor="#de4a4a"
          trendIcon={<TbArrowDownRight fontSize="18px" />}
          dataLabels={dataLabels}
          dataValues={dataValues}
        />
        <StatsCard
          title="Conversiones"
          value="30%"
          percentage="0%"
          color="#F5A524"
          trendColor="#F5A524"
          trendIcon={<TbArrowRight fontSize="18px" />}
          dataLabels={dataLabels}
          dataValues={dataValues}
        />
        <StatsCard
          title="Ventas"
          value="$120,5M"
          percentage="12%"
          color="#4ade80"
          trendColor="#4ade80"
          trendIcon={<TbArrowUpRight fontSize="18px" />}
          dataLabels={dataLabels}
          dataValues={dataValues}
        />
        <StatsCard
          title="Chats"
          value="420B"
          percentage="8%"
          color="#de4a4a"
          trendColor="#de4a4a"
          trendIcon={<TbArrowDownRight fontSize="18px" />}
          dataLabels={dataLabels}
          dataValues={dataValues}
        />
        <StatsCard
          title="Conversiones"
          value="30%"
          percentage="0%"
          color="#F5A524"
          trendColor="#F5A524"
          trendIcon={<TbArrowRight fontSize="18px" />}
          dataLabels={dataLabels}
          dataValues={dataValues}
        />
        <StatsCard
          title="Ventas"
          value="$120,5M"
          percentage="12%"
          color="#4ade80"
          trendColor="#4ade80"
          trendIcon={<TbArrowUpRight fontSize="18px" />}
          dataLabels={dataLabels}
          dataValues={dataValues}
        />
        <StatsCard
          title="Chats"
          value="420B"
          percentage="8%"
          color="#de4a4a"
          trendColor="#de4a4a"
          trendIcon={<TbArrowDownRight fontSize="18px" />}
          dataLabels={dataLabels}
          dataValues={dataValues}
        />
        <StatsCard
          title="Conversiones"
          value="30%"
          percentage="0%"
          color="#F5A524"
          trendColor="#F5A524"
          trendIcon={<TbArrowRight fontSize="18px" />}
          dataLabels={dataLabels}
          dataValues={dataValues}
        />
      </MarqueeSwiper>
      <Flex flexDir={{ base: "column", xl: "row" }} gap={3} pr={{ base: 4, lg: 3, "2xl": 3 }}>
        <Flex w={"100%"}>
          <ResumeCard />
        </Flex>
        <Flex w={"100%"}>
          <WhatsAppConnectionCard
            qrCode={qrCode}
            isLoading={isLoading}
            countdown={countdown}
            onRefresh={refetch}
          />
        </Flex>
      </Flex>
      <Flex pr={{ base: 4, lg: 3, "2xl": 0 }}></Flex>

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
