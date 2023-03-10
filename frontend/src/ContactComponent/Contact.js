import './Contact.css';
import Form from 'react-bootstrap/Form';
import Container from 'react-bootstrap/Container';
import { toast } from 'react-toastify';
import { useState } from 'react';
function Contact() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

  async function contactUs(event) {
    event.preventDefault();
    const response = await fetch('/api/users/contact', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name,
        email,
        message,
      }),
    });
    const data = await response.json();

    if (data.status === 'ok') {
      toast.info('Thank you for your Feedback');
      await delay(2000);
      window.location.href = '/contact';
    }
  }

  return (
    <div id="main1">
      <br />
      <h1>Contact Us</h1>

      <hr />
      <Container className="small-container">
        <Form onSubmit={contactUs}>
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
            <Form.Label>Message</Form.Label>
            <Form.Control
              type="text"
              onChange={(e) => setMessage(e.target.value)}
              required
            />
          </Form.Group>

          <div className="mb-3">
            <button className="hero-button" type="submit">
              Submit
            </button>
          </div>
        </Form>
      </Container>
    </div>
  );
}

export default Contact;
