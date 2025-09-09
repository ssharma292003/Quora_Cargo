import { useState, useEffect, useCallback, useMemo } from 'react';
import { useRouter } from 'next/router';
import Header from '../components/Header';
import Footer from '../components/Footer';
import Image from 'next/image';
import Link from 'next/link';
import Head from 'next/head';
import AOS from 'aos';
import 'aos/dist/aos.css';
// import '../styles/Home.css';

export default function Home() {
  const [trackingId, setTrackingId] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [ripples, setRipples] = useState([]);
  const [clients, setClients] = useState(0);
  const [shipments, setShipments] = useState(0);
  const [reviews, setReviews] = useState(0);
  const [countries, setCountries] = useState(0);
  const router = useRouter();

  const theme = useMemo(() => ({
    primary: '#FF6B35',
    secondary: '#FF4500',
    accent: '#FFB366',
    light: '#F9FAFB',
    dark: '#CC4A00',
    navy: '#1A1A2E',
  }), []);

  useEffect(() => {
    AOS.init({ duration: 1000, once: true, easing: 'ease-out-cubic' });

    let c = 0, s = 0, r = 0, co = 0;
    const counter = setInterval(() => {
      if (c < 25000) setClients(c += 500);
      if (s < 100000) setShipments(s += 2000);
      if (r < 50000) setReviews(r += 1000);
      if (co < 195) setCountries(co += 4);

      if (c >= 25000 && s >= 100000 && r >= 50000 && co >= 195) {
        clearInterval(counter);
      }
    }, 50);

    return () => clearInterval(counter);
  }, []);

  const handleTrackSubmit = useCallback(async (e) => {
    e.preventDefault();
    if (!trackingId.trim()) return;
    setIsLoading(true);
    await new Promise(resolve => setTimeout(resolve, 800));
    router.push(`/shipmentDetails?trackingId=${trackingId.trim()}`);
  }, [trackingId, router]);

  const createRipple = useCallback((event) => {
    const button = event.currentTarget;
    const rect = button.getBoundingClientRect();
    const size = Math.max(rect.width, rect.height);
    const x = event.clientX - rect.left - size / 2;
    const y = event.clientY - rect.top - size / 2;
    const newRipple = { x, y, size, id: Date.now() };
    setRipples(prev => [...prev, newRipple]);
    setTimeout(() => {
      setRipples(prev => prev.filter(ripple => ripple.id !== newRipple.id));
    }, 600);
  }, []);

  return (
    <>
      <Head>
        <title>Quora Cargo — Home</title>
        <meta name="description" content="Quora Cargo and Logistics LLP — Reliable, Efficient & Transparent Logistics Solutions" />
      </Head>

      <Header />
      <main style={{ backgroundColor: theme.light }}>

        {/* HERO */}
        <section className="d-flex align-items-center text-white rounded-4 shadow-lg hero-section">
          <div className="position-absolute top-0 start-0 w-100 h-100 overlay"></div>
          <div className="container position-relative text-center" data-aos="fade-up">
            <h1 className="display-3 fw-bold mb-3">Welcome to Quora Cargo</h1>
            <p className="lead mb-4 fs-4">Reliable, Efficient & Transparent Logistics Solutions</p>
            <Link href="/track" className="btn btn-lg ripple btn-orange">🚀 Track Now</Link>
          </div>
        </section>

        <hr className="soft-divider" />

        {/* Track Section */}
        <section className="py-5" id="track">
          <div className="container">
            <div className="text-center mb-5" data-aos="fade-up">
              <h2 className="section-title display-5">
                <i className="fa fa-search me-3" style={{ color: theme.primary }}></i>
                Track Your Cargo
              </h2>
              <p className="section-subtitle">Enter your tracking ID to get real-time updates</p>
            </div>

            <div className="row justify-content-center" data-aos="fade-up" data-aos-delay="200">
              <div className="col-lg-8">
                <form onSubmit={handleTrackSubmit} className="card-clean">
                  <div className="row g-3 align-items-end">
                    <div className="col-md-8">
                      <input
                        type="text"
                        className="form-control"
                        placeholder="🚚 Enter your tracking ID..."
                        value={trackingId}
                        onChange={(e) => setTrackingId(e.target.value)}
                        disabled={isLoading}
                      />
                    </div>
                    <div className="col-md-4">
                      <button type="submit" className="btn btn-orange w-100 ripple" onClick={createRipple} disabled={isLoading}>
                        {isLoading ? (<> <div className="loading-spinner me-2 d-inline-block"></div>Tracking...</>) : (<> <i className="fa fa-search me-2"></i>Track Now</>)}
                      </button>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </section>

        <hr className="soft-divider" />

        {/* Get Instant Quote */}
        <section className="py-5 bg-white" id="quote">
          <div className="container">
            <div className="text-center mb-5" data-aos="fade-up">
              <h2 className="section-title display-4">Get Instant Quote</h2>
              <p className="section-subtitle">Fast and transparent pricing for your shipments</p>
            </div>
            <div className="row justify-content-center">
              <div className="col-lg-8">
                <form className="card-clean p-4">
                  <div className="row g-4">
                    <div className="col-md-6">
                      <input type="text" className="form-control" placeholder="Pickup Location" />
                    </div>
                    <div className="col-md-6">
                      <input type="text" className="form-control" placeholder="Delivery Location" />
                    </div>
                    <div className="col-md-6">
                      <input type="text" className="form-control" placeholder="Weight (kg)" />
                    </div>
                    <div className="col-md-6">
                      <input type="text" className="form-control" placeholder="Dimensions (LxWxH)" />
                    </div>
                    <div className="col-12 text-center">
                      <button type="button" className="btn btn-orange ripple">
                        <i className="fa fa-calculator me-2"></i>Get Quote
                      </button>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </section>

        <hr className="soft-divider" />

        {/* Stats */}
        <section className="section stats-section">
          <div className="container text-center">
            <h2 className="section-title">Our Global Impact</h2>
            <p className="section-subtitle">Trusted logistics solutions across industries and borders</p>
            <div className="stats-grid">
              <div className="stats-card" data-aos="fade-up">
                <div className="stats-icon-box"><i className="fa fa-users"></i></div>
                <h3>{clients.toLocaleString()}+</h3>
                <p>Happy Clients</p>
              </div>
              <div className="stats-card" data-aos="fade-up" data-aos-delay="150">
                <div className="stats-icon-box"><i className="fa fa-box"></i></div>
                <h3>{shipments.toLocaleString()}+</h3>
                <p>Shipments Delivered</p>
              </div>
              <div className="stats-card" data-aos="fade-up" data-aos-delay="300">
                <div className="stats-icon-box"><i className="fa fa-star"></i></div>
                <h3>{reviews.toLocaleString()}+</h3>
                <p>Positive Reviews</p>
              </div>
              <div className="stats-card" data-aos="fade-up" data-aos-delay="450">
                <div className="stats-icon-box"><i className="fa fa-globe"></i></div>
                <h3>{countries.toLocaleString()}+</h3>
                <p>Countries Covered</p>
              </div>
            </div>
          </div>
        </section>

        <hr className="soft-divider" />

        {/* Why Choose Us */}
        <section className="py-5" id="info">
          <div className="container text-center">
            <h2 className="section-title display-4">Why Choose Quora Cargo?</h2>
            <p className="section-subtitle">Discover what makes us the preferred logistics partner</p>
            <div className="row g-4 mt-4">
              <div className="col-lg-4" data-aos="fade-up">
                <div className="feature-card">
                  <i className="fa fa-truck fa-3x mb-3" style={{ color: theme.primary }}></i>
                  <h5 className="fw-bold">100+ Fleet Strength</h5>
                  <p className="text-muted">Reliable transport capacity with our own fleet of vehicles.</p>
                </div>
              </div>
              <div className="col-lg-4" data-aos="fade-up" data-aos-delay="200">
                <div className="feature-card">
                  <i className="fa fa-user-tie fa-3x mb-3" style={{ color: theme.secondary }}></i>
                  <h5 className="fw-bold">50+ Years of Leadership</h5>
                  <p className="text-muted">Decades of combined experience in transportation & logistics.</p>
                </div>
              </div>
              <div className="col-lg-4" data-aos="fade-up" data-aos-delay="400">
                <div className="feature-card">
                  <i className="fa fa-cogs fa-3x mb-3" style={{ color: theme.primary }}></i>
                  <h5 className="fw-bold">Tech-Enabled Processes</h5>
                  <p className="text-muted">Smart tracking, transparency, and customer support systems.</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        <hr className="soft-divider" />

        {/* Our Premium Services */}
        <section className="py-5 bg-white" id="premium">
          <div className="container text-center">
            <h2 className="section-title display-4">Our Premium Services</h2>
            <p className="section-subtitle">We provide specialized cargo solutions for every need</p>
            <div className="row g-4 mt-4">
              <div className="col-lg-3 col-md-6" data-aos="fade-up">
                <div className="service-card h-100">
                  <i className="fa fa-plane fa-3x mb-3" style={{ color: theme.primary }}></i>
                  <h5 className="fw-bold">Air Freight</h5>
                  <p className="text-muted">Fast and secure delivery by air for urgent shipments.</p>
                </div>
              </div>
              <div className="col-lg-3 col-md-6" data-aos="fade-up" data-aos-delay="150">
                <div className="service-card h-100">
                  <i className="fa fa-ship fa-3x mb-3" style={{ color: theme.secondary }}></i>
                  <h5 className="fw-bold">Sea Freight</h5>
                  <p className="text-muted">Cost-effective cargo movement via ocean routes.</p>
                </div>
              </div>
              <div className="col-lg-3 col-md-6" data-aos="fade-up" data-aos-delay="300">
                <div className="service-card h-100">
                  <i className="fa fa-truck fa-3x mb-3" style={{ color: theme.primary }}></i>
                  <h5 className="fw-bold">Road Transport</h5>
                  <p className="text-muted">Efficient domestic trucking across India.</p>
                </div>
              </div>
              <div className="col-lg-3 col-md-6" data-aos="fade-up" data-aos-delay="450">
                <div className="service-card h-100">
                  <i className="fa fa-warehouse fa-3x mb-3" style={{ color: theme.secondary }}></i>
                  <h5 className="fw-bold">Warehousing</h5>
                  <p className="text-muted">Safe storage facilities with modern infrastructure.</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        <hr className="soft-divider" />

        {/* Features */}
        <section className="py-5 bg-white">
          <div className="container">
            <div className="row g-5 align-items-center">
              <div className="col-lg-6" data-aos="fade-right">
                <h6 className="text-uppercase fw-bold mb-3" style={{ color: theme.primary }}>Our Features</h6>
                <h2 className="section-title mb-4">We Are Trusted Logistics Company Since 1990</h2>
                <div className="d-flex mb-4">
                  <i className="fa fa-globe fa-2x me-3" style={{ color: theme.primary }}></i>
                  <div><h5>Nationwide Coverage</h5><p className="text-muted">Pan-India presence with reliable fleet and network.</p></div>
                </div>
                <div className="d-flex mb-4">
                  <i className="fa fa-shipping-fast fa-2x me-3" style={{ color: theme.primary }}></i>
                  <div><h5>On-Time Delivery</h5><p className="text-muted">Committed to efficiency and timely shipments.</p></div>
                </div>
                <div className="d-flex">
                  <i className="fa fa-headset fa-2x me-3" style={{ color: theme.primary }}></i>
                  <div><h5>24/7 Support</h5><p className="text-muted">Round-the-clock assistance for clients.</p></div>
                </div>
              </div>
              <div className="col-lg-6" data-aos="fade-left">
                <img className="img-fluid rounded-4 shadow" src="/image/img1.png" alt="Quora Cargo" />
              </div>
            </div>
          </div>
        </section>

        <hr className="soft-divider" />

        {/* Contact */}
        {/* (rest of your code continues unchanged: Pricing, Team, Testimonials, Contact) */}
 <section className="contact-section" id="contact">
          <div className="container">
            <div className="text-center mb-5" data-aos="fade-up">
              <h2 className="section-title display-4">Contact Us</h2>
              <p className="section-subtitle">
                We’d love to hear from you. Get in touch with our team today.
              </p>
            </div>

            <div className="row g-5 align-items-stretch">
              {/* Contact Form */}
              <div className="col-lg-7" data-aos="fade-right">
                <div className="contact-card">
                  <form>
                    <div className="row g-4">
                      <div className="col-md-6">
                        <div className="form-group">
                          <i className="fa fa-user"></i>
                          <input type="text" className="form-control" placeholder="Your Name" />
                        </div>
                      </div>
                      <div className="col-md-6">
                        <div className="form-group">
                          <i className="fa fa-envelope"></i>
                          <input type="email" className="form-control" placeholder="Your Email" />
                        </div>
                      </div>
                      <div className="col-12">
                        <div className="form-group">
                          <i className="fa fa-phone"></i>
                          <input type="text" className="form-control" placeholder="Your Phone" />
                        </div>
                      </div>
                      <div className="col-12">
                        <div className="form-group textarea-group">
                          <i className="fa fa-edit"></i>
                          <textarea className="form-control" rows="5" placeholder="Your Message"></textarea>
                        </div>
                      </div>
                      <div className="col-12 text-end">
                        <button className="btn btn-orange ripple">
                          <i className="fa fa-paper-plane me-2"></i>Send Message
                        </button>
                      </div>
                    </div>
                  </form>
                </div>
              </div>

              {/* Contact Info */}
              <div className="col-lg-5" data-aos="fade-left">
                <div className="contact-info-card">
                  <h4 className="fw-bold mb-4">Get in Touch</h4>
                  <p className="text-light mb-4">
                    Have questions about our logistics solutions? Reach us directly.
                  </p>

                  <div className="contact-item">
                    <div className="icon-box"><i className="fa fa-phone"></i></div>
                    <div>
                      <h6>Call Us</h6>
                      <p>+91 12345 67890</p>
                    </div>
                  </div>

                  <div className="contact-item">
                    <div className="icon-box"><i className="fa fa-envelope"></i></div>
                    <div>
                      <h6>Email Us</h6>
                      <p>support@quoracargo.com</p>
                    </div>
                  </div>

                  <div className="contact-item">
                    <div className="icon-box"><i className="fa fa-map-marker-alt"></i></div>
                    <div>
                      <h6>Visit Us</h6>
                      <p>H. No. 101, Mandir Faliyu, Opp Patel Faliyu, Saroli Gam, Surat, Gujarat 395010</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        {/* Pricing */}
   {/* Pricing */}



        <hr className="soft-divider" />

        {/* Team */}
        <section className="py-5" id="team">
          <div className="container text-center">
            <h2 className="section-title display-4">Leadership Team</h2>
            <p className="section-subtitle">Meet the professionals driving Quora Cargo</p>
            <div className="row g-4">
              {[
                { img: 'image/team1.jpg', name: 'Priyeshbhai Chudasama', role: 'Founder' },
                { img: 'image/team2.jpg', name: 'Sudhansu Kumar Sahoo', role: 'Co-Founder / Director' },
                { img: 'image/team3.jpg', name: 'Abhijeet Singh', role: 'Chief Business Officer' }
              ].map((member, idx) => (
                <div key={idx} className="col-lg-4 col-md-6" data-aos="fade-up" data-aos-delay={idx * 100}>
                  <div className="service-card text-center">
                    <img className="img-fluid rounded-circle mb-3" src={member.img} alt={member.name} style={{ width: '120px', height: '120px', objectFit: 'cover' }} />
                    <h5 className="fw-bold">{member.name}</h5>
                    <p className="text-muted">{member.role}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <hr className="soft-divider" />

        {/* Testimonials */}
        <section className="py-5 bg-white" id="testimonials">
          <div className="container text-center">
            <h2 className="section-title display-4">What Our Clients Say</h2>
            <p className="section-subtitle">Hear from our satisfied partners</p>
            <div className="row g-4">
              {[
                { name: 'Ramesh Patel', role: 'CEO, Textile Exporter', review: 'Quora Cargo has transformed our supply chain with reliable deliveries.', rating: 5 },
                { name: 'Anita Sharma', role: 'Owner, E-commerce Brand', review: 'Fast and transparent logistics services with great customer support.', rating: 5 },
                { name: 'Vikram Singh', role: 'Director, Pharma Co', review: 'Efficient cargo handling and tech-enabled tracking system impressed us.', rating: 5 }
              ].map((testimonial, idx) => (
                <div key={idx} className="col-lg-4" data-aos="fade-up" data-aos-delay={idx * 150}>
                  <div className="service-card text-start p-4">
                    <p className="mb-3 text-muted">“{testimonial.review}”</p>
                    <h6 className="fw-bold">{testimonial.name}</h6>
                    <p className="small text-primary">{testimonial.role}</p>
                    <div>
                      {[...Array(testimonial.rating)].map((_, i) => (
                        <i key={i} className="fa fa-star text-warning"></i>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <hr className="soft-divider" />

      </main>
      <Footer />
    </>
  );
}
