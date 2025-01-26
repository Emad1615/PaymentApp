import { cloneElement, createContext, useContext, useState } from "react";
import styled from "styled-components";
import IconButton from "./IconButton";
import { HiOutlineXMark } from "react-icons/hi2";
import Button from "./Button";
import Title from "./Title";
import { createPortal } from "react-dom";
import { useOutsideClick } from "../hooks/useOutsideClick";

const Overlay = styled.div`
  position: fixed;
  top: 0;
  left: 0%;
  background-color: var(--backdrop-color);
  backdrop-filter: blur(4px);
  height: 100dvh;
  width: 100%;
  z-index: 999;
`;
const StyledModal = styled.div`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  border: 1px solid var(--color-grey-100);
  background-color: var(--color-grey-0);
  border-radius: var(--border-radius-sm);
  box-shadow: var(--shadow-lg);
  z-index: 9999;
  width: calc(100% - 33.33%);
  border: 1px solid var(--color-grey-100);
  @media only screen and (max-width: 600px) {
    width: calc(100% - 5%);
  }
`;
const ModalContainer = styled.div`
  padding: 2rem;
`;
const HeaderModal = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding: 0.8rem 0.7rem;
  background-color: var(--color-brand-50);
  border-bottom: 1px solid var(--color-grey-100);
`;
const FooterModal = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
  align-items: center;
  padding: 0.8rem 0.7rem;
  background-color: var(--color-grey-100);
  border-top: 1px solid var(--color-grey-100);
`;

const ModalContext = createContext();
function Modal({ children }) {
  const [name, setName] = useState("");
  const open = setName;
  const close = () => setName("");
  return (
    <ModalContext.Provider value={{ name, open, close }}>
      {children}
    </ModalContext.Provider>
  );
}
function Open({ children, openName }) {
  const { open } = useContext(ModalContext);
  return cloneElement(children, {
    onClick: () => {
      open(openName);
    },
  });
}

function Body({ children, modalName, title }) {
  const { name, close } = useContext(ModalContext);
  const ref = useOutsideClick(close);
  if (modalName !== name) return null;
  return createPortal(
    <Overlay>
      <StyledModal ref={ref}>
        <HeaderModal>
        <Title>{title}</Title>
          <IconButton onClick={close}>
            <HiOutlineXMark />
          </IconButton>
          </HeaderModal>
        <ModalContainer>
          {cloneElement(children, { onCloseModal: close })}
        </ModalContainer>
        <FooterModal>
          <Button variation="danger" onClick={close}>
            <HiOutlineXMark /> الغاء
          </Button>
        </FooterModal>
      </StyledModal>
    </Overlay>,
    document.body
  );
}

Modal.Open = Open;
Modal.Body = Body;
export default Modal;