import './Register.css';
import Container from 'react-bootstrap/Container';
import React from 'react';
import Form from 'react-bootstrap/Form';
import { toast } from 'react-toastify';
import { useState } from 'react';
//import { useNavigate } from 'react-router-dom';

//import Form from 'react-bootstrap/Form';
function Register() {
  //const history = useNavigate();

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

  async function registerUser(event) {
    event.preventDefault();

    const response = await fetch('/api/users/signup', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name,
        email,
        password,
      }),
    });

    const data = await response.json();

    if (data.status === 'ok') {
      toast.info('Registered Succesfully');
      await delay(2000);
      window.location.href = '/login';

      //history.push('/login');
    }
  }

  return (
    <div id="main1">
      <br />
      <h1>Sign Up</h1>
      <hr />
      <Container className="small-container">
        <Form onSubmit={registerUser}>
          <Form.Group className="mb-3" controlId="name">
            <Form.Label>Name</Form.Label>
            <Form.Control
              type="text"
              onChange={(e) => setName(e.target.value)}
              required
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="email">
            <Form.Label>Email</Form.Label>
            <Form.Control
              type="email"
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="password">
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="password"
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </Form.Group>

          <div className="mb-3">
            <button className="hero-button" type="submit">
              Sign Up
            </button>
          </div>
        </Form>
      </Container>
    </div>
  );
}

export default Register;
