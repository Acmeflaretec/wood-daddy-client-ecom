/* eslint-disable react/prop-types */
import React, { useState } from "react";
import { Box, Typography, Avatar, Button, Grid, Pagination } from "@mui/material";
import { useGetAdvertisement } from "queries/ProductQuery";
import { Link } from "react-router-dom";


const Category = ({ image, title, subtitle, offer,id }) => {
  return (
    <Box 
      display="flex" 
      flexDirection="column" 
      alignItems="center" 
      p={2} 
      m={2} 
      border={1} 
      borderRadius={2}
      width="100%" 
      maxWidth='100%' 
      overflow="hidden" 
      textAlign="center"
      sx={{ 
        flexGrow: 1, 
        height: '100%', 
        display: 'flex', 
        flexDirection: 'column',
        justifyContent: 'space-between'
      }}
    >
      <Avatar src={image} alt={title} variant="rounded" sx={{ width: 120, height: 100 }} />
      <Box mt={2} width="100%">
        <Typography 
          variant="h6" 
          fontWeight="medium" 
          sx={{ 
            overflow: "hidden", 
            wordWrap: "break-word", 
            whiteSpace: "normal" 
          }}
        >
          <strong>title:</strong>{title}
        </Typography>
        <Typography 
          variant="body2" 
          color="textSecondary"
          sx={{
            overflow: "hidden",
            wordWrap: "break-word",
            whiteSpace: "normal"
          }}
        >
          <strong>subtitle:</strong>{subtitle}
        </Typography>
        <Typography 
          variant="body2" 
          color="textSecondary" 
          mt={1}
          sx={{
            overflow: "hidden",
            wordWrap: "break-word",
            whiteSpace: "normal"
          }}
        >
          <strong>offer:</strong> {offer}%
        </Typography>
      </Box>
      <Box mt={2} display="flex" justifyContent="center" width="100%">
      <Link to={`/advertisements/editAds/${id}`}>
          <Button variant="contained" color="primary">Edit</Button>
        </Link>
      </Box>
    </Box>
  );
};

const TableData = () => {
  const [page, setPage] = useState(1);
  const limit = 6; // Number of items per page
  const { data, isLoading } = useGetAdvertisement({ page, limit });

  const handlePageChange = (event, value) => {
    setPage(value);
  };

  const handleDelete = (id) => {
    // Add delete functionality here
    alert(`Deleted item with id: ${id}`);
  };

  return (
    <>
      {isLoading ? (
        <Typography>Loading...</Typography>
      ) : (
        <Box>
          <Grid container spacing={2} alignItems="stretch"> 
            {data?.data?.map((item) => (
              <Grid item xs={12} sm={6} md={6} key={item._id} display="flex">
                <Category 
                  image={`${process.env.REACT_APP_API_URL}/uploads/${item.imgUrl}`} 
                  title={item.title} 
                  subtitle={item.subtitle} 
                  offer={item.offer} 
                  id={item._id}
                />
              </Grid>
            ))}
          </Grid>
          <Box display="flex" justifyContent="center" mt={4}>
            <Pagination 
              count={Math.ceil(data.total / limit)} 
              page={page} 
              onChange={handlePageChange} 
              color="primary"
            />
          </Box>
        </Box>
      )}
    </>
  );
};

export default TableData;
