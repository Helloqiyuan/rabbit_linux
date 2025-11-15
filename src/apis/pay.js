import httpInstance from "@/utils/http";

// 获取订单信息
export const getOrderApi = (id) => {
  return httpInstance({
    url: `/member/order/${id}`
  });
};
