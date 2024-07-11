
// SearchPage component
import React, { useState,useEffect } from 'react';
import { useParams } from 'react-router-dom';
import './index.css';
import ProductList from '../../components/productList/productList';
import Footer from '../../layouts/footer';
import SearchBar from '../../components/searchBar/SearchBar';

function SearchPage() {
  const { searchItem } = useParams();

  console.log('searchhh', searchItem);

  return (
    <div>
      {/* <SearchBar setSearch1={setSearch} search1={search} /> */}
      <ProductList   searchItem={searchItem}  />
    </div>
  );
}

export default SearchPage;