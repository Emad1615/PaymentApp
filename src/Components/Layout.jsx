import Modal from '../ui/Modal';
import Button from '../ui/Button';

function Layout() {
  return (
    <div>
      <Modal>
        <Modal.Open openName="add-payment">
          <Button size="sm">Add Payment</Button>
        </Modal.Open>
        <Modal.Body modalName="add-payment" title="Edit Cabin">
          <h1 className='text-amber-800 w-full'>You are welcome</h1>
        </Modal.Body>
      </Modal>
    </div>
  );
}

export default Layout;
