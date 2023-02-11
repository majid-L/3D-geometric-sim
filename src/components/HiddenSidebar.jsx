import Offcanvas from 'react-bootstrap/Offcanvas';

function HiddenSidebar({showSidebar, setShowSidebar}) {

 const handleClose = () => setShowSidebar(false);

  return (
    <> <Offcanvas show={showSidebar} onHide={handleClose}>
        <Offcanvas.Header closeButton>
          <Offcanvas.Title>Tips and tricks</Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body>
          <p>Multiply...or die. Is it a game or is it reality? Are you an automaton or the game master?
          If you find that your patterns keeps getting stuck at the edges, you may need to enable the edge wrap feature. This allows the pattern to completely ignore all edges, effectively creating an infinite play area and allowing your patern to disappear from one side and reappear at the other.</p>

          <p>There may be times when you may wish to disable the edge wrap feature. This is especially important if you are using the Gosper glider gun pattern, which requires a hard edge to achieve its full potential.</p>
          
        </Offcanvas.Body>
      </Offcanvas>
    </>
  );
};

export default HiddenSidebar;