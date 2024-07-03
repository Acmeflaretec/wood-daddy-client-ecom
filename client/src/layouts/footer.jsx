
import React from 'react';
import './index.css'; // Import the CSS file
import FacebookIcon from '@mui/icons-material/Facebook';
import TwitterIcon from '@mui/icons-material/Twitter';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import GitHubIcon from '@mui/icons-material/GitHub';

const Footer = () => {

  const iconStyle = {
    fontSize: '2rem',
    margin: '0 5px',
    color: '#333',
  };

  const footerIconsStyle = {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  };

  return (
    <footer className="footer-distributed">
      <div className="footer-left">
        <h3>Wood<span>Daddy</span></h3>
        <p className="footer-links">
          <a href="#" className="link-1">Home</a>
          <a href="#">About Us</a>
          <a href="#">Products</a>
         
          <a href="#">Contact Us</a>
        </p>
        <p className="footer-company-name">Copyrights © 2024.All rights reserved</p>
      </div>

      <div className="footer-center">
        <div>
          <i className="fa fa-map-marker"></i>
          <p><span>444 S. Cedros Ave</span> Solana Beach, California</p>
        </div>
        <div>
          <i className="fa fa-phone"></i>
          <p>+1.555.555.5555</p>
        </div>
        <div>
          <i className="fa fa-envelope"></i>
          <p ><a href="" style={{color:'white'}}>support@company.com</a></p>
        </div>
      </div>

      <div className="footer-right">
        <p className="footer-company-about">
          <span>About the company</span>
        <span style={{color:'white'}}>        Lorem ipsum dolor sit amet, consectateur adispicing elit. Fusce euismod convallis velit, eu auctor lacus vehicula sit amet.
</span>  
        </p>
        <div style={footerIconsStyle}>
      <a href="#"><FacebookIcon style={iconStyle} /></a>
      <a href="#"><TwitterIcon style={iconStyle} /></a>
      <a href="#"><LinkedInIcon style={iconStyle} /></a>
      <a href="#"><GitHubIcon style={iconStyle} /></a>
    </div>
      </div>
    </footer>
  );
};

export default Footer;

