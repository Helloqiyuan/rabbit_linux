import { ElMessage } from "element-plus";
import { defineStore } from "pinia";
import { ref } from "vue";
export const useCartStore = defineStore(
  "cart",
  () => {
    const cartList = ref([]);
    const addCart = (cart) => {
      const item = cartList.value.find((e) => e?.skuId === cart.skuId);
      if (item) {
        item.count += cart.count;
      } else {
        cartList.value.push(cart);
      }
    };
    const deleteCartByskuId = (skuId) => {
      ElMessage({
        message: `已删除 ${cartList.value.find((e) => e.skuId === skuId).name}`,
        type: "success",
        duration: 5000,
      });

      cartList.value = cartList.value.filter((e) => e.skuId !== skuId);
    };
    const clearCartList = () => {
      cartList.value = [];
    };
    const getTotalCount = () => {
      let res = 0;
      cartList.value.forEach((e) => (res += e.count));
      return res;
    };
    const getTotalPrice = () => {
      let res = 0;
      cartList.value.forEach((e) => (res += Number(e.price) * Number(e.count)));
      return res;
    };
    return {
      cartList,
      addCart,
      deleteCartByskuId,
      clearCartList,
      getTotalCount,
      getTotalPrice,
    };
  },
  {
    persist: true,
  }
);
