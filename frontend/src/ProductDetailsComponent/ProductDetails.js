import axios from 'axios';
import { useEffect, useReducer } from 'react';
import { useParams } from 'react-router-dom';
import './ProductDetails.css';

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

  return loading ? (
    <div>Loading Please Wait.......</div>
  ) : error ? (
    <div>{error}</div>
  ) : (
    <div>
      <h1>{product.id}</h1>
      <h1>{product.name}</h1>
    </div>
  );
}

export default ProductDetails;
