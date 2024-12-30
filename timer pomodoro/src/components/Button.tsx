import { ButtonContainer, ButtonVariant } from "./Button.styles.ts";


interface ButtonContainerProps {
    variant?:ButtonVariant;
}

export function Button({ variant = 'primary'}: ButtonContainerProps) {
    return <ButtonContainer variant={variant}>Enviar</ButtonContainer>;
}