import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import axios from 'axios';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { Container, Card, Table, Alert } from 'react-bootstrap';

export default function ShipmentDetails() {
  const router = useRouter();
  const { trackingId } = router.query;

  const [shipment, setShipment] = useState(null);
  const [logs, setLogs] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    if (!trackingId) return;

    const fetchData = async () => {
      try {
        const res1 = await axios.get(`http://localhost:5000/api/shipments/${trackingId}`);
        const res2 = await axios.get(`http://localhost:5000/api/shipments/${trackingId}/logs`);
        setShipment(res1.data);
        setLogs(res2.data);
      } catch (err) {
        setError(err.response?.data?.error || 'Failed to fetch shipment data');
      }
    };

    fetchData();
  }, [trackingId]);

  return (
    <>
      <Header />
      <Container className="py-5" style={{ maxWidth: '800px' }}>
        <h2>Shipment Details</h2>
        {error && <Alert variant="danger">{error}</Alert>}
        {!shipment ? (
          <p>Loading...</p>
        ) : (
          <>
            <Card className="mb-4">
              <Card.Body>
                <h5>Tracking Number: {shipment.tracking_number}</h5>
                <p><strong>Sender:</strong> {shipment.sender_name} - {shipment.sender_address}</p>
                <p><strong>Recipient:</strong> {shipment.recipient_name} - {shipment.recipient_address}</p>
                <p><strong>Status:</strong> {shipment.status}</p>
                {shipment.franchises && (
                  <>
                    <p><strong>Franchise:</strong> {shipment.franchises.name}</p>
                    <p><strong>Address:</strong> {shipment.franchises.address}</p>
                  </>
                )}
              </Card.Body>
            </Card>

            <h4>Shipment Logs</h4>
            {logs.length === 0 ? (
              <p>No logs available.</p>
            ) : (
              <Table bordered>
                <thead>
                  <tr>
                    <th>Status</th>
                    <th>Timestamp</th>
                  </tr>
                </thead>
                <tbody>
                  {logs.map(log => (
                    <tr key={log.id}>
                      <td>{log.status}</td>
                      <td>{new Date(log.timestamp).toLocaleString()}</td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            )}
          </>
        )}
      </Container>
      <Footer />
    </>
  );
}
