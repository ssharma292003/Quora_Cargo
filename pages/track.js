import { useState } from 'react';
import { useRouter } from 'next/router'; // ✅ Import useRouter here
import Header from '../components/Header';
import Footer from '../components/Footer';
import { Container, Form, Button, Table, Alert, Card } from 'react-bootstrap';
import axios from 'axios';

export default function Track() {
  const router = useRouter(); // ✅ Initialize router inside the component

  const [trackingId, setTrackingId] = useState('');
  const [shipment, setShipment] = useState(null);
  const [logs, setLogs] = useState([]);
  const [error, setError] = useState('');

  const handleTrack = () => {
    if (!trackingId.trim()) {
      setError('Please enter a tracking number');
      return;
    }

    router.push(`/shipmentDetails?trackingId=${trackingId.trim()}`); // ✅ Redirects now
  };

  return (
    <>
      <Header />
      <Container className="py-5" style={{ maxWidth: '800px' }}>
        <h2 className="mb-4">Track Shipment</h2>

        <Form className="d-flex mb-3" onSubmit={e => { e.preventDefault(); handleTrack(); }}>
          <Form.Control
            type="text"
            placeholder="Enter Tracking Number"
            value={trackingId}
            onChange={e => setTrackingId(e.target.value)}
            className="me-2"
          />
          <Button onClick={handleTrack}>Track</Button>
        </Form>

        {error && <Alert variant="danger">{error}</Alert>}
      </Container>
      <Footer />
    </>
  );
}
