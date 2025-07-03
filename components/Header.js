
import Link from 'next/link';

export default function Header() {
  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-white border-bottom sticky-top">
      <div className="container">
        <Link className="navbar-brand fw-bold" href="/">SwiftShip</Link>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav ms-auto">
            <li className="nav-item"><a className="nav-link" href="/">Home</a></li>
            <li className="nav-item"><a className="nav-link" href="#track">Track</a></li>
            <li className="nav-item"><a className="nav-link" href="#quote">Quote</a></li>
            <li className="nav-item"><a className="nav-link" href="#info">Info</a></li>
            <li className="nav-item"><a className="nav-link" href="#contact">Contact</a></li>
          </ul>
          <div className="d-flex gap-2">
            <Link href="/login" className="btn btn-outline-primary">Login</Link>
            <Link href="/register" className="btn btn-primary">Sign Up</Link>
          </div>
        </div>
      </div>
    </nav>
  );
}
