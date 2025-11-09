// 封装一级分类相关的业务代码
import { ref, onMounted } from "vue";
import { getCategoryApi } from "@/apis/category";
import { onBeforeRouteUpdate } from "vue-router";
// 使用pinia缓存的数据
// import { useCategoryStore } from '@/stores/category';
export const useCategory = (props) => {
  const categoryData = ref({});

  const getCategoryData = async (id) => {
    const res = await getCategoryApi(id);
    categoryData.value = res.result;
    // categoryData.value = useCategoryStore().globalCategoryData.filter(e => e.id === id)[0]
    // console.log("@", categoryData.value);
  };
  /* 路由切换数据更新方法一(我的解决方案)
    watch(() => props.id, (newValue) => {
    getCategoryData(newValue)
    getSwiperData()
  })
  */

  /* 老师的方法(onBeforeRouteUpdate)
   */
  onBeforeRouteUpdate((to) => {
    // 这个to是指即将更新到的路由
    getCategoryData(to.params.id);
    // 因为轮播图数据是一样的所以不请求轮播图数据
  });
  onMounted(() => {
    getCategoryData(props.id);
  });
  return {
    categoryData,
  };
};
