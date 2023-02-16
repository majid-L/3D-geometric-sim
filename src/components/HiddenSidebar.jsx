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

          <p className="tips_title">Welcome to Automatrix!</p>
          <p>Automatrix simulates a two-dimensional cellular automaton and is the latest interpretation of John Conway's Game Of Life. When you run the simulation, what you are seeing is a series of algorithmic computations which determine the binary state of each cell based on the state of its immediate neighbours. Each round of computations transforms the configuration of the pattern that you see on the board.</p>

          <p>The aim of the game (or, more accurately, simulation) is to create a pattern that evolves in interesting, visually-striking ways.</p>

          <p>It may seem like a simple thing on the surface, but this game is based on deep mathematical complexity, exemplified by the myriad complex patterns that have been constructed by enthusiasts over the years. It is a fascinating topic that deserves an in-depth exploration, especially for those who are numerically inclined.</p>

          <div style={{borderBottom: '2px solid grey', margin: '20px 0'}}/>

          <p className="tips_title">Switching between 3D and 2D views</p>
          <p>The game keeps constant track of your board configuration such that you're able to freely switch between the 3D and 2D boards while the game continues to make its computations and your pattern continues to evolve.</p>

          <p className="tips_title">Camera controls</p>
          In the 3D view, you can fully control the camera's position and distance with your mouse.
          <div style={{marginBottom: '6px'}}/>
          <ul><li>To zoom in and out, use the provided slider rather than your mouse scroll wheel.</li>
          <li> To rotate the camera, hold down the left mouse button and move your mouse around. (The centre of your screen is used as a fixed pivot.)</li>
          <li>To move the camera, hold down the right moust button and move your mouse around.</li>
          </ul>

          <p className="tips_title">Changing board size</p>
          <p>You can adjust the size of the board even while the game is running. Whatever size you choose will persist across both the 3D and 2D views.</p>

          <p className="tips_title">Effects</p>
          <p>There are several visual effects available to choose from, including block color, edge/shadow color, bloom color and intensity, and background scene. Make sure to give all of these a try!</p>

          <p className="tips_title">Interact toggle</p>
          <p>With interact enabled, you're able to click on a cell to animate or kill it. You can even do this while the game is running and observe the impact in real time.
          </p>
          <p>This feature comes in handy whenever your pattern reaches stasis. In such a situation, you can simply pause the game and click around the board to modify the configuration of your pattern.</p>

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