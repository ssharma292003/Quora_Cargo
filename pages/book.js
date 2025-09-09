// pages/book-shipment.js
import Head from 'next/head';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { useState, useEffect } from 'react';
import axios from 'axios';
import { getCurrentUser } from '../utils/auth';

export default function BookShipment() {
  const [formData, setFormData] = useState({
    sender_name: '',
    sender_address: '',
    recipient_name: '',
    recipient_address: '',
    franchise_id: '',
    pickup_date: '',
    pickup_location: '',
    linehaul_route: '',
    delivery_mode: '',
    delivery_date: '',
  });

  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState(null);

  useEffect(() => {
    getCurrentUser().then((user) => {
      if (!user) {
        window.location.href = '/login';
      } else {
        setUser(user);
      }
    });
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage('');

    try {
      const res = await axios.post('http://localhost:5000/api/bookings/book', formData, {
        withCredentials: true,
      });

      setMessage(`✅ Booking successful! Tracking Number: ${res.data.tracking_number}`);
      setFormData({
        sender_name: '',
        sender_address: '',
        recipient_name: '',
        recipient_address: '',
        franchise_id: '',
        pickup_date: '',
        pickup_location: '',
        linehaul_route: '',
        delivery_mode: '',
        delivery_date: '',
      });
    } catch (err) {
      console.error(err);
      setMessage('❌ Booking failed. Please try again.');
    }

    setLoading(false);
  };

  if (!user) return null;

  return (
    <>
      <Head>
        <title>Book Shipment | SwiftShip</title>
      </Head>

      <Header />

      <div className="container mt-5 mb-5">
        <div className="card p-4">
          <h2 className="text-center mb-4">📦 Book a Shipment</h2>
          <form onSubmit={handleSubmit} className="row g-3">
            {/* Sender + Recipient */}
            <div className="col-md-6">
              <input type="text" className="form-control" placeholder="Sender Name" name="sender_name"
                value={formData.sender_name} onChange={handleChange} required />
            </div>
            <div className="col-md-6">
              <input type="text" className="form-control" placeholder="Sender Address" name="sender_address"
                value={formData.sender_address} onChange={handleChange} required />
            </div>
            <div className="col-md-6">
              <input type="text" className="form-control" placeholder="Recipient Name" name="recipient_name"
                value={formData.recipient_name} onChange={handleChange} required />
            </div>
            <div className="col-md-6">
              <input type="text" className="form-control" placeholder="Recipient Address" name="recipient_address"
                value={formData.recipient_address} onChange={handleChange} required />
            </div>

            {/* Planning Fields */}
            <div className="col-md-6">
              <input type="date" className="form-control" name="pickup_date"
                value={formData.pickup_date} onChange={handleChange} />
            </div>
            <div className="col-md-6">
              <input type="text" className="form-control" placeholder="Pickup Location" name="pickup_location"
                value={formData.pickup_location} onChange={handleChange} />
            </div>
            <div className="col-md-6">
              <input type="text" className="form-control" placeholder="Linehaul Route" name="linehaul_route"
                value={formData.linehaul_route} onChange={handleChange} />
            </div>
            <div className="col-md-6">
              <input type="text" className="form-control" placeholder="Delivery Mode" name="delivery_mode"
                value={formData.delivery_mode} onChange={handleChange} />
            </div>
            <div className="col-md-6">
              <input type="date" className="form-control" name="delivery_date"
                value={formData.delivery_date} onChange={handleChange} />
            </div>

            {/* Franchise */}
            <div className="col-md-12">
              <input type="text" className="form-control" placeholder="Franchise ID (optional)" name="franchise_id"
                value={formData.franchise_id} onChange={handleChange} />
            </div>

            <div className="col-12 text-center">
              <button type="submit" className="btn btn-primary" disabled={loading}>
                {loading ? 'Booking...' : 'Book Now'}
              </button>
            </div>
            {message && (
              <div className="col-12 text-center">
                <p className={`fw-bold mt-3 ${message.includes('❌') ? 'text-danger' : 'text-success'}`}>{message}</p>
              </div>
            )}
          </form>
        </div>
      </div>

      <Footer />
    </>
  );
}
