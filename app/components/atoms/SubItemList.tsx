import React from "react";
import { Flex } from "@chakra-ui/react";
import { SubItem } from "./SubItem";

interface SubItemListProps {
  subItems: string[];
  isCollapsed: boolean;
  onSubItemClick?: (subItem: string) => void;
}

export const SubItemList: React.FC<SubItemListProps> = ({
  subItems,
  isCollapsed,
  onSubItemClick,
}) => {
  return (
    <Flex flexDir="column">
      {subItems.map((subItem) => (
        <SubItem
          key={subItem}
          label={subItem}
          isCollapsed={isCollapsed}
          onClick={() => onSubItemClick?.(subItem)}
        />
      ))}
    </Flex>
  );
};
