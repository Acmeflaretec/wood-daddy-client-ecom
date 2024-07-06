import request from "utils/request";

const getOrders = async (data) => request(`/order/adminfetch?page=${data?.pageNo}&perpageitems=${data?.pageCount}`, 'GET', data)
const getBulkOrders = async (data) => request(`/order/bulkorder?page=${data?.pageNo}&perpageitems=${data?.pageCount}`, 'GET', data)
const getOrderById = async (data) => request(`/order/${data?.id}`, 'GET', data)
const editOrder = async ({ orderId, newStatus }) => request('order/update-status', 'PUT', {orderId, newStatus})

export {
  getOrders,
  getOrderById,
  getBulkOrders,
  editOrder
};
