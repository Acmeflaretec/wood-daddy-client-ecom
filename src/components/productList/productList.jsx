import React, { useState, useEffect } from 'react';
import axiosInstance from '../../axios';
import ProductCard from './productCard';
import './index.css';
import Typography from '@mui/material/Typography';
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';


function ProductList(props) {
const {title,type,recentf} = props

  const [page, setPage] = useState(1);
  const handleChange = (event, value) => {
    setPage(value);
  };
 
  if(recentf) var urlQuery = `http://localhost:5000/api/v1/products?page=1&limit=6&sortField=createdAt&sortOrder=desc` ;

  // axios fetch code 

  const [details, setDetails] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axiosInstance.get(urlQuery);
        setDetails(response.data.products);
      
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
