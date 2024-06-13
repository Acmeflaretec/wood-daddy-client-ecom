
import React, { useState, useEffect } from 'react';
import './index.css';
import axiosInstance from '../axios';
import { useNavigate } from 'react-router-dom';
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
import Avatar from '@mui/material/Avatar';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Tooltip from '@mui/material/Tooltip';
import Settings from '@mui/icons-material/Settings';
import Logout from '@mui/icons-material/Logout';

const Header = () => {
    const [searchItem, setSearchItem] = useState('');
    const [open, setOpen] = useState(false);
    const [userDetails, setUserDetails] = useState(null);
    const navigate = useNavigate();
    
    const [desktopAnchorEl, setDesktopAnchorEl] = useState(null);
    const [mobileAnchorEl, setMobileAnchorEl] = useState(null);

    const desktopMenuOpen = Boolean(desktopAnchorEl);
    const mobileMenuOpen = Boolean(mobileAnchorEl);

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

    const handleSearch = (event) => {
        event.preventDefault();
        navigate(`/search/${searchItem}`);
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
        <div className='header'>
            <div className='header-top'>
                <div className="search-bar">
                    <form style={{ display: 'flex' }} onSubmit={handleSearch}>
                        <SearchIcon className='headicons' onClick={handleSearch} />
                        <input
                            type="text"
                            value={searchItem}
                            onChange={(e) => setSearchItem(e.target.value)}
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
                    <h1 onClick={() => navigate('/')}>Wood Daddy</h1>
                </div>
                <div className="grp-bar">
                    <NotificationsIcon className='headicons' onClick={() => navigate('/order')} />
                    <FavoriteBorderIcon className='headicons' onClick={() => navigate('/wishlist')} />
                    <ShoppingBasketIcon className='headicons' onClick={() => navigate('/cart')} />
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
                            value={searchItem}
                            onChange={(e) => setSearchItem(e.target.value)}
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
                    <FavoriteBorderIcon className='headicons' onClick={() => navigate('/wishlist')} />
                    <ShoppingBasketIcon className='headicons' />
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

export default Header;



// import React, { useState, useEffect } from 'react';
// import './index.css';
// import axiosInstance from '../axios';
// import { useNavigate } from 'react-router-dom';
// import SearchIcon from '@mui/icons-material/Search';
// import NotificationsIcon from '@mui/icons-material/Notifications';
// import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
// import ShoppingBasketIcon from '@mui/icons-material/ShoppingBasket';
// import Box from '@mui/material/Box';
// import Drawer from '@mui/material/Drawer';
// import IconButton from '@mui/material/IconButton';
// import List from '@mui/material/List';
// import Divider from '@mui/material/Divider';
// import ListItem from '@mui/material/ListItem';
// import ListItemButton from '@mui/material/ListItemButton';
// import ListItemIcon from '@mui/material/ListItemIcon';
// import ListItemText from '@mui/material/ListItemText';
// import InboxIcon from '@mui/icons-material/MoveToInbox';
// import MailIcon from '@mui/icons-material/Mail';
// import MenuIcon from '@mui/icons-material/Menu';
// import Avatar from '@mui/material/Avatar';
// import Menu from '@mui/material/Menu';
// import MenuItem from '@mui/material/MenuItem';
// import Tooltip from '@mui/material/Tooltip';
// import Settings from '@mui/icons-material/Settings';
// import Logout from '@mui/icons-material/Logout';

// const Header = () => {
//     const [searchItem, setSearchItem] = useState('');
//     const [open, setOpen] = useState(false);
//     const [userDetails, setUserDetails] = useState(null);
//     const navigate = useNavigate();
    
//     const [desktopAnchorEl, setDesktopAnchorEl] = useState(null);
//     const [mobileAnchorEl, setMobileAnchorEl] = useState(null);

//     const desktopMenuOpen = Boolean(desktopAnchorEl);
//     const mobileMenuOpen = Boolean(mobileAnchorEl);

//     useEffect(() => {
//         const fetchData = async () => {
//             try {
//                 const response = await axiosInstance.get('http://localhost:5000/api/v1/auth/getuser');
//                 setUserDetails(response.data.data[0]);
//                 console.log('userrrr', response.data.data[0]);
//             } catch (error) {
//                 console.log('errr', error);
//                 setUserDetails(null);
//             }
//         };
//         fetchData();
//     }, []);

//     const login = () => {
//         setDesktopAnchorEl(null);
//         setMobileAnchorEl(null);
//         navigate('/login');
//     };

//     const logout = () => {
//         localStorage.removeItem('Tokens');
//         setUserDetails(null);
//         setDesktopAnchorEl(null);
//         setMobileAnchorEl(null);
//     };

//     const handleDesktopMenuClick = (event) => {
//         setDesktopAnchorEl(event.currentTarget);
//     };

//     const handleMobileMenuClick = (event) => {
//         setMobileAnchorEl(event.currentTarget);
//     };

//     const handleClose = () => {
//         setDesktopAnchorEl(null);
//         setMobileAnchorEl(null);
//     };

//     const handleSearch = (event) => {
//         event.preventDefault();
//         navigate(`/search/${searchItem}`);
//     };

//     const toggleDrawer = (newOpen) => () => {
//         setOpen(newOpen);
//     };

//     const DrawerList = (
//         <Box sx={{ width: 250 }} role="presentation" onClick={toggleDrawer(false)}>
//             <div className="logo-bar">
//                 <h1 onClick={() => navigate(`/`)}>Wood Daddy</h1>
//             </div>
//             <Divider />
//             <List>
//                 {['Home', 'About', 'Products', 'Contact'].map((text, index) => (
//                     <ListItem key={text} disablePadding>
//                         <ListItemButton>
//                             <ListItemIcon>
//                                 {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
//                             </ListItemIcon>
//                             <ListItemText primary={text} />
//                         </ListItemButton>
//                     </ListItem>
//                 ))}
//             </List>
//         </Box>
//     );

//     return (
//         <div className='header'>
//             <div className='header-top'>
//                 <div className="search-bar">
//                     <form style={{ display: 'flex' }} onSubmit={handleSearch}>
//                         <SearchIcon className='headicons' onClick={handleSearch} />
//                         <input
//                             type="text"
//                             value={searchItem}
//                             onChange={(e) => setSearchItem(e.target.value)}
//                             placeholder="Search..."
//                             style={{
//                                 padding: '8px',
//                                 borderRadius: '4px',
//                                 border: 'none',
//                                 outline: 'none',
//                             }}
//                         />
//                     </form>
//                 </div>
//                 <div className="logo-bar">
//                     <h1 onClick={() => navigate('/')}>Wood Daddy</h1>
//                 </div>
//                 <div className="grp-bar">
//                     <NotificationsIcon className='headicons' onClick={() => navigate('/order')} />
//                     <FavoriteBorderIcon className='headicons' onClick={() => navigate('/wishlist')} />
//                     <ShoppingBasketIcon className='headicons' onClick={() => navigate('/cart')} />
//                     <Box sx={{ display: 'flex', alignItems: 'center', textAlign: 'center' }}>
//                         <Tooltip title="Account settings">
//                             <IconButton
//                                 onClick={handleDesktopMenuClick}
//                                 size="small"
//                                 sx={{ ml: 2 }}
//                                 aria-controls={desktopMenuOpen ? 'account-menu' : undefined}
//                                 aria-haspopup="true"
//                                 aria-expanded={desktopMenuOpen ? 'true' : undefined}
//                             >
//                                 {/* <Avatar sx={{ width: 32, height: 32 }}>{}</Avatar> { userDetails && userDetails.frstName } */}
//                                 <Avatar sx={{ width: 32, height: 32 }}  />{ userDetails?  (<div style={{marginLeft:'5px'}} >{userDetails.firstName}</div>) 
//                                 :
//                                  (<div></div>) }

//                             </IconButton>
//                         </Tooltip>
//                     </Box>
//                     <Menu
//                         anchorEl={desktopAnchorEl}
//                         id="account-menu"
//                         open={desktopMenuOpen}
//                         onClose={handleClose}
//                         onClick={handleClose}
//                         PaperProps={{
//                             elevation: 0,
//                             sx: {
//                                 overflow: 'visible',
//                                 filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
//                                 mt: 1.5,
//                                 '& .MuiAvatar-root': {
//                                     width: 32,
//                                     height: 32,
//                                     ml: -0.5,
//                                     mr: 1,
//                                 },
//                                 '&::before': {
//                                     content: '""',
//                                     display: 'block',
//                                     position: 'absolute',
//                                     top: 0,
//                                     right: 14,
//                                     width: 10,
//                                     height: 10,
//                                     bgcolor: 'background.paper',
//                                     transform: 'translateY(-50%) rotate(45deg)',
//                                     zIndex: 0,
//                                 },
//                             },
//                         }}
//                         transformOrigin={{ horizontal: 'right', vertical: 'top' }}
//                         anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
//                     >
//                      {  userDetails ? ( <MenuItem onClick={handleClose}>
//                             <Avatar /> {userDetails.firstName}
//                         </MenuItem>)
//                         :
//                         ( <MenuItem onClick={handleClose}>
//                           <Avatar /> 
//                       </MenuItem>)
                        
//                         }
//                         <Divider />
//                         <MenuItem onClick={handleClose}>
//                             <ListItemIcon>
//                                 <Settings fontSize="small" />
//                             </ListItemIcon>
//                             Settings
//                         </MenuItem>
//                         <Divider />
//                         {userDetails ? (
//                         <MenuItem onClick={()=>{ navigate('/address')}}>
//                             <ListItemIcon>
//                                 <Settings fontSize="small" />
//                             </ListItemIcon>
//                             Address
//                         </MenuItem>) : ( <div></div> )
//                         }
//                         <Divider />

//                         {userDetails ? (
//                             <MenuItem onClick={logout}>
//                                 <ListItemIcon>
//                                     <Logout fontSize="small" />
//                                 </ListItemIcon>
//                                 Logout
//                             </MenuItem>
//                         ) : (
//                             <MenuItem onClick={login}>
//                                 <ListItemIcon>
//                                     <Logout fontSize="small" />
//                                 </ListItemIcon>
//                                 Login
//                             </MenuItem>
//                         )}
//                     </Menu>
//                 </div>
//             </div>
//             <hr />
//             <div className="header-bottom">
//                 <nav>
//                     <ul className="header-nav">
//                         <li className="nav-item">
//                             <a href="#home" className="nav-link" onClick={() => navigate('/')}>Home</a>
//                         </li>
//                         <li className="nav-item">
//                             <a href="#about" className="nav-link" onClick={() => navigate('/about')}>About</a>
//                         </li>
//                         <li className="nav-item">
//                             <a href="#products" className="nav-link" onClick={() => navigate('/service')}>Services</a>
//                         </li>
//                         <li className="nav-item">
//                             <a href="#contact" className="nav-link" onClick={() => navigate('/contact')}>Contact Us</a>
//                         </li>
//                     </ul>
//                 </nav>
//                 <div className="mob-search-bar">
//                     <form style={{ display: 'flex' }} onSubmit={handleSearch}>
//                         <SearchIcon className='headicons' onClick={handleSearch} />
//                         <input
//                             type="text"
//                             value={searchItem}
//                             onChange={(e) => setSearchItem(e.target.value)}
//                             placeholder="Search..."
//                             style={{
//                                 padding: '8px',
//                                 borderRadius: '4px',
//                                 border: 'none',
//                                 outline: 'none',
//                             }}
//                         />
//                     </form>
//                 </div>
//                 <div className="mob-grp-bar">
//                     <NotificationsIcon className='headicons' />
//                     <FavoriteBorderIcon className='headicons' onClick={() => navigate('/wishlist')} />
//                     <ShoppingBasketIcon className='headicons' />
//                     <Box sx={{ display: 'flex', alignItems: 'center', textAlign: 'center' }}>
//                         <Tooltip title="Account settings">
//                             <IconButton
//                                 onClick={handleMobileMenuClick}
//                                 size="small"
//                                 sx={{ ml: 2 }}
//                                 aria-controls={mobileMenuOpen ? 'account-menu' : undefined}
//                                 aria-haspopup="true"
//                                 aria-expanded={mobileMenuOpen ? 'true' : undefined}
//                             >
//                                <Avatar sx={{ width: 32, height: 32 }}  />{ userDetails?  (<div style={{marginLeft:'5px'}} >{userDetails.firstName}</div>) 
//                                 :
//                                  (<div></div>) }
//                             </IconButton>
//                         </Tooltip>
//                     </Box>
//                     <Menu
//                         anchorEl={mobileAnchorEl}
//                         id="account-menu"
//                         open={mobileMenuOpen}
//                         onClose={handleClose}
//                         onClick={handleClose}
//                         PaperProps={{
//                             elevation: 0,
//                             sx: {
//                                 overflow: 'visible',
//                                 filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
//                                 mt: 1.5,
//                                 '& .MuiAvatar-root': {
//                                     width: 32,
//                                     height: 32,
//                                     ml: -0.5,
//                                     mr: 1,
//                                 },
//                                 '&::before': {
//                                     content: '""',
//                                     display: 'block',
//                                     position: 'absolute',
//                                     top: 0,
//                                     right: 14,
//                                     width: 10,
//                                     height: 10,
//                                     bgcolor: 'background.paper',
//                                     transform: 'translateY(-50%) rotate(45deg)',
//                                     zIndex: 0,
//                                 },
//                             },
//                         }}
//                         transformOrigin={{ horizontal: 'right', vertical: 'top' }}
//                         anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
//                     >
//                         <MenuItem onClick={handleClose}>
//                             <Avatar /> Profile
//                         </MenuItem>
//                         <Divider />
//                         <MenuItem onClick={handleClose}>
//                             <ListItemIcon>
//                                 <Settings fontSize="small" />
//                             </ListItemIcon>
//                             Settings
//                         </MenuItem>
//                         {userDetails ? (
//                         <MenuItem onClick={()=>{ navigate('/address')}}>
//                             <ListItemIcon>
//                                 <Settings fontSize="small" />
//                             </ListItemIcon>
//                             Address
//                         </MenuItem>) : ( <div></div> )
//                         }
//                         <Divider />
//                         {userDetails ? (
//                             <MenuItem onClick={logout}>
//                                 <ListItemIcon>
//                                     <Logout fontSize="small" />
//                                 </ListItemIcon>
//                                 Logout
//                             </MenuItem>
//                         ) : (
//                             <MenuItem onClick={login}>
//                                 <ListItemIcon>
//                                     <Logout fontSize="small" />
//                                 </ListItemIcon>
//                                 Login
//                             </MenuItem>
//                         )}
//                     </Menu>
//                     <div>
//                         <IconButton
//                             onClick={toggleDrawer(true)}
//                             edge="start"
//                             color="inherit"
//                             aria-label="menu"
//                         >
//                             <MenuIcon />
//                         </IconButton>
//                         <Drawer open={open} onClose={toggleDrawer(false)}>
//                             {DrawerList}
//                         </Drawer>
//                     </div>
//                 </div>
//             </div>
//         </div>
//     );
// }

// export default Header;


