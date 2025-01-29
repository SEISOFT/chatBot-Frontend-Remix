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

export const Navbar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { logout } = useAuth();
  const { toggleSidebar } = useNavigation();
  const isMobile = useBreakpointValue({ base: true, lg: false });

  const navbarItems = [
    {
      label: "Mi Perfil",
      icon: <TbUser fontSize={"20px"} fontWeight={"bold"} />,
      path: "/dashboard/my-profile",
    },
    {
      label: "Mi Subscripción",
      icon: <TbCreditCard fontSize={"20px"} fontWeight={"bold"} />,
      path: "/dashboard/account",
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
      bg="white"
      boxShadow="sm"
      justifyContent="space-between"
      alignItems="center"
      py={2}
      px={3}
      maxH="60px"
    >
      <Flex gap={4}>
        <IconButton
          colorScheme="transparent"
          color={colors.Slate[600]}
          aria-label="Toggle Sidebar"
          fontSize="24px"
          icon={<TbMenu2 />}
          onClick={toggleSidebar}
        />
        {isMobile && <SharkyBanner isCollapsed={false} />}
      </Flex>

      <Menu isLazy>
        <MenuButton>
          <AvatarCircle />
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
