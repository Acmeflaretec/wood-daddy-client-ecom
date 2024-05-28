
// SearchPage component
import React, { useState,useEffect } from 'react';
import { useParams } from 'react-router-dom';
import './index.css';
import ProductList from '../../components/productList/productList';
import Footer from '../../layouts/footer';
import SearchBar from '../../components/searchBar/SearchBar';

function SearchPage() {
  const { searchItem } = useParams();
  const [search, setSearch] = useState(searchItem);

  console.log('searchhh', search);

  return (
    <div>
      <SearchBar setSearch1={setSearch} search1={search} /> {/* Change setSearch to setSearch1 */}
      <ProductList title={'Results...'} searchItem={search} setSearch={setSearch} />
      <Footer />
    </div>
  );
}

export default SearchPage;