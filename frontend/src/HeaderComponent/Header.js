import './Header.css';
import { Link } from 'react-router-dom';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import Container from 'react-bootstrap/Container';
import { LinkContainer } from 'react-router-bootstrap';

function Header() {
  const name = sessionStorage.getItem('usrname');
  function Claearvar() {
    //localStorage.clear('usrname');
    sessionStorage.clear('usrname');
    window.location.reload();
    //refresh="true"
  }
  if (name) {
    localStorage.setItem('usrname', name);
    return (
      <div id="header">
        <Navbar className="navbar" bg="black" variant="dark">
          <Container>
            <LinkContainer to="/" className="brand">
              <Navbar.Brand>
                <img
                  src="./assets/media/nobg_panda.png"
                  height="35px"
                  width="30px"
                  alt="BW"
                />
              </Navbar.Brand>
            </LinkContainer>
            <Nav className="me-auto">
              <Link to="/product" className="nav-link">
                Products
              </Link>
            </Nav>
            <Nav className="me-auto">
              <Link to="/about" className="nav-link">
                About
              </Link>
            </Nav>
            <Nav className="me-auto">
              <Link to="/privacy" className="nav-link">
                Privacy
              </Link>
            </Nav>
            <Nav className="me-auto">
              <Link to="/contact" className="nav-link">
                Contact
              </Link>
            </Nav>
            <Nav className="me-auto">
              <Link to="/dashbord" className="nav-link">
                {name}
              </Link>
            </Nav>
            <Nav className="me-auto">
              <Link
                to={'/'}
                onClick={Claearvar}
                refresh="true"
                className="nav-link"
              >
                Logout
              </Link>
            </Nav>
          </Container>
        </Navbar>
      </div>
    );
  } else
    return (
      <div id="header">
        <Navbar className="navbar" bg="black" variant="dark">
          <Container>
            <LinkContainer to="/" className="brand">
              <Navbar.Brand>
                <img
                  src="./assets/media/nobg_panda.png"
                  height="35px"
                  width="30px"
                  alt="BW"
                />
              </Navbar.Brand>
            </LinkContainer>
            <Nav className="me-auto">
              <Link to="/product" className="nav-link">
                Products
              </Link>
            </Nav>
            <Nav className="me-auto">
              <Link to="/about" className="nav-link">
                About
              </Link>
            </Nav>
            <Nav className="me-auto">
              <Link to="/privacy" className="nav-link">
                Privacy
              </Link>
            </Nav>
            <Nav className="me-auto">
              <Link to="/contact" className="nav-link">
                Contact
              </Link>
            </Nav>
            <Nav className="me-auto">
              <Link to="/login" className="nav-link">
                Sign In
              </Link>
            </Nav>
            <Nav className="me-auto">
              <Link to="/register" className="nav-link">
                Sign Up
              </Link>
            </Nav>
          </Container>
        </Navbar>
      </div>
    );
}

export default Header;
