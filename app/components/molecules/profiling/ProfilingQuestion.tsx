import { Button, Flex, Heading } from "@chakra-ui/react";

interface QuestionProps<T extends string | number> {
  title: string; // Título de la pregunta
  options: T[]; // Opciones disponibles
  selected: T | T[]; // Respuesta seleccionada (única o múltiple)
  onSelect: (option: T) => void; // Evento al seleccionar una opción
  multiple?: boolean; // Define si la selección es múltiple
}

/**
 * Determinar si el botón debe mostrar el estado "active"
 */
const isOptionSelected = <T extends string | number>(
  option: T,
  selected: T | T[],
  multiple: boolean
): boolean => {
  if (multiple && Array.isArray(selected)) {
    return selected.includes(option);
  }
  return selected === option;
};

export const ProfilingQuestion = <T extends string | number>({
  title,
  options,
  selected,
  onSelect,
  multiple = false,
}: QuestionProps<T>) => {
  return (
    <Flex flexDir={"column"} gap={4}>
      <Heading fontSize="sm">{title}</Heading>
      <Flex gap={2} flexWrap={"wrap"}>
        {options.map((option) => (
          <Button
            key={option}
            w="max-content"
            fontSize="sm"
            variant="pill"
            isActive={isOptionSelected(option, selected, multiple)}
            onClick={() => onSelect(option)}
          >
            {option}
          </Button>
        ))}
      </Flex>
    </Flex>
  );
};
