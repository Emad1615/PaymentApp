import styled, { css } from 'styled-components';

const variations = {
  horizontal: css`
    flex-direction: row;
    justify-content: ${(props) => props.justifycontent};
    align-items: center;
    gap: 1rem;
  `,
  vertical: css`
    flex-direction: column;
    display: inline-flex;
    & > * {
      width: 100%;
    }
  `,
  justified: css`
    flex-direction: row;
    & > * {
      flex: 1;
    }
  `,
};
const ButtonGroup = styled.div`
  display: flex;
  margin: 1rem 0;
  flex-wrap: wrap;
  ${(props) => variations[props.variation]}
`;
export default ButtonGroup;

ButtonGroup.defaultProps = {
  variation: 'horizontal',
  justifycontent: 'center',
};
