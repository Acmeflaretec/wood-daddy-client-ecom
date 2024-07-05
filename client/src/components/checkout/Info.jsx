import * as React from 'react';
import PropTypes from 'prop-types';

import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import Typography from '@mui/material/Typography';

const products = [
  {
    name: 'Professional plan',
    desc: 'Monthly subscription',
    price: '15000',
  },
  {
    name: 'Dedicated support',
    desc: 'Included in the Professional plan',
    price: 'Free',
  },
  {
    name: 'Hardware',
    desc: 'Devices needed for development',
    price: '$69.99',
  },
  {
    name: 'Landing page template',
    desc: 'License',
    price: '$49.99',
  },
  
];

function Info({ totalPrice,setProductData,productData }) {



  return (
    <React.Fragment>
      <Typography variant="subtitle2" color="text.secondary">
        Total
      </Typography>
      <Typography variant="h4" gutterBottom>
        {`Rs :${totalPrice.totalPrice}`}
      </Typography>
      {/* <List disablePadding>
        {products.map((product) => (
          <ListItem key={product.name} sx={{ py: 1, px: 0 }}>
            <img src={`${process.env.REACT_APP_API_URL}/uploads/${'1717839551847-a2.jpg'}`} alt={''} style={{height:'30px',width:'30px',marginRight:'4px'}} />
            <ListItemText
              sx={{ mr: 2 }}
              primary={product.name}
              secondary={product.desc}
            />
            <Typography variant="body1" fontWeight="medium" style={{marginRight:'4px'}}>
              { `qty 5`}
            </Typography>
           

            <Typography variant="body1" fontWeight="medium">
            { `price  ${product.price}`}
            </Typography>
            

 
          </ListItem>
        ))}
      </List> */}
    </React.Fragment>
  );
}

Info.propTypes = {
  totalPrice: PropTypes.string.isRequired,
};

export default Info;