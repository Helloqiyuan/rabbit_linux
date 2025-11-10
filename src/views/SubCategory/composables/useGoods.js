// 商品列表渲染业务代码
import { onMounted, ref } from "vue";
import { getGoodsApi } from "@/apis/subCategory";
export const useGoods = (reqParams) => {
  const GoodsData = ref([]);

  const getGoodsData = async (reqParams) => {
    console.log(reqParams);
    const res = await getGoodsApi(reqParams);
    GoodsData.value = res.result.items;
    console.log(res);
  };
  onMounted(() => {
    getGoodsData(reqParams);
  });
  return {
    GoodsData,
    reqParams,
    getGoodsData
  };
};
