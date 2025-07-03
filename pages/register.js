import { useState } from 'react';
import axios from 'axios';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { Container, Form, Button, Alert } from 'react-bootstrap';

export default function Register() {
  const [form, setForm] = useState({
    username: '',
    password: '',
    role: 'user',
    franchise_id: '',
  });
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  const handleChange = e =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async e => {
    e.preventDefault();
    setError('');
    setMessage('');
    try {
      const payload = {
        username: form.username,
        password: form.password,
        role: form.role,
        franchise_id: form.franchise_id ? parseInt(form.franchise_id) : undefined,
      };

      await axios.post('http://localhost:5000/api/auth/register', payload);
      setMessage('Registered successfully. You can now login.');
      setForm({ username: '', password: '', role: 'user', franchise_id: '' });
    } catch (err) {
      setError(err.response?.data?.error || 'Registration failed');
    }
  };

  return (
    <>
      <Header />
      <Container className="py-5" style={{ maxWidth: '500px' }}>
        <h2>Register</h2>
        {message && <Alert variant="success">{message}</Alert>}
        {error && <Alert variant="danger">{error}</Alert>}
        <Form onSubmit={handleSubmit}>
          <Form.Group className="mb-3">
            <Form.Label>Username</Form.Label>
            <Form.Control name="username" value={form.username} onChange={handleChange} required />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Password</Form.Label>
            <Form.Control name="password" type="password" value={form.password} onChange={handleChange} required />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Role</Form.Label>
            <Form.Select name="role" value={form.role} onChange={handleChange}>
              <option value="user">User</option>
              <option value="franchise">Franchise</option>
              <option value="admin">Admin</option>
            </Form.Select>
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Franchise ID (optional)</Form.Label>
            <Form.Control
              name="franchise_id"
              value={form.franchise_id}
              onChange={handleChange}
              type="number"
              placeholder="Enter Franchise ID if applicable"
            />
          </Form.Group>
          <Button type="submit">Register</Button>
        </Form>
      </Container>
      <Footer />
    </>
  );
}
