import httpInstance from "@/utils/http";

export const loginApi = (data)=>{
  return httpInstance({
    url:'/login',
    method: 'POST',
    data
  })
}

export const getLikeListAPI = ({ limit = 4 }) => {
  return httpInstance({
    url:'/goods/relevant',
    params: {
      limit
    }
  })
}


/*
params: {
	orderState:0,
  page:1,
  pageSize:2
}
*/


export const getUserOrder = (params) => {
  return httpInstance({
    url:'/member/order',
    method:'GET',
    params
  })
}
