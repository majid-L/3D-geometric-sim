import Offcanvas from 'react-bootstrap/Offcanvas';

function HiddenSidebar({showSidebar, setShowSidebar}) {

 const handleClose = () => setShowSidebar(false);

  return (
    <> <Offcanvas show={showSidebar} onHide={handleClose}>
        <Offcanvas.Header closeButton>
          <Offcanvas.Title style={{fontSize: '22px'}}>Useful information</Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body>
          <p style={{fontStyle: 'italic'}}>"Is it a game or is it reality? Am I an automaton or am I in control? Will I multiply, or die?"</p>

          <p className="tips_title">About this game</p>
          <p>Best thought of as a simulation rather than a game, Automatrix simulates a two-dimensional cellular automaton and is the latest interpretation of John Conway's Game Of Life. When you run the simulation, what you are seeing is a series of algorithmic computations which alter the binary state of individual cells, with each round of computations transforming the configuration of the pattern that you see on the board.</p><p>It may seem like a simple thing on the surface, but this game is based on deep complexity that spreads across various fields, several of which are mathematical in nature. It is a fascinating topic that deserves an in-depth exploration, especially for those who are numerically inclined.</p>

          <div style={{borderBottom: '2px solid grey', margin: '20px 0'}}/>

          <p className="tips_title">Switching between 3D and 2D views</p>
          <p>The game keeps constant track of your board configuration such that you're able to freely switch between the 3D and 2D boards while the game continues to make its computations and your pattern continues to evolve.</p>

          <p className="tips_title">Camera controls</p>
          <ul><li>To zoom in and out, use the provided slider rather than your mouse scroll wheel.</li>
          <li> To rotate the camera, hold down the left mouse button and move your mouse around. (The centre of your screen is used as a fixed pivot.)</li>
          <li>To move the camera, hold down the right moust button and move your mouse around.</li>
          </ul>

          <p className="tips_title">Changing board size</p>
          <p>To increase or decrease the size of the board, first pause the game, make the adjustment and then resume the game.</p>

          <p className="tips_title">Effects</p>
          <p>For the 3D board, there are several visual effects available to choose from, including block color, bloom and background scene. Make sure to give these a try!</p>

          <p className="tips_title">Edge type</p>
          <p>This controls the behaviour of the cells when they meet an edge. This has a significant impact on the way the game plays out.</p>
          <ul>
            <li>Hard edge: opposite edges are completely ignored. When a block is at the very edge of the board, it is considered to have 5 neighbours as opposed to the usual 8.</li>
            <li>Wrap around: your pattern will completely ignore all edges, such that when a block is at the very edge of the board, it does not meet a hard stop. Instead, blocks at the immediate start of the opposite edge are counted as being neighbours, so the cell still has 8 neightbours (5 immediate neighbours plus 3 neighbours at the opposing edge). This effectively creates an infinite play area and allows your pattern to disappear from one side and reappear at the other.</li>
          </ul>

          <p>You'll almost always want to keep this set to "Wrap around". However, there may be times when you may wish to set it to "Hard edge". For instance, the <span className="tips_span">Gosper glider gun</span> pattern requires a hard edge to achieve its full potential. Play around with this feature to see if you can find any other good uses for it!</p>

        </Offcanvas.Body>
      </Offcanvas>
    </>
  );
};

export default HiddenSidebar;