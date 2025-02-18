import { Flex } from "@chakra-ui/react";
import { SubItem } from "~/components/atoms/navigation/SubItem";

interface SubItemListProps {
  subItems: string[];
  isCollapsed: boolean;
  onSubItemClick?: (subItem: string) => void;
}

export const SubItemList = ({
  subItems,
  isCollapsed,
  onSubItemClick,
}: SubItemListProps) => {
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
