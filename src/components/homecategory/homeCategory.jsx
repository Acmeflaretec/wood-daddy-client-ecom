import React from 'react'
import './index.css'

function HomeCategory() {

const categories = [
  {
    imgUrl:'/gallery/c2.jpg',
    category:'SOFA'
  },
  {
    imgUrl:'/gallery/c3.jpg',
    category:'TABLE'
  },
  {
    imgUrl:'/gallery/c1.jpg',
    category:'CHAIR'
  },
]

  return (
    <div className='HomeCategory'>
      {
categories.map((obj,index)=>(
<div className="catBox" style={{backgroundImage:`url(${obj.imgUrl})`,
 }}>

<h2>{obj.category}</h2>

</div>
))

      }


    </div>
  )
}

export default HomeCategory