import httpInstance from "@/utils/http";

export const demoApi = () => {
  return httpInstance({
    url: "home/category/head",
  });
};
