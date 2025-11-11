import httpInstance from "@/utils/http";

export const getGoodDetailApi = (id) =>{
  return httpInstance({
    url: '/goods',
    params:{
      id:id
    }
  })
}
