import './Buyproduct.css';
import Container from 'react-bootstrap/Container';
import React from 'react';
import Form from 'react-bootstrap/Form';
import { toast } from 'react-toastify';
import { useState } from 'react';
import { useParams } from 'react-router-dom';

function Buyproduct() {
  const params = useParams();
  const { id } = params;
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [mobno, setMobno] = useState('');
  const [address, setAddress] = useState('');
  const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

  async function shipdetail(event) {
    event.preventDefault();

    const response = await fetch(`/api/users/buy/${id}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name,
        email,
        mobno,
        address,
      }),
    });

    const data = await response.json();

    if (data.status === 'ok') {
      toast.info('Order placed we will contact you');
      await delay(2000);
      window.location.href = `/productdetails/${id}`;
    }
  }

  return (
    <div id="main1">
      <br />
      <h1>Shipping Details</h1>
      <hr />
      <Container className="small-container">
        <Form onSubmit={shipdetail}>
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
          <Form.Group className="mb-3" controlId="mobno">
            <Form.Label>Mobile Number</Form.Label>
            <Form.Control
              type="number"
              onChange={(e) => setMobno(e.target.value)}
              required
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="address">
            <Form.Label>Address</Form.Label>
            <Form.Control
              type="text"
              as="textarea"
              onChange={(e) => setAddress(e.target.value)}
              required
            />
          </Form.Group>
          <p>For further details we will contact you...</p>
          <div className="mb-3">
            <button className="hero-button" type="submit">
              Order
            </button>
          </div>
        </Form>
      </Container>
    </div>
  );
}

export default Buyproduct;
