import { useState } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { Container, Form, Button, Table, Alert } from 'react-bootstrap';
import axios from 'axios';

export default function Track() {
  const [trackingId, setTrackingId] = useState('');
  const [shipment, setShipment] = useState(null);
  const [logs, setLogs] = useState([]);
  const [error, setError] = useState('');

  const handleTrack = async () => {
    try {
      setError('');
      const res1 = await axios.get(`http://localhost:5000/api/shipments/${trackingId}`);
      const res2 = await axios.get(`http://localhost:5000/api/shipments/${trackingId}/logs`);
      setShipment(res1.data);
      setLogs(res2.data);
    } catch (err) {
      setShipment(null);
      setLogs([]);
      setError(err.response?.data?.error || 'Failed to fetch shipment');
    }
  };

  return (
    <>
      <Header />
      <Container className="py-5" style={{ maxWidth: '700px' }}>
        <h2>Track Shipment</h2>
        <Form inline="true" className="mb-3">
          <Form.Control
            placeholder="Tracking Number"
            value={trackingId}
            onChange={e => setTrackingId(e.target.value)}
            className="me-2"
          />
          <Button onClick={handleTrack}>Track</Button>
        </Form>
        {error && <Alert variant="danger">{error}</Alert>}
        {shipment && (
          <>
            <Table bordered>
              <tbody>
                {['tracking_number','sender_name','sender_address','recipient_name','recipient_address','status','franchise_id'].map(k => (
                  <tr key={k}>
                    <th>{k.replaceAll('_',' ')}</th>
                    <td>{shipment[k]}</td>
                  </tr>
                ))}
              </tbody>
            </Table>
            <h4>Logs</h4>
            <Table bordered>
              <thead><tr><th>Status</th><th>Timestamp</th></tr></thead>
              <tbody>
                {logs.map(log => (
                  <tr key={log.id}>
                    <td>{log.status}</td>
                    <td>{new Date(log.timestamp).toLocaleString()}</td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </>
        )}
        {shipment && (
          <Card className="mt-4">
            <Card.Body>
              <h5>Tracking Number: {shipment.tracking_number}</h5>
              <p><strong>Sender:</strong> {shipment.sender_name} - {shipment.sender_address}</p>
              <p><strong>Recipient:</strong> {shipment.recipient_name} - {shipment.recipient_address}</p>
              <p><strong>Status:</strong> {shipment.status}</p>
              {shipment.franchise_id && (
                <p><strong>Franchise ID:</strong> {shipment.franchise_id}</p>
              )}
            </Card.Body>
          </Card>
        )}
      </Container>
      <Footer />
    </>
  );
}
