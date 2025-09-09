// pages/_app.js
import 'bootstrap/dist/css/bootstrap.min.css';
import 'aos/dist/aos.css';
import 'swiper/css';
import "@fortawesome/fontawesome-free/css/all.min.css";


export default function App({ Component, pageProps }) {
  return <Component {...pageProps} />;
}
