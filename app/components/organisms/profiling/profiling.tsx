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
  Text,
} from "@chakra-ui/react";
import { ProfilingForm } from "~/components/molecules/profiling/profilingForm";
import { questionsConfig } from "../../../utils/profiling/questionsConfig";
import { stepsConfig } from "../../../utils/profiling/ProfilingStepsConfig";
import { useProfiling } from "~/hooks/profiling/useProfiling";
import { colors } from "~/styles/colors";
import { Ico } from "~/assets/icons";

export const ProfilingWizard = ({ onComplete }: { onComplete: () => void }) => {
  const { profilingData, updateSection } = useProfiling();
  const { activeStep, setActiveStep } = useSteps({ index: 0 });
  const toast = useToast();

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

  const handlePrev = () => {
    if (activeStep > 0) {
      setActiveStep(activeStep - 1);
    }
  };

  const currentStep = stepsConfig[activeStep]; // Paso actual y sus datos
  const stepKey = currentStep.key; // Clave de la sección actual
  const stepData = profilingData[stepKey]; // Datos de la sección actual
  const questions = questionsConfig[stepKey]; // Preguntas de la sección actual

  return (
    <Flex flexDir="column" gap={8}>
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

      <ProfilingForm
        data={stepData}
        onUpdate={(updatedData) => updateSection(stepKey, updatedData)}
        questions={questions}
      />

      <Flex flexDir={"column"} gap={4}>
        <Stack direction="row" spacing={4} justifyContent="center">
          {activeStep > 0 && (
            <Button
              lineHeight={"normal"}
              variant="ghost"
              fontSize="sm"
              onClick={handlePrev}
            >
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
        <Text fontSize={"xs"} color={colors.Slate[400]}>
          Los datos recopilados se utilizarán únicamente con fines estadísticos
          y en pro de mejorar tu experiencia.
        </Text>
      </Flex>
    </Flex>
  );
};
