import React from 'react'
import './index.css'
import SearchIcon from '@mui/icons-material/Search';
import NotificationsIcon from '@mui/icons-material/Notifications';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import ShoppingBasketIcon from '@mui/icons-material/ShoppingBasket';
import { useNavigate  } from 'react-router-dom';

function SearchBar() {
  const navigate = useNavigate();

  
  return (
    <div className='SearchBar'>
      <div className='header-top'>

      <div className="logo-bar">
<h1 >Wood Daddy</h1>
</div>

<div className="search-bar">

<form   style={{ display: 'flex' }} >

        <SearchIcon className='headicons' />

      <input
        type="text"
         
        placeholder="Search..."
        style={{
          padding: '8px',
          borderRadius: '4px',
          border: 'none',
          outline: 'none',
         
        }}
      />
    
    </form>

</div>


<div className="grp-bar">
<NotificationsIcon className='headicons'  />
<FavoriteBorderIcon className='headicons' onClick={()=>navigate('/wishlist')} />
<ShoppingBasketIcon className='headicons'  />
</div>

      </div>
      <hr />
    </div>
  )
}

export default SearchBar