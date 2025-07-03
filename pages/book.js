import { useState } from 'react';
import axios from 'axios';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { Container, Form, Button, Alert } from 'react-bootstrap';

export default function Book() {
  const [form, setForm] = useState({
    tracking_number: '', sender_name: '', sender_address: '',
    recipient_name: '', recipient_address: '',
    status: 'Pending', franchise_id: '',
  });
  const [message, setMessage] = useState('');

  const handleChange = e => setForm({ ...form, [e.target.name]: e.target.value });
  const handleSubmit = async e => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:5000/api/shipments', form);
      setMessage('Shipment created successfully!');
    } catch (err) {
      setMessage(err.response?.data?.error || 'Failed to create shipment');
    }
  };

  return (
    <>
      <Header />
      <Container className="py-5" style={{ maxWidth: '600px' }}>
        <h2>Book a Shipment</h2>
        {message && <Alert variant="info">{message}</Alert>}
        <Form onSubmit={handleSubmit}>
          {['tracking_number','sender_name','sender_address','recipient_name','recipient_address','franchise_id'].map(name => (
            <Form.Group key={name} className="mb-3">
              <Form.Label>{name.replaceAll('_', ' ')}</Form.Label>
              <Form.Control name={name} onChange={handleChange} />
            </Form.Group>
          ))}
          <Button type="submit">Create Shipment</Button>
        </Form>
      </Container>
      <Footer />
    </>
  );
}
