import styled, { css } from "styled-components";

const Heading = styled.h1`
  ${(props) =>
    props.as === "h1" &&
    css`
      font-size: 4rem;
      font-weight: bold;
      letter-spacing: 2px;
    `}
  ${(props) =>
    props.as === "h2" &&
    css`
      font-size: 3rem;
      font-weight: 600;
      letter-spacing: 2px;
    `}
  ${(props) =>
    props.as === "h3" &&
    css`
      font-size: 2rem;
      font-weight: 400;
      letter-spacing: 2px;
    `}
  ${(props) =>
    props.as === "h4" &&
    css`
      font-size: 1.6rem;
      font-weight: 600;
      letter-spacing: 2px;
      color: var(--color-grey-500);
    `}
`;
export default Heading;

Heading.defaultProps = {
  as: "h2",
};