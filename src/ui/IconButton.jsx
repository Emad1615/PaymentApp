import styled, { css } from "styled-components";

const IconButton = styled.button`
  position: relative;
  background: none;
  border: none;
  outline: none;
  padding: 1rem;
  border-radius: 100px;
  font-size: 1.5rem;
  font-weight: 600;
  display: flex;
  justify-content: center;
  align-items: center;
  width: fit-content;
  aspect-ratio: 1;
  & svg {
    width: 1.8rem;
    height: 1.8rem;
    color: ${(props) => props.type === "primary" && css`var(--color-brand-500)`};
    color: ${(props) => props.type === "danger" && css`var(--color-red-700)`};
    color: ${(props) =>
      props.type === "secondary" && css`var(--color-grey-500)`};
  }
  &:hover {
    background-color: var(--color-grey-200);
    transform: scale(1.1);
  }
  transition: all 0.2s;
  &:focus {
    outline: none;
  }
  ${(props) =>
    props.notificationAlert > 0 &&
    css`
      &::after {
        content: "•";
        color: var(--color-warning);
        font-size: 3rem;
        position: absolute;
        top: 1.6rem;
        left: 1.8rem;
      }
    `}
`;
export default IconButton;