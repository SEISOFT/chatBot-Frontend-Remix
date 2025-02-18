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
import { useProfiling } from "~/hooks/profiling/useProfiling";
import { colors } from "~/styles/colors";
import { Ico } from "~/assets/icons";
import { useError } from "~/hooks/useError";
import { stepsConfig } from "~/utils/profiling/ProfilingStepsConfig";
import { questionsConfig } from "~/utils/profiling/questionsConfig";
import { ProfilingForm } from "~/components/molecules/profiling/profilingForm";


export const ProfilingWizard = ({ onComplete }: { onComplete: () => void }) => {
  const { reportError } = useError();
  const { profilingData, updateSection, submitProfiling, isLoading } =
    useProfiling();
  const { activeStep, setActiveStep } = useSteps({ index: 0 });
  const toast = useToast();

  const handleNext = async () => {
    if (activeStep < stepsConfig.length - 1) {
      setActiveStep(activeStep + 1);
      return;
    }

    try {
      await submitProfiling();
      console.log("Datos finales:", profilingData);
      toast({
        title: "Perfilamiento completado.",
        description: "Gracias por completar el formulario.",
        status: "success",
        duration: 3000,
        isClosable: true,
      });
    } catch (error) {
      reportError({
        component: "profiling.tsx Ln.48",
        title: "Error al enviar datos de perfilamiento",
        message: `${error}`,
        showInProd: true,
      });
    }
    onComplete();
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

  function isAnyAnswerNull() {
    return Object.values(stepData).some((value) => value === null);
  }

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
            disabled={isAnyAnswerNull()}
            isLoading={isLoading}
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
