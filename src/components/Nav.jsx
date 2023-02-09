import { Link, useNavigate } from "react-router-dom";
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import { useState } from "react";
import HiddenSidebar from './HiddenSidebar';

function Navigation() {
const [showSidebar, setShowSidebar] = useState(false);

const navigate = useNavigate();

  return (
    <>
    <Navbar id="nav" collapseOnSelect expand="lg" bg="dark" variant="dark">
      <Container>
        <Navbar.Brand onClick={() => navigate("/")}>Automatrix</Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link onClick={() => navigate("3dgame")}>3D game</Nav.Link>
            <Nav.Link onClick={() => navigate("2dgame")}>2D game</Nav.Link>
            <NavDropdown title="Patterns" id="collasible-nav-dropdown">
              <NavDropdown.Item href="#action/3.1">Pattern #1</NavDropdown.Item>
              <NavDropdown.Item href="#action/3.2">
                Pattern #2
              </NavDropdown.Item>
              <NavDropdown.Item href="#action/3.3">Pattern #3</NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item href="#action/3.4">
                Separated link
              </NavDropdown.Item>
            </NavDropdown>
          </Nav>
          <Nav>
            <Nav.Link onClick={() => setShowSidebar(true)}>Game tips</Nav.Link>
            <Nav.Link onClick={() => navigate("users")}>Users</Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
    <HiddenSidebar showSidebar={showSidebar} setShowSidebar={setShowSidebar}/>
    </>
  );
}

export default Navigation;