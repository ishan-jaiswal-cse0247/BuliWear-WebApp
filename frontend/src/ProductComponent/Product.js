/*import prodata from '../data';*/
import { useEffect, useReducer } from 'react';
import axios from 'axios';
import './Product.css';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Card from 'react-bootstrap/Card';

const reducer = (state, action) => {
  switch (action.type) {
    case 'FETCH_REQUEST':
      return { ...state, loading: true };
    case 'FETCH_SUCCESS':
      return { ...state, products: action.payload, loading: false };
    case 'FETCH_FAILED':
      return { ...state, loading: false, error: action.payload };
    default:
      return state;
  }
};

function Product() {
  const [{ loading, error, products }, dispatch] = useReducer(reducer, {
    products: [],
    loading: true,
    error: '',
  });
  //const [products, setproducts] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      dispatch({ type: 'FETCH_REQUEST' });
      try {
        const result = await axios.get('/api/products');
        dispatch({ type: 'FETCH_SUCCESS', payload: result.data });
      } catch (err) {
        dispatch({ type: 'FETCH_FAILED', payload: err.message });
      }

      //setproducts(result.data);
    };
    fetchData();
  }, []);
  return (
    <div className="products">
      <br />
      <h1>Products</h1>
      <hr />
      <br />
      {loading ? (
        <div>Please Wait...</div>
      ) : error ? (
        <div>{error}</div>
      ) : (
        <Row>
          {products.map((product) => (
            <Col key={product.id} sm={6} md={5} lg={4} className="mb-3">
              <Card>
                <br />
                <br />
                <a href={product.link}>
                  <img
                    src={product.image}
                    className="card-img-top"
                    alt={product.name}
                  />
                </a>
                <Card.Body>
                  <div className="prodetail">
                    <p>
                      <i>{product.brand}</i>
                    </p>

                    <Card.Title>
                      <a href={product.link}>
                        <b>{product.name}</b>
                      </a>
                    </Card.Title>

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
                        <b>Buy</b>
                      </a>
                    </button>
                  </div>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      )}

      <div>
        <br />
        <h3>&nbsp;&nbsp;&nbsp;&nbsp;More products comming soon...</h3>
        <br />
        <br />
      </div>
    </div>
  );
}
export default Product;
