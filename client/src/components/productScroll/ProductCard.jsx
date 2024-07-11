import * as React from "react";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardContent from "@mui/material/CardContent";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import { red } from "@mui/material/colors";
import FavoriteIcon from "@mui/icons-material/Favorite";
import { Button } from "@mui/material";
import { useNavigate } from "react-router-dom";

export default function ProductCard({
  data,
  user,
  addCart,
  addWishlist,
  removeWishlist,
}) {
  const navigate = useNavigate();

  function truncateText(text, maxLength) {
    const words = text?.split("");
    if (words.length > maxLength) {
      return words.slice(0, maxLength).join("") + "...";
    }
    return text;
  }
  return (
    <Card
      sx={{
        width: 340,
        height: "100%",
        alignItems: "center",
        margin: "0 auto",
      }}
      maxWidth
    >
      <CardHeader
        action={
          !data?.inWishlist ? (
            <IconButton
              aria-label="add to favorites"
              onClick={
                user
                  ? (e) => addWishlist(e, data._id)
                  : () => navigate("/login")
              }
            >
              <FavoriteIcon />
            </IconButton>
          ) : (
            <IconButton
              aria-label="add to favorites"
              onClick={
                user
                  ? (e) => removeWishlist(e, data._id)
                  : () => navigate("/login")
              }
            >
              <FavoriteIcon fontSize="medium" sx={{ color: red[500] }} />
            </IconButton>
          )
        }
        title={truncateText(data?.name, 18)}
        subheader={new Date(data?.createdAt).toDateString()}
      />
      <div
        style={{
          width: "100%",
          display: "flex",
          justifyContent: "center",
          cursor: "pointer",
        }}
        onClick={() => navigate(`/product/${data?._id}`)}
      >
        <img
          src={`${process.env.REACT_APP_API_URL}/uploads/${data?.image[0]}`}
          height={280}
          width={240}
          style={{}}
        />
      </div>
      <CardContent>
        <div
          style={{
            display: "flex",
            gap: "15px",
            alignItems: "center",
          }}
        >
          <Typography variant="h6" color="text.primary">
            ₹{data?.sale_rate}
          </Typography>
          <Typography
            variant="h6"
            color="text.secondary"
            style={{ textDecoration: "line-through" }}
          >
            ₹{data?.price}
          </Typography>
          <Typography variant="h6" style={{ color: "green" }}>
            {data?.discount}% Off
          </Typography>
        </div>
        {data?.stock > 0 ? (
          <p style={{ color: "green" }}>In stock</p>
        ) : (
          <p style={{ color: "red" }}>Out of stock</p>
        )}
        <Typography variant="body2" color="text.secondary" height={80}>
          {truncateText(data?.subheading, 94)}
        </Typography>
        {data?.inCart ? (
          <Button
            variant="contained"
            color="warning"
            fullWidth
            onClick={() => navigate("/cart")}
          >
            Go to cart
          </Button>
        ) : (
          <Button
            variant="contained"
            color="warning"
            fullWidth
            disabled={data?.stock <= 0}
            onClick={user ? (e) => addCart(data._id) : () => navigate("/login")}
          >
            Add to cart
          </Button>
        )}
      </CardContent>
    </Card>
  );
}
