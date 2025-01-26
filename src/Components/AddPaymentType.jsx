import Modal from '../ui/Modal';
import Button from '../ui/Button';
import PaymentTypeForm from './PaymentTypeForm';
function AddPaymentType() {
    return (
        <Modal>
        <Modal.Open openName="add-payment">
          <Button size="sm">Add Payment</Button>
        </Modal.Open>
        <Modal.Body modalName="add-payment" title="Edit Cabin">
          <PaymentTypeForm/>
        </Modal.Body>
      </Modal>
    )
}

export default AddPaymentType
