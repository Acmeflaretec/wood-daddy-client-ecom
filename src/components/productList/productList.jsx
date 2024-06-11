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
  const [totalPages, setTotalPages] = useState(1); // New state for total pages

  const [latest, setLatest] = useState('');
  const [disc, setDisc] = useState('');
  const [sortRate, setsortRate] = useState('');

  const [usersId,setUsersId] = useState()


  let urlQuery = '';

  if (recentf) urlQuery = `http://localhost:5000/api/v1/products?page=${page}&limit=6&sortField=createdAt&sortOrder=desc`;

  if (searchItem) urlQuery = `http://localhost:5000/api/v1/products?page=${page}&limit=10&search=${searchItem}&sortField=createdAt&sortOrder=desc`;

  // if (type === 'wishlist') urlQuery = `http://localhost:5000/api/v1/wishlist/664db80748eeadcd76759a55/wishlist?page=${page}&limit=6&sortField=createdAt&sortOrder=desc`;

  if (type === 'productFetch') urlQuery = `http://localhost:5000/api/v1/products?page=${page}&limit=9&category=${categ}&sortField=createdAt&sortOrder=desc`;

  useEffect(() => {
   
    const fetchData = async () => {
      const response = await axiosInstance.get(`http://localhost:5000/api/v1/auth/getuser`);
      setUsersId(response.data.data[0]._id)
      console.log('userrrr',response.data.data[0]._id)
    }
    fetchData()
    
  }, []);


  const handleSortChange = (event) => {
    console.log('clicked',event.target.value)
    setLatest(event.target.value);
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
  const handleSortClick = (event) => {
    console.log('clicked',event.target.value)
  };
  const handleRateClick = (event) => {
    console.log('clicked',event.target.value)
  };

  const handleChange = (event, value) => {
    setPage(value);
  };


  // useEffect(() => {
  //   const fetchData = async () => {
  //     try {
  //       const response = await axiosInstance.get(urlQuery);
  //       setDetails(response.data.products);
  //       setTotalPages(Math.ceil(response.data.totalProducts / 10)); // Set total pages based on total products
  //       console.log('tpages',Math.ceil(response.data.totalProducts / 10))

  //     } catch (error) {
  //       console.error('Error fetching data:', error);
  //     }
  //   };

  //   fetchData();
  // }, [page, urlQuery]);

  useEffect(() => {
    if (usersId) {
      if (type === 'wishlist') urlQuery = `http://localhost:5000/api/v1/wishlist/${usersId}/wishlist?page=${page}&limit=6&sortField=createdAt&sortOrder=desc`;

        const fetchData = async () => {
      try {
        const response = await axiosInstance.get(urlQuery);
        setDetails(response.data.products);
        setTotalPages(Math.ceil(response.data.totalProducts / 10)); // Set total pages based on total products
        //console.log('tpages',Math.ceil(response.data.totalProducts / 10))

      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
   
      
    }
  }, [page,usersId]);

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
          onClick={handleSortClick}

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
          <ProductCard key={index} type={type} productDetails={pro} />
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



// import React, { useState, useEffect } from 'react';
// import axiosInstance from '../../axios';
// import ProductCard from './productCard';
// import './index.css';
// import Typography from '@mui/material/Typography';
// import Pagination from '@mui/material/Pagination';
// import Stack from '@mui/material/Stack';

// import Box from '@mui/material/Box';
// import InputLabel from '@mui/material/InputLabel';
// import MenuItem from '@mui/material/MenuItem';
// import FormControl from '@mui/material/FormControl';
// import Select from '@mui/material/Select';

// function ProductList(props) {
//   const { title, type, recentf, searchItem, categ } = props;
//   const [details, setDetails] = useState([]);
//   const [page, setPage] = useState(1);
//   const [totalPages, setTotalPages] = useState(1);
//   const [latest, setLatest] = useState('');
//   const [disc, setDisc] = useState('');
//   const [sortRate, setsortRate] = useState('');

//   const getQueryParams = () => {
//     let urlQuery = `http://localhost:5000/api/v1/products?page=${page}&limit=6`;
//     if (recentf) {
//       urlQuery += `&sortField=createdAt&sortOrder=desc`;
//     }
//     if (searchItem) {
//       urlQuery += `&search=${searchItem}&sortField=createdAt&sortOrder=desc`;
//     }
//     if (type === 'wishlist') {
//       urlQuery = `http://localhost:5000/api/v1/wishlist/664db80748eeadcd76759a55/wishlist?page=${page}&limit=6&sortField=createdAt&sortOrder=desc`;
//     }
//     if (type === 'productFetch') {
//       urlQuery += `&category=${categ}&sortField=createdAt&sortOrder=desc`;
//     }
//     if (latest) {
//       urlQuery += latest === 'latest' ? `&sortField=createdAt&sortOrder=desc` : `&sortField=createdAt&sortOrder=asc`;
//     }
//     if (disc) {
//       urlQuery += `&sortDiscountGreaterThan=${disc}`;
//     }
//     if (sortRate) {
//       urlQuery += `&priceLessThan=${sortRate}`;
//     }
//     return urlQuery;
//   };

//   const handleSortChange = (event) => {
//     setLatest(event.target.value);
//     setPage(1); // Reset to first page
//   };

//   const handleDiscChange = (event) => {
//     setDisc(event.target.value);
//     setPage(1); // Reset to first page
//   };

//   const handleRateChange = (event) => {
//     setsortRate(event.target.value);
//     setPage(1); // Reset to first page
//   };

//   const handleChange = (event, value) => {
//     setPage(value);
//   };

//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const urlQuery = getQueryParams();
//         console.log('Fetching data with query:', urlQuery);
//         const response = await axiosInstance.get(urlQuery);
//         console.log('Response data:', response.data);
//         setDetails(response.data.products);
//         setTotalPages(Math.ceil(response.data.totalProducts / 6));
//       } catch (error) {
//         console.error('Error fetching data:', error);
//       }
//     };
//     fetchData();
//   }, [page, latest, disc, sortRate, searchItem, categ, recentf]);

//   return (
//     <div className='ProductsBox'>
//       <div className="Title">
//         <h1 style={{ color: '#6e6e6e' }}>{title}</h1>
//       </div>

//       {type === 'productFetch' ? (
//         <div style={{ display: 'flex', width: '100%', justifyContent: 'center', marginBottom: '50px' }}>
//           <Box sx={{ minWidth: 120 }}>
//             <FormControl fullWidth>
//               <InputLabel id="discount-select-label">Discount</InputLabel>
//               <Select
//                 labelId="discount-select-label"
//                 id="discount-select"
//                 value={disc}
//                 label="Discount"
//                 onChange={handleDiscChange}
//               >
//                 <MenuItem value={40}>Greater than 40%</MenuItem>
//                 <MenuItem value={50}>Greater than 50%</MenuItem>
//                 <MenuItem value={60}>Greater than 60%</MenuItem>
//                 <MenuItem value={70}>Greater than 70%</MenuItem>
//               </Select>
//             </FormControl>
//           </Box>
//           <Box sx={{ minWidth: 120 }}>
//             <FormControl fullWidth>
//               <InputLabel id="sort-select-label">Sort</InputLabel>
//               <Select
//                 labelId="sort-select-label"
//                 id="sort-select"
//                 value={latest}
//                 label="Sort"
//                 onChange={handleSortChange}
//               >
//                 <MenuItem value={'latest'}>Latest</MenuItem>
//                 <MenuItem value={'oldest'}>Oldest</MenuItem>
//               </Select>
//             </FormControl>
//           </Box>
//           <Box sx={{ minWidth: 120 }}>
//             <FormControl fullWidth>
//               <InputLabel id="rate-select-label">Rate</InputLabel>
//               <Select
//                 labelId="rate-select-label"
//                 id="rate-select"
//                 value={sortRate}
//                 label="Rate"
//                 onChange={handleRateChange}
//               >
//                 <MenuItem value={1000}>Lesser than 1000</MenuItem>
//                 <MenuItem value={5000}>Lesser than 5000</MenuItem>
//                 <MenuItem value={10000}>Lesser than 10000</MenuItem>
//                 <MenuItem value={15000}>Lesser than 15000</MenuItem>
//                 <MenuItem value={20000}>Lesser than 20000</MenuItem>
//               </Select>
//             </FormControl>
//           </Box>
//         </div>
//       ) : null}

//       <div className="ProductList">
//         {details && details.length > 0 ? (
//           details.map((pro, index) => (
//             <ProductCard key={index} type={type} productDetails={pro} />
//           ))
//         ) : (
//           <Typography variant="h6">No products found</Typography>
//         )}
//         <div className="pagination">
//           {!recentf ? (
//             <Stack spacing={2}>
//               <Typography>Page: {page}</Typography>
//               <Pagination count={totalPages} page={page} onChange={handleChange} />
//             </Stack>
//           ) : null}
//         </div>
//       </div>
//     </div>
//   );
// }

// export default ProductList;

