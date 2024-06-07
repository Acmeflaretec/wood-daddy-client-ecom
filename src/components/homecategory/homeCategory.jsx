import React,{useState,useEffect} from 'react'
import './index.css'
import axiosInstance from '../../axios';
import { useNavigate } from 'react-router-dom';


function HomeCategory() {

  const navigate = useNavigate();

  const handleCategory = async(e,cat) =>{

    navigate(`/productfetch/${cat}`);

  }

const categories = [
  {
    imgUrl:'/gallery/c2.jpg',
    category:'SOFA',
    cat_id:'6655b2ec006290bd3c7e3935'

  },
  {
    imgUrl:'/gallery/c3.jpg',
    category:'TABLE',
    cat_id:'664ee6aa98b29a202c2c7bf3'

  },
  {
    imgUrl:'/gallery/c1.jpg',
    category:'CHAIR',
    cat_id:'6655b340006290bd3c7e3944'
  },
]

  return (
    <div className='HomeCategory'>
      {
categories.map((obj,index)=>(
<div className="catBox" style={{backgroundImage:`url(${obj.imgUrl})`,
 }} onClick={(e)=>handleCategory(e,obj.cat_id)} >

<h2>{obj.category}</h2>

</div>
))

      }


    </div>
  )
}

export default HomeCategory