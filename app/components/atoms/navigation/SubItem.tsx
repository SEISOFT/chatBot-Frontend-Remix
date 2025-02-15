import { memo } from "react";
import { Text } from "@chakra-ui/react";
import { colors } from "~/styles/colors";

interface SubItemProps {
  label: string;
  isCollapsed?: boolean;
  onClick?: () => void;
}

export const SubItem = memo(({ label, isCollapsed, onClick }: SubItemProps) => {
  return (
    <Text
      py={2}
      pl={isCollapsed ? 2 : 9}
      borderRadius="xl"
      fontSize="sm"
      maxH={"36px"}
      color={colors.Slate[800]}
      _hover={{
        color: colors.Blue[500],
        cursor: "pointer",
        bg: colors.Slate[100],
      }}
      onClick={onClick}
    >
      {label}
    </Text>
  );
});

SubItem.displayName = "SubItem";
