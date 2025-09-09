import { useState } from 'react';
import axios from 'axios';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { Container, Form, Button, Alert } from 'react-bootstrap';

export default function Login() {
  const [form, setForm] = useState({
    username: '',
    password: '',
    role: 'admin',
    remember: false,
  });
  const [error, setError] = useState('');

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    try {
      const res = await axios.post('http://localhost:5000/api/auth/login', form, {
        withCredentials: true, // ✅ Include session cookies
      });

      const userRole = res.data.user.role;
      if (userRole === 'admin') {
        window.location.href = '/admin';
      } else if (userRole === 'franchise') {
        window.location.href = '/franchiseDashboard'; // update if route is different
      } else {
        window.location.href = '/';
      }

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
        <Form onSubmit={handleSubmit}>
          <Form.Group className="mb-3">
            <Form.Label>Role</Form.Label>
            <Form.Select name="role" value={form.role} onChange={handleChange} required>
              <option value="">Select your role</option>
              <option value="admin">Admin</option>
              <option value="franchise">Franchise</option>
              <option value="user">User</option>
            </Form.Select>
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Username or Email</Form.Label>
            <Form.Control
              type="text"
              name="username"
              value={form.username}
              onChange={handleChange}
              placeholder="Enter your username or email"
              required
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="password"
              name="password"
              value={form.password}
              onChange={handleChange}
              placeholder="Enter your password"
              required
            />
          </Form.Group>

          <Form.Group className="mb-3 d-flex justify-content-between align-items-center">
            <Form.Check
              type="checkbox"
              name="remember"
              label="Remember me"
              checked={form.remember}
              onChange={handleChange}
            />
            <a href="#" className="text-decoration-none small text-primary">Forgot password?</a>
          </Form.Group>

          <Button type="submit" className="w-100">Log In</Button>
        </Form>
      </Container>
      <Footer />
    </>
  );
}
