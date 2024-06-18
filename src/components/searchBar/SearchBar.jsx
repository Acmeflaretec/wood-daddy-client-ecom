

// SearchBar component
import React from 'react';
import './index.css';
import SearchIcon from '@mui/icons-material/Search';
import NotificationsIcon from '@mui/icons-material/Notifications';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import ShoppingBasketIcon from '@mui/icons-material/ShoppingBasket';
import { useNavigate } from 'react-router-dom';

function SearchBar(props) {
  const navigate = useNavigate();
  const { setSearch1, search1 } = props; // Change setSearch to setSearch1

  const handleSearch = (e) => {
    
    navigate(`/search/${search1}`);
    console.log('click search', search1);
  };

  const handleOnChange = (e) => {
    setSearch1(e.target.value);
    console.log('value', e.target.value);
  };

  return (
    <div className='SearchBar'>
      <div className='header-top'>
        <div className="logo-bar">
          <h1 onClick={()=> navigate('/')}>Wood Daddy</h1>
        </div>

        <div className="search-bar">
          <form style={{ display: 'flex' }} onSubmit={handleSearch}>
            <SearchIcon className='headicons' onClick={handleSearch} />
            <input
              type="text"
              value={search1}
              onChange={handleOnChange}
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
          <NotificationsIcon className='headicons' onClick={() => navigate('/order')}/>
          <FavoriteBorderIcon className='headicons' onClick={() => navigate('/wishlist')} />
          <ShoppingBasketIcon className='headicons' onClick={() => navigate('/cart')} />
        </div>
      </div>
      <hr />
    </div>
  );
}

export default SearchBar;
