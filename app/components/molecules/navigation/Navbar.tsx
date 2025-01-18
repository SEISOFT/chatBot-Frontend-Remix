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
} from "@chakra-ui/react";
import { useNavigate } from "@remix-run/react";
import { TbLogout, TbUser, TbCreditCard, TbMenu2 } from "react-icons/tb";
import { AvatarBanner } from "../../atoms/AvatarBanner";
import { AvatarCircle } from "../../atoms/AvatarCircle";
import { colors } from "~/styles/colors";
import { SharkyBanner } from "../../atoms/SharkyBanner";
import { useAuth } from "~/hooks/useAuth";
import { useNavigation } from "~/hooks/useNavigation";

export const Navbar: React.FC = () => {
  const navigate = useNavigate();
  const { logout } = useAuth();
  const { toggleSidebar } = useNavigation();
  const isMobile = useBreakpointValue({ base: true, lg: false });

  const navbarItems = [
    {
      label: "Mi Perfil",
      icon: <TbUser fontSize={"20px"} fontWeight={"bold"} />,
      path: "/dashboard",
    },
    {
      label: "Mi Subscripción",
      icon: <TbCreditCard fontSize={"20px"} fontWeight={"bold"} />,
      path: "/dashboard",
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
      boxShadow="sm"
      justifyContent={"space-between"}
      alignItems={"center"}
      py={2}
      px={3}
      maxH={"60px"}
    >
      <Flex gap={4}>
        <IconButton
          colorScheme="transparent"
          color={colors.Slate[600]}
          aria-label="Toggle Sidebar"
          fontSize={"24px"}
          icon={<TbMenu2 />}
          onClick={toggleSidebar} // Llama a toggleSidebar del contexto
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
            {navbarItems.map((item) => (
              <MenuItem
                icon={item.icon}
                key={item.label}
                onClick={() => {
                  if (item.action) {
                    item.action();
                  } else if (item.path) {
                    navigate(item.path);
                  }
                }}
              >
                {item.label}
              </MenuItem>
            ))}
          </Box>
        </MenuList>
      </Menu>
    </Flex>
  );
};
