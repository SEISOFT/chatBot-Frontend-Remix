import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalBody,
  Text,
  Flex,
} from "@chakra-ui/react";
import { SharkyImage } from "~/components/atoms/SharkyImage";
import { ProfilingWizard } from "~/components/organisms/profiling/profiling";

interface ProfilingModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ProfilingModal = ({ isOpen, onClose }: ProfilingModalProps) => {
  return (
    <Modal
      isOpen={isOpen}
      onClose={() => {}}
      isCentered
      size={{ base: "full", sm: "sm" }}
    >
      <ModalOverlay
        bg="transparent"
        backdropFilter="blur(10px) "
      />
      <ModalContent overflow={"hidden"}>
        <ModalBody
          display={"flex"}
          flexDir={"column"}
          gap={8}
          p={4}
          maxH={{ base: "100vh", sm: "90vh" }}
          overflowY="auto"
          css={{
            "&::-webkit-scrollbar": {
              width: "4px",
            },
            "&::-webkit-scrollbar-thumb": {
              background: "#cccccc",
              borderRadius: "4px",
            },
          }}
        >
          <Flex flexDir={"column"} gap={6}>
            <SharkyImage w={"80px"} mx={"auto"} />
            <Text fontSize={"md"} fontWeight={"bold"} textAlign={"center"}>
              ¡Queremos que aproveches al máximo tu experiencia en Sharky!
              Completa tu perfil
            </Text>
          </Flex>
          <ProfilingWizard
            onComplete={() => {
              onClose(); // Cierra el modal al completar el wizard
            }}
          />
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};
