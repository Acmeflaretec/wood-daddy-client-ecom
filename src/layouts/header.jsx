import React, { useState } from 'react';
import './index.css'
import { useParams } from 'react-router-dom';
import SearchIcon from '@mui/icons-material/Search';
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
import { useNavigate  } from 'react-router-dom';








const Header = () => {
    
    const [searchItem,setSearchItem] = useState('')
    const [open, setOpen] = useState(false);
    const navigate = useNavigate();

    const handleSearch = (event) => {
      event.preventDefault(); // Prevent the default form submission behavior
      navigate(`/search/${searchItem}`); // Navigate to the desired route
    };

    const toggleDrawer = (newOpen) => () => {
      setOpen(newOpen);
    };
  
  const DrawerList = (
    <Box sx={{ width: 250 }} role="presentation" onClick={toggleDrawer(false)}>
<div className="logo-bar">
<h1 onClick={()=> navigate(`/`)} >Wood Daddy</h1>
</div>

<Divider />

      <List>
        {['Home', 'About', 'Products', 'Contact'].map((text, index) => (
          <ListItem key={text} disablePadding>
            <ListItemButton>
              <ListItemIcon>
                {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
              </ListItemIcon>
              <ListItemText primary={text} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
     
    
    </Box>
  );





  

  return (
    <div className='header' >
{/* header top section */}
      <div className='header-top'>


        
<div className="search-bar">

<form   style={{ display: 'flex' }} onSubmit={handleSearch} >

        <SearchIcon className='headicons' onClick={handleSearch} />

      <input
        type="text"
         value={searchItem}
         onChange={(e)=>setSearchItem(e.target.value)}
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
<div className="logo-bar">
<h1 onClick={()=> navigate('/')} >Wood Daddy</h1>
</div>

<div className="grp-bar">
<NotificationsIcon className='headicons'  onClick={()=>navigate('/order')} />
<FavoriteBorderIcon className='headicons' onClick={()=>navigate('/wishlist')} />
<ShoppingBasketIcon className='headicons' onClick={()=>navigate('/cart')} />
</div>

      </div>
      <hr />
{/* header bottom section */}
      <div className="header-bottom">
      <nav>
        <ul className="header-nav">
          <li className="nav-item">
            <a href="#home" className="nav-link" onClick={()=>navigate('/')}>Home</a>
          </li>
          <li className="nav-item">
            <a href="#about" className="nav-link" onClick={()=>navigate('/about')}>About</a>
          </li>
          <li className="nav-item">
            <a href="#products" className="nav-link" onClick={()=>navigate('/service')}>Services</a>
          </li>
          <li className="nav-item">
            <a href="#contact" className="nav-link" onClick={()=>navigate('/contact')}>Contact Us</a>
          </li>
        </ul>
      </nav>

      <div className="mob-search-bar">

<form   style={{ display: 'flex' }}>

        <SearchIcon />

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
<div className="mob-grp-bar">
<NotificationsIcon className='headicons' />
<FavoriteBorderIcon className='headicons' onClick={()=>navigate('/wishlist')} />
<ShoppingBasketIcon className='headicons' />

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
{/* header ends here  */}
{/* banner starts here */}



{/* banner ends here */}


    </div>
  );
}

export default Header;
