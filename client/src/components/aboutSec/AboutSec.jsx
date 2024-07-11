import React from "react";
import "./index.css";
import { List, ListItem, Typography } from "@mui/material";

function AboutSec() {
  return (
    <div className="AboutSec">
      <img src="/gallery/a1.jpg" alt="" />
      <div className="content">
        <h1 style={{ color: "gray" }}>Welcome to Wood Daddy</h1>
        <Typography p={2}>
          Welcome to WoodDaddy, your trusted destination for exquisite,
          high-quality furniture. Founded with a passion for craftsmanship and a
          commitment to excellence, we are dedicated to transforming your living
          spaces into beautiful, functional havens.
        </Typography>

        <Typography p={2}>
          We take pride in our meticulous attention to detail and our commitment
          to using only the finest materials. Each piece of furniture at
          WoodDaddy is crafted with care and precision by skilled artisans who
          bring years of experience and a deep love for their craft. From the
          selection of premium woods to the final finishing touches, we ensure
          that every item meets our stringent quality standards.
        </Typography>
        <Typography p={2}>
          Explore our diverse range of furniture that caters to various tastes
          and preferences. Whether you are looking for a statement piece to
          anchor your living room, a functional yet stylish dining set, or
          elegant bedroom furniture, WoodDaddy has something for every corner of
          your home. Our collection includes:
        </Typography>
        <List>
          <ListItem>
            Dining Room Furniture: Dining tables, chairs, and sideboards.
          </ListItem>
          <ListItem>
            Bedroom Furniture: Beds, wardrobes, and nightstands.
          </ListItem>
          <ListItem>
            ListItemving Room Furniture: Sofas, coffee tables, TV units, and
            more.
          </ListItem>
          <ListItem>
            Office Furniture: Desks, bookshelves, and office chairs.
          </ListItem>
          <ListItem>
            Outdoor Furniture: Patio sets, garden chairs, and more.
          </ListItem>
        </List>
      </div>
    </div>
  );
}

export default AboutSec;
