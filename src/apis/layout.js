import httpInstance from "@/utils/http";

export const getAllCategory = () =>{
  return httpInstance({
    url:"/home/category/head"
  })
}
