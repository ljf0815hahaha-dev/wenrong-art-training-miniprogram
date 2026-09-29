import { get } from '@/utils/request'

export const getEducationProductList = (productType) => get('/education/product/list', productType ? { productType } : undefined)
export const getProductCategoryList = () => get('/product/category/list')
export const getProductPage = (params = {}) => get('/product/spu/page', { pageNo: 1, pageSize: 20, sortField: 'salesCount', sortAsc: false, ...params })
export const getProductDetail = (spuId) => get('/product/spu/get-detail', { id: spuId })
