import './Contact.css';
import Form from 'react-bootstrap/Form';
import Container from 'react-bootstrap/Container';
import { toast } from 'react-toastify';

function Contact() {
  function noti() {
    toast.done('Thank You for your time');
  }
  return (
    <div id="main1">
      <br />
      <h1>Contact Us</h1>

      <hr />
      <Container className="small-container">
        <Form onSubmit={noti}>
          <Form.Group className="mb-3" controlId="name">
            <Form.Label>Name</Form.Label>
            <Form.Control type="text" required />
          </Form.Group>
          <Form.Group className="mb-3" controlId="email">
            <Form.Label>Email</Form.Label>
            <Form.Control type="email" required />
          </Form.Group>
          <Form.Group className="mb-3" controlId="password">
            <Form.Label>Message</Form.Label>
            <Form.Control type="text" required />
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
