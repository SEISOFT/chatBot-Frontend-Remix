import React, { memo } from "react";
import {
  AccordionButton,
  AccordionIcon,
  AccordionItem,
  AccordionPanel,
  Box,
  Flex,
  Popover,
  PopoverArrow,
  PopoverContent,
  PopoverTrigger,
  Text,
} from "@chakra-ui/react";
import { colors } from "~/styles/colors";
import { SubItemList } from "../../molecules/navigation/SubItemList";
import { useNavigate } from "react-router";
import { useNavigation } from "~/hooks/useNavigation";

interface SidebarItemProps {
  label: string;
  icon: React.ReactNode;
  subItems?: string[];
  isCollapsed: boolean;
  isActive?: boolean;
  path: string;
}

export const SidebarItem = memo(
  ({
    label,
    path,
    icon,
    subItems,
    isCollapsed,
    isActive,
  }: SidebarItemProps) => {
    const navigate = useNavigate();
    const { isHovered, isSidebarCollapsed } = useNavigation();

    const getWidth = () => {
      if (isHovered) return "full";
      return isSidebarCollapsed ? "auto" : "full";
    };

    return (
      <AccordionItem border="none" w={getWidth()}>
        <Popover placement="right-start" trigger="hover">
          <PopoverTrigger>
            <AccordionButton
              p={2}
              bg={isActive ? colors.Sky[100] : "white"}
              borderRadius="xl"
              _hover={{ bg: colors.Slate[100] }}
              maxH={"36px"}
            >
              <Flex align="center" justify="space-between" w="full">
                <Flex align="center" gap={2}>
                  <Box
                    fontSize={"20px"}
                    color={isActive ? colors.Blue[500] : colors.Slate[800]}
                    onClick={() => {
                      navigate(path);
                    }}
                  >
                    {icon}
                  </Box>
                  {!isCollapsed && (
                    <Text
                      fontSize={{ base: "14px", lg: "16px" }}
                      h={"20px"}
                      fontWeight={"bold"}
                      color={isActive ? colors.Blue[500] : colors.Slate[800]}
                      onClick={() => {
                        navigate(path);
                      }}
                    >
                      {label}
                    </Text>
                  )}
                </Flex>
                {!isCollapsed && subItems && <AccordionIcon mt={1} />}
              </Flex>
            </AccordionButton>
          </PopoverTrigger>

          {isCollapsed && subItems && (
            <PopoverContent bg={"white"} boxShadow={"md"} w={"max-content"}>
              <PopoverArrow />
              <SubItemList
                subItems={subItems}
                isCollapsed={true}
                onSubItemClick={(subItem) => console.log(`Clicked ${subItem}`)}
              />
            </PopoverContent>
          )}
        </Popover>

        {subItems && !isCollapsed && (
          <AccordionPanel p={0}>
            <SubItemList
              subItems={subItems}
              isCollapsed={false}
              onSubItemClick={(subItem) => console.log(`Clicked ${subItem}`)}
            />
          </AccordionPanel>
        )}
      </AccordionItem>
    );
  }
);
SidebarItem.displayName = "SidebarItem";
