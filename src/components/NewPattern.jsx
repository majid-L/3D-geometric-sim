import { useContext, useState } from 'react';
import Button from 'react-bootstrap/Button';
import { GameControlsContext } from '../contexts/GameControlsContext';
import React from 'react';
import Alert from 'react-bootstrap/Alert';
import { postPattern } from '../api';
import { SavePattern } from './SavePattern';
import { button, useControls } from 'leva';


const NewPattern = () => {
const [patternName, setPatternName] = useState('');
const [show, setShow] = useState(false);
const [showAlert, setShowAlert] = useState(false);
const [alertMsg, setAlertMsg] = useState('');

const [showSuccess, setShowSuccess] = useState(false);

useControls({ "save pattern" : button(() => {
  setShow(true);
})});

const { gameParameters: { configuration, physics, username}} = useContext(GameControlsContext);

const handleClose = () => setShow(false);

const patternBody = configuration.map(m => m.join("")).join(" ");

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
};

return (<>
<section className="game-alerts">
  {showAlert && <Alert className="alert" variant="danger" onClose={() => setShowAlert(false)} dismissible>
      <Alert.Heading>Something went wrong...</Alert.Heading>
      <p>{alertMsg}</p>
    </Alert>}

    <Alert style={{textAlign: 'center'}} show={showSuccess} variant="success">
        <Alert.Heading>You pattern has been added to your collection.</Alert.Heading>
        <p>
          Job done. Now let's get back to the game.
        </p>
        <Button onClick={() => setShowSuccess(false)} variant="outline-success">
            Dismiss.
          </Button>
      </Alert>
      </section>

{!showSuccess &&

<>

<SavePattern show={show} handleClose={handleClose} setPatternName={setPatternName} handleSubmit={handleSubmit} />
</>
}</>)
};

export default NewPattern;