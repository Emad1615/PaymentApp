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
    background-color: var(--color-primary);
    &:hover {
      background-color: #0961b9;
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
  ${(props) => sizes[props.size]}
  ${(props) => variations[props.variation]}
  
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
  size: "md",
};