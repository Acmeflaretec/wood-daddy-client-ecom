import React, { useState, useEffect } from 'react';
import axiosInstance from '../../axios';
import ProductCard from './productCard';
import './index.css';
import Typography from '@mui/material/Typography';
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';

import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';


function ProductList(props) {
  const { title, type, recentf, searchItem, categ } = props;
  const [details, setDetails] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1); 
  const [latest, setLatest] = useState('');
  const [disc, setDisc] = useState('');
  const [sortRate, setsortRate] = useState('');
  const [usersId,setUsersId] = useState()

  const [sortInit,setSortInit] = useState('desc')



  let urlQuery = '';
  if (recentf) urlQuery = `http://localhost:5000/api/v1/products?page=${page}&limit=6&sortField=createdAt&sortOrder=desc`;

  if (searchItem) urlQuery = `http://localhost:5000/api/v1/products?page=${page}&limit=10&search=${searchItem}&sortField=createdAt&sortOrder=${sortInit}`;


  if (type === 'productFetch') urlQuery = `http://localhost:5000/api/v1/products?page=${page}&limit=9&category=${categ}&sortField=createdAt&sortOrder=${sortInit}`;
  

  useEffect(() => {
    
    const fetchData = async () => {

try {
  
  const response = await axiosInstance.get(`http://localhost:5000/api/v1/auth/getuser`);
  setUsersId(response.data.data[0]._id)
  console.log('userrrr',response.data.data[0]._id)
} catch (error) {
  console.log('prlist err',error)
}

    }
    fetchData()
    
  }, []);

  useEffect(() => {
    if (type === 'wishlist') {
      if (usersId) urlQuery = `http://localhost:5000/api/v1/wishlist/${usersId}/wishlist?page=${page}&limit=6&sortField=createdAt&sortOrder=desc`;
        const fetchData = async () => {
      try {
        const response = await axiosInstance.get(urlQuery);
        setDetails(response.data.products);
        setTotalPages(Math.ceil(response.data.totalProducts / 10));
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
  
    fetchData();


    }else{
      setDetails(null)
      const fetchData = async () => {
        try {
          const response = await axiosInstance.get(urlQuery);
          
          console.log('data reached ',response.data.products)
          setTotalPages(Math.ceil(response.data.totalProducts / 10));
          setDetails(response.data.products);
        } catch (error) {
          console.error('Error fetching data:', error);
        }
      };
      fetchData();
    }

  }, [page,usersId,latest]);


  
 


  const handleSortChange = (event) => {
    console.log('changed',event.target.value)
  setDetails(null)
  if(event.target.value === 10){
setSortInit('desc')
setLatest(event.target.value);

  }else if(event.target.value === 20){ 
    setSortInit('asc')
    setLatest(event.target.value);


  }



  };
  const handleDiscChange = (event) => {
    console.log('clicked',event.target.value)
    setDisc(event.target.value);
  };
  const handleRateChange = (event) => {
    console.log('clicked',event.target.value)
    setsortRate(event.target.value);
  };


  const handleDiscClick = (event) => {
    console.log('clicked',event.target.value)
  };
  // const handleSortClick = (event) => {
  //   console.log('clicked',event.target.value)
  // };
  const handleRateClick = (event) => {
    console.log('clicked',event.target.value)
  };

  const handleChange = (event, value) => {
    setPage(value);
  };

 


  return (
    <div className='ProductsBox'>
      <div className="Title">
        <h1 style={{ color: '#6e6e6e' }}>{title}</h1>
      </div>

{ type === 'productFetch' ? ( <div style={{display:'flex',width:'100%',justifyContent:'center',marginBottom:'50px'}}>
<Box sx={{ minWidth: 120 }}>
      <FormControl fullWidth>
        <InputLabel id="demo-simple-select-label">discount</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={disc}
          label="discount"
          onChange={handleDiscChange}
          onClick={handleDiscClick}

        >
          <MenuItem value={10}>greater than 40%</MenuItem>
          <MenuItem value={20}>greater than 50%</MenuItem>
          <MenuItem value={30}>greater than 60%</MenuItem>
          <MenuItem value={40}>greater than 70%</MenuItem>

         </Select>
      </FormControl>
    </Box>
    <Box sx={{ minWidth: 120 }}>
      <FormControl fullWidth>
        <InputLabel id="demo-simple-select-label">Sort</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={latest}
          label="Sort"
          onChange={handleSortChange}
          // onClick={handleSortClick}

        >
          <MenuItem value={10}>Latest</MenuItem>
          <MenuItem value={20}>Oldest</MenuItem>
         </Select>
      </FormControl>
    </Box>
    <Box sx={{ minWidth: 120 }}>
      <FormControl fullWidth>
        <InputLabel id="demo-simple-select-label">Rate</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={sortRate}
          label="Sort"
          onChange={handleRateChange}
          onClick={handleRateClick}

        >
          <MenuItem value={10}>lesser than 1000</MenuItem>
          <MenuItem value={20}>lesser than 5000</MenuItem>
          <MenuItem value={30}>lesser than 10000</MenuItem>
          <MenuItem value={40}>lesser than 15000</MenuItem>
          <MenuItem value={50}>lesser than 20000</MenuItem>


         </Select>
      </FormControl>
    </Box>
</div> ) : ('')
}

      <div className="ProductList">
        {details && details.map((pro, index) => (
          <ProductCard key={index} type={type} productDetails={pro} usersIdM={usersId} />
        ))}
        <div className="pagination">
          {!recentf ? (
            <Stack spacing={2}>
              <Typography>Page: {page}</Typography>
              <Pagination count={totalPages} page={page} onChange={handleChange} />
            </Stack>
          ) : null}
        </div>
      </div>
    </div>
  );
}

export default ProductList;

