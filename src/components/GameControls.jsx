import { useContext } from 'react';
import Button from 'react-bootstrap/Button';
import { OverlayTrigger, Tooltip } from 'react-bootstrap';
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import Dropdown from 'react-bootstrap/Dropdown';
import DropdownButton from 'react-bootstrap/DropdownButton';
import { GameControlsContext } from '../contexts/GameControlsContext';

const InteractTooltip = (
    <Tooltip id="tooltip">
      <strong>Only works while game is paused.</strong> With this setting enabled, you can click anywhere on the board to revive/kill a specific cell. Use this feature to change the configuration of your pattern whenever you like.
    </Tooltip>
  );

const GameControls = () => {

const { controls, setControls } = useContext(GameControlsContext);

const handleClick = e => {
  let click = 0;
  if (!e.target.id || e.target.id === 'physics') return;

  if (e.target.id === "faster" || e.target.id === "slower") {
    setControls({button: e.target.id, speedModifier: ++click});
  } else {
    setControls(prev => ({...prev, button: e.target.id}))
  }
};

const condition = controls.button === "enablePhysics";

return (
<section className="game-controls">
<ButtonGroup onClick={handleClick} aria-label="Basic example">
  <Button disabled={condition} id="start" variant="secondary">Start</Button>
  <Button disabled={condition} id="stop" variant="secondary">Stop</Button>
  <Button disabled={condition} id="reset" variant="secondary">Reset</Button>
  <Button disabled={condition} id="faster" variant="secondary">🡱 faster</Button>
  <Button disabled={condition} id="slower" variant="secondary">🡳 slower</Button>
  
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
</ButtonGroup>
</section>)
};

export default GameControls;