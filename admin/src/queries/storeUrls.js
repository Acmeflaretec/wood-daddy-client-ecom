import request from "utils/request";

const addBlogs = async (data) => request(`/blogs`, 'POST', data)
const editBlogs = async (data) => request(`/blogs`, 'PATCH', data)
const deleteBlogs = async (data) => request(`/blogs/${data?._id}`, 'DELETE', data)
const getBlogs = async (data) => request(`/blogs?page=${data?.pageNo}&perpageitems=${data?.pageCount}`, 'GET', data)
const getBlogsById = async (data) => request(`/blogs/${data?.id}`, 'GET', data)
const addBanners = async (data) => request(`/banner`, 'POST', data)
const editBanners = async (data) => request(`/banner`, 'PATCH', data)
const deleteBanners = async (data) => request(`/banner/${data?._id}`, 'DELETE', data)
const getBanners = async (data) => request(`/banner?page=${data?.pageNo}&perpageitems=${data?.pageCount}`, 'GET', data)
const getBannersById = async (data) => request(`/banner/${data?.id}`, 'GET', data)

export {
    addBlogs,
    editBlogs,
    deleteBlogs,
    getBlogs,
    getBlogsById,
    addBanners,
    editBanners,
    deleteBanners,
    getBanners,
    getBannersById,
  };
