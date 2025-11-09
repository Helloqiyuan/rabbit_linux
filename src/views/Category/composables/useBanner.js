// 封装轮播图相关的业务代码
import { ref, onMounted } from "vue";
import { getAllSwiperApi } from "@/apis/home";
export const useBanner = () => {
  const swiperData = ref([]);
  const getSwiperData = async () => {
    // 广告区域展示位置（投放位置 投放位置，1为首页，2为分类商品页） 默认是1
    const res = await getAllSwiperApi(2);
    swiperData.value = res.result;
  };
  onMounted(() => {
    getSwiperData();
  });
  return {
    swiperData,
  };
};
