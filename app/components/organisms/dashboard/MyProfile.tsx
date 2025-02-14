import { FormEvent, useState, useMemo } from "react";
import {
  Box,
  Heading,
  FormControl,
  FormLabel,
  Input,
  Button,
  Flex,
  useToast,
} from "@chakra-ui/react";
import { useUser } from "~/hooks/useUser";
type ProfileFormData = {
  username: string;
  address: string;
  city: string;
  country: string;
  province: string;
  email: string;
  phone: string;
  type_of_document: string;
  document_number: string;
};

export const MyProfile = () => {
  const { user, isLoading, updateUser } = useUser();
  const toast = useToast();
  const initialData: ProfileFormData = useMemo(
    () => ({
      username: user?.username ?? "",
      address: user?.address ?? "",
      city: user?.city ?? "",
      country: user?.country ?? "",
      province: user?.province ?? "",
      email: user?.email ?? "",
      phone: user?.phone ?? "",
      type_of_document: user?.type_of_document ?? "",
      document_number: user?.document_number ?? "",
    }),
    [user]
  );

  const [formData, setFormData] = useState<ProfileFormData>(initialData);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev: ProfileFormData) => ({
      ...prev,
      [name]: value,
    }));
  };

  const hasChanges = useMemo(() => {
    const keys = Object.keys(initialData) as (keyof ProfileFormData)[];
    return keys.some((key) => initialData[key] !== formData[key]);
  }, [initialData, formData]);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      updateUser(formData);
      console.log("Enviando datos de perfil:", formData);
      toast({
        title: "Perfil actualizado.",
        description: "Actualizaste tus datos correctamente.",
        status: "success",
        duration: 3000,
        isClosable: true,
      });
    } catch (error) {
      reportError({
        component: "MyProfile.tsx Ln.73",
        title: "Error al actualizar perfil",
        message: `${error}`,
        showInProd: true,
      });
    }
  };

  return (
    <Flex
      flexDir={"column"}
      transition="width 0.4s"
      py={6}
      gap={3}
      w={"100%"}
      pl={{ base: 4, lg: 0 }}
      mx={"auto"}
      pr={{ base: 4, lg: 3, "2xl": 3 }}
    >
      <Box bg="white" p={4} borderRadius="xl" >
        <Heading as="h1" size="xl" mb={4}>
          Mi Perfil
        </Heading>

        <Box as="form" onSubmit={handleSubmit}>
          <Flex gap={4} flexWrap="wrap" align="stretch">
            {/* USERNAME (editable) */}
            <FormControl maxW={{ base: "full", md: "370px" }}>
              <FormLabel>Nombre de usuario</FormLabel>
              <Input
                name="username"
                value={formData.username}
                onChange={handleChange}
              />
            </FormControl>

            {/* ADDRESS (editable) */}
            <FormControl maxW={{ base: "full", md: "370px" }}>
              <FormLabel>Dirección</FormLabel>
              <Input
                name="address"
                value={formData.address}
                onChange={handleChange}
              />
            </FormControl>

            {/* CITY (editable) */}
            <FormControl maxW={{ base: "full", md: "370px" }}>
              <FormLabel>Ciudad</FormLabel>
              <Input
                name="city"
                value={formData.city}
                onChange={handleChange}
              />
            </FormControl>

            {/* PROVINCE (editable) */}
            <FormControl maxW={{ base: "full", md: "370px" }}>
              <FormLabel>Provincia</FormLabel>
              <Input
                name="province"
                value={formData.province}
                onChange={handleChange}
              />
            </FormControl>

            {/* COUNTRY (editable) */}
            <FormControl maxW={{ base: "full", md: "370px" }}>
              <FormLabel>País</FormLabel>
              <Input
                name="country"
                value={formData.country}
                onChange={handleChange}
              />
            </FormControl>

            {/* EMAIL (read only) */}
            <FormControl maxW={{ base: "full", md: "370px" }}>
              <FormLabel>Email</FormLabel>
              <Input
                disabled
                name="email"
                value={formData.email}
                isReadOnly
                onChange={handleChange}
              />
            </FormControl>

            {/* PHONE (read only) */}
            <FormControl maxW={{ base: "full", md: "370px" }}>
              <FormLabel>Teléfono</FormLabel>
              <Input
                disabled
                name="phone"
                value={formData.phone}
                isReadOnly
                onChange={handleChange}
              />
            </FormControl>

            {/* TYPE_OF_DOCUMENT (read only) */}
            <FormControl maxW={{ base: "full", md: "370px" }}>
              <FormLabel>Tipo de documento</FormLabel>
              <Input
                disabled
                name="type_of_document"
                value={formData.type_of_document}
                isReadOnly
                onChange={handleChange}
              />
            </FormControl>

            {/* DOCUMENT_NUMBER (read only) */}
            <FormControl maxW={{ base: "full", md: "370px" }}>
              <FormLabel>Número de documento</FormLabel>
              <Input
                disabled
                name="document_number"
                value={formData.document_number}
                isReadOnly
                onChange={handleChange}
              />
            </FormControl>
          </Flex>

          {/* Botón de guardar */}
          <Button
            type="submit"
            variant={"primary"}
            fontSize={"14px"}
            mt={4}
            py={2}
            px={4}
            isDisabled={!hasChanges}
            isLoading={isLoading}
          >
            Guardar
          </Button>
        </Box>
      </Box>
    </Flex>
  );
};
