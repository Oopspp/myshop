import { request } from "../network/request";

export function getDetail(iid) {
  return request({
    url:'/detail',
    params: {
      iid
    }
  })
}

export function getRecommend(iid) {
  return request({
    url: '/recommend'
  })
}