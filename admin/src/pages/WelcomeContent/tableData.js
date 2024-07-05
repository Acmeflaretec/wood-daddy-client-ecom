/* eslint-disable react/prop-types */
import React, { useState, useEffect } from "react";
import { Box, Typography, Avatar, Button } from "@mui/material";
import toast from 'react-hot-toast';
import { useGetWelcomeSection } from "queries/ProductQuery";
import { Link } from "react-router-dom";


const notify = () => toast.success('Category deleted successfully.');

const Category = ({ id, title, desc }) => {
  console.log('key-', id);
  return (
    <Box
      display="flex"
      flexDirection="column"
      alignItems="center"
      p={2}
      m={2}
      border={1}
      borderRadius={2}
      width="97%"
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
      {/* <Avatar src={image} alt={title} variant="rounded" sx={{ width: 120, height: 100 }} /> */}
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
          <strong>Title:</strong> {title}
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
          <strong>Description:</strong> {desc}
        </Typography>
      </Box>
      <Box mt={2} display="flex" justifyContent="center" width="100%">
        <Link to={`/welcomeContents/editWelcome/${id}`}>
          <Button variant="contained" color="primary">Edit</Button>
        </Link>
        {/* <Button variant="contained" color="secondary" onClick={notify} sx={{ ml: 1 }}>Delete</Button> */}
      </Box>
    </Box>
  );
};

const TableData = () => {
  const [data, setData] = useState([]);
  const { data: fetchData, isLoading } = useGetWelcomeSection({ page: 1, limit: 100 });

  useEffect(() => {
    if (fetchData) {
      setData(fetchData.data);
    }
  }, [fetchData]);
  console.log('ma-', data);
  return (
    <>
      {isLoading ? (
        <Typography>Loading...</Typography>
      ) : (
        <Box>
          {data.map((item) => (

            <Category
              key={item._id}
              id={item._id}
              title={item.title}
              desc={item.desc}
            />
          ))}
        </Box>
      )}
    </>
  );
};

export default TableData;
