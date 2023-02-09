import Offcanvas from 'react-bootstrap/Offcanvas';

function HiddenSidebar({showSidebar, setShowSidebar}) {

 const handleClose = () => setShowSidebar(false);

  return (
    <> <Offcanvas show={showSidebar} onHide={handleClose}>
        <Offcanvas.Header closeButton>
          <Offcanvas.Title>Tips and tricks</Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body>
          Multiply...or die. Is it a game or is it reality? Are you an automaton or the game master?
        </Offcanvas.Body>
      </Offcanvas>
    </>
  );
};

export default HiddenSidebar;