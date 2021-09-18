import { request } from "./request";

export const BANNER = 'banner'
export const RECOMMEND = 'recommend'

export function getHomeMultiData() {
  return request({
    url: '/home/multidata'
    // url:'/recommend'
  })
}

export function getGoods(type, page) {
  return request({
    url: '/home/data',
    params:{
      type,
      page
    }
  })
}