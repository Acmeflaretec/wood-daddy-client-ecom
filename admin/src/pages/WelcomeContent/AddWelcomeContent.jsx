import { Alert, Box, Button, Grid, Typography } from "@mui/material";
import React, { useState,useEffect } from 'react'
import PageLayout from 'layouts/PageLayout';
import { useAddWelcomeSection } from "queries/ProductQuery";
import toast from "react-hot-toast";
import Input from "components/Input";

const AddWelcomeContent = () => {
  const [data,setData] = useState({})
  
  useEffect(() => {
    console.log('Updated Data:', data);
  }, [data]);
  

  const handleChange = (e) => {
    setData(prev=>({ ...prev, [e.target.name]: e.target.value }));
  };
  const { mutateAsync: addWelcomeSection, isLoading } = useAddWelcomeSection()

  const handleSubmit = ()=>{
    try {
      if(!data?.title){
        return toast.error("name is required")
      }
      if(!data?.desc){
        return toast.error("description is required")
      }
    
   
 

      addWelcomeSection(data)
      .then((res) => {
        toast.success(res?.message ?? "category added");
      })
      .catch((err) => {
        toast.error(err?.message ?? "Something went wrong");
      });
      
    } catch (error) {
      console.error(error)
    }
  }
  return (
    <PageLayout
      title={'Add Welcome Section'}
    >
    <Box sx={{ flexGrow: 1 }} display={'flex'} justifyContent={'center'}>
      <Grid container spacing={2} maxWidth={600} py={5}>
          <Grid item xs={12} sm={6}>
            <Input
              required
              placeholder="Title"
              id="title"
              name="title"
              label="title"
              value={data?.title || ''}
              onChange={handleChange}
              fullWidth
              autoComplete="name"
              variant="outlined"
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            {data?.title}
            {data?.desc}
          </Grid>

          <Grid item xs={12}>
            <Input
              id="desc"
              name="desc"
              placeholder="description"
              label="Banner Subtitle *"
              value={data?.desc || ''}
              onChange={handleChange}
              fullWidth
              autoComplete="desc"
              multiline
              rows={4}
              helperText="Short Description (about 10-20 words)"
            />
          </Grid>

          
          <Grid item xs={12}>
 <Button onClick={handleSubmit}>Add Content</Button>
          </Grid>
           
        </Grid>
    </Box>

    </PageLayout>
  )
}

export default AddWelcomeContent