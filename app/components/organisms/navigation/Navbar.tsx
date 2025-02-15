import React, { useMemo } from "react";
import {
  Flex,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  Divider,
  IconButton,
  useBreakpointValue,
  Text,
} from "@chakra-ui/react";
import { useLocation, useNavigate } from "react-router";
import { TbLogout, TbUser, TbCreditCard, TbMenu2 } from "react-icons/tb";
import { AvatarBanner } from "~/components/molecules/AvatarBanner";
import { AvatarCircle } from "~/components/atoms/AvatarCircle";
import { SharkyBanner } from "~/components/molecules/SharkyBanner";
import { colors } from "~/styles/colors";
import { useAuth } from "~/hooks/useAuth";
import { useNavigation } from "~/hooks/useNavigation";
import { useUser } from "~/hooks/useUser";

interface NavbarItem {
  label: string;
  icon: React.ReactElement;
  path?: string;
  action?: () => void;
}

const NAVBAR_ITEMS: NavbarItem[] = [
  {
    label: "Perfil",
    icon: <TbUser fontSize="20px" fontWeight="bold" />,
    path: "/dashboard/perfil",
  },
  {
    label: "Facturación",
    icon: <TbCreditCard fontSize="20px" fontWeight="bold" />,
    path: "/dashboard/facturacion",
  },
  {
    label: "Cerrar Sesión",
    icon: <TbLogout fontSize="20px" fontWeight="bold" />,
  },
];

export const Navbar: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { user } = useUser();
  const { logout } = useAuth();
  const isMobile = useBreakpointValue({ base: true, lg: false });
  const { isSidebarCollapsed, toggleSidebar, isHovered } = useNavigation();

  // Cálculo del ancho del sidebar, usado para determinar el ancho del Navbar (en vista desktop)
  const sidebarWidth = useMemo(() => {
    if (isSidebarCollapsed && !isHovered) return "74px";
    if (isMobile) return "314px";
    return "256px";
  }, [isSidebarCollapsed, isHovered, isMobile]);

  // Completa la acción para "Cerrar Sesión"
  const navbarItems: NavbarItem[] = useMemo(
    () =>
      NAVBAR_ITEMS.map((item) =>
        item.label === "Cerrar Sesión"
          ? {
              ...item,
              action: () => {
                logout();
                navigate("/login");
              },
            }
          : item
      ),
    [logout, navigate]
  );

  const handleNavbarItemClick = (item: NavbarItem) => {
    if (item.action) {
      item.action();
    } else if (item.path) {
      navigate(item.path);
    }
  };

  return (
    <Flex
      transition="width 0.4s"
      bg="white"
      as="header"
      position="fixed"
      top={{ base: 0, lg: 3 }}
      right={{ base: 0, lg: 3 }}
      width={isMobile ? "100%" : `calc(100% - ${sidebarWidth} - 12px)`}
      height="48px"
      zIndex={1000}
      border={`1px solid ${colors.Gray[100]}`}
      borderRadius={{ base: "0", lg: "xl" }}
      justifyContent={{ base: "space-between", lg: "flex-end" }}
      alignItems="center"
      py={2}
      px={3}
    >
      {isMobile && (
        <Flex gap={4} align="center">
          <IconButton
            aria-label="Toggle Sidebar"
            variant="ghost"
            color={colors.Slate[600]}
            fontSize="24px"
            icon={<TbMenu2 />}
            onClick={toggleSidebar}
          />
          <SharkyBanner isCollapsed={false} />
        </Flex>
      )}

      <Menu isLazy>
        <MenuButton>
          <AvatarCircle name={user?.username ?? "Usuario"} />
        </MenuButton>
        <MenuList>
          <AvatarBanner />
          <Divider />
          <Flex flexDir="column" gap={1}>
            {navbarItems.map((item, index) => {
              const isActive = item.path
                ? location.pathname.startsWith(item.path)
                : false;
              const isLast = index === navbarItems.length - 1;

              return (
                <MenuItem
                  key={item.label}
                  icon={item.icon}
                  borderRadius="xl"
                  p={2}
                  maxH="36px"
                  color={isActive ? colors.Blue[500] : colors.Slate[800]}
                  fontWeight="bold"
                  bg={isActive ? colors.Sky[100] : "white"}
                  mt={isLast ? 4 : 0}
                  _hover={isLast ? { bg: "red.100" } : { bg: colors.Sky[100] }}
                  onClick={() => handleNavbarItemClick(item)}
                >
                  <Text pt={1} fontSize={{ base: "14px", lg: "16px" }}>
                    {item.label}
                  </Text>
                </MenuItem>
              );
            })}
          </Flex>
        </MenuList>
      </Menu>
    </Flex>
  );
};
