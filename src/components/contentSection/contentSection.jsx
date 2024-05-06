import React from 'react'
import './index.css'

function ContentSection({title,para}) {
  return (
    <div className='contentSection'>
      <h1 className="title" style={{color:'#6e6e6e'}}>{title}</h1>
      <p className="contentPara" style={{color:'#888',fontFamily:'cursive'}}>
{para}       </p>
      </div>
  )
}

export default ContentSection