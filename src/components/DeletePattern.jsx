import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Alert from 'react-bootstrap/Alert';
import { deletePattern } from '../api';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function DeletePattern(props) {
const [showAlert, setShowAlert] = useState(false);
const [showSuccess, setShowSuccess] = useState(false);
const navigate = useNavigate();

const handleClick = () => {
  deletePattern(props.id).then(() => {
    setShowSuccess(true);
  }).catch(err => {
    setAlertMsg(err.response.data.msg);
    setShowAlert(true);
  });
};

  return (
    <>
    {showAlert && <Alert className="alert" variant="danger" onClose={() => setShowAlert(false)} dismissible>
      <Alert.Heading>Something went wrong...</Alert.Heading>
      <p>{alertMsg}</p>
    </Alert>}

    <Modal
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centred="true"
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          <span style={{"fontStyle": "italic"}}>{!showSuccess ? "Are you sure you want to do that?" : "Done."}</span>
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {!showSuccess ? <><h4>You're about to permanenetly delete this pattern.</h4>
        <p>
          If you're sure you want to delete this pattern, click the button below to confirm.
        </p></> : <><h4>Your pattern has been deleted.</h4>
        <p>
          Click the button to close this window.
        </p></>}
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={() => {
            if (showSuccess) {
               //navigate('/3dgame');
               props.setPatternsData(prev => prev.filter(pattern => pattern._id !== props.id));
             }
            props.onHide();
        }}>Close</Button>
        {!showSuccess && <Button style={{"backgroundColor": "rgb(250, 100, 200"}} onClick={handleClick}>Confirm</Button>}
      </Modal.Footer>
    </Modal>
    </>
  );
}

export default DeletePattern;