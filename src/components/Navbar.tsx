import React from "react";
import { useNavigate } from "react-router-dom";
import { Container, Navbar, Nav, Button } from "react-bootstrap";

const NavbarComponent: React.FC = () => {
  const navigate = useNavigate();
  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/");
  };

  return (
    <Navbar expand="lg" className="bg-body-tertiary">
      <Container>
        <Navbar.Brand href="#home">Home</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link href="/createTicket">Create Ticket</Nav.Link>
            <Nav.Link href="/trakingCases">Traking Cases</Nav.Link>
          </Nav>
          <Nav>
            <Button variant="danger" onClick={handleLogout}>
              Logout
            </Button>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default NavbarComponent;
