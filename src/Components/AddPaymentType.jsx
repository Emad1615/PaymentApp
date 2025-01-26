import Modal from '../ui/Modal';
import Button from '../ui/Button';
import PaymentTypeForm from './PaymentTypeForm';
import { FaPlus } from "react-icons/fa6";

function AddPaymentType() {
    return (
        <Modal>
        <Modal.Open openName="add-payment">
        <Button type='button' ><FaPlus /> اضافة 
        </Button>
        </Modal.Open>
        <Modal.Body modalName="add-payment" title="اضافة نظام دفع جديد">
          <PaymentTypeForm/>
        </Modal.Body>
      </Modal>
    )
}

export default AddPaymentType
