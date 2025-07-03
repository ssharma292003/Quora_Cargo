import { useState } from 'react';
import axios from 'axios';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { Container, Form, Button, Alert } from 'react-bootstrap';

export default function Login() {
  const [form, setForm] = useState({ username: '', password: '' });
  const [error, setError] = useState('');
  const [user, setUser] = useState(null);

  const handleChange = e =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async e => {
    e.preventDefault();
    setError('');
    try {
      const res = await axios.post('http://localhost:5000/api/auth/login', form);
      setUser(res.data.user);
    } catch (err) {
      setError(err.response?.data?.error || 'Login failed');
    }
  };

  return (
    <>
      <Header />
      <Container className="py-5" style={{ maxWidth: '500px' }}>
        <h2>Login</h2>
        {error && <Alert variant="danger">{error}</Alert>}
        {user && <Alert variant="success">Welcome {user.username} (Role: {user.role})</Alert>}
        <Form onSubmit={handleSubmit}>
          <Form.Group className="mb-3">
            <Form.Label>Username</Form.Label>
            <Form.Control name="username" onChange={handleChange} required />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Password</Form.Label>
            <Form.Control name="password" type="password" onChange={handleChange} required />
          </Form.Group>
          <Button type="submit">Login</Button>
        </Form>
      </Container>
      <Footer />
    </>
  );
}
