import React, { useState,useEffect } from 'react';
import { useParams } from 'react-router-dom';
import './index.css';
import ProductList from '../../components/productList/productList';
import Footer from '../../layouts/footer';
import SearchBar from '../../components/searchBar/SearchBar';


function ProductsFetch() {
  const [search, setSearch] = useState('');
  const { cat } = useParams();


  return (
     <div>
      <SearchBar setSearch1={setSearch} search1={search} />
      <ProductList title={'Results...'} type={'productFetch'} categ={cat} />
      <Footer />
    </div>
  )
}

export default ProductsFetch