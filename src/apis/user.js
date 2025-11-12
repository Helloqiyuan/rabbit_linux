import httpInstance from "@/utils/http";

export const loginApi = (data)=>{
  return httpInstance({
    url:'/login',
    method: 'POST',
    data
  })
}
