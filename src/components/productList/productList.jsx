import React from 'react';
import ProductCard from './productCard';
import './index.css';
import Typography from '@mui/material/Typography';
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';


function ProductList(props) {
const {title,type} = props

  const [page, setPage] = React.useState(1);
  const handleChange = (event, value) => {
    setPage(value);
  };


  return (
    <div className='ProductsBox'>
      <div className="Title">
        <h1 style={{color:'#6e6e6e'}}>{title}</h1>
      </div>
      <div className="ProductList"> {/* Updated class name */}
        <ProductCard type={type} />
        <ProductCard type={type}/>
        <ProductCard type={type}/>
        <ProductCard type={type}/>
        <ProductCard type={type}/>
        <ProductCard type={type}/>
       

<div className="pagination">
<Stack spacing={2}>
      <Typography>Page: {page}</Typography>
      <Pagination count={10} page={page} onChange={handleChange} />
    </Stack>
</div>

      </div>
    </div>
  );
}

export default ProductList;
