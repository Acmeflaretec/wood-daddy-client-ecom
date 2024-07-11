import React from "react";
import ProductList from "../../components/productList/productList";

function WishlistPage() {
  return (
      <ProductList
        title={"Wish List"}
        type={"wishlist"}
      />
  );
}

export default WishlistPage;
