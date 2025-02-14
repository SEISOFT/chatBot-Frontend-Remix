import React, { useMemo } from "react";
import {
  Accordion,
  Flex,
  IconButton,
  useBreakpointValue,
} from "@chakra-ui/react";
import {
  TbChevronLeft,
  TbChevronRight,
  TbHome2,
  TbUsersGroup,
} from "react-icons/tb";
import { useLocation } from "react-router";
import { SharkyBanner } from "~/components/molecules/SharkyBanner";
import { useNavigation } from "~/hooks/useNavigation";
import { SidebarItem } from "~/components/molecules/navigation/SidebarItem";
import { colors } from "~/styles/colors";

//
// 2.1. Definición del tipo para los items del Sidebar
//
interface SidebarItemConfig {
  label: string;
  icon: React.ReactElement;
  path: string;
  subItems?: string[];
}

//
// 2.2. Configuración estática de los items del Sidebar
//
const SIDEBAR_ITEMS: SidebarItemConfig[] = [
  { label: "Inicio", icon: <TbHome2 fontSize="20px" />, path: "/dashboard" },
  {
    label: "Comunidad",
    icon: <TbUsersGroup fontSize="20px" />,
    subItems: ["Foros", "Eventos"],
    path: "/community",
  },
];

//
// 2.3. Componente Sidebar
//
export const Sidebar: React.FC = () => {
  const location = useLocation();
  const {
    isSidebarCollapsed,
    toggleSidebar,
    isHovered,
    handleSidebarMouseEnter,
    handleSidebarMouseLeave,
  } = useNavigation();
  const isMobile = useBreakpointValue({ base: true, lg: false });

  // El sidebar se considera “realmente colapsado” cuando:
  //  - Está colapsado globalmente
  //  - No se está haciendo hover
  //  - Y la vista no es mobile
  const isCurrentlyCollapsed = useMemo(
    () => isSidebarCollapsed && !isHovered && !isMobile,
    [isSidebarCollapsed, isHovered, isMobile]
  );

  // Dimensiones según la vista
  const expandedWidth = useMemo(
    () => (isMobile ? "314px" : "232px"),
    [isMobile]
  );
  const collapsedWidth = "50px";

  // Cálculo del ancho y padding del sidebar
  const sidebarWidth = useMemo(() => {
    if (isSidebarCollapsed && !isMobile) {
      return isHovered ? expandedWidth : collapsedWidth;
    }
    return expandedWidth;
  }, [isSidebarCollapsed, isMobile, isHovered, expandedWidth]);

  const sidebarPaddingX = useMemo(() => {
    if (isSidebarCollapsed && !isMobile) {
      return isHovered ? 2 : 0;
    }
    return 2;
  }, [isSidebarCollapsed, isMobile, isHovered]);

  return (
    <Flex
      as="nav"
      position="fixed"
      top={{ base: "unset", lg: "3" }}
      left={{ base: "0", lg: "3" }}
      w={sidebarWidth}
      zIndex={999}
      boxShadow="sm"
      flexDir="column"
      h={isMobile ? "calc(100vh - 60px)" : "calc(100vh - 24px)"}
      px={sidebarPaddingX}
      py={2}
      transition="width 0.4s, padding 0.4s"
      bg="white"
      display={isMobile && isSidebarCollapsed ? "none" : "block"}
      border={`1px solid ${colors.Gray[100]}`}
      borderTop={{ base: 0, lg: `1px solid ${colors.Gray[100]}` }}
      borderRadius={{ base: 0, lg: "xl" }}
      // Eventos para activar/desactivar el efecto hover (solo en desktop)
      onMouseEnter={() => {
        if (isSidebarCollapsed && !isMobile) {
          handleSidebarMouseEnter();
        }
      }}
      onMouseLeave={() => {
        if (isSidebarCollapsed && !isMobile) {
          handleSidebarMouseLeave();
        }
      }}
    >
      <Flex flexDir="column" gap={6} justifyContent="start" w="full">
        {/* Sidebar Header */}
        {!isMobile && <SharkyBanner isCollapsed={isCurrentlyCollapsed} />}

        {/* Sidebar Items */}
        <Accordion
          allowToggle
          display="flex"
          flexDir="column"
          alignItems={isCurrentlyCollapsed ? "center" : "flex-start"}
          width="100%"
          gap={1}
        >
          {SIDEBAR_ITEMS.map((item) => (
            <SidebarItem
              key={item.label}
              path={item.path}
              label={item.label}
              icon={item.icon}
              subItems={item.subItems}
              isCollapsed={isCurrentlyCollapsed}
              isActive={location.pathname === item.path}
            />
          ))}
        </Accordion>
      </Flex>

      {/* Botón para togglear el sidebar (solo en desktop) */}
      {!isMobile && (
        <IconButton
          aria-label="Toggle Sidebar"
          onClick={toggleSidebar}
          bg="#fff"
          borderRadius="50%"
          position="absolute"
          top="44px"
          right="-12px"
          w={6}
          h={6}
          _hover={{ bg: "auto" }}
          boxShadow="-1px -1px 10px 0px rgba(100, 100, 100, 0.16)"
        >
          {isCurrentlyCollapsed ? <TbChevronRight /> : <TbChevronLeft />}
        </IconButton>
      )}
    </Flex>
  );
};
