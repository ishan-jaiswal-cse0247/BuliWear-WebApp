import './Login.css';
import { Link } from 'react-router-dom';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import { useState } from 'react';
import { toast } from 'react-toastify';
//import session from 'express-session';
function Login() {
  //const navigate = useNavigate();
  //const { search } = useLocation();
  //const redirectInUrl = new URLSearchParams(search).get('redirect');
  //const redirect = redirectInUrl ? redirectInUrl : '/';

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  async function loginUser(event) {
    event.preventDefault();

    const response = await fetch('/api/users/signin', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email,
        password,
      }),
    });
    const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));
    const data = await response.json();

    if (data.user) {
      localStorage.setItem('token', data.user);
      //localStorage.setItem('userinfo', JSON.stringify(response));
      const name_req = await fetch('/api/users/name', {
        headers: {
          'x-access-token': localStorage.getItem('token'),
        },
      });
      const isAdmin_req = await fetch('/api/users/isAdmin', {
        headers: {
          'x-access-token': localStorage.getItem('token'),
        },
      });
      const admindata = await isAdmin_req.json();
      const isAdmin = admindata.isAdmin;
      const namedata = await name_req.json();
      const fname = namedata.name;
      toast.success(`Welcome ${fname}`);
      sessionStorage.setItem('usrname', fname);
      sessionStorage.setItem('adminstat', isAdmin);

      await delay(2000);
      window.location.href = '/';
    } else {
      toast.error('Please check your username and password');
    }
  }

  return (
    <div id="main1">
      <br />
      <h1>Sign In</h1>
      <hr />
      <Container className="small-container">
        <Form onSubmit={loginUser}>
          <Form.Group className="mb-3" controlId="email">
            <Form.Label>Email</Form.Label>
            <Form.Control
              type="email"
              required
              onChange={(e) => setEmail(e.target.value)}
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="password">
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="password"
              required
              onChange={(e) => setPassword(e.target.value)}
            />
          </Form.Group>
          <div className="mb-3">
            <button className="hero-button" type="submit">
              Sign In
            </button>
          </div>
          <div className="mb-3">
            New customer? {''}
            <Link to={'/Register'}>Register now </Link>
          </div>
        </Form>
      </Container>
    </div>
  );
}

export default Login;
