import request from "utils/request";

const addCategory = async (data) => request(`/category`, 'POST', data)
const addProduct = async (data) => request(`/products`, 'POST', data)
const addBanner = async (data) => request(`/banner`, 'POST', data)
const addAdvertisement = async (data) => request(`/advertisement`, 'POST', data)
const addWelcomeSection = async (data) => request(`/contentSection`, 'POST', data)


const getCategory = async (data) => request(`/category?page=${data?.pageNo}&perpageitems=${data?.pageCount}`, 'GET', data)
const getProducts = async (data) => request(`/products?page=${data?.pageNo}&perpageitems=${data?.pageCount}`, 'GET', data)
const getBanner = async (data) => request(`/banner`, 'GET', data)
const getAdvertisement = async (data) => request(`/advertisement`, 'GET', data)
const getWelcomeSection = async (data) => request(`/contentSection`, 'GET', data)
const getOrders = async (data) => request(`/order`, 'GET', data)




export {
  getOrders,
  addCategory,
  addProduct,
  addBanner,
  getCategory,
  getProducts,
  getBanner,
  addAdvertisement,
  getAdvertisement,
  addWelcomeSection,
  getWelcomeSection,
  
};
