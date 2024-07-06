import React,{useState,useEffect} from 'react'
import './index.css'
import axiosInstance from '../../axios';
import { useNavigate } from 'react-router-dom';


function HomeCategory() {

  const navigate = useNavigate();
  const [categories2,setCategories2] = useState([]) 

  useEffect(() => {
    const fetchData = async () => {
        try {
            const response = await axiosInstance.get(`${process.env.REACT_APP_API_URL}/api/v1/category/selectedcategories`);
            setCategories2(response.data.data);
        
             
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };

    fetchData();
}, []);

  const handleCategory = async(e,cat) =>{

    if(cat){
      navigate(`/productfetch?cat=${cat}`);
    }

   

  }

// const categories = [
//   {
//     imgUrl:'/gallery/c2.jpg',
//     category:'SOFA',
//     cat_id:'6655b2ec006290bd3c7e3935'

//   },
//   {
//     imgUrl:'/gallery/c3.jpg',
//     category:'TABLE',
//     cat_id:'664ee6aa98b29a202c2c7bf3'

//   },
//   {
//     imgUrl:'/gallery/c1.jpg',
//     category:'CHAIR',
//     cat_id:'6655b340006290bd3c7e3944'
//   },
// ]
//`${process.env.REACT_APP_API_URL}/uploads/${}`
  return (
    <div className='HomeCategory'>
      {
categories2.slice(0, 3).map((obj,index)=>(
<div className="catBox" style={{backgroundImage:`url(${process.env.REACT_APP_API_URL}/uploads/${obj.image})`,
 }} onClick={(e)=>handleCategory(e,obj._id)} >

<h2>{obj.name}</h2>

</div>
))

      }


    </div>
  )
}

export default HomeCategory