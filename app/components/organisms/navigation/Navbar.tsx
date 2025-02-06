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
    if (isSidebarCollapsed) return "90px";
    if (isMobile) return "314px";
    return "272px";
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
      top={{ base: 0, lg: 3 }}
      left={isMobile ? "0" : sidebarWidth} // Si es móvil, ocupa to do el ancho
      width={isMobile ? "100%" : `calc(100% - ${sidebarWidth} - 12px)`}
      height={{ base: "54px", lg: "54px" }}
      zIndex={1000}
      border={`1px solid ${colors.Gray[100]}`}
      borderRadius={{ base: "0", lg: "2xl" }}
      justifyContent={{ base: "space-between", lg: "flex-end" }}
      alignItems="center"
      py={2}
      px={3}
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
          <Flex flexDir={"column"} gap={1}>
            {navbarItems.map((item, index) => {
              const isActive =
                item.path && location.pathname.startsWith(item.path);
              const isLast = index === navbarItems.length - 1;

              return (
                <MenuItem
                  key={item.label}
                  icon={item.icon}
                  borderRadius="xl"
                  p={2}
                  maxH={"36px"}
                  color={isActive ? colors.Blue[500] : colors.Slate[600]}
                  fontWeight="bold"
                  bg={isActive ? colors.Sky[100] : "white"}
                  mt={isLast ? 4 : 0}
                  _hover={
                    isLast
                      ? { bg: "red.100" } // Ejemplo: hover distinto en el último item
                      : { bg: colors.Sky[100] }
                  }
                  onClick={() => {
                    if (item.action) {
                      item.action();
                    } else if (item.path) {
                      navigate(item.path);
                    }
                  }}
                >
                  <Text pt={1}    fontSize={{base: "14px", lg:"16px"}}>{item.label}</Text>
                </MenuItem>
              );
            })}
          </Flex>
        </MenuList>
      </Menu>
    </Flex>
  );
};
