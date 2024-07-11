import React from "react";
import { Box, Typography, Paper, Grid, Link } from "@mui/material";
import "./MapAddress.css";
import { Email, LocationCity, Phone, Web } from "@mui/icons-material";

function MapAddress() {
  return (
    <Box className="MapAddress">
      <Grid container p={{ xs: 2, md: 5 }}>
        <Grid item md={6} pr={{ md: 3 }}>
          <Grid container spacing={3}>
            <Grid item>
              <Typography variant="h4">Get in touch</Typography>
              <Typography variant="body1">
                Want to get in touch? we'd love to hear from you. here is how
                you can reach us.
              </Typography>
            </Grid>
            <Grid item container spacing={3} pb={4}>
              <Grid item xs={6}>
                <Paper sx={{ textAlign: "center" }}>
                  <Phone fontSize="large" />
                  <Typography>Phone</Typography>
                  <Typography
                    variant="body1"
                    sx={{ textDecoration: "none" }}
                    component={Link}
                    href="tel:9123456739"
                    target="_blank"
                  >
                    +91 8234567890
                  </Typography>
                </Paper>
              </Grid>
              <Grid item xs={6}>
                <Paper sx={{ textAlign: "center" }}>
                  <Email fontSize="large" />
                  <Typography>Email</Typography>
                  <Typography
                    variant="body1"
                    sx={{ textDecoration: "none" }}
                    component={Link}
                    href="mailto:info@wooddaddy.in"
                    target="_blank"
                  >
                    info@wooddaddy.in
                  </Typography>
                </Paper>
              </Grid>
              <Grid item xs={6}>
                <Paper sx={{ textAlign: "center" }}>
                  <Web fontSize="large" />
                  <Typography>website</Typography>
                  <Typography
                    variant="body1"
                    sx={{ textDecoration: "none" }}
                    component={Link}
                    href="https://www.wooddaddy.in"
                    target="_blank"
                  >
                    www.wooddaddy.in
                  </Typography>
                </Paper>
              </Grid>
              <Grid item xs={6}>
                <Paper sx={{ textAlign: "center" }}>
                  <LocationCity fontSize="large" />
                  <Typography variant="body1">123 Beautiful Street,</Typography>
                  <Typography variant="body1">City, Country</Typography>
                </Paper>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
        <Grid
          item
          md={6}
          className="image-container"
          component={Link}
          href="https://maps.app.goo.gl/8Udi2QzFcrLa49uAA"
          target="_blank"
        >
          <img src="/gallery/gmap.png" className="image" />
        </Grid>
      </Grid>
    </Box>
  );
}

export default MapAddress;
