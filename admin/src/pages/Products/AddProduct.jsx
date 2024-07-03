import { Autocomplete, Button, Grid, TextField } from '@mui/material'
import Box from 'components/Box'
import Input from 'components/Input'
import PageLayout from 'layouts/PageLayout'
import React, { useEffect, useState } from 'react'
import DropZone from './Dropzone'
import { useGetCategory } from 'queries/ProductQuery'
import Typography from 'components/Typography'
import { useAddProduct } from 'queries/ProductQuery'
import toast from 'react-hot-toast'

const AddProduct = () => {
  const [details, setDetails] = useState({})
  const { data, isLoading } = useGetCategory({ pageNo: 1, pageCount: 100 });
  const { mutateAsync: AddProduct, isLoading: loading } = useAddProduct()
  const [error,setError] = useState({})
  const [images,setImage] = useState([])
  const handleChange = (e) => {
    setDetails(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };
  const [category, setCategory] = useState()
  useEffect(()=>{
    console.log(category?._id);
  },[category])
  const handleSubmit = () => {
    console.log(details);
    console.log(images);
    console.log(category)
    try {
      // if (!details?.name) {
      //   return toast.error("name is required")
      // }
      // if (!details?.desc) {
      //   return toast.error("description is required")
      // }
      // if (!details?.image) {
      //   return toast.error("image is required")
      // }
      const formData = new FormData();
      images?.forEach((image) => {
        formData.append('images', image, image.name);
      });
      for (const key in details) {
        if (details.hasOwnProperty(key) && key !== "image") {
          formData.append(key, details[key]);
        }
      }
      formData.append('category', category?._id);
      // typeof (details.image) == 'object' && formData.append("image", details.image, details?.image?.name);
      AddProduct(formData)
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
      title={'Add Product'}
    >
      <Grid container spacing={5} display={'flex'} direction={'row'} p={8} >
        <Grid item container spacing={2} xs={12} sm={12} md={6} py={5}>
          <Grid item xs={12} sm={12} md={6}>
            <Input
              required
              placeholder="Item name"
              id="name"
              name="name"
              value={details?.name || ''}
              onChange={handleChange}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <Input
              placeholder="Brand name"
              // error={true}
              name="brand"
              value={details?.brand || ''}
              onChange={handleChange}
            />
          </Grid>
          <Grid item xs={12}>
            <Input
              required
              placeholder="Item subheading"
              id="subheading"
              name="subheading"
              value={details?.subheading || ''}
              onChange={handleChange}
            />
          </Grid>

          <Grid item xs={12} sm={8}>
            <Autocomplete
              id="category-select"
              options={data?.data}
              value={category}
              onChange={(event, newValue) => {
                setCategory(newValue);
              }}
              autoHighlight
              getOptionLabel={(option) => option.name}
              renderOption={(props, option) => (
                <Box component="li" sx={{ '& > img': { mr: 2, flexShrink: 0 } }} {...props}>
                  <img
                    loading="lazy"
                    width="20"
                    src={`http://localhost:5000/uploads/${option?.image}`}
                  />
                  <Typography color="inherit" variant="caption">
                    {option?.name} <br />
                    {option?.desc}
                  </Typography>
                  <Typography sx={{ ml: 'auto' }} color={option?.isAvailable ? 'success' : 'error'} variant="caption">
                    {option?.isAvailable ? 'available' : 'NA'}
                  </Typography>
                </Box>
              )}
              renderInput={(params) => (
                <TextField
                  {...params}
                  placeholder="Choose a category"
                  inputProps={{
                    ...params.inputProps,
                  }}
                />
              )}
            />
          </Grid>

          <Grid item xs={12} sm={4}>
            <Input
              placeholder="Enter Quantity"
              name="stock"
              value={details?.stock || ''}
              onChange={handleChange}
            />
          </Grid>
          <Grid item xs={12} sm={4}>
            <Input
              placeholder="MRP (Maximum Retail Price)"
              name="price"
              value={details?.price || ''}
              onChange={handleChange}
            />
          </Grid>
          <Grid item xs={12} sm={4}>
            <Input
              placeholder="Discount (%)"
              name="discount"
              value={details?.discount || ''}
              onChange={handleChange}
            />
          </Grid>
          <Grid item xs={12} sm={4}>
            <Input
              placeholder="Enter Sale Rate"
              name="sale_rate"
              value={details?.sale_rate || ''}
              onChange={handleChange}
            />
          </Grid>
          <Grid item xs={12}>
            <Input
              id="description"
              placeholder="Product Description"
              name="description"
              value={details?.description || ''}
              onChange={handleChange}
              multiline
              rows={5}
            />
          </Grid>
          <Grid item xs={12}>
            <Input
              id="specification"
              placeholder="Product specification"
              name="specification"
              value={details?.specification || ''}
              onChange={handleChange}
              multiline
              rows={5}
            />
          </Grid>
          <Grid item xs={12}>
            <Input
              id="warranty"
              placeholder="Product warranty"
              name="warranty"
              value={details?.warranty || ''}
              onChange={handleChange}
              multiline
              rows={3}
            />
            <Grid item xs={12}>
            <Input
              id="dimension"
              placeholder="Product dimension"
              name="dimension"
              value={details?.dimension || ''}
              onChange={handleChange}
              multiline
              rows={5}
            />
          </Grid>
          </Grid>
        </Grid>
        <Grid item container spacing={2} xs={12} sm={12} md={6} py={5}>
          <Grid xs={12}>
            <DropZone dispatch={setImage}/>
          </Grid>
          <Grid item xs={12} sm={8}></Grid>
          <Grid item xs={12} sm={4} mt={'auto'}>
            <Button sx={{ mr: 0, width: '100%' }} onClick={handleSubmit} variant='contained'>
              Add Product
            </Button>
          </Grid>
        </Grid>
      </Grid>
    </PageLayout>
  )
}

export default AddProduct