import { Alert, Box, Button, Grid, ToggleButton, Typography } from "@mui/material";
import React, { useEffect, useState } from 'react'
import PageLayout from 'layouts/PageLayout';
import toast from "react-hot-toast";
import Input from "components/Input";
import { useNavigate, useParams } from "react-router-dom";
import { useUpdateWelcome, useGetWelcomeById, useDeleteWelcome } from "queries/ProductQuery";

const EditWelcome = () => {
   const { id } = useParams();
   const navigate = useNavigate()
   const { data: res, isLoading } = useGetWelcomeById({ id });
   useEffect(() => {
      setData(res?.data)
   }, [res])
   const [data, setData] = useState({})
   const fileInputRef = React.useRef(null);
  

   const handleChange = (e) => {
      setData(prev => ({ ...prev, [e.target.name]: e.target.value }));
   };
   const { mutateAsync: editWelcomeSection, isLoading: updating } = useUpdateWelcome()
   const { mutateAsync: deleteWelcome, isLoading: deleting } = useDeleteWelcome()

   const handleDelete = () => {
      deleteWelcome(data)
         .then((res) => {
            if (res) {
               toast.success(res?.message ?? "Welcome Content deleted Successfully");
               navigate('/welcomeContents')
            }
         })
         .catch((err) => {
            toast.error(err?.message ?? "Something went wrong");
         });
   };
   const handleSubmit = () => {
      try {
         if (!data?.title) {
            return toast.error("name is required")
         }
         // if (!data?.subtitle) {
         //    return toast.error("subtitle is required")
         // }
         // if (!data?.url) {
         //    return toast.error("url is required")
         // }
         if (!data?.desc) {
            return toast.error("description is required")
         }
         editWelcomeSection(data)
            .then((res) => {
               if (res) {
                  toast.success(res?.message ?? "welcome Contents added Successfully");
                  navigate('/welcomeContents')
               }
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
         title={'Edit Welcome Content'}
      >
         <Box sx={{ flexGrow: 1 }} display={'flex'} justifyContent={'center'}>
            <Grid container spacing={2} maxWidth={600} py={5}>
               <Grid item xs={12} sm={6}>
                  <Input
                     required
                     placeholder="title"
                     id="title"
                     name="title"
                     label="title"
                     value={data?.title || ''}
                     onChange={handleChange}
                     fullWidth
                     autoComplete="title"
                     variant="outlined"
                  />
               </Grid>
               
              

               <Grid item xs={12}>
                  <Input
                     id="description"
                     name="desc"
                     placeholder="Welcome Description"
                     label="Welcome Description *"
                     value={data?.desc || ''}
                     onChange={handleChange}
                     fullWidth
                     autoComplete="Description"
                     multiline
                     rows={4}
                     helperText="Short Description (about 10-20 words)"
                  />
               </Grid>

               
               <Grid item xs={12}>
                  <Button onClick={handleSubmit}>UPDATE Welcome</Button>
                  <Button color="secondary" onClick={handleDelete}>DELETE Welcome</Button>
               </Grid>
               <Grid item xs={12}>
                  <Alert color="primary" severity="info" sx={{ mt: 3, fontSize: 13 }}>
                     <ul style={{ margin: "0", padding: "0" }}>
                        <li>Make your thumbnail 1280 by 720 pixels (4:5 ratio)</li>
                        <li>Ensure that your thumbnail is less than 2MB</li>
                        <li>Use a JPG, PNG, or JPEG file format</li>
                     </ul>
                  </Alert>
               </Grid>
            </Grid>
         </Box>

      </PageLayout>
   )
}

export default EditWelcome