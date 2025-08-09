import { useState, useEffect } from 'react';
import axios from 'axios';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { Container, Table, Button, Alert } from 'react-bootstrap';
import { getCurrentUser } from '../utils/auth';

export default function AdminShipments() {
  const [shipments, setShipments] = useState([]);
  const [msg, setMsg] = useState('');

  const fetchShipments = async () => {
    try {
      const res = await axios.get('http://localhost:5000/api/shipments', {
        withCredentials: true
      });
      setShipments(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  const approveShipment = async id => {
    try {
      await axios.patch(
        `http://localhost:5000/api/shipments/${id}/status`,
        { status: 'Accepted' },
        { withCredentials: true }
      );
      setMsg(`Shipment ${id} marked as Accepted`);
      fetchShipments(); // Refresh list
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
        fetchShipments();
      }
    }
    checkAccess();
  }, []);

  return (
    <>
      <Header />
      <Container className="py-5">
        <h2>All Shipments</h2>
        {msg && <Alert variant="success">{msg}</Alert>}
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>ID</th>
              <th>Tracking Number</th>
              <th>Status</th>
              <th>Franchise</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {shipments.map(s => (
              <tr key={s.id}>
                <td>{s.id}</td>
                <td>{s.tracking_number}</td>
                <td>{s.status}</td>
                <td>{s.franchise?.name || 'N/A'}</td>
                <td>
                  {s.status === 'Pending Approval' && (
                    <Button variant="success" onClick={() => approveShipment(s.id)}>
                      Accept
                    </Button>
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
