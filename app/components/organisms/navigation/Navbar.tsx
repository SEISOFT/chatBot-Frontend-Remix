import {
  Flex,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  Box,
  Divider,
  IconButton,
  useBreakpointValue,
  Text,
} from "@chakra-ui/react";
import { useLocation, useNavigate } from "react-router";
import { TbLogout, TbUser, TbCreditCard, TbMenu2 } from "react-icons/tb";
import { AvatarBanner } from "~/components/molecules/AvatarBanner";
import { AvatarCircle } from "~/components/atoms/AvatarCircle";
import { colors } from "~/styles/colors";
import { useAuth } from "~/hooks/useAuth";
import { useNavigation } from "~/hooks/useNavigation";
import { SharkyBanner } from "~/components/molecules/SharkyBanner";
import { useUser } from "~/hooks/useUser";

export const Navbar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { user } = useUser();
  const { logout } = useAuth();
  const isMobile = useBreakpointValue({ base: true, lg: false });
  const { isSidebarCollapsed, toggleSidebar } = useNavigation();
  const getSidebarWidth = (): string => {
    if (isSidebarCollapsed) return "86px";
    if (isMobile) return "314px";
    return "264px";
  };
  const sidebarWidth = getSidebarWidth();
  const navbarItems = [
    {
      label: "Perfil",
      icon: <TbUser fontSize={"20px"} fontWeight={"bold"} />,
      path: "/dashboard/perfil",
    },
    {
      label: "Facturación",
      icon: <TbCreditCard fontSize={"20px"} fontWeight={"bold"} />,
      path: "/dashboard/facturacion",
    },
    {
      label: "Cerrar Sesión",
      icon: <TbLogout fontSize={"20px"} fontWeight={"bold"} />,
      action: () => {
        logout();
        navigate("/login");
      },
    },
  ];

  return (
    <Flex
      bg={"white"}
      as="header"
      position="fixed"
      top={{ base: 0, lg: 2 }}
      left={isMobile ? "0" : sidebarWidth} // Si es móvil, ocupa to do el ancho
      width={isMobile ? "100%" : `calc(100% - ${sidebarWidth} - 8px)`}
      height={"60px"}
      zIndex={1000}
      border={`2px solid ${colors.Gray[100]}`}
      borderRadius={{ base: "0", lg: "2xl" }}
      justifyContent={{ base: "space-between", lg: "flex-end" }}
      alignItems="center"
      py={2}
      px={3}
      maxH="60px"
    >
      {isMobile && (
        <Flex gap={4}>
          <IconButton
            colorScheme="transparent"
            color={colors.Slate[600]}
            aria-label="Toggle Sidebar"
            fontSize="24px"
            icon={<TbMenu2 />}
            onClick={toggleSidebar}
          />
          <SharkyBanner isCollapsed={true} />
        </Flex>
      )}

      <Menu isLazy>
        <MenuButton>
          <AvatarCircle name={user?.username as string} />
        </MenuButton>
        <MenuList>
          <AvatarBanner />
          <Divider />
          <Box>
            {navbarItems.map((item) => {
              const isActive =
                item.path && location.pathname.startsWith(item.path);

              return (
                <MenuItem
                  key={item.label}
                  icon={item.icon}
                  bg={isActive ? colors.Sky[100] : "white"}
                  borderRadius={"xl"}
                  color={isActive ? colors.Blue[500] : colors.Slate[600]}
                  fontWeight={"bold"}
                  onClick={() => {
                    if (item.action) {
                      item.action();
                    } else if (item.path) {
                      navigate(item.path);
                    }
                  }}
                >
                  <Text pt={1}>{item.label}</Text>
                </MenuItem>
              );
            })}
          </Box>
        </MenuList>
      </Menu>
    </Flex>
  );
};
