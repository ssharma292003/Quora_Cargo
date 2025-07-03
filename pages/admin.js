import { useState, useEffect } from 'react';
import axios from 'axios';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { Container, Table, Button, Alert } from 'react-bootstrap';

export default function Admin() {
  const [requests, setRequests] = useState([]);
  const [message, setMessage] = useState('');

  const fetchRequests = async () => {
    try {
      const res = await axios.get('http://localhost:5000/api/booking-requests');
      setRequests(res.data);
    } catch {}
  };

  const handleApprove = async id => {
    await axios.patch(`http://localhost:5000/api/booking-requests/${id}/status`);
    setMessage(`Request ${id} approved`);
    fetchRequests();
  };

  useEffect(() => { fetchRequests(); }, []);

  return (
    <>
      <Header />
      <Container className="py-5">
        <h2>Booking Requests</h2>
        {message && <Alert variant="success">{message}</Alert>}
        <Table>
          <thead><tr><th>ID</th><th>Shipment</th><th>Approved</th><th>Action</th></tr></thead>
          <tbody>
            {requests.map(r => (
              <tr key={r.id}>
                <td>{r.id}</td>
                <td>{r.shipment_id}</td>
                <td>{r.approved ? 'Yes' : 'No'}</td>
                <td>
                  {!r.approved && (
                    <Button onClick={() => handleApprove(r.id)}>Approve</Button>
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
