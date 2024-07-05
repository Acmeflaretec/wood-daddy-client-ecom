 

import React, { useState,useEffect } from 'react';
import axiosInstance from '../../axios';
import './card.css';
import Button from '@mui/material/Button';
import { useNavigate } from 'react-router-dom';
 import DeleteIcon from '@mui/icons-material/Delete';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
 import ReceiptIcon from '@mui/icons-material/Receipt';
 
import Box from '@mui/material/Box';
import Fab from '@mui/material/Fab';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
 

function Cart({setNotif}) {

  const [quantity, setQuantity] = useState(1);
const [TotalAmnt,setTotalAmnt] = useState(0)
  const navigate = useNavigate();

// 

const [details, setDetails] = useState([]);
  const [usersId,setUsersId] = useState()
  useEffect(() => {
   
    const fetchData = async () => {
      const response = await axiosInstance.get(`${process.env.REACT_APP_API_URL}/api/v1/auth/getuser`);
      setUsersId(response.data.data[0]._id)
      console.log('userrrr',response.data.data[0]._id)
    }
    fetchData()
    
  }, []);
  useEffect(() => {
    if (usersId) {
      const urlQuery = `${process.env.REACT_APP_API_URL}/api/v1/cart/${usersId}?page=1&sortField=createdAt&sortOrder=desc`;
      // Now you can use the urlQuery for further data fetching or processing
      console.log('URL Query:', urlQuery);
      // You can also fetch data here if needed
      const fetchCartData = async () => {
        try {
          const response = await axiosInstance.get(urlQuery);
          setDetails(response.data.products);
          convertToServerFormat(response.data.products)
         
        } catch (error) {
          console.error('Error fetching cart data:', error);
        }
      };
      fetchCartData();
    }
  }, [usersId]);




// 



  const incrementQuantity = async(id,stock,qty,numberIndex) => {
    console.log('iddd',id)
    try {
      if(qty < stock){
        await axiosInstance.put(`${process.env.REACT_APP_API_URL}/api/v1/cart/increase/${id}`);
        // Fetch updated order items
        const response = await axiosInstance.get(`${process.env.REACT_APP_API_URL}/api/v1/cart/${usersId}?page=1&limit=6&sortField=createdAt&sortOrder=desc`);
       // console.log('ress cart',response.data)
        setDetails(response.data.products);
        convertToServerFormat(response.data.products)
        setNotif(prev => !prev);
      }

    } catch (error) {
      
    }
   // setQuantity(quantity + 1);
  };

  const decrementQuantity = async(id,stock,qty,numberIndex) => {
    try {

      if(qty!=1 ){
        await axiosInstance.put(`${process.env.REACT_APP_API_URL}/api/v1/cart/decrease/${id}`);
        const response = await axiosInstance.get(`${process.env.REACT_APP_API_URL}/api/v1/cart/${usersId}?page=1&limit=6&sortField=createdAt&sortOrder=desc`);
      //  console.log('ress cart',response.data)
        setDetails(response.data.products);
        convertToServerFormat(response.data.products)
        setNotif(prev => !prev);
      }


    } catch (error) {
      
    }
  
  };

  const handleCardClick = (prodId) => {
    navigate(`/product/${prodId}`);
  };

  const removeCart = async (e, proId) => {
    e.preventDefault();
    console.log('proid', proId);
    try {
      const response = await axiosInstance.delete(`${process.env.REACT_APP_API_URL}/api/v1/cart/${usersId}/${proId}`);
      
      setDetails(details.filter((item) => item._id !== proId));
      convertToServerFormat(details.filter((item) => item._id !== proId))
      setNotif(prev => !prev);
    } catch (error) {
      console.log('err', error);
    }
  };

 

  function convertToServerFormat(details) {
    const products = details.map(item => ({
      product_id: item._id, // Assuming _id represents the product ID
      qty: item.cartDetails.length > 0 ? item.cartDetails[0].qty : 0, // Assuming qty is taken from cartDetails
      price: item.sale_rate // Assuming sale_rate represents the price
    }));
  
    const totalSalePrice = products.reduce((acc, curr) => acc + (curr.qty * curr.price), 0);

    setTotalAmnt(totalSalePrice)
    return {
      item: products,
      totalSalePrice
    };
  }

  return (

    <>
     <div className="cartMain">

{ details.length > 0 &&  (<div className="cartTotalMain">
  <div className="cartTotal">
    <div className="cartTotalContents">
    <p style={{ display: 'flex', alignItems: 'center' }}>
      <span><ReceiptIcon/></span>
      <span style={{ fontSize: '20px', color: 'green' }}>Order summary</span>
    </p>
<p>Price: ₹{TotalAmnt} </p>
<p>Discount: ₹898 </p>

<hr />
<p style={{fontSize: '18px',fontWeight:'bold'}} >Total Amount: ₹{TotalAmnt} </p>

<Button variant="contained" color="success" startIcon={<ShoppingCartIcon />}>
        Checkout
      </Button>

    </div>
  

  </div>


</div>)}

<div className="proMain1">
{
details && details.map((pro, index) => (

  <div className='Product1' style={{ marginTop: '30px' }}>
      <div className="proSub1">
        <div className="imgFrame1">
          <img
          src={`${process.env.REACT_APP_API_URL}/uploads/${pro.image[0]}` }
          // src='/gallery/products/p1.jpg'
            alt='Product' onClick={()=>handleCardClick(pro._id)} />
        </div>
        <div className="proContents1">
          <p className='ftitle1'>{pro.name}</p>
       { pro.stock > 0 && <p style={{color:'green'}} >In stock</p>}
          <p style={{color:'gray',}}> sold by <span style={{color:'#0066C0'}}> {pro.brand}</span> </p>
          <p style={{fontSize:'24px'}} >₹:{pro.sale_rate}</p>
          <p>

            {/* <span className='fpr'></span> */}
            <span className='fdpr1'>₹{pro.price}</span>
            <span className='dcnt1'>{pro.discount}% off</span>
          </p>

          <div style={{ display: 'flex', alignItems: 'center', gap: '2px' }}>


<div className="qtyBtn" style={{width:'100%',display:'flex',justifyContent:'space-between'}} >

<Box sx={{ '& > :not(style)': { m: 2 } }}>
      <Fab size="small"   aria-label="decrease" onClick={()=> decrementQuantity(pro.inCart._id,pro.stock,pro.cartDetails[0].qty,index)}>
        <RemoveIcon />
      </Fab>
      {/* <Fab size="small"   aria-label="add">
    5
      </Fab> */}
     <span style={{fontSize:'22px'}} >{pro.cartDetails[0].qty}</span>
      <Fab size="small"   aria-label="increase" onClick={()=> incrementQuantity(pro.inCart._id,pro.stock,pro.cartDetails[0].qty,index)}>
        <AddIcon />
      </Fab>
    </Box>
    <Box sx={{ '& > :not(style)': { m: 2 } }}>
    <Button variant="contained" color="success" startIcon={<ShoppingCartIcon />} onClick={(e) => navigate('/order')}>
        Buy Now
      </Button>

    <Fab  aria-label="remove" size="small" onClick={(e) => removeCart(e, pro._id)}>
  <DeleteIcon style={{ color: '#8B0000' }} />
</Fab>
    </Box>
    

</div>


          </div>

        </div>
      </div>
    </div>

))
}
</div>






    </div>
{details.length <=0 &&  (<div style={{display:'flex',justifyContent:'center',padding:'50px'}}>
<Button variant="contained" color="success" startIcon={<AddIcon />}  onClick={()=>navigate(`/productfetch?allProducts=allProducts`)} >
        Add
      </Button>
</div>)}

    </>
   
    
  );
}

export default Cart;

