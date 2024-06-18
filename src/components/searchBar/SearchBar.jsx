

// SearchBar component
import React, { useState, useEffect } from 'react';
import './index.css';
import axiosInstance from '../../axios';
import SearchIcon from '@mui/icons-material/Search';
import NotificationsIcon from '@mui/icons-material/Notifications';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import ShoppingBasketIcon from '@mui/icons-material/ShoppingBasket';
import { useNavigate } from 'react-router-dom';

function SearchBar(props) {
  const navigate = useNavigate();
  const { setSearch1, search1 } = props; // Change setSearch to setSearch1
  const [userDetails, setUserDetails] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
        try {
            const response = await axiosInstance.get('http://localhost:5000/api/v1/auth/getuser');
            setUserDetails(response.data.data[0]);
            console.log('userrrr', response.data.data[0]);
        } catch (error) {
            console.log('errr', error);
            setUserDetails(null);
        }
    };
    fetchData();
}, []);

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
          <NotificationsIcon className='headicons' onClick={userDetails ? () => navigate('/order') : () => navigate('/login')}/>
          <FavoriteBorderIcon className='headicons' onClick={userDetails ? () => navigate('/wishlist') : () => navigate('/login')} />
          <ShoppingBasketIcon className='headicons' onClick={userDetails ? () => navigate('/cart') : () => navigate('/login')} />
        </div>
      </div>
      <hr />
    </div>
  );
}

export default SearchBar;
