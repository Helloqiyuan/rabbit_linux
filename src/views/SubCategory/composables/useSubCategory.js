// 二级菜单下的面包屑业务代码
import {ref,onMounted} from 'vue'
import { getSubCategoryFilterApi } from '@/apis/subCategory';
export const useSubCategory = (props) => {
  // 面包屑数据
  const subCategoryData = ref({});
  const getSubCategoryData = async (id) => {
    const res = await getSubCategoryFilterApi(id);
    subCategoryData.value = res.result;
  };
  onMounted(() => {
    getSubCategoryData(props.id);
  });
  return {
    subCategoryData
  }
};
