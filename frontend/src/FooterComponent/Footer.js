import './Footer.css';
import { Link } from 'react-router-dom';
function Footer() {
  return (
    <div className="full-footer">
      <footer>
        <div className="footer-content">
          <h3>Buli-Wear</h3>
          <p>
            <i>The Baby Comfort Zone</i>
          </p>

          <div className="footer-menu">
            <ul className="f-menu">
              <li>
                <Link to="/">Home</Link>
              </li>
              <li>
                <Link to="/about">About</Link>
              </li>
              <li>
                <Link to="/privacy">Privacy Policy</Link>
              </li>
            </ul>
            <br />
          </div>
          <p>copyright &copy; 2022 Buli-Wear. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}

export default Footer;
