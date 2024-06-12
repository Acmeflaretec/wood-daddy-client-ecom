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
            const response = await axiosInstance.get('http://localhost:5000/api/v1/category');
            setCategories2(response.data.data);
            console.log(response.data.data)
             
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };

    fetchData();
}, []);

  const handleCategory = async(e,cat) =>{

    navigate(`/productfetch/${cat}`);

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
//`http://localhost:5000/uploads/${}`
  return (
    <div className='HomeCategory'>
      {
categories2.map((obj,index)=>(
<div className="catBox" style={{backgroundImage:`url(http://localhost:5000/uploads/${obj.image})`,
 }} onClick={(e)=>handleCategory(e,obj._id)} >

<h2>{obj.name}</h2>

</div>
))

      }


    </div>
  )
}

export default HomeCategory