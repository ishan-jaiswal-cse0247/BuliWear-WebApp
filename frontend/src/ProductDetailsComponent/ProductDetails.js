import axios from 'axios';
import { useEffect, useReducer } from 'react';
import { useParams } from 'react-router-dom';
import './ProductDetails.css';
import { Link } from 'react-router-dom';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Card from 'react-bootstrap/Card';
const sessAdmin = sessionStorage.getItem('adminstat');
const name = sessionStorage.getItem('usrname');

/*
const [open, setOpen] = useState(false);
<button
                    onClick={() => setOpen(!open)}
                    aria-controls="example-collapse-text"
                    aria-expanded={open}
                    className="hero-button-col"
                  >
                    Description
                  </button>
                  <Collapse in={open}>
                    <div id="example-collapse-text">
                      <Container className="small-container">
                        <p>{product.description}</p>
                      </Container>
                    </div>
                  </Collapse> */

const reducer = (state, action) => {
  switch (action.type) {
    case 'FETCH_REQUEST':
      return { ...state, loading: true };
    case 'FETCH_SUCCESS':
      return { ...state, product: action.payload, loading: false };
    case 'FETCH_FAILED':
      return { ...state, loading: false, error: action.payload };
    default:
      return state;
  }
};

function ProductDetails() {
  const params = useParams();
  const { id } = params;
  const [{ loading, error, product }, dispatch] = useReducer(reducer, {
    product: [],
    loading: true,
    error: '',
  });
  useEffect(() => {
    const fetchData = async () => {
      dispatch({ type: 'FETCH_REQUEST' });
      try {
        const result = await axios.get(`/api/products/id/${id}`);
        dispatch({ type: 'FETCH_SUCCESS', payload: result.data });
      } catch (err) {
        dispatch({ type: 'FETCH_FAILED', payload: err.message });
      }
    };
    fetchData();
  }, [id]);
  if (name && sessAdmin === 'false') {
    return loading ? (
      <div>Loading Please Wait.......</div>
    ) : error ? (
      <div>
        <br />
        <h4>product id = {id} not found</h4>
        {error}
      </div>
    ) : (
      <div>
        <br />
        <h1>Details {sessAdmin}</h1>
        <hr />
        <br />
        <Row key={1} sm={10} md={5} lg={2} className="mb-3">
          <Col>
            <Card>
              <br />
              <br />
              <Link to={`/productdetails/${product.id}`}>
                <img
                  src={product.image}
                  className="card-img-top"
                  alt={product.name}
                />
              </Link>
            </Card>
          </Col>

          <Col>
            <Card>
              <Card.Body>
                <div className="prodetail">
                  <p>
                    <i>
                      &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                      {product.brand}
                    </i>
                  </p>

                  <Card.Title>
                    <Link to={`/productdetails/${product.id}`}>
                      <b>{product.name}</b>
                    </Link>
                  </Card.Title>
                  <br />
                  <p>
                    <strong>Size:</strong> &nbsp;&nbsp;{product.size}
                  </p>

                  <p>
                    <strong>Ideal for:</strong> &nbsp;&nbsp;{product.idealfor}
                  </p>

                  <p>
                    <strong>Label Size:</strong> &nbsp;&nbsp;
                    {product.labelsize}
                  </p>

                  <p>
                    <b>&#x20b9;{product.price}</b>
                  </p>

                  <button>
                    <a href={product.link}>
                      <b>Buy from other platform</b>
                    </a>
                  </button>
                  <br />
                  <br />

                  <button>
                    <Link to={`/buyproduct/${product.id}`} className="nav-link">
                      <b>Buy from us</b>
                    </Link>
                  </button>
                </div>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </div>
    );
  } else if (name && sessAdmin === 'true') {
    return loading ? (
      <div>Loading Please Wait.......</div>
    ) : error ? (
      <div>
        <br />
        <h4>product id = {id} not found</h4>
        {error}
      </div>
    ) : (
      <div>
        <br />
        <h1>Details</h1>
        <hr />
        <br />
        <Row key={1} sm={10} md={5} lg={2} className="mb-3">
          <Col>
            <Card>
              <br />
              <br />
              <Link to={`/productdetails/${product.id}`}>
                <img
                  src={product.image}
                  className="card-img-top"
                  alt={product.name}
                />
              </Link>
            </Card>
          </Col>

          <Col>
            <Card>
              <Card.Body>
                <div className="prodetail">
                  <p>
                    <i>
                      &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                      {product.brand}
                    </i>
                  </p>

                  <Card.Title>
                    <Link to={`/productdetails/${product.id}`}>
                      <b>{product.name}</b>
                    </Link>
                  </Card.Title>
                  <br />
                  <p>
                    <strong>Size:</strong> &nbsp;&nbsp;{product.size}
                  </p>

                  <p>
                    <strong>Ideal for:</strong> &nbsp;&nbsp;{product.idealfor}
                  </p>

                  <p>
                    <strong>Label Size:</strong> &nbsp;&nbsp;
                    {product.labelsize}
                  </p>

                  <p>
                    <b>&#x20b9;{product.price}</b>
                  </p>

                  <button>
                    <Link to={`/dashbord`} className="nav-link">
                      <b>Manage products</b>
                    </Link>
                  </button>
                </div>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </div>
    );
  } else {
    return loading ? (
      <div>Loading Please Wait.......</div>
    ) : error ? (
      <div>
        <br />
        <h4>product id = {id} not found</h4>
        {error}
      </div>
    ) : (
      <div>
        <br />
        <h1>Details</h1>
        <hr />
        <br />
        <Row key={1} sm={10} md={5} lg={2} className="mb-3">
          <Col>
            <Card>
              <br />
              <br />
              <Link to={`/productdetails/${product.id}`}>
                <img
                  src={product.image}
                  className="card-img-top"
                  alt={product.name}
                />
              </Link>
            </Card>
          </Col>

          <Col>
            <Card>
              <Card.Body>
                <div className="prodetail">
                  <p>
                    <i>
                      &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                      {product.brand}
                    </i>
                  </p>

                  <Card.Title>
                    <Link to={`/productdetails/${product.id}`}>
                      <b>{product.name}</b>
                    </Link>
                  </Card.Title>
                  <br />
                  <p>
                    <strong>Size:</strong> &nbsp;&nbsp;{product.size}
                  </p>

                  <p>
                    <strong>Ideal for:</strong> &nbsp;&nbsp;{product.idealfor}
                  </p>

                  <p>
                    <strong>Label Size:</strong> &nbsp;&nbsp;
                    {product.labelsize}
                  </p>

                  <p>
                    <b>&#x20b9;{product.price}</b>
                  </p>

                  <br />
                  <button>
                    <Link to={'/login'}>
                      <b>Sign In</b>
                    </Link>
                  </button>
                </div>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </div>
    );
  }
}

export default ProductDetails;
