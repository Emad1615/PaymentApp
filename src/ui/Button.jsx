import styled, { css } from "styled-components";

const sizes = {
  sm: css`
    padding: 0.5rem 1rem;
    font-weight: 600;
    font-size: 1rem;
  `,
  md: css`
    padding: 1rem 1.5rem;
    font-weight: 600;
    font-size: 1.3rem;
  `,
  lg: css`
    padding: 1.2rem 2rem;
    font-weight: 600;
    font-size: 1.5rem;
  `,
};
const variations = {
  primary: css`
    background-color: var(--color-brand-500);
    &:hover {
      background-color: var(--color-brand-600);;
    }
  `,
  success: css`
    background-color: var(--color-success);
    &:hover {
      background-color: #0993a5;
    }
  `,
  danger: css`
    background-color: var(--color-red-700);
    &:hover {
      background-color: #a31616;
    }
  `,
  greenSoft: css`
    background-color: var(--color-green-soft);
    &:hover {
      background-color: var(--color-green-soft-700);
    }
  `,
  greenSharp: css`
    background-color: var(--color-green-sharp);
    &:hover {
      background-color: var(--color-green-sharp-700);
    }
  `,
  purpleSharp: css`
    background-color: var(--color-purple-sharp);
    &:hover {
      background-color: var(--color-purple-sharp-700);
    }
  `,
  dark: css`
    background-color: var(--color-grey-900);
    &:hover {
      background-color: var(--color-grey-900);
    }
  `,
  warning: css`
    background-color: var(--color-warning);
    &:hover {
      background-color: #d75b0a;
    }
  `,
  secondary: css`
    background-color: var(--color-secondary);
    box-shadow: var(--shadow-md);
    &:hover {
      background-color: #8892a5;
    }
  `,
};
const Button = styled.button`
  border: none;
  box-shadow: var(--shadow-sm);
  outline: none;
  border-radius: 1px;
  transition: all 0.2s;
  text-transform: uppercase;
  color: white;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 0.5rem;
  text-align: center;
  ${(props) => sizes[props.size]};
  ${(props) =>  (props.disabled ?  variations['dark'] :  variations[props.variation] )};
  
  &:focus {
    outline: none;
  }
  &:disabled {
    cursor: not-allowed;
    text-decoration: line-through;
  }
`;
export default Button;
Button.defaultProps = {
  variation: "primary",
  disabled: false,
  size: "md",
};