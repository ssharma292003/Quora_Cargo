import { useState, useEffect } from 'react';
import axios from 'axios';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { Container, Table, Button, Alert } from 'react-bootstrap';
import { getToken, getRole } from '../utils/auth';

export default function Admin() {
  const [requests, setRequests] = useState([]);
  const [msg, setMsg] = useState('');

  const fetchReq = async () => {
    try {
      const res = await axios.get('http://localhost:5000/api/booking-requests', {
        headers: { Authorization: `Bearer ${getToken()}` }
      });
      setRequests(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  const approve = async id => {
    try {
      await axios.patch(
        `http://localhost:5000/api/booking-requests/${id}/status`,
        {},
        { headers: { Authorization: `Bearer ${getToken()}` } }
      );
      setMsg(`Booking ${id} approved`);
      fetchReq();
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    if (getRole() !== 'admin') window.location.href = '/login';
    else fetchReq();
  }, []);

  return (
    <>
      <Header />
      <Container className="py-5">
        <h2>Booking Requests</h2>
        {msg && <Alert variant="success">{msg}</Alert>}
        <Table>
          <thead>
            <tr><th>ID</th><th>Shipment ID</th><th>Approved?</th><th>Action</th></tr>
          </thead>
          <tbody>
            {requests.map(r => (
              <tr key={r.id}>
                <td>{r.id}</td>
                <td>{r.shipment_id}</td>
                <td>{r.approved ? 'Yes' : 'No'}</td>
                <td>
                  {!r.approved && (
                    <Button onClick={() => approve(r.id)}>Approve</Button>
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
