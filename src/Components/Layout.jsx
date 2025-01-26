import styled from "styled-components";
import Title from "./../ui/Title";
import PaymentForm from "./PaymentForm";
const Container = styled.div`
  width: 92%;
  margin: 0 auto;
  padding: 18px;
  border: 1px solid var(--color-brand-100);
  border-radius: var(--border-radius-sm);
`

function Layout() {
  return (
    <Container>
      <Title>انظمة الدفع</Title>
      <PaymentForm/>
    </Container>
  );
}

export default Layout;
