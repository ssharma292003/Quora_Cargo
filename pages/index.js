import { useState, useEffect, useCallback, useMemo } from 'react';
import { useRouter } from 'next/router';
import Header from '../components/Header';
import Footer from '../components/Footer';
import Link from 'next/link';
import Head from 'next/head';
import Image from 'next/image';
import AOS from 'aos';
import 'aos/dist/aos.css';

export default function Home() {
  const [trackingId, setTrackingId] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false); // New state for animation
  const [ripples, setRipples] = useState([]);
  const [clients, setClients] = useState(0);
  const [shipments, setShipments] = useState(0);
  const [reviews, setReviews] = useState(0);
  const [countries, setCountries] = useState(0);
  const router = useRouter();

  const theme = useMemo(() => ({
    primary: '#0D6EFD',
    secondary: '#6C757D',
    accent: '#FFC107',
    light: '#F8F9FA',
    dark: '#212529',
    navy: '#0D1117',
    success: '#198754',
    danger: '#DC3545',
    warning: '#FFC107',
    info: '#0DCAF0',
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
    if (!trackingId.trim() || isAnimating) return;

    // Trigger the animation and loading state
    setIsAnimating(true);
    setIsLoading(true);

    // Simulate API call and then navigate
    await new Promise(resolve => setTimeout(resolve, 1500));
    router.push(`/shipmentDetails?trackingId=${trackingId.trim()}`);
    
    // Reset states after a longer delay to allow animation to finish if navigation fails
    setTimeout(() => {
        setIsAnimating(false);
        setIsLoading(false);
    }, 12000);

  }, [trackingId, router, isAnimating]);

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
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.4/css/all.min.css" />
      </Head>

      <Header />
      <main style={{ backgroundColor: theme.light }}>

        {/* HERO CAROUSEL */}
        <section id="home" className="container-fluid p-0 pb-5">
          <div className="position-relative mb-5" style={{ height: '600px', overflow: 'hidden' }}>
            <Image 
              className="img-fluid w-100 h-100" 
              src="/image/carousel-1.jpg" 
              alt="Logistics Solution" 
              width={1200} 
              height={600}
              style={{ objectFit: 'cover' }}
            />
            <div className="position-absolute top-0 start-0 w-100 h-100 d-flex align-items-center" style={{ background: 'rgba(6, 3, 21, .5)' }}>
              <div className="container">
                <div className="row justify-content-start">
                  <div className="col-10 col-lg-8">
                    <h5 className="text-white text-uppercase mb-3" data-aos="slideInDown">Transport & Logistics Solution</h5>
                    <h1 className="display-3 text-white mb-4" data-aos="slideInDown">#1 Place For Your <span style={{color: 'var(--primary)'}}>Logistics</span> Solution</h1>
                    <p className="fs-5 fw-medium text-white mb-4 pb-2">Quora Cargo provides reliable, efficient, and transparent logistics solutions for all your shipping needs across India and beyond.</p>
                    <div className="d-flex gap-3" data-aos="slideInLeft">
                      <Link href="#track" className="btn btn-orange py-md-3 px-md-5 ripple">Track Shipment</Link>
                      <Link href="#quote" className="btn btn-secondary py-md-3 px-md-5">Get Quote</Link>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* About Section */}
        <section id="about" className="container-fluid overflow-hidden py-5 px-lg-0">
          <div className="container py-5 px-lg-0">
            <div className="row g-5 mx-lg-0">
              <div className="col-lg-6 ps-lg-0" data-aos="fadeInLeft" style={{ minHeight: '400px' }}>
                <div className="position-relative h-100">
                  <Image 
                    className="position-absolute img-fluid w-100 h-100" 
                    src="/image/carousel-2.jpg" 
                    alt="About Quora Cargo" 
                    width={600} 
                    height={400}
                    style={{ objectFit: 'cover' }}
                  />
                </div>
              </div>
              <div className="col-lg-6" data-aos="fadeInUp">
                <h6 className="text-secondary text-uppercase mb-3">About Us</h6>
                <h1 className="mb-5">Quick Transport and Logistics Solutions</h1>
                <p className="mb-5">Quora Cargo has been providing reliable logistics solutions since 1990. We specialize in efficient cargo transportation, warehousing, and supply chain management across India and internationally.</p>
                <div className="row g-4 mb-5">
                  <div className="col-sm-6" data-aos="fadeIn" data-aos-delay="500">
                    <i className="fa fa-globe fa-3x mb-3" style={{color: 'var(--primary)'}}></i>
                    <h5>Global Coverage</h5>
                    <p className="m-0">Nationwide presence with international shipping capabilities.</p>
                  </div>
                  <div className="col-sm-6" data-aos="fadeIn" data-aos-delay="700">
                    <i className="fa fa-shipping-fast fa-3x mb-3" style={{color: 'var(--primary)'}}></i>
                    <h5>On Time Delivery</h5>
                    <p className="m-0">Committed to timely and efficient delivery of your shipments.</p>
                  </div>
                </div>
                <Link href="#info" className="btn btn-orange py-3 px-5 ripple">Explore More</Link>
              </div>
            </div>
          </div>
        </section>

        <hr className="soft-divider" />
        
        {/* Track Section */}
        <section className="py-5" id="track">
          <div className="container">
            <i className={`fas fa-truck-moving animated-delivery-truck ${isAnimating ? 'animate' : ''}`}></i>
            
            <div className={`track-form-container ${isAnimating ? 'animate' : ''}`}>
              <div className="text-center mb-5">
                <h2 className="section-title display-5">
                  Track Your Cargo
                </h2>
                <p className="section-subtitle">Enter your tracking ID to get real-time updates</p>
              </div>
              <div className="row justify-content-center">
                <div className="col-lg-8">
                  <form onSubmit={handleTrackSubmit} className="card-clean">
                    <div className="row g-3 align-items-end">
                      <div className="col-md-8">
                        <input
                          type="text"
                          className="form-control"
                          placeholder="Enter your tracking ID..."
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
          </div>
        </section>

        <hr className="soft-divider" />
        
        {/* Services Section */}
        <section id="services" className="container-xxl py-5">
          <div className="container py-5">
            <div className="text-center" data-aos="fadeInUp">
              <h6 className="text-secondary text-uppercase">Our Services</h6>
              <h1 className="mb-5">Explore Our Services</h1>
            </div>
            <div className="row g-4">
              <div className="col-md-6 col-lg-4" data-aos="fadeInUp" data-aos-delay="300">
                <div className="service-item p-4">
                  <div className="overflow-hidden mb-4">
                    <Image className="img-fluid" src="/image/service-1.jpg" alt="Air Freight" width={400} height={250} />
                  </div>
                  <h4 className="mb-3">Air Freight</h4>
                  <p>Fast and secure delivery by air for urgent shipments worldwide.</p>
                  <a className="btn-slide mt-2" href="#"><i className="fa fa-arrow-right"></i><span>Read More</span></a>
                </div>
              </div>
              <div className="col-md-6 col-lg-4" data-aos="fadeInUp" data-aos-delay="500">
                <div className="service-item p-4">
                  <div className="overflow-hidden mb-4">
                    <Image className="img-fluid" src="/image/service-2.jpg" alt="Ocean Freight" width={400} height={250} />
                  </div>
                  <h4 className="mb-3">Ocean Freight</h4>
                  <p>Cost-effective cargo movement via ocean routes for bulk shipments.</p>
                  <a className="btn-slide mt-2" href="#"><i className="fa fa-arrow-right"></i><span>Read More</span></a>
                </div>
              </div>
              <div className="col-md-6 col-lg-4" data-aos="fadeInUp" data-aos-delay="700">
                <div className="service-item p-4">
                  <div className="overflow-hidden mb-4">
                    <Image className="img-fluid" src="/image/service-3.jpg" alt="Road Freight" width={400} height={250} />
                  </div>
                  <h4 className="mb-3">Road Freight</h4>
                  <p>Efficient domestic trucking across India with reliable fleet.</p>
                  <a className="btn-slide mt-2" href="#"><i className="fa fa-arrow-right"></i><span>Read More</span></a>
                </div>
              </div>
              <div className="col-md-6 col-lg-4" data-aos="fadeInUp" data-aos-delay="300">
                <div className="service-item p-4">
                  <div className="overflow-hidden mb-4">
                    <Image className="img-fluid" src="/image/service-4.jpg" alt="Train Freight" width={400} height={250} />
                  </div>
                  <h4 className="mb-3">Train Freight</h4>
                  <p>Railway transportation for heavy and bulk cargo shipments.</p>
                  <a className="btn-slide mt-2" href="#"><i className="fa fa-arrow-right"></i><span>Read More</span></a>
                </div>
              </div>
              <div className="col-md-6 col-lg-4" data-aos="fadeInUp" data-aos-delay="500">
                <div className="service-item p-4">
                  <div className="overflow-hidden mb-4">
                    <Image className="img-fluid" src="/image/service-5.jpg" alt="Customs Clearance" width={400} height={250} />
                  </div>
                  <h4 className="mb-3">Customs Clearance</h4>
                  <p>Expert customs clearance services for international shipments.</p>
                  <a className="btn-slide mt-2" href="#"><i className="fa fa-arrow-right"></i><span>Read More</span></a>
                </div>
              </div>
              <div className="col-md-6 col-lg-4" data-aos="fadeInUp" data-aos-delay="700">
                <div className="service-item p-4">
                  <div className="overflow-hidden mb-4">
                    <Image className="img-fluid" src="/image/service-6.jpg" alt="Warehouse Solutions" width={400} height={250} />
                  </div>
                  <h4 className="mb-3">Warehouse Solutions</h4>
                  <p>Safe storage facilities with modern infrastructure and technology.</p>
                  <a className="btn-slide mt-2" href="#"><i className="fa fa-arrow-right"></i><span>Read More</span></a>
                </div>
              </div>
            </div>
          </div>
        </section>

        <hr className="soft-divider" />
        
        {/* Pricing Section */}
        <section id="pricing" className="container-xxl py-5">
          <div className="container py-5">
            <div className="text-center" data-aos="fadeInUp">
              <h6 className="text-secondary text-uppercase">Pricing Plan</h6>
              <h1 className="mb-5">Perfect Pricing Plan</h1>
            </div>
            <div className="row g-4 justify-content-center">
              <div className="col-md-6 col-lg-3" data-aos="fadeInUp" data-aos-delay="300">
                <div className="price-item">
                  <div className="border-bottom p-4 mb-4">
                    <h5 style={{color: 'var(--primary)'}} className="mb-1">Basic Plan</h5>
                    <h1 className="display-5 mb-0">
                      <small className="align-top" style={{ fontSize: '22px', lineHeight: '45px' }}>₹</small>2,999<small className="align-bottom" style={{ fontSize: '16px', lineHeight: '40px' }}>/ Month</small>
                    </h1>
                  </div>
                  <div className="p-4 pt-0">
                    <p><i className="fa fa-check text-success me-3"></i>Basic Tracking</p>
                    <p><i className="fa fa-check text-success me-3"></i>Email Support</p>
                    <p><i className="fa fa-check text-success me-3"></i>Standard Delivery</p>
                    <p><i className="fa fa-check text-success me-3"></i>Basic Insurance</p>
                    <p><i className="fa fa-check text-success me-3"></i>Monthly Reports</p>
                    <a className="btn-slide mt-2" href="#"><i className="fa fa-arrow-right"></i><span>Order Now</span></a>
                  </div>
                </div>
              </div>
              <div className="col-md-6 col-lg-3" data-aos="fadeInUp" data-aos-delay="500">
                <div className="price-item">
                  <div className="border-bottom p-4 mb-4">
                    <h5 style={{color: 'var(--primary)'}} className="mb-1">Standard Plan</h5>
                    <h1 className="display-5 mb-0">
                      <small className="align-top" style={{ fontSize: '22px', lineHeight: '45px' }}>₹</small>5,999<small className="align-bottom" style={{ fontSize: '16px', lineHeight: '40px' }}>/ Month</small>
                    </h1>
                  </div>
                  <div className="p-4 pt-0">
                    <p><i className="fa fa-check text-success me-3"></i>Advanced Tracking</p>
                    <p><i className="fa fa-check text-success me-3"></i>Priority Support</p>
                    <p><i className="fa fa-check text-success me-3"></i>Express Delivery</p>
                    <p><i className="fa fa-check text-success me-3"></i>Full Insurance</p>
                    <p><i className="fa fa-check text-success me-3"></i>Weekly Reports</p>
                    <a className="btn-slide mt-2" href="#"><i className="fa fa-arrow-right"></i><span>Order Now</span></a>
                  </div>
                </div>
              </div>
              <div className="col-md-6 col-lg-3" data-aos="fadeInUp" data-aos-delay="700">
                <div className="price-item">
                  <div className="border-bottom p-4 mb-4">
                    <h5 style={{color: 'var(--primary)'}} className="mb-1">Advanced Plan</h5>
                    <h1 className="display-5 mb-0">
                      <small className="align-top" style={{ fontSize: '22px', lineHeight: '45px' }}>₹</small>9,999<small className="align-bottom" style={{ fontSize: '16px', lineHeight: '40px' }}>/ Month</small>
                    </h1>
                  </div>
                  <div className="p-4 pt-0">
                    <p><i className="fa fa-check text-success me-3"></i>Real-time Tracking</p>
                    <p><i className="fa fa-check text-success me-3"></i>24/7 Support</p>
                    <p><i className="fa fa-check text-success me-3"></i>Same Day Delivery</p>
                    <p><i className="fa fa-check text-success me-3"></i>Premium Insurance</p>
                    <p><i className="fa fa-check text-success me-3"></i>Daily Reports</p>
                    <a className="btn-slide mt-2" href="#"><i className="fa fa-arrow-right"></i><span>Order Now</span></a>
                  </div>
                </div>
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
                  <i className="fa fa-user-tie fa-3x mb-3" style={{ color: theme.primary }}></i>
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

        {/* Contact */}
        <section className="contact-section" id="contact">
          <div className="container">
            <div className="text-center mb-4" data-aos="fade-up">
              <h2 className="section-title display-5">Contact Us</h2>
              <p className="section-subtitle">
                We had love to hear from you. Get in touch with our team today.
              </p>
            </div>
            <div className="row g-4 align-items-stretch justify-content-center">
              {/* Contact Form */}
              <div className="col-lg-6" data-aos="fade-right">
                <div className="contact-card p-4">
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
                <div className="contact-info-card p-4">
                  <h4 className="fw-bold mb-3">Get in Touch</h4>
                  <p className="text-light mb-3">
                    Have questions about our logistics solutions? Reach us directly.
                  </p>
                  <div className="contact-item mb-2">
                    <div className="icon-box"><i className="fa fa-phone"></i></div>
                    <div>
                      <h6>Call Us</h6>
                      <p>+91 12345 67890</p>
                    </div>
                  </div>
                  <div className="contact-item mb-2">
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
                      <p>H.No.101,Mandir Faliyu,Opp Patel Faliyu,Saroli Gam,Surat,Gujarat 395010</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
    
        <hr className="soft-divider" />

        {/* Team */}
        <section id="team" className="container-xxl py-5">
          <div className="container py-5">
            <div className="text-center" data-aos="fadeInUp">
              <h6 className="text-secondary text-uppercase">Our Team</h6>
              <h1 className="mb-5">Expert Team Members</h1>
            </div>
            <div className="row g-4">
              {[
                { img: 'image/team-1.jpg', name: 'Priyeshbhai Chudasama', role: 'Founder' },
                { img: 'image/team-2.jpg', name: 'Sudhansu Kumar Sahoo', role: 'Co-Founder / Director' },
                { img: 'image/team-3.jpg', name: 'Abhijeet Singh', role: 'Chief Business Officer' },
              ].map((member,idx) => (
                <div key={idx} className="col-lg-4 col-md-6" data-aos="fadeInUp" data-aos-delay={(idx + 1) * 200}>
                  <div className="team-item p-4">
                    <div className="overflow-hidden mb-4">
                      <Image className="img-fluid" src={`/${member.img}`} alt={member.name} width={300} height={300} />
                    </div>
                    <h5 className="mb-0">{member.name}</h5>
                    <p>{member.role}</p>
                    <div className="btn-slide mt-1">
                      <i className="fa fa-share"></i>
                      <span>
                        <a href="#"><i className="fab fa-facebook-f"></i></a>
                        <a href="#"><i className="fab fa-twitter"></i></a>
                        <a href="#"><i className="fab fa-instagram"></i></a>
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}