import { Link, useNavigate } from "react-router-dom";
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import { useContext, useEffect, useState } from "react";
import HiddenSidebar from './HiddenSidebar';
import { getPatterns } from "../api";
import { GameControlsContext } from "../contexts/GameControlsContext";
import { ThreeD } from "./Icons";

function Navigation() {
const [showSidebar, setShowSidebar] = useState(false);
const [patterns, setPatterns] = useState([]);
const { gameParameters: { username }, setGameParameters } = useContext(GameControlsContext);

const navigate = useNavigate();

useEffect(() => {
  getPatterns().then(({data : {patterns}}) => {
    setPatterns(patterns);
  })
}, []);

function handleClick(patternBody) {
  return () => {
    const pattern = patternBody.split(" ").map(m => m.split("").map(m => +m));
    //Array.from(Array(configuration.length), () => 0);
    setGameParameters(prev => ({...prev, isRunning: false, configuration: pattern}));
    navigate("3dgame");
  };
};

const featuredPatterns = ["Glider", "Gosper glider gun", "LWSS", "Beacon", "Toad", "HWSS", "Penta-deca", "Superlative", "Cloverleaf", "Alien craft"];

return (
  <>
  <Navbar id="nav" collapseOnSelect expand="lg" bg="dark" variant="dark">
    <Container>
      <Navbar.Brand onClick={() => navigate("/")}>Automatrix</Navbar.Brand>
      <Navbar.Toggle aria-controls="responsive-navbar-nav" />
      <Navbar.Collapse id="responsive-navbar-nav">
        <Nav className="me-auto">
          {false && <NavDropdown title="Custom patterns" id="collasible-nav-dropdown">
            {patterns.length && patterns.map((pattern, i, arr) => {
              if (i < 20) {
                 return <NavDropdown.Item key={pattern._id} onClick={handleClick(pattern.pattern_body)}>"{pattern.pattern_name}"</NavDropdown.Item>
              }
            })}
            <NavDropdown.Divider />
            <NavDropdown.Item onClick={() => navigate("patterns")}>
              All patterns
            </NavDropdown.Item>
          </NavDropdown>}
          <Nav.Link style={{color: 'rgb(255, 165, 0)', fontWeight: 'bold'}} onClick={() => navigate("3dgame")}><ThreeD /></Nav.Link>
          <Nav.Link id="two-d-nav" onClick={() => navigate("2dgame")}>2D</Nav.Link>
          <NavDropdown title="Featured patterns" id="collasible-nav-dropdown" disabled={patterns.length === 0}>
            {patterns.length && patterns.map(pattern => {
              if (featuredPatterns.includes(pattern.pattern_name)) {
                 return <NavDropdown.Item key={pattern._id} onClick={handleClick(pattern.pattern_body)}>"{pattern.pattern_name}"</NavDropdown.Item>
              }
            })}
            <NavDropdown.Divider />
            <NavDropdown.Item onClick={() => navigate("patterns")}>
              All patterns
            </NavDropdown.Item>
          </NavDropdown>
          <Nav.Link onClick={() => navigate("tutorial")}>Tutorial</Nav.Link>
          <Nav.Link onClick={() => setShowSidebar(true)}>Tips</Nav.Link>
          <Nav.Link onClick={() => navigate("patterns")}>All patterns</Nav.Link>
          {username && <Nav.Link onClick={() => navigate(`/patterns/${username}`)}>My patterns</Nav.Link>}
        </Nav>
        <Nav>
          <Nav.Link onClick={() => navigate("users")}>Users</Nav.Link>
          <Nav.Link onClick={() => navigate("comments")}>Social</Nav.Link>
          <Nav.Link onClick={() => {
            navigate(username ? "profile" : "login")
          }}>{username ? `Hi, ${username}!` : 'Login'}</Nav.Link>
          {username && <Nav.Link onClick={() => {
            setGameParameters(prev => ({...prev, username: ''}));
            window.localStorage.setItem('MTYD_APP', '');
            navigate("3dgame");
          }}>Logout</Nav.Link>}
        </Nav>
      </Navbar.Collapse>
    </Container>
  </Navbar>
  <HiddenSidebar showSidebar={showSidebar} setShowSidebar={setShowSidebar}/>
  </>
);
  
}

export default Navigation;