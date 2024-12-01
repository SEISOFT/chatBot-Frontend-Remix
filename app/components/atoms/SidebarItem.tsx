import React from "react";
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
import { SubItem } from "./SubItem";
import { colors } from "~/styles/colors";

interface SidebarItemProps {
  label: string;
  icon: React.ReactNode;
  subItems?: string[];
  isCollapsed: boolean;
  isActive?: boolean;
}

export const SidebarItem: React.FC<SidebarItemProps> = ({
  label,
  icon,
  subItems,
  isCollapsed,
  isActive,
}) => {
  return (
    <AccordionItem border="none">
      <Popover placement="right-start" trigger="hover">
        <PopoverTrigger>
          <AccordionButton
            p={2}
            bg={isActive ? colors.Sky[100] : "white"}
            borderRadius="md"
            _hover={{ bg: colors.Slate[100] }}
          >
            {/* extraer componente */}
            <Flex align="center" justify="space-between" w="full">
              <Flex align="center" gap={2}>
                <Box
                  fontSize={"20px"}
                  color={isActive ? colors.Blue[500] : colors.Slate[600]}
                >
                  {icon}
                </Box>
                {!isCollapsed && (
                  <Text
                    fontSize="14px"
                    h={"20px"}
                    fontWeight={"bold"} // Resaltar texto activo
                    color={isActive ? colors.Blue[500] : colors.Slate[600]}
                  >
                    {label}
                  </Text>
                )}
              </Flex>
              {!isCollapsed && subItems && <AccordionIcon />}
            </Flex>
            {/*  */}
          </AccordionButton>
        </PopoverTrigger>

        {isCollapsed && (
          <PopoverContent bg={"white"} boxShadow={"md"} w={"max-content"}>
            <PopoverArrow />
            {/* extraer componente */}
            <Flex flexDir="column">
              <Text
                fontSize="md"
                fontWeight="bold"
                borderBottom="1px solid #e2e8f0"
                py={2}
                px={2}
              >
                {label}
              </Text>
              {subItems &&
                subItems.map((subItem, index) => (
                  <SubItem
                    isCollapsed={true}
                    key={index}
                    label={subItem}
                    onClick={() => console.log(`Clicked ${subItem}`)}
                  />
                ))}
            </Flex>
            {/*  */}
          </PopoverContent>
        )}
      </Popover>

      {subItems && !isCollapsed && (
        <AccordionPanel p={0}>
          <Flex flexDir="column">
            {subItems.map((subItem, index) => (
              <SubItem
                key={index}
                label={subItem}
                onClick={() => console.log(`Clicked ${subItem}`)}
              />
            ))}
          </Flex>
        </AccordionPanel>
      )}
    </AccordionItem>
  );
};
