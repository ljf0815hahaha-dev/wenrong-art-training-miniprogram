import { del, get, post, put } from '@/utils/request'

export const createTradeOrder = (skuId, deliveryType = 2) => post('/trade/order/create', {
  items: [{ skuId, count: 1 }],
  pointStatus: false,
  deliveryType
})
export const getCartCount = () => get('/trade/cart/get-count')
export const getCartList = () => get('/trade/cart/list')
export const addCart = (skuId, count = 1) => post('/trade/cart/add', { skuId, count })
export const updateCartCount = (id, count) => put('/trade/cart/update-count', { id, count })
export const updateCartSelected = (ids, selected) => put('/trade/cart/update-selected', { ids, selected })
export const deleteCart = (ids) => del(`/trade/cart/delete?ids=${encodeURIComponent([].concat(ids).join(','))}`)
export const getOrderCount = () => get('/trade/order/get-count')
export const getOrderPage = (params = {}) => get('/trade/order/page', { pageNo: 1, pageSize: 20, ...params })
export const cancelOrder = (id) => del(`/trade/order/cancel?id=${encodeURIComponent(id)}`)
export const receiveOrder = (id) => put(`/trade/order/receive?id=${encodeURIComponent(id)}`)
