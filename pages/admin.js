// pages/admin-dashboard.js
import { useState, useEffect } from 'react';
import axios from 'axios';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { Container, Table, Button, Alert, Form, Row, Col } from 'react-bootstrap';
import { getCurrentUser } from '../utils/auth';

export default function AdminDashboard() {
  const [shipments, setShipments] = useState([]);
  const [bookings, setBookings] = useState([]);
  const [msg, setMsg] = useState('');
  const [formData, setFormData] = useState({
    sender_name: '',
    sender_address: '',
    recipient_name: '',
    recipient_address: '',
    franchise_id: '',
    pickup_date: '',
    pickup_location: '',
    linehaul_route: '',
    delivery_mode: '',
    delivery_date: '',
  });

  // Fetch shipments + bookings
  const fetchData = async () => {
    try {
      const [shipmentsRes, bookingsRes] = await Promise.all([
        axios.get('http://localhost:5000/api/shipments', { withCredentials: true }),
        axios.get('http://localhost:5000/api/bookings/admin/booking-requests', { withCredentials: true }),
      ]);
      setShipments(shipmentsRes.data);
      setBookings(bookingsRes.data);
    } catch (err) {
      console.error(err);
    }
  };

  // Handle form input
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Submit booking
  const handleBookingSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post('http://localhost:5000/api/bookings/book', formData, {
        withCredentials: true,
      });
      setMsg(`✅ Booking created. Tracking Number: ${res.data.tracking_number}`);
      setFormData({
        sender_name: '',
        sender_address: '',
        recipient_name: '',
        recipient_address: '',
        franchise_id: '',
        pickup_date: '',
        pickup_location: '',
        linehaul_route: '',
        delivery_mode: '',
        delivery_date: '',
      });
      fetchData();
    } catch (err) {
      console.error(err);
      setMsg('❌ Failed to book shipment.');
    }
  };

  // Approve/reject booking
  const updateBookingStatus = async (id, status) => {
    try {
      await axios.patch(
        `http://localhost:5000/api/bookings/status/${id}`,
        { status },
        { withCredentials: true }
      );
      setMsg(`Booking ${status}`);
      fetchData();
    } catch (err) {
      console.error(err);
    }
  };

  // Update shipment workflow
  const updateShipmentStatus = async (id, status) => {
    try {
      await axios.patch(
        `http://localhost:5000/api/shipments/${id}/status`,
        { status },
        { withCredentials: true }
      );
      setMsg(`Shipment ${id} updated to ${status}`);
      fetchData();
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    async function checkAccess() {
      const user = await getCurrentUser();
      if (!user || user.role !== 'admin') {
        window.location.href = '/login';
      } else {
        fetchData();
      }
    }
    checkAccess();
  }, []);

  return (
    <>
      <Header />
      <Container className="py-5">
        <h2>📦 Admin Dashboard</h2>
        {msg && <Alert variant="info">{msg}</Alert>}

        {/* Booking Form */}
        <div className="card p-4 mb-4">
          <h4>Book a New Shipment</h4>
          <Form onSubmit={handleBookingSubmit}>
            <Row className="mb-2">
              <Col><Form.Control name="sender_name" placeholder="Sender Name" value={formData.sender_name} onChange={handleChange} required /></Col>
              <Col><Form.Control name="sender_address" placeholder="Sender Address" value={formData.sender_address} onChange={handleChange} required /></Col>
            </Row>
            <Row className="mb-2">
              <Col><Form.Control name="recipient_name" placeholder="Recipient Name" value={formData.recipient_name} onChange={handleChange} required /></Col>
              <Col><Form.Control name="recipient_address" placeholder="Recipient Address" value={formData.recipient_address} onChange={handleChange} required /></Col>
            </Row>
            <Row className="mb-2">
              <Col><Form.Control type="date" name="pickup_date" value={formData.pickup_date} onChange={handleChange} /></Col>
              <Col><Form.Control name="pickup_location" placeholder="Pickup Location" value={formData.pickup_location} onChange={handleChange} /></Col>
            </Row>
            <Row className="mb-2">
              <Col><Form.Control name="linehaul_route" placeholder="Linehaul Route" value={formData.linehaul_route} onChange={handleChange} /></Col>
              <Col><Form.Control name="delivery_mode" placeholder="Delivery Mode" value={formData.delivery_mode} onChange={handleChange} /></Col>
            </Row>
            <Row className="mb-2">
              <Col><Form.Control type="date" name="delivery_date" value={formData.delivery_date} onChange={handleChange} /></Col>
              <Col><Form.Control name="franchise_id" placeholder="Franchise ID (optional)" value={formData.franchise_id} onChange={handleChange} /></Col>
            </Row>
            <Button type="submit" variant="primary">Book Shipment</Button>
          </Form>
        </div>

        {/* Bookings Table */}
        <h4>Booking Requests</h4>
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>ID</th>
              <th>Shipment ID</th>
              <th>Approved</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {bookings.map((b) => (
              <tr key={b.id}>
                <td>{b.id}</td>
                <td>{b.shipment_id}</td>
                <td>{b.approved ? '✅ Approved' : '❌ Pending'}</td>
                <td>
                  {!b.approved && (
                    <>
                      <Button size="sm" variant="success" className="me-2"
                        onClick={() => updateBookingStatus(b.id, 'approved')}>
                        Approve
                      </Button>
                      <Button size="sm" variant="danger"
                        onClick={() => updateBookingStatus(b.id, 'rejected')}>
                        Reject
                      </Button>
                    </>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </Table>

        {/* Shipments Table */}
        <h4 className="mt-5">All Shipments</h4>
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>ID</th>
              <th>Tracking Number</th>
              <th>Status</th>
              <th>Franchise</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {shipments.map((s) => (
              <tr key={s.id}>
                <td>{s.id}</td>
                <td>{s.tracking_number}</td>
                <td>{s.status}</td>
                <td>{s.franchise?.name || 'N/A'}</td>
                <td>
                  {s.status === 'PENDING' && (
                    <Button size="sm" onClick={() => updateShipmentStatus(s.id, 'PICKUP_PLANNING')} variant="warning">Start Pickup</Button>
                  )}
                  {s.status === 'PICKUP_PLANNING' && (
                    <Button size="sm" onClick={() => updateShipmentStatus(s.id, 'LINEHAUL_PLANNING')} variant="info">Linehaul</Button>
                  )}
                  {s.status === 'LINEHAUL_PLANNING' && (
                    <Button size="sm" onClick={() => updateShipmentStatus(s.id, 'DELIVERY_PLANNING')} variant="secondary">Delivery Planning</Button>
                  )}
                  {s.status === 'DELIVERY_PLANNING' && (
                    <Button size="sm" onClick={() => updateShipmentStatus(s.id, 'ALLOCATED')} variant="dark">Allocate</Button>
                  )}
                  {s.status === 'ALLOCATED' && (
                    <Button size="sm" onClick={() => updateShipmentStatus(s.id, 'OUTSCAN')} variant="primary">Outscan</Button>
                  )}
                  {s.status === 'OUTSCAN' && (
                    <Button size="sm" onClick={() => updateShipmentStatus(s.id, 'INSCAN')} variant="primary">Inscan</Button>
                  )}
                  {s.status === 'INSCAN' && (
                    <Button size="sm" onClick={() => updateShipmentStatus(s.id, 'FORWARDER')} variant="primary">Forwarder</Button>
                  )}
                  {s.status === 'FORWARDER' && (
                    <>
                      <Button size="sm" variant="success" className="me-2"
                        onClick={() => updateShipmentStatus(s.id, 'DELIVERED')}>
                        Delivered
                      </Button>
                      <Button size="sm" variant="danger"
                        onClick={() => updateShipmentStatus(s.id, 'UNDELIVERED')}>
                        Undelivered
                      </Button>
                    </>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </Container>
      <Footer />
    </>
  );
}
