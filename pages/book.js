import Head from 'next/head';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { useState } from 'react';
import axios from 'axios';

export default function BookShipment() {
  const [formData, setFormData] = useState({
    sender_name: '',
    sender_address: '',
    recipient_name: '',
    recipient_address: '',
    franchise_id: '',
  });

  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage('');

    try {
      const res = await axios.post('http://localhost:3000/api/booking/book', formData);
      setMessage(`✅ Booking successful! Tracking Number: ${res.data.tracking_number}`);
      setFormData({
        sender_name: '',
        sender_address: '',
        recipient_name: '',
        recipient_address: '',
        franchise_id: '',
      });
    } catch (err) {
      console.error(err);
      setMessage('❌ Booking failed. Please try again.');
    }

    setLoading(false);
  };

  return (
    <>
      <Head>
        <title>Book Shipment | SwiftShip</title>
        <link
          href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css"
          rel="stylesheet"
        />
        <style>
          {`
            .card {
              border-radius: 1rem;
              box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
            }
            .form-control {
              border-radius: 0.5rem;
            }
            .btn-primary {
              background-color: #007bff;
              border-color: #007bff;
              border-radius: 0.5rem;
            }
            .btn-primary:hover {
              background-color: #0056b3;
              border-color: #0056b3;
            }
            .message {
              font-weight: bold;
              margin-top: 1rem;
            }
          `}
        </style>
      </Head>
      <Header />

      <div className="container mt-5 mb-5">
        <div className="card p-4">
          <h2 className="text-center mb-4">📦 Book a Shipment</h2>
          <form onSubmit={handleSubmit} className="row g-3">
            <div className="col-md-6">
              <input
                type="text"
                className="form-control"
                placeholder="Sender Name"
                name="sender_name"
                value={formData.sender_name}
                onChange={handleChange}
                required
              />
            </div>
            <div className="col-md-6">
              <input
                type="text"
                className="form-control"
                placeholder="Sender Address"
                name="sender_address"
                value={formData.sender_address}
                onChange={handleChange}
                required
              />
            </div>
            <div className="col-md-6">
              <input
                type="text"
                className="form-control"
                placeholder="Recipient Name"
                name="recipient_name"
                value={formData.recipient_name}
                onChange={handleChange}
                required
              />
            </div>
            <div className="col-md-6">
              <input
                type="text"
                className="form-control"
                placeholder="Recipient Address"
                name="recipient_address"
                value={formData.recipient_address}
                onChange={handleChange}
                required
              />
            </div>
            <div className="col-md-12">
              <input
                type="text"
                className="form-control"
                placeholder="Franchise ID (optional)"
                name="franchise_id"
                value={formData.franchise_id}
                onChange={handleChange}
              />
            </div>
            <div className="col-12 text-center">
              <button type="submit" className="btn btn-primary" disabled={loading}>
                {loading ? 'Booking...' : 'Book Now'}
              </button>
            </div>
            {message && (
              <div className="col-12 text-center">
                <p className={`message ${message.includes('❌') ? 'text-danger' : 'text-success'}`}>{message}</p>
              </div>
            )}
          </form>
        </div>
      </div>

      <Footer />
    </>
  );
}
