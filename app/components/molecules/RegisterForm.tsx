import { Button, FormControl, FormLabel, Input, Stack } from "@chakra-ui/react";

interface RegisterFormProps {
    onSubmit: (event: React.FormEvent<HTMLFormElement>) => void;
  }
  
export const RegisterForm = ({ onSubmit }: RegisterFormProps) => (
  <form onSubmit={onSubmit}>
    <Stack spacing={4}>
      <FormControl id="email" isRequired>
        <FormLabel>Email</FormLabel>
        <Input type="email" name="email" />
      </FormControl>
      <FormControl id="password" isRequired>
        <FormLabel>Password</FormLabel>
        <Input type="password" name="password" />
      </FormControl>
      <Button type="submit">Register</Button>
    </Stack>
  </form>
);
