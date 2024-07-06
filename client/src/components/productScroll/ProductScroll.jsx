import React, { useEffect, useState } from 'react';
import './index.css';
import { pink,red,green } from '@mui/material/colors';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css'; 
import 'slick-carousel/slick/slick-theme.css';
import axiosInstance from '../../axios';
import { useNavigate } from 'react-router-dom';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import FavoriteIcon from '@mui/icons-material/Favorite';
import Snackbar from '@mui/material/Snackbar';
import ShareIcon from '@mui/icons-material/Share';

const ExpandMore = styled((props) => {
  const { expand, ...other } = props;
  return <IconButton {...other} />;
})(({ theme, expand }) => ({
  transform: !expand ? 'rotate(0deg)' : 'rotate(180deg)',
  marginLeft: 'auto',
  transition: theme.transitions.create('transform', {
    duration: theme.transitions.duration.shortest,
  }),
}));

function ProductScroll({type ,categoryId,setNotif }) {
  const navigate = useNavigate();
  const [expanded, setExpanded] = useState(false);
  const [details, setDetails] = useState([]);
  const [usersId, setUsersId] = useState();
const [snackBarMessage,setSnackBarMessage] = useState('')
  const [open, setOpen] = useState(false);

  const handleClick = () => {
    setOpen(true);
  };

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    setOpen(false);
  };
   
  var urlQuery = ``;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const UID =localStorage.getItem("UID")
        console.log('store ',UID) 

        const response = await axiosInstance.get(
          `${process.env.REACT_APP_API_URL}/api/v1/auth/getuser`
        );
        setUsersId(response.data.data[0]._id);
       // console.log('userrrr',response.data.data[0]._id)
        await  setNotif(prev => !prev)
      } catch (error) {
        console.log("prlist err", error);
      }
    };
    fetchData();
  }, []);

  if(type==='home') urlQuery=`${process.env.REACT_APP_API_URL}/api/v1/products?page=1&limit=9&sortField=createdAt&sortOrder=desc&uid=${localStorage.getItem("UID")}`

  if(type==='product') urlQuery=`${process.env.REACT_APP_API_URL}/api/v1/products?page=1&limit=9&category=${categoryId}&sortField=createdAt&sortOrder=desc&uid=${localStorage.getItem("UID")}`
 
//console.log('cat id ',categoryId)
  const fetchData = async () =>{
try {
  const response = await axiosInstance.get(urlQuery)
  setDetails(response.data.products)
  // setNotif(prev => !prev)
 // console.log('home prods',response.data.products)
} catch (error) {
  console.log('errr',error)
}

  }


useEffect(()=>{
fetchData()
},[])

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    responsive: [
      {
        breakpoint: 992,
        settings: {
          slidesToShow: 2,
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 1,
        },
      },
    ],
  };

  //add & remove cart wishlist start

  const addCart = async(e,proId)=>{

    e.preventDefault()
     console.log('proid',proId)
      try {
    
        const response = await axiosInstance.post(`${process.env.REACT_APP_API_URL}/api/v1/cart/${usersId}/${proId}`);
      //  setDetails({ ...details, inCart: true });
     await   fetchData()

     
   await  setNotif(prev => !prev)
     setSnackBarMessage('added to cart')
     handleClick()
      } catch (error) {
        console.log('err',error)
      }
      
  
  }
  const removeCart = async(e,proId)=>{
  
    e.preventDefault()
    console.log('proid',proId)
    try {
  
      const response = await axiosInstance.delete(`${process.env.REACT_APP_API_URL}/api/v1/cart/${usersId}/${proId}`);
   //   setDetails({ ...details, inCart: false });
    await  fetchData()

   await setNotif(prev => !prev)
    setSnackBarMessage('removed from cart')
    handleClick()
    } catch (error) {
      console.log('err',error)
    }
    
  }
  const addWishlist = async(e,proId)=>{
    e.preventDefault()
  console.log('proid',proId)
    try {
  
      const response = await axiosInstance.post(`${process.env.REACT_APP_API_URL}/api/v1/wishlist/${usersId}/${proId}/wishlist`);
     // setDetails({ ...details, inWishlist: true });
    await fetchData()
   await setNotif(prev => !prev)
    setSnackBarMessage('added to wishlist')
    handleClick()
    } catch (error) {
      console.log('err',error)
    }
    
  }
  const removeWishlist = async(e,proId)=>{
    e.preventDefault()
    console.log('proid',proId)
    try {
  
      const response = await axiosInstance.delete(`${process.env.REACT_APP_API_URL}/api/v1/wishlist/${usersId}/${proId}/wishlist`);
     // setDetails({ ...details, inWishlist: false });

     await fetchData()
    await setNotif(prev => !prev)
     setSnackBarMessage('removed from wishlist')
     handleClick()
    } catch (error) {
      console.log('err',error)
    }
    
  }


    //add & remove cart wishlist start



  function truncateText(text, maxLength) {
    
    const words = text.split(' ');
    if (words.length > maxLength) {
      return words.slice(0, maxLength).join(' ') + '...';
    }
    return text;
  }

  return (
    <div className='prodScrollMain' style={{ display: 'flex', justifyContent: 'center', flexDirection: 'column' }}>
      <div style={{ width: '100%', margin: '0 auto' }}> {/* Adjust width as necessary */}
        <Slider {...settings}>
          {details.map((item, index) => (
            <div key={index} style={{ padding: '0 10px' }}> {/* Add padding around each card */}
              <Card sx={{ maxWidth: 285, margin: '0 auto' }}>
                <CardMedia
                  component="img"
                  height="260"
                  image={`${process.env.REACT_APP_API_URL}/uploads/1717839555991-a2.jpg`}
                  alt="Paella dish"
                  onClick={()=>navigate(`/product/${item._id}`)}

                />
                <CardContent>
                <Typography variant="h6" color="text.primary"  onClick={()=>navigate(`/product/${item._id}`)}>
                      {item.name}
                    </Typography>
                
                <div style={{ display: 'flex', gap: '20px', alignItems: 'center' }}>
                    <Typography variant="h6" color="text.primary">
                      ₹{item.sale_rate}
                    </Typography>
                    <Typography variant="h6"  color="text.secondary" style={{ textDecoration: 'line-through' }}>
                      ₹{item.price}
                    </Typography>
                    <Typography variant="h6" style={{ color: 'green' }}>
                      {item.discount}%
                    </Typography>
                  </div>
                  {/* { item?.stock <=10 ?  ( <p className='warning'>Hurry up! only {details.stock} left</p>):('')} */}
                  { item?.stock > 0 ? (<p style={{color:'green'}} >In stock</p>) : (<p style={{color:'red'}} >Out of stock</p>)}
                
                  <Typography variant="body2" color="text.secondary">
                    {truncateText(item?.description, 10)}
                  </Typography>
                </CardContent>
                <CardActions>
                  <div style={{ marginLeft: '10%', width: '80%', display: 'flex', justifyContent: 'space-between' }}>

{!item?.inWishlist ? 
                   ( <IconButton aria-label="add to favorites"  onClick={usersId ? (e)=>addWishlist(e,item._id) : ()=>navigate('/login')}  >
                      <FavoriteIcon fontSize="large" color='success'  />
                    </IconButton>)
                    :
                    ( <IconButton aria-label="add to favorites" onClick={usersId ? (e)=>removeWishlist(e,item._id) : ()=> navigate('/login')  }>
                      <FavoriteIcon fontSize="large" sx={{ color: red[500] }}  />
                    </IconButton>)

}

{ !item?.inCart ? 
                    (<IconButton aria-label="share" disabled={item?.stock <= 0}
                      onClick={usersId ? (e)=>addCart(e,item._id) :()=>navigate('/login') }   >
                      <ShoppingCartIcon fontSize="large" color='success' />
                    </IconButton>)  
                    :
                      (<IconButton aria-label="share" disabled={item?.stock <= 0}
                        onClick={usersId ? (e)=>removeCart(e,item._id) : ()=> navigate('/login')}  >
                        <ShoppingCartIcon fontSize="large" sx={{ color: red[500] }} />
                      </IconButton>)

                    }
                  </div>
                </CardActions>
              </Card>
            </div>
          ))}
        </Slider>
      </div>
      <Snackbar
        open={open}
        autoHideDuration={5000}
        onClose={handleClose}
        message={snackBarMessage}
      />
    </div>
  );
}

export default ProductScroll;
