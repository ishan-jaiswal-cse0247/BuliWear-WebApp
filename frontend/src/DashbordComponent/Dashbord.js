import { useState } from 'react';
import Container from 'react-bootstrap/Container';
import React from 'react';
import Form from 'react-bootstrap/Form';
import Collapse from 'react-bootstrap/Collapse';
import { toast } from 'react-toastify';
import axios from 'axios';
import './Dashbord.css';
function Dashbord() {
  const sesname = sessionStorage.getItem('usrname');
  const sessAdmin = sessionStorage.getItem('adminstat');
  console.log(sesname);
  const brand = 'Buli-Wear';
  const [name, setName] = useState('');
  const [id, setId] = useState('');
  const [image, setImage] = useState('');
  const [link, setLink] = useState('');
  const [size, setSize] = useState('');
  const [labelsize, setlabelsize] = useState('');
  const [idealfor, setIdealfor] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');
  const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));
  const [open, setOpen] = useState(false);
  const [RMopen, setRMOpen] = useState(false);
  const [SMopen, setSMOpen] = useState(false);
  async function createProduct(event) {
    event.preventDefault();
    const formData = new FormData();
    const setMessage = '';
    formData.append('name', name);
    formData.append('id', id);
    formData.append('image', image);
    formData.append('brand', brand);
    formData.append('link', link);
    formData.append('size', size);
    formData.append('labelsize', labelsize);
    formData.append('idealfor', idealfor);
    formData.append('description', description);
    formData.append('price', price);

    axios
      .post('api/products/create', formData)
      .then((res) => {
        setMessage(res.json);
      })
      .catch((err) => {
        console.log(err);
      });
    toast.info('Published Succesfully');
    await delay(2000);
  }

  async function removeProduct(event) {
    event.preventDefault();

    const response = await fetch('/api/products/delete', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        id,
      }),
    });

    const data = await response.json();

    if (data.status === 'ok') {
      toast.info('Deleted Succesfully');
      await delay(2000);
      window.location.href = '/dashbord';
    }
  }

  async function sendNews(event) {
    event.preventDefault();

    const response = await fetch('/api/users/sendnews', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        description,
      }),
    });

    const data = await response.json();

    if (data.status === 'ok') {
      toast.info('Newsletter Sent');
      await delay(2000);
      window.location.href = '/dashbord';
    }
  }

  if (sesname) {
    if (sessAdmin === 'true') {
      return (
        <div id="main1">
          <br />
          <h1>Admin Dashbord</h1>
          <hr />
          <br />
          <button
            onClick={() => setOpen(!open)}
            aria-controls="example-collapse-text"
            aria-expanded={open}
            className="hero-button-col"
          >
            Add Product
          </button>
          <Collapse in={open}>
            <div id="example-collapse-text">
              <br />
              <h4>Add Product</h4>
              <br />
              <Container className="small-container">
                <Form onSubmit={createProduct} encType="multipart/form-data">
                  <Form.Group className="mb-3" controlId="name">
                    <Form.Label>Name</Form.Label>
                    <Form.Control
                      type="text"
                      onChange={(e) => setName(e.target.value)}
                      required
                    />
                  </Form.Group>
                  <Form.Group className="mb-3" controlId="id">
                    <Form.Label>Id of Product</Form.Label>
                    <Form.Control
                      type="text"
                      onChange={(e) => setId(e.target.value)}
                      required
                    />
                  </Form.Group>
                  <Form.Group className="mb-3" controlId="link">
                    <Form.Label>Refrel link</Form.Label>
                    <Form.Control
                      type="text"
                      onChange={(e) => setLink(e.target.value)}
                      required
                    />
                  </Form.Group>
                  <Form.Group className="mb-3" controlId="size">
                    <Form.Label>Size range on months</Form.Label>
                    <Form.Control
                      type="text"
                      onChange={(e) => setSize(e.target.value)}
                      required
                    />
                  </Form.Group>
                  <Form.Group className="mb-3" controlId="labelsize">
                    <Form.Label>Label size (S/M/L/XL)</Form.Label>
                    <Form.Control
                      type="text"
                      onChange={(e) => setlabelsize(e.target.value)}
                      required
                    />
                  </Form.Group>
                  <Form.Group className="mb-3" controlId="idealfor">
                    <Form.Label>Ideal for (Boy/Girl)</Form.Label>
                    <Form.Control
                      type="text"
                      onChange={(e) => setIdealfor(e.target.value)}
                      required
                    />
                  </Form.Group>
                  <Form.Group className="mb-3" controlId="description">
                    <Form.Label>Description</Form.Label>
                    <Form.Control
                      type="text"
                      as="textarea"
                      onChange={(e) => setDescription(e.target.value)}
                      required
                    />
                  </Form.Group>
                  <Form.Group className="mb-3" controlId="price">
                    <Form.Label>Price</Form.Label>
                    <Form.Control
                      type="number"
                      onChange={(e) => setPrice(e.target.value)}
                      required
                    />
                  </Form.Group>
                  <Form.Group className="mb-3" controlId="image">
                    <Form.Label>Image of Product</Form.Label>
                    <Form.Control
                      type="file"
                      //__filename="image"
                      onChange={(e) => setImage(e.target.files[0])}
                      required
                    />
                    <br />
                  </Form.Group>
                  <div className="mb-3">
                    <button className="hero-button" type="submit">
                      Add
                    </button>
                    <br />
                  </div>
                </Form>
              </Container>
            </div>
          </Collapse>
          <br />
          <button
            onClick={() => setRMOpen(!RMopen)}
            aria-controls="example-collapse-text"
            aria-expanded={RMopen}
            className="hero-button-col"
          >
            Remove Product
          </button>
          <Collapse in={RMopen}>
            <div id="example-collapse-text">
              <br />
              <h4>Remove Product</h4>
              <br />
              <Container className="small-container">
                <Form onSubmit={removeProduct} encType="multipart/form-data">
                  <Form.Group className="mb-3" controlId="id">
                    <Form.Label>Insert Product ID</Form.Label>
                    <Form.Control
                      type="text"
                      onChange={(e) => setId(e.target.value)}
                      required
                    />
                  </Form.Group>
                  <br />
                  <div className="mb-3">
                    <button className="hero-button" type="submit">
                      Remove
                    </button>
                    <br />
                  </div>
                </Form>
              </Container>
            </div>
          </Collapse>
          <br />
          <button
            onClick={() => setSMOpen(!SMopen)}
            aria-controls="example-collapse-text"
            aria-expanded={SMopen}
            className="hero-button-col"
          >
            Send Message
          </button>
          <Collapse in={SMopen}>
            <div id="example-collapse-text">
              <br />
              <h4>Send Message to Customers</h4>
              <br />
              <Container className="small-container">
                <Form onSubmit={sendNews} encType="multipart/form-data">
                  <Form.Group className="mb-3" controlId="description">
                    <Form.Label>Write Message</Form.Label>
                    <Form.Control
                      type="text"
                      as="textarea"
                      onChange={(e) => setDescription(e.target.value)}
                      required
                    />
                  </Form.Group>
                  <br />
                  <div className="mb-3">
                    <button className="hero-button" type="submit">
                      Send
                    </button>
                    <br />
                  </div>
                </Form>
              </Container>
            </div>
          </Collapse>
          <br />
          <br />
          <br />
        </div>
      );
    } else {
      return (
        <div id="main1">
          <br />
          <h1>Dashbord</h1>
          <hr />
          <p>
            <h4>
              Hi' there <i>{sesname}</i>
              <br />
            </h4>
            <br />
            <br />
          </p>

          <p>
            <hr />
            <h6>Your Orders</h6>
            <br />
            <br />
            No Orders yet.....
            <br />
            <br />
          </p>
          <p>
            <hr />
            <h6>Wishlist Items</h6>
            <br />
            <br />
            Nothing in Wishlist....
            <br />
            <br />
          </p>
        </div>
      );
    }
  } else {
    return (window.location.href = '/');
  }
}

export default Dashbord;
