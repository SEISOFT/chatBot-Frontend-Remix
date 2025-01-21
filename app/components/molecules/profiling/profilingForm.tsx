import { Flex, Heading, Textarea } from "@chakra-ui/react";
import { ProfilingQuestion } from "~/components/molecules/profiling/ProfilingQuestion";
import { QuestionsConfig } from "../../organisms/profiling/types";

interface ProfilingSectionProps<T> {
  data: T; // Datos actuales de la sección
  onUpdate: (data: T) => void; // Función para actualizar los datos
  questions: QuestionsConfig[keyof QuestionsConfig]; // Preguntas específicas por sección
}

export const ProfilingForm = <T extends Record<string, unknown>>({
  data,
  onUpdate,
  questions,
}: ProfilingSectionProps<T>) => {
  /**
   * Manejar la selección de opciones.
   * Si es selección múltiple, agrega o quita la opción del arreglo.
   * Si es selección única, actualiza el valor directamente.
   */
  const handleSelect = (key: keyof T, option: string) => {
    const currentValue = data[key];

    if (Array.isArray(currentValue)) {
      // Manejar selección múltiple
      const updatedValue = currentValue.includes(option)
        ? currentValue.filter((item) => item !== option)
        : [...currentValue, option];

      onUpdate({ ...data, [key]: updatedValue as T[keyof T] });
    } else {
      // Manejar selección única
      onUpdate({ ...data, [key]: option as T[keyof T] });
    }
  };

  /**
   * Manejar el cambio de texto en preguntas abiertas.
   */
  const handleTextChange = (key: keyof T, value: string) => {
    onUpdate({ ...data, [key]: value as T[keyof T] });
  };

  return (
    <Flex flexDir={"column"} gap={6}>
      {questions.map((question) => {
        // Preguntas con opciones
        if (question.options) {
          return (
            <ProfilingQuestion
              key={String(question.key)}
              title={question.title}
              options={question.options}
              selected={data[question.key] as string | string[]}
              onSelect={(option) => handleSelect(question.key, option)}
              multiple={question.multiple}
            />
          );
        }

        // Preguntas abiertas (textarea)
        if (question.textarea) {
          return (
            <Flex flexDir={"column"} key={String(question.key)} gap={4}>
              <Heading fontSize="sm">{question.title}</Heading>
              <Textarea
                fontSize="sm"
                placeholder="Ingresa tu respuesta"
                value={data[question.key] as string}
                onChange={(e) => handleTextChange(question.key, e.target.value)}
              />
            </Flex>
          );
        }
        return null;
      })}
    </Flex>
  );
};
