import React, { useState, useEffect } from 'react';
import './index.css'
import axiosInstance from '../../axios'

function ContentSection({title,para}) {

  const [content,setContent] = useState({}) 

  useEffect(() => {
    const fetchData = async () => {
        try {
            const response = await axiosInstance.get('http://localhost:5000/api/v1/contentSection');
            setContent(response.data.data[0]);
             
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };

    fetchData();
}, []);

  return (
    <div className='contentSection'>
      <h1 className="title" style={{color:'#6e6e6e'}}>{content.title}</h1>
      <p className="contentPara" style={{color:'#888',fontFamily:'cursive'}}>
{content.desc}       </p>
      </div>
  )
}

export default ContentSection