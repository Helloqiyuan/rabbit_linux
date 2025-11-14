import { defineStore } from "pinia";
import { ref } from "vue";
export const useCartStore = defineStore(
  "cart",
  () => {
    const cartList = ref([]);
    const addCart = (cart) => {
      console.log("(pinia)addCart", cart);
      const item = cartList.value.find((e) => e?.skuId === cart.skuId);
      if (item) {
        item.count += cart.count;
      } else {
        cartList.value.push(cart);
      }
    };
    const clearCartList = () => {
      cartList.value = [];
    };
    return {
      cartList,
      addCart,
      clearCartList,
    };
  },
  {
    persist: true,
  }
);
