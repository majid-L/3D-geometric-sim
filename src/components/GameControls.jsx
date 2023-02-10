import { useContext, useState } from 'react';
import Button from 'react-bootstrap/Button';
import { OverlayTrigger, Tooltip } from 'react-bootstrap';
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import Dropdown from 'react-bootstrap/Dropdown';
import DropdownButton from 'react-bootstrap/DropdownButton';
import { GameControlsContext } from '../contexts/GameControlsContext';
import {SmallIcon, LargeIcon, SpeedIcon} from './Icons';
import { useLocation } from 'react-router-dom';

import React from 'react';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';
import Alert from 'react-bootstrap/Alert';
import { postPattern } from '../api';

const InteractTooltip = (
    <Tooltip id="tooltip">
      <strong>Only works while game is paused.</strong> With this setting enabled, you can click anywhere on the board to revive/kill a specific cell. Use this feature to change the configuration of your pattern whenever you like.
    </Tooltip>
  );


const GameControls = () => {

const [patternName, setPatternName] = useState('');
const [show, setShow] = useState(false);
const [showAlert, setShowAlert] = useState(false);
const [alertMsg, setAlertMsg] = useState('');

const [showSuccess, setShowSuccess] = useState(false);
const location = useLocation();

const { controls, setControls, gameParameters: {isRunning, configuration, username} } = useContext(GameControlsContext);

const handleClose = () => setShow(false);
const handleShow = () => setShow(true);

const patternBody = configuration.map(m => m.join("")).join(" ");

const handleClick = e => {
  let click = 0;
  if (!e.target.id || e.target.id === 'physics') return;

  if (e.target.id === "faster" || e.target.id === "slower") {
    setControls({button: e.target.id, speedModifier: ++click});
  } else if (e.target.id === "larger" || e.target.id === "smaller") {
    setControls({button: e.target.id, sizeModifier: ++click});
  } else {
    setControls(prev => ({...prev, button: e.target.id}))
  }
};

const handleSubmit = e => {
  setShow(false);
  if (!username) {
    setAlertMsg("You must be logged in to save a pattern to your collection.");
    setShowAlert(true);
    return;
  };
  
  if (/^([^1])+$/.test(patternBody)){
    setAlertMsg("Pattern cannot be empty.");
    setShowAlert(true);
    return;
  };

  if (!patternName) {
    setAlertMsg("Please provide a name for your pattern.");
    setShowAlert(true);
    return;
  };
 
  postPattern(username, patternName, patternBody).then(() => {
    setShowSuccess(true);
  }).catch(err => {
    setAlertMsg(err.response.data.msg);
    setShowAlert(true);
  })
}

const condition = controls.button === "enablePhysics";

return (<>
<section className="game-alerts">
  {showAlert && <Alert className="alert" variant="danger" onClose={() => setShowAlert(false)} dismissible>
      <Alert.Heading>Something went wrong...</Alert.Heading>
      <p>{alertMsg}</p>
    </Alert>}

    <Alert show={showSuccess} variant="success">
        <Alert.Heading>You pattern has been added to your collection.</Alert.Heading>
        <p>
          Job done. Now let's get back to the game.
        </p>
        <Button onClick={() => setShowSuccess(false)} variant="outline-success">
            Dismiss.
          </Button>
      </Alert>
      </section>
<section className="game-controls">
      {location.pathname[1] === "3" && <Dropdown onClick={handleClick}>
        <Dropdown.Toggle id="effects" variant="secondary">
          Effects
        </Dropdown.Toggle>

        <Dropdown.Menu variant="dark">
          <Dropdown.Item id="stars">Stars</Dropdown.Item>
          <Dropdown.Item id="sky">Sky</Dropdown.Item>
        </Dropdown.Menu>
      </Dropdown>}

<ButtonGroup onClick={handleClick} aria-label="Basic example">
  <Button disabled={condition} id="start" variant="secondary">Start</Button>
  <Button disabled={condition} id="stop" variant="secondary">Stop</Button>
  <Button disabled={condition} id="reset" variant="secondary">Reset</Button>
  <Button disabled={condition} id="randomise" variant="secondary">Randomise</Button>
  <Button disabled={condition} id="clear" variant="secondary">Clear</Button>
  <Button disabled={condition} id="faster" variant="secondary"><SpeedIcon/>Faster</Button>
  <Button disabled={condition} id="slower" variant="secondary"><SpeedIcon/>Slower</Button>

  <Button disabled={condition || isRunning} id="larger" variant="secondary"><LargeIcon/>Larger</Button>
  <Button disabled={condition || isRunning} id="smaller" variant="secondary"><SmallIcon/>Smaller</Button>

  <DropdownButton disabled={condition} as={ButtonGroup} title="3D/2D" className="bg-nested-dropdown">
   <Dropdown.Item id="threeD" eventKey="1">3D</Dropdown.Item>
   <Dropdown.Item id="twoD" eventKey="2">2D</Dropdown.Item>
 </DropdownButton>
  
  <DropdownButton disabled={condition} as={ButtonGroup} title="Edge type" className="bg-nested-dropdown">
   <Dropdown.Item id="edge" eventKey="1">Hard edge</Dropdown.Item>
   <Dropdown.Item id="wrap" eventKey="2">Wrap around</Dropdown.Item>
 </DropdownButton>

 <OverlayTrigger placement="top" overlay={InteractTooltip}>
 <DropdownButton disabled={condition} as={ButtonGroup} title="Interact" className="bg-nested-dropdown">
   <Dropdown.Item id="enableClick" eventKey="1">Enable</Dropdown.Item>
   <Dropdown.Item id="disableClick" eventKey="2">Disable</Dropdown.Item>
 </DropdownButton>
 </OverlayTrigger>
 
 <DropdownButton as={ButtonGroup} id="physics" title="Physics" className="bg-nested-dropdown">
   <Dropdown.Item id="enablePhysics" eventKey="1">Enable</Dropdown.Item>
   <Dropdown.Item id="disablePhysics" eventKey="2">Disable</Dropdown.Item>
 </DropdownButton>
 <Button variant="primary" id="save" onClick={handleShow}>
        Save pattern
      </Button>
</ButtonGroup>

<Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Save pattern</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
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
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handleSubmit}>
            Save pattern
          </Button>
        </Modal.Footer>
      </Modal>
</section></>)
};

export default GameControls;