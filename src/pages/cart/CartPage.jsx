// import React, { useState, useEffect } from 'react';
// import axiosInstance from '../../axios';
// import Header from '../../layouts/header'
// import Footer from '../../layouts/footer'
// import Cart from '../../components/cart/Cart'
// import ActiveLastBreadcrumb from '../../common/breadCrums/breadCrums'

// function CartPage() {

//   const [details, setDetails] = useState([]);
//   var urlQuery = `http://localhost:5000/api/v1/cart/664db80748eeadcd76759a55?page=1&limit=6&sortField=createdAt&sortOrder=desc` ;

//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const response = await axiosInstance.get(urlQuery);
//         setDetails(response.data.products);
      
//       } catch (error) {
//         console.error('Error fetching data:', error);
//       }
//     };

    
//       fetchData();
     
//   }, []);

//   return (
//     <div>
//        <Header />
//        <div style={{height:'60px',display:'flex',alignItems:'center',width:'100%',justifyContent:'center'}}>
//     <ActiveLastBreadcrumb/>

//     </div>

//     {details && details.map((pro, index) => (
// <>
// <Cart key={index} productDetails={pro} />
// </>


// ))}

     
     
// <div style={{marginTop:'30px'}}>
// <Footer />
// </div>
     
//     </div>
//   )
// }

// export default CartPage

import React, { useState, useEffect } from 'react';
import axiosInstance from '../../axios';
import Header from '../../layouts/header';
import Footer from '../../layouts/footer';
import Cart from '../../components/cart/Cart';
import ActiveLastBreadcrumb from '../../common/breadCrums/breadCrums';
import { useParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

function CartPage() {
  const [details, setDetails] = useState([]);
  const navigate = useNavigate();

  const [usersId,setUsersId] = useState()
  useEffect(() => {
   
    const fetchData = async () => {
      const response = await axiosInstance.get(`http://localhost:5000/api/v1/auth/getuser`);
      setUsersId(response.data.data[0]._id)
      console.log('userrrr',response.data.data[0]._id)
    }
    fetchData()
    
  }, []);
  useEffect(() => {
    if (usersId) {
      const urlQuery = `http://localhost:5000/api/v1/cart/${usersId}?page=1&sortField=createdAt&sortOrder=desc`;
      // Now you can use the urlQuery for further data fetching or processing
      console.log('URL Query:', urlQuery);
      // You can also fetch data here if needed
      const fetchCartData = async () => {
        try {
          const response = await axiosInstance.get(urlQuery);
          setDetails(response.data.products);
          // Handle the cart data
        } catch (error) {
          console.error('Error fetching cart data:', error);
        }
      };
      fetchCartData();
    }
  }, [usersId]);


  const handleOrder = async () => {
   navigate(`/order`);
  
  }
  // var urlQuery = `http://localhost:5000/api/v1/cart/${usersId}?page=1&sortField=createdAt&sortOrder=desc`;

  // useEffect(() => {
  //   const fetchData = async () => {
  //     try {
  //       const response = await axiosInstance.get(urlQuery);
  //       setDetails(response.data.products);
  //     } catch (error) {
  //       console.error('Error fetching data:', error);
  //     }
  //   };

  //   fetchData();
  // }, []);


  return (
    <div>
      <Header />
      <div style={{ height: '60px', display: 'flex', alignItems: 'center', width: '100%', justifyContent: 'center' }}>
        <ActiveLastBreadcrumb />
      </div>

      {details && details.map((pro, index) => (
        <Cart key={index} productDetails={pro} details={details} setDetails={setDetails} usersIdM={usersId} numberIndex={index} />
      ))}
        <div className="buy-button-container" style={{width:'100%',display:'flex',justifyContent:'center',marginTop:'50px'}}>
        <button className="buy-button" onClick={()=> handleOrder()} >Order product</button>
      </div>

      <div style={{ marginTop: '30px' }}>
        <Footer />
      </div>
    </div>
  );
}

export default CartPage;

