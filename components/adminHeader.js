// components/AdminHeader.js
import Link from 'next/link';
import { Navbar, Nav, Container } from 'react-bootstrap';

export default function AdminHeader() {
  return (
    <Navbar bg="primary" variant="dark" expand="lg">
      <Container>
        <Navbar.Brand as={Link} href="/adminDashboard">Admin Panel</Navbar.Brand>
        <Navbar.Toggle aria-controls="admin-navbar-nav" />
        <Navbar.Collapse id="admin-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link as={Link} href="/adminDashboard">Dashboard</Nav.Link>
            <Nav.Link as={Link} href="/manageUsers">Manage Users</Nav.Link>
            <Nav.Link as={Link} href="/manageFranchises">Franchises</Nav.Link>
            <Nav.Link as={Link} href="/allShipments">All Shipments</Nav.Link>
            <Nav.Link as={Link} href="/logout">Logout</Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}
