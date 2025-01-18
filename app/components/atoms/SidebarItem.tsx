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
import { SubItemList } from "./SubItemList";
import { colors } from "~/styles/colors";

interface SidebarItemProps {
  label: string;
  icon: React.ReactNode;
  subItems?: string[];
  isCollapsed: boolean;
  isActive?: boolean;
}

export const SidebarItem = memo(
  ({ label, icon, subItems, isCollapsed, isActive }: SidebarItemProps) => {
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
                      fontWeight={"bold"}
                      color={isActive ? colors.Blue[500] : colors.Slate[600]}
                    >
                      {label}
                    </Text>
                  )}
                </Flex>
                {!isCollapsed && subItems && <AccordionIcon />}
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
