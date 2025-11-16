import axios from "axios";
import { ref } from "vue";
import { ElMessage } from "element-plus";
import "element-plus/theme-chalk/el-message.css";
import { useUserStore } from "@/stores/user";
import router from "@/router";
import NProgress from "nprogress";

const httpInstance = axios.create({
  baseURL: "http://pcapi-xiaotuxian-front-devtest.itheima.net",
  timeout: 60000,
});
const currentRequest = ref(0);
// 导出 currentRequest 供路由守卫使用
// export { currentRequest };

// axios请求拦截器
httpInstance.interceptors.request.use(
  (config) => {
    if(currentRequest.value === 0){
      console.log("axios start...");
      NProgress.start()
    }
    currentRequest.value++;
    const userStore = useUserStore();
    const token = userStore.userInfo.token;
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (e) => Promise.reject(e)
);

// axios响应式拦截器
httpInstance.interceptors.response.use(
  (res) => {
    currentRequest.value--;
    if (currentRequest.value === 0) {
      console.log("axios done...");
      NProgress.done();
    }
    return res.data;
  },
  (e) => {
    currentRequest.value--;
    if (currentRequest.value === 0) {
      NProgress.done();
    }
    const userStore = useUserStore();
    ElMessage.warning(e.response.data.message);
    // 401报错
    console.log(e);
    if (e.response?.status === 401) {
      userStore.ClearUserInfo();
      router.push("/login");
    }
    return Promise.reject(e);
  }
);

export default httpInstance;
