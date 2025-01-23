import {
  Accordion,
  calc,
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

const sidebarItems = [
  { label: "Inicio", icon: <TbHome2 />, path: "/dashboard" },
  {
    label: "Comunidad",
    icon: <TbUsersGroup />,
    subItems: ["Foros", "Eventos"],
    path: "/community",
  },
];

export const Sidebar = () => {
  const location = useLocation();
  const { isSidebarCollapsed, toggleSidebar } = useNavigation();
  const isMobile = useBreakpointValue({ base: true, lg: false });
  const getSidebarWidth = (): string => {
    if (isSidebarCollapsed) return "70px";
    if (isMobile) return "314px";
    return "248px";
  };
  const sidebarWidth = getSidebarWidth();
  return (
    <Flex
      flexDir={"column"}
      h={isMobile ? "calc(100vh - 60px)" : "100vh"}
      px={4}
      py={2}
      mt={isMobile ? "0" : "-60px"}
      w={sidebarWidth}
      maxW={"314px"}
      transition="width 0.4s"
      bg="white"
      display={isMobile && isSidebarCollapsed ? "none" : "block"}
      position={isMobile ? "fixed" : "sticky"}
      top={isMobile ? "60px" : 0}
      zIndex={1000}
      boxShadow="sm"
    >
      <Flex
        flexDir={"column"}
        gap={12}
        overflow={"hidden"}
        h={isMobile ? "100%" : calc("100% - 220px").toString()}
      >
        {/* Sidebar Header */}
        {!isMobile && <SharkyBanner isCollapsed={isSidebarCollapsed} />}

        {/* Sidebar Items */}
        <Accordion
          allowToggle
          display={"flex"}
          flexDir={"column"}
          width={isSidebarCollapsed ? "36px" : "auto"}
        >
          {sidebarItems.map((item) => (
            <SidebarItem
              key={item.label}
              label={item.label}
              icon={item.icon}
              subItems={item.subItems}
              isCollapsed={isSidebarCollapsed}
              isActive={location.pathname === item.path}
            />
          ))}
        </Accordion>
      </Flex>

      {/* Toggle Button */}
      {!isMobile && (
        <IconButton
          aria-label="Toggle Sidebar"
          onClick={toggleSidebar}
          bg={"#fff"}
          borderRadius={"50%"}
          position={"absolute"}
          top={"56px"}
          right={"-16px"}
          w={8}
          h={8}
          _hover={{ bg: "auto" }}
          _active={{
            bg: "neutral.100",
            boxShadow: "-1px -1px 10px 0px rgba(100, 100, 100, 0.16)",
          }}
          boxShadow="-1px -1px 10px 0px rgba(100, 100, 100, 0.16)"
        >
          {isSidebarCollapsed ? <TbChevronRight /> : <TbChevronLeft />}
        </IconButton>
      )}
    </Flex>
  );
};
