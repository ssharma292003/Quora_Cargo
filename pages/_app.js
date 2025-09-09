// pages/_app.js
import 'bootstrap/dist/css/bootstrap.min.css';
import 'aos/dist/aos.css';
import 'swiper/css';
import "@fortawesome/fontawesome-free/css/all.min.css";
// import '../styles/globals.css';    // keep your main global styles here
import '../styles/Header.css';     // move Header.css import here
import '../styles/Home.css';       // move Home.css import here


export default function App({ Component, pageProps }) {
  return <Component {...pageProps} />;
}
