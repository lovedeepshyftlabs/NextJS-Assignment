import * as React from 'react';
import Grid from '@mui/material/Grid';
import { useDispatch } from 'react-redux';
import { addItem } from '../store/cartSlice';
import { useState, useEffect } from 'react';

export default function FormRow({ lists }) {
  const [data, setData] = useState([]);
  const [limit, setLimit] = useState(8);
  const [loading, setLoading] = useState(false);
  const [pageNumber, setPageNumber] = useState(1);
  const dispatch = useDispatch();
  const handleAdd = (product) => {
    dispatch(addItem(product));
  };

  
  const loadMoreData = () => {
    setLoading(true);
    const newData = lists.slice((pageNumber - 1) * limit, pageNumber * limit);
    setData((prevData) => [...prevData, ...newData]);
    setPageNumber((prevPageNumber) => prevPageNumber + 1);
    setLoading(false);
  };

  useEffect(() => {
    loadMoreData();
  }, [lists]);

  useEffect(() => {
    const handleScroll = () => {
      if (window.innerHeight + document.documentElement.scrollTop + 1 >= document.documentElement.offsetHeight) {
        loadMoreData();
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [loadMoreData]);

 
  return (
    <React.Fragment>
    {data.map((item, index) => (
      <Grid key={index} item xs={6} sm={6} md={3} className='card'>
        <img style={{ height: '150px', width: '120px' }} src={item.image} alt="Not Available"/>
        <h4>{item.title}</h4>
        <h5>{item.price}</h5>
        <button onClick={() => handleAdd(item)} className="btn">
          Add to cart
        </button>
      </Grid>
    ))}
    {loading && <div>Loading...</div>}
  </React.Fragment>
  );
}
