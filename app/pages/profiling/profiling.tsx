import {
  Flex,
  Stepper,
  Step,
  StepIndicator,
  StepStatus,
  StepSeparator,
  Stack,
  Button,
  useSteps,
  useToast,
} from "@chakra-ui/react";
import { ProfilingSection } from "./profilingSection";
import { questionsConfig } from "./questionsConfig";
import { stepsConfig } from "./stepsConfig";
import { useProfiling } from "~/hooks/profiling/useProfiling";
import { colors } from "~/styles/colors";
import { Ico } from "~/assets/icons";

export const ProfilingWizard = ({ onComplete }: { onComplete: () => void }) => {
  const { profilingData, updateSection } = useProfiling(); // Estado y actualizador de datos
  const { activeStep, setActiveStep } = useSteps({ index: 0 }); // Manejo del paso activo
  const toast = useToast(); // Notificaciones

  // Avanzar al siguiente paso o finalizar el proceso
  const handleNext = () => {
    if (activeStep === stepsConfig.length - 1) {
      toast({
        title: "Perfilamiento completado.",
        description: "Gracias por completar el formulario.",
        status: "success",
        duration: 3000,
        isClosable: true,
      });
      console.log("Datos finales:", profilingData);
      onComplete();
    } else {
      setActiveStep(activeStep + 1);
    }
  };

  // Retroceder al paso anterior
  const handlePrev = () => {
    if (activeStep > 0) {
      setActiveStep(activeStep - 1);
    }
  };

  // Paso actual y sus datos
  const currentStep = stepsConfig[activeStep];
  const stepKey = currentStep.key; // Clave de la sección actual
  const stepData = profilingData[stepKey]; // Datos de la sección actual
  const questions = questionsConfig[stepKey]; // Preguntas de la sección actual

  return (
    <Flex flexDir="column" gap={8}>
      {/* Stepper Visual */}
      <Stepper index={activeStep} px={6}>
        {stepsConfig.map((step) => (
          <Step key={step.key}>
            <StepIndicator>
              <StepStatus
                complete={
                  <Ico.SharkyFin fontSize="18px" color={colors.Blue[500]} />
                }
                incomplete={
                  <Ico.SharkyFin fontSize="18px" color={colors.Slate[500]} />
                }
                active={
                  <Ico.SharkyFin fontSize="18px" color={colors.Yellow[500]} />
                }
              />
            </StepIndicator>
            <StepSeparator />
          </Step>
        ))}
      </Stepper>

      {/* Sección de preguntas del paso actual */}
      <ProfilingSection
        data={stepData}
        onUpdate={(updatedData) => updateSection(stepKey, updatedData)}
        questions={questions}
      />

      {/* Botones de navegación */}
      <Stack direction="row" spacing={4} justifyContent="center">
        {activeStep > 0 && (
          <Button lineHeight={"normal"} variant="ghost" fontSize="sm" onClick={handlePrev}>
            Atrás
          </Button>
        )}
        <Button
          variant="primary"
          rounded="full"
          fontSize="sm"
          lineHeight={"normal"}
          onClick={handleNext}
        >
          {activeStep === stepsConfig.length - 1 ? "Finalizar" : "Siguiente"}
        </Button>
      </Stack>
    </Flex>
  );
};
