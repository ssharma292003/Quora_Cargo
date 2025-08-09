import { useState } from 'react';
import { useRouter } from 'next/router';
import Header from '../components/Header';
import Footer from '../components/Footer';
import Head from 'next/head';
import Image from 'next/image';

export default function Home() {
  const [trackingId, setTrackingId] = useState('');
  const router = useRouter();

  const handleTrackSubmit = (e) => {
    e.preventDefault();
    if (!trackingId.trim()) return;
    router.push(`/shipmentDetails?trackingId=${trackingId.trim()}`);
  };

  return (
    <>
      <Head>
        <title>SwiftShip</title>
        <link
          href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css"
          rel="stylesheet"
        />
        <script
          src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/js/bootstrap.bundle.min.js"
          defer
        ></script>
      </Head>
      <Header />
      <main>
        <section
          className="d-flex align-items-center text-white"
          style={{
            backgroundImage: 'url("/image/img1.png")',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            height: '600px',
            opacity: 'revert',
            borderRadius: '20px',
            marginLeft: '80px',
            marginRight: '80px',
            marginBottom: '80px',
            marginTop: '30px',
            overflow: 'hidden',
          }}
        >
          <div
            className="position-absolute top-0 start-0 w-90 h-90"
            style={{ backgroundColor: 'rgba(0, 0, 0, 0.5)' }}
          ></div>
          <div className="container" align="center">
            <h1 className="display-4">Welcome to SwiftShip</h1>
            <p className="lead">Reliable, Fast & Secure Shipping Solutions</p>
            <a href="/book" className="btn btn-primary mt-3">
              Book Now
            </a>
          </div>
        </section>

        <section className="py-5" id="track">
          <div className="container">
            <h2 className="text-center mb-4">Track Your Shipment</h2>
            <form className="d-flex justify-content-center" onSubmit={handleTrackSubmit}>
              <input
                type="text"
                className="form-control w-50 me-2"
                placeholder="Enter Tracking ID"
                value={trackingId}
                onChange={(e) => setTrackingId(e.target.value)}
              />
              <button type="submit" className="btn btn-success">
                Track
              </button>
            </form>
          </div>
        </section>

        <section className="bg-light py-5" id="quote">
          <div className="container">
            <h2 className="text-center mb-4">Get a Quote</h2>
            <form className="row g-3">
              <div className="col-md-4">
                <input type="text" className="form-control" placeholder="Pickup Location" />
              </div>
              <div className="col-md-4">
                <input type="text" className="form-control" placeholder="Delivery Location" />
              </div>
              <div className="col-md-4">
                <input type="number" className="form-control" placeholder="Package Weight (kg)" />
              </div>
              <div className="col-12 text-center mt-3">
                <button className="btn btn-primary">Get Quote</button>
              </div>
            </form>
          </div>
        </section>

        <section className="py-5" id="info">
          <div className="container text-center">
            <h2 className="mb-4">Why Choose Us?</h2>
            <div className="row">
              <div className="col-md-4">
                <h5>Fast Delivery</h5>
                <p>On-time delivery, every time.</p>
              </div>
              <div className="col-md-4">
                <h5>Secure Tracking</h5>
                <p>Track your shipment in real-time.</p>
              </div>
              <div className="col-md-4">
                <h5>Affordable Rates</h5>
                <p>Transparent and low-cost pricing.</p>
              </div>
            </div>
          </div>
        </section>

        <section className="bg-light py-5" id="contact">
          <div className="container">
            <h2 className="text-center mb-4">Contact Us</h2>
            <form className="row g-3">
              <div className="col-md-6">
                <input type="text" className="form-control" placeholder="Your Name" />
              </div>
              <div className="col-md-6">
                <input type="email" className="form-control" placeholder="Your Email" />
              </div>
              <div className="col-12">
                <textarea className="form-control" rows="4" placeholder="Your Message"></textarea>
              </div>
              <div className="col-12 text-center">
                <button className="btn btn-success">Send Message</button>
              </div>
            </form>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
