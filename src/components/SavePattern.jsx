import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';

export const SavePattern = () => {
return (<Modal show={show} onHide={handleClose}>
    <Modal.Header closeButton>
      <Modal.Title>{username ? 'Save pattern' : 'Sign-in required.'}</Modal.Title>
    </Modal.Header>
    <Modal.Body>
      {!username && <p style={{margin: 0}}>Sign in to save any patterns you've created.</p>}
      {username && <Form>
        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
          <Form.Label>What would you like to name this pattern?</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter pattern name."
            autoFocus
            onChange={e => setPatternName(e.target.value)}
          />
        </Form.Group>
        <Form.Group
          className="mb-3"
          controlId="exampleForm.ControlTextarea1"
        >
        </Form.Group>
      </Form>}
    </Modal.Body>
    <Modal.Footer>
      <Button onClick={handleClose}>
        Close
      </Button>
      {username ? <Button variant="primary" onClick={handleSubmit}>Save pattern</Button>
      : <Button variant="primary" onClick={() => navigate('/login')}>Log in</Button>}
    </Modal.Footer>
  </Modal>);
}