import React from 'react'
import './index.css'
import ProductList from '../../components/productList/productList'
import Footer from '../../layouts/footer'
import SearchBar from '../../components/searchBar/SearchBar'

function SearchPage() {
  return (
    <div>
     <SearchBar/>
      <ProductList title={'Results...'} />
      <Footer/>
    </div>
  )
}

export default SearchPage