// components/FranchiseHeader.js
import Link from 'next/link';
import { Navbar, Nav, Container } from 'react-bootstrap';

export default function FranchiseHeader() {
  return (
    <Navbar bg="dark" variant="dark" expand="lg">
      <Container>
        <Navbar.Brand as={Link} href="/franchiseDashboard">Franchise Panel</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link as={Link} href="/franchiseDashboard">Dashboard</Nav.Link>
            <Nav.Link as={Link} href="/franchiseShipments">Shipments</Nav.Link>
            <Nav.Link as={Link} href="/franchiseLogs">Logs</Nav.Link>
            <Nav.Link as={Link} href="/logout">Logout</Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}
