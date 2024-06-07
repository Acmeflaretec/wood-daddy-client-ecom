import React, { useState, useEffect } from 'react';
import axiosInstance from '../../axios';
import ProductCard from './productCard';
import './index.css';
import Typography from '@mui/material/Typography';
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';



function ProductList(props) {
  const {title,type,recentf,searchItem,categ} = props;
  const [details, setDetails] = useState([]);
  const [page, setPage] = useState(1);

  const handleChange = (event, value) => {
    setPage(value);
  };
 
  if(recentf) var urlQuery = `http://localhost:5000/api/v1/products?page=1&limit=6&sortField=createdAt&sortOrder=desc` ;

  if(searchItem) var urlQuery =`http://localhost:5000/api/v1/products?page=1&limit=10&search=${searchItem}&sortField=createdAt&sortOrder=desc` ;

  if(type === 'wishlist')  var urlQuery = `http://localhost:5000/api/v1/wishlist/664db80748eeadcd76759a55/wishlist?page=1&limit=6&sortField=createdAt&sortOrder=desc` ;

  if(type === 'productFetch')  var urlQuery = `http://localhost:5000/api/v1/products?page=1&limit=9&category=${categ}&sortField=createdAt&sortOrder=desc` ;
  // axios fetch code 

  

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axiosInstance.get(urlQuery);
        setDetails(response.data.products);
        // console.log('prr',response.data.products)
      
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

      fetchData();
     
  }, []);

  return (
    <div className='ProductsBox'>
      <div className="Title">
        <h1 style={{color:'#6e6e6e'}}>{title}</h1>
      </div>
      <div className="ProductList"> {/* Updated class name */}

      {details && details.map((pro, index) => (
<>
<ProductCard key={index} type={type} productDetails={pro} />
</>


))}

        {/* <ProductCard type={type} productDetails={details} /> */}
       
       
        <div className="pagination">
    {!recentf ? (
      <Stack spacing={2}>
        <Typography>Page: {page}</Typography>
        <Pagination count={10} page={page} onChange={handleChange} />
      </Stack>
    ) : null}
  </div>

      </div>
    </div>
  );
}

export default ProductList;
