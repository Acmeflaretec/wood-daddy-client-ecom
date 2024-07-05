import request from "utils/request";

const addCategory = async (data) => request(`/category`, 'POST', data)
const editCategory = async (data) => request(`/category`, 'PATCH', data)
const deleteCategory = async (data) => request(`/category/${data?._id}`, 'DELETE', data)
const getCategoryById = async (data) => request(`/category/${data?.id}`, 'GET', data)
const addProduct = async (data) => request(`/products`, 'POST', data)
const updateProduct = async (data) => request(`/products`, 'PATCH', data)
const deleteProduct = async (data) => request(`/products/${data?._id}`, 'DELETE', data)
const getCategory = async (data) => request(`/category?page=${data?.pageNo}&perpageitems=${data?.pageCount}`, 'GET', data)
const getProducts = async (data) => request(`/products?page=${data?.pageNo}&perpageitems=${data?.pageCount}`, 'GET', data)
const getProductById = async (data) => request(`/products/${data?.id}`, 'GET', data)
const getAdvertisement = async (data) => request(`/advertisement`, 'GET', data)
const getWelcomeSection = async (data) => request(`/contentSection`, 'GET', data)
const addAdvertisement = async (data) => request(`/advertisement`, 'POST', data)
const addWelcomeSection = async (data) => request(`/contentSection`, 'POST', data)
const editWelcomeSection = async (data) => request(`/contentSection`, 'PATCH', data)
const getWelcomeById = async (data) => request(`/contentSection/${data?.id}`, 'GET', data)
const deleteWelcome = async (data) => request(`/contentSection/${data?._id}`, 'DELETE', data)
const editAds = async (data) => request(`/advertisement`, 'PATCH', data)
const deleteAds = async (data) => request(`/advertisement/${data?._id}`, 'DELETE', data)
const getAdsId = async (data) => request(`/advertisement/${data?.id}`, 'GET', data)


export {
  addCategory,
  addProduct,
  updateProduct,
  deleteProduct,
  getCategory,
  getProducts,
  getProductById,
  getCategoryById,
  editCategory,
  deleteCategory,
  addAdvertisement,
  getAdvertisement,
  addWelcomeSection,
  getWelcomeSection,
  editWelcomeSection,
  getWelcomeById,
  deleteWelcome,
  editAds,
  getAdsId,
  deleteAds
};
