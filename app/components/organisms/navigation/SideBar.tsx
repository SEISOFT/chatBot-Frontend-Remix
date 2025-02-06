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

const sidebarItems = [
  { label: "Inicio", icon: <TbHome2 fontSize={"20px"} />, path: "/dashboard" },
  {
    label: "Comunidad",
    icon: <TbUsersGroup fontSize={"20px"} />,
    subItems: ["Foros", "Eventos"],
    path: "/community",
  },
];

export const Sidebar = () => {
  const location = useLocation();
  const { isSidebarCollapsed, toggleSidebar } = useNavigation();
  const isMobile = useBreakpointValue({ base: true, lg: false });
  const getSidebarWidth = (): string => {
    if (isSidebarCollapsed) return "66px";
    if (isMobile) return "314px";
    return "248px";
  };
  const sidebarWidth = getSidebarWidth();
  return (
    <Flex
      as="nav"
      position="fixed"
      top={{ base: "unset", lg: "3" }}
      left={{ base: "0", lg: "3" }}
      width={sidebarWidth}
      zIndex={999}
      boxShadow="sm"
      flexDir={"column"}
      h={isMobile ? "calc(100vh - 60px)" : "calc(100vh - 24px)"}
      px={isSidebarCollapsed ? 2 : 4}
      py={2}
      w={sidebarWidth}
      maxW={"314px"}
      transition="width 0.4s"
      bg="white"
      display={isMobile && isSidebarCollapsed ? "none" : "block"}
      border={`1px solid ${colors.Gray[100]}`}
      borderTop={{base:0, lg:`1px solid ${colors.Gray[100]}`}}
      borderRadius={{ base: 0, lg: "2xl" }}
    >
      <Flex
        flexDir={"column"}
        gap={6}
        justifyContent={"start"}
      
      >
        {/* Sidebar Header */}
        {!isMobile && <SharkyBanner isCollapsed={isSidebarCollapsed} />}

        {/* Sidebar Items */}
        <Accordion
          allowToggle
          display={"flex"}
          flexDir={"column"}
          alignItems={isSidebarCollapsed ? "center" : "normal"}
          width={"auto"}
          gap={1}
        >
          {sidebarItems.map((item) => (
            <SidebarItem
              path={item.path}
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
          top={"40px"}
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
