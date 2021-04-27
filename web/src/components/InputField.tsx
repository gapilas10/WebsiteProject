import React, { InputHTMLAttributes } from "react";
import { useField } from "formik";
import {
  FormControl,
  FormErrorMessage,
  Input,
  InputGroup,
  InputLeftElement,
} from "@chakra-ui/react";
import { ReactJSXElement } from "@emotion/react/types/jsx-namespace";

type InputFieldProps = InputHTMLAttributes<HTMLInputElement> & {
  icon: ReactJSXElement;
  name: string;
};

export const InputField: React.FC<InputFieldProps> = ({
  icon,
  size: _,
  ...props
}) => {
  const [field, { error }] = useField(props);
  return (
    <FormControl isInvalid={!!error}>
      <InputGroup>
        <InputLeftElement pointerEvents="none">{icon}</InputLeftElement>
        <Input {...field} {...props} id={field.name} />
        {error ? <FormErrorMessage>{error}</FormErrorMessage> : null}
      </InputGroup>
    </FormControl>
  );
};
