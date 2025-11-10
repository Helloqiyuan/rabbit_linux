import httpInstance from "@/utils/http";

/**
 * @description: 获取二级分类列表数据
 * @param {*} id 分类id
 * @return {*}
 */

export const getSubCategoryFilterApi = (id) => {
  return httpInstance({
    url:'/category/sub/filter',
    params:{
      id
    }
  })
}
