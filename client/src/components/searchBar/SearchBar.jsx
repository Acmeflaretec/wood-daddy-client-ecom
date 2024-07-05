

// SearchBar component
import React, { useState, useEffect } from 'react';
import './index.css';
import axiosInstance from '../../axios';
import Badge from '@mui/material/Badge';
import NotificationsIcon from '@mui/icons-material/Notifications';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import ShoppingBasketIcon from '@mui/icons-material/ShoppingBasket';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import IconButton from '@mui/material/IconButton';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import MailIcon from '@mui/icons-material/Mail';
import MenuIcon from '@mui/icons-material/Menu';
import Avatar from '@mui/material/Avatar';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Tooltip from '@mui/material/Tooltip';
import Settings from '@mui/icons-material/Settings';
import Logout from '@mui/icons-material/Logout';
import SearchIcon from '@mui/icons-material/Search';

import { useNavigate } from 'react-router-dom';

function SearchBar(props) {
  const navigate = useNavigate();
  const { setSearch1, search1, notif } = props; // Change setSearch to setSearch1
  const [userDetails, setUserDetails] = useState(null);
  const [open, setOpen] = useState(false);

  const [desktopAnchorEl, setDesktopAnchorEl] = useState(null);
  const [mobileAnchorEl, setMobileAnchorEl] = useState(null);

  const desktopMenuOpen = Boolean(desktopAnchorEl);
  const mobileMenuOpen = Boolean(mobileAnchorEl);

  const [cartCount,setCartCount] = useState(0)
const [wishlistCount,setWishlistCount] = useState(0)


  useEffect(() => {
    
    const fetchData = async () => {
        try {
            const response = await axiosInstance.get(`${process.env.REACT_APP_API_URL}/api/v1/auth/getuser`);
            setUserDetails(response.data.data[0]);
            console.log('userrrr', response.data.data[0]);
        } catch (error) {
            console.log('errr', error);
            setUserDetails(null);
        }
    };
    fetchData();
}, []);

useEffect(()=>{

    const fetchNotification = async ()=>{
try {

const responseCart = await axiosInstance.get(`${process.env.REACT_APP_API_URL}/api/v1/cart/${userDetails._id}?page=1&sortField=createdAt&sortOrder=desc`);
setCartCount(responseCart.data.products.length)
console.log('res cart ',responseCart.data.products.length)
const responseWishlist = await axiosInstance.get(`${process.env.REACT_APP_API_URL}/api/v1/wishlist/${userDetails._id}/wishlist?page=1&sortField=createdAt&sortOrder=desc`)
setWishlistCount(responseWishlist.data.products.length)
console.log('res cwiiart ',responseWishlist.data.products.length)
} catch (error) {
console.log(error)
}

    }

    fetchNotification()

},[notif])

  const handleSearch = (e) => {
    
    navigate(`/search/${search1}`);
    console.log('click search', search1);
  };

  const handleOnChange = (e) => {
    setSearch1(e.target.value);
    console.log('value', e.target.value);
  };

  
  const login = () => {
    setDesktopAnchorEl(null);
    setMobileAnchorEl(null);
    navigate('/login');
};

const logout = () => {
    localStorage.removeItem('Tokens');
    setUserDetails(null);
    setDesktopAnchorEl(null);
    setMobileAnchorEl(null);
};

const handleDesktopMenuClick = (event) => {
    setDesktopAnchorEl(event.currentTarget);
};

const handleMobileMenuClick = (event) => {
    setMobileAnchorEl(event.currentTarget);
};

const handleClose = () => {
    setDesktopAnchorEl(null);
    setMobileAnchorEl(null);
};

const toggleDrawer = (newOpen) => () => {
  setOpen(newOpen);
};

const DrawerList = (
  <Box sx={{ width: 250 }} role="presentation" onClick={toggleDrawer(false)}>
      <div className="logo-bar">
          <h1 onClick={() => navigate(`/`)}>Wood Daddy</h1>
      </div>
      <Divider />
      <List>
          {[
              { text: 'Home', route: '/' },
              { text: 'Products', route: '/productfetch?allProducts=allProducts' },
              { text: 'About', route: '/about' },
              { text: 'Services', route: '/service' },
              { text: 'Contact', route: '/contact' },
          ].map((item, index) => (
              <ListItem key={item.text} disablePadding>
                  <ListItemButton onClick={() => navigate(item.route)}>
                      <ListItemIcon>
                          {/* {index % 2 === 0 ? <InboxIcon /> : <MailIcon />} */}
                      </ListItemIcon>
                      <ListItemText primary={item.text} />
                  </ListItemButton>
              </ListItem>
          ))}
      </List>
  </Box>
);

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
                    {/* <NotificationsIcon className='headicons' onClick={ userDetails?   () => navigate('/order') : () => navigate('/login')} /> */}
                    <Badge badgeContent={wishlistCount} color="primary">
                    <FavoriteBorderIcon className='headicons' onClick={ userDetails?  () => navigate('/wishlist') : () => navigate('/login')} />
                    </Badge>

                    <Badge badgeContent={cartCount} color="primary">
                    <ShoppingBasketIcon className='headicons' onClick={userDetails ? () => navigate('/cart') : () => navigate('/login')} />
                    </Badge>

                    <Box sx={{ display: 'flex', alignItems: 'center', textAlign: 'center' }}>
                        <Tooltip title="Account settings">
                            <IconButton
                                onClick={handleDesktopMenuClick}
                                size="small"
                                sx={{ ml: 2 }}
                                aria-controls={desktopMenuOpen ? 'account-menu' : undefined}
                                aria-haspopup="true"
                                aria-expanded={desktopMenuOpen ? 'true' : undefined}
                            >
                                <Avatar sx={{ width: 32, height: 32 }}  />{ userDetails?  (<div style={{marginLeft:'5px'}} >{userDetails.firstName}</div>) 
                                :
                                 (<div></div>) }

                            </IconButton>
                        </Tooltip>
                    </Box>
                    <Menu
                        anchorEl={desktopAnchorEl}
                        id="account-menu"
                        open={desktopMenuOpen}
                        onClose={handleClose}
                        onClick={handleClose}
                        PaperProps={{
                            elevation: 0,
                            sx: {
                                overflow: 'visible',
                                filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
                                mt: 1.5,
                                '& .MuiAvatar-root': {
                                    width: 32,
                                    height: 32,
                                    ml: -0.5,
                                    mr: 1,
                                },
                                '&::before': {
                                    content: '""',
                                    display: 'block',
                                    position: 'absolute',
                                    top: 0,
                                    right: 14,
                                    width: 10,
                                    height: 10,
                                    bgcolor: 'background.paper',
                                    transform: 'translateY(-50%) rotate(45deg)',
                                    zIndex: 0,
                                },
                            },
                        }}
                        transformOrigin={{ horizontal: 'right', vertical: 'top' }}
                        anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
                    >
                     {  userDetails ? ( <MenuItem onClick={handleClose}>
                            <Avatar /> {userDetails.firstName}
                        </MenuItem>)
                        :
                        ( <MenuItem onClick={handleClose}>
                          <Avatar /> 
                      </MenuItem>)
                        
                        }
                        <Divider />
                        <MenuItem onClick={handleClose}>
                            <ListItemIcon>
                                <Settings fontSize="small" />
                            </ListItemIcon>
                            Settings
                        </MenuItem>
                        <Divider />
                        {userDetails ? (
                        <MenuItem onClick={()=>{userDetails ? navigate('/address') : navigate('/login')}}>
                            <ListItemIcon>
                                <Settings fontSize="small" />
                            </ListItemIcon>
                            Address
                        </MenuItem>) : ( <div></div> )
                        }
                        <Divider />

                        {userDetails ? (
                            <MenuItem onClick={logout}>
                                <ListItemIcon>
                                    <Logout fontSize="small" />
                                </ListItemIcon>
                                Logout
                            </MenuItem>
                        ) : (
                            <MenuItem onClick={login}>
                                <ListItemIcon>
                                    <Logout fontSize="small" />
                                </ListItemIcon>
                                Login
                            </MenuItem>
                        )}
                    </Menu>
                </div>
      </div>
      <hr />

      <div className="header-bottom">
                <nav>
                    <ul className="header-nav">
                        <li className="nav-item">
                            <a href="#home" className="nav-link" onClick={() => navigate('/')}>Home</a>
                        </li>
                        <li className="nav-item">
                            <a href="#/productfetch?allProducts=allProducts" className="nav-link" onClick={() => navigate('/productfetch?allProducts=allProducts')}>Products</a>
                        </li>
                        <li className="nav-item">
                            <a href="#about" className="nav-link" onClick={() => navigate('/about')}>About</a>
                        </li>
                        <li className="nav-item">
                            <a href="#products" className="nav-link" onClick={() => navigate('/service')}>Services</a>
                        </li>
                        <li className="nav-item">
                            <a href="#contact" className="nav-link" onClick={() => navigate('/contact')}>Contact Us</a>
                        </li>
                    </ul>
                </nav>
                <div className="mob-search-bar">
                    <form style={{ display: 'flex' }} onSubmit={handleSearch}>
                        <SearchIcon className='headicons' onClick={handleSearch} />
                        <input
                         
                            type="text"
                            value={search1}
                            onChange={(e) => setSearch1(e.target.value)}
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
                <div className="mob-grp-bar">
                    {/* <NotificationsIcon className='headicons' onClick={userDetails?   () => navigate('/order') : () => navigate('/login')}  /> */}
                    <Badge badgeContent={wishlistCount} color="primary">
                    <FavoriteBorderIcon className='headicons' onClick={ userDetails?  () => navigate('/wishlist') : () => navigate('/login')} />
                    </Badge>

                    <Badge badgeContent={cartCount} color="primary">
                    <ShoppingBasketIcon className='headicons' onClick={userDetails ? () => navigate('/cart') : () => navigate('/login')} />
                    </Badge>
                    
                    <Box sx={{ display: 'flex', alignItems: 'center', textAlign: 'center' }}>
                        <Tooltip title="Account settings">
                            <IconButton
                                onClick={handleMobileMenuClick}
                                size="small"
                                sx={{ ml: 2 }}
                                aria-controls={mobileMenuOpen ? 'account-menu' : undefined}
                                aria-haspopup="true"
                                aria-expanded={mobileMenuOpen ? 'true' : undefined}
                            >
                               <Avatar sx={{ width: 32, height: 32 }}  />{ userDetails?  (<div style={{marginLeft:'5px'}} >{userDetails.firstName}</div>) 
                                :
                                 (<div></div>) }
                            </IconButton>
                        </Tooltip>
                    </Box>
                    <Menu
                        anchorEl={mobileAnchorEl}
                        id="account-menu"
                        open={mobileMenuOpen}
                        onClose={handleClose}
                        onClick={handleClose}
                        PaperProps={{
                            elevation: 0,
                            sx: {
                                overflow: 'visible',
                                filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
                                mt: 1.5,
                                '& .MuiAvatar-root': {
                                    width: 32,
                                    height: 32,
                                    ml: -0.5,
                                    mr: 1,
                                },
                                '&::before': {
                                    content: '""',
                                    display: 'block',
                                    position: 'absolute',
                                    top: 0,
                                    right: 14,
                                    width: 10,
                                    height: 10,
                                    bgcolor: 'background.paper',
                                    transform: 'translateY(-50%) rotate(45deg)',
                                    zIndex: 0,
                                },
                            },
                        }}
                        transformOrigin={{ horizontal: 'right', vertical: 'top' }}
                        anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
                    >
                        <MenuItem onClick={handleClose}>
                            <Avatar /> Profile
                        </MenuItem>
                        <Divider />
                        <MenuItem onClick={handleClose}>
                            <ListItemIcon>
                                <Settings fontSize="small" />
                            </ListItemIcon>
                            Settings
                        </MenuItem>
                        {userDetails ? (
                        <MenuItem onClick={()=>{ navigate('/address')}}>
                            <ListItemIcon>
                                <Settings fontSize="small" />
                            </ListItemIcon>
                            Address
                        </MenuItem>) : ( <div></div> )
                        }
                        <Divider />
                        {userDetails ? (
                            <MenuItem onClick={logout}>
                                <ListItemIcon>
                                    <Logout fontSize="small" />
                                </ListItemIcon>
                                Logout
                            </MenuItem>
                        ) : (
                            <MenuItem onClick={login}>
                                <ListItemIcon>
                                    <Logout fontSize="small" />
                                </ListItemIcon>
                                Login
                            </MenuItem>
                        )}
                    </Menu>
                    <div>
                        <IconButton
                            onClick={toggleDrawer(true)}
                            edge="start"
                            color="inherit"
                            aria-label="menu"
                        >
                            <MenuIcon />
                        </IconButton>
                        <Drawer open={open} onClose={toggleDrawer(false)}>
                            {DrawerList}
                        </Drawer>
                    </div>
                </div>
            </div>


    </div>
  );
}

export default SearchBar;
