import React from "react";
import { Text } from "@chakra-ui/react";
import { colors } from "~/styles/colors";

interface SubItemProps {
  label: string;
  isCollapsed?: boolean;
  onClick?: () => void;
}

export const SubItem: React.FC<SubItemProps> = ({
  label,
  onClick,
  isCollapsed,
}) => {
  return (
    <Text
      py={2}
      pl={isCollapsed ? 2 : 9}
      borderRadius="md"
      fontSize="sm"
      color={colors.Slate[600]}
      _hover={{ color: colors.Blue[500], cursor: "pointer", bg: colors.Slate[100] }}
      onClick={onClick}
    >
      {label}
    </Text>
  );
};