//createRouter:创建router实例对象
//createwebHistory:创建history模式的路由
import { createRouter, createWebHistory } from "vue-router";
import Login from "@/views/Login/index.vue";
import Layout from "@/views/Layout/index.vue";
import Home from "@/views/Home/index.vue";
import Category from "@/views/Category/index.vue";
import SubCategory from "@/views/SubCategory/index.vue";
import Detail from "@/views/Detail/index.vue";
import CartList from "@/views/CartList/index.vue";
import CheckOut from "@/views/CheckOut/index.vue";
import Pay from "@/views/Pay/index.vue";
import Paycallback from "@/views/Pay/PayCallBack.vue";
import Member from "@/views/Member/index.vue";
import UserInfo from "@/views/Member/components/UserInfo.vue";
import UserOrder from "@/views/Member/components/UserOrder.vue";
// import NProgress from "nprogress";
// import { currentRequest } from "@/utils/http";
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "layout",
      redirect: "/home",
      component: Layout,
      children: [
        {
          path: "home",
          name: "home",
          component: Home,
        },
        {
          path: "category/:id",
          name: "category",
          component: Category,
          /*
            使得路径参数id能让子组件通过defineProps获得，
            不写这个就需要获取useRoute去拿到params再获取到id
          */
          props: true,
        },
        {
          path: "category/sub/:id",
          name: "subCategory",
          component: SubCategory,
          props: true,
        },
        {
          path: "detail/:id",
          name: "datail",
          component: Detail,
          props: true,
        },
        {
          path: "cartlist",
          name: "cartList",
          component: CartList,
        },
        {
          path: "checkout",
          name: "checkout",
          component: CheckOut,
        },
        {
          path: "pay",
          name: "pay",
          component: Pay,
          props(route) {
            return route.query;
          },
        },
        {
          path: "paycallback",
          name: "paycallback",
          component: Paycallback,
          props(route) {
            return route.query;
          },
        },
        {
          path: "member",
          name: "member",
          component: Member,
          children: [
            {
              path: "user",
              name: "userinfo",
              component: UserInfo,
            },
            {
              path: "order",
              name: "order",
              component: UserOrder,
            },
          ],
        },
      ],
    },
    {
      path: "/login",
      name: "login",
      component: Login,
    },
  ],
  scrollBehavior(to, from, savedPosition) {
    // 在按下 后退/前进 按钮时不会滚动到顶部
    // if (savedPosition) {
    //   return savedPosition;
    // } else {
    //   return {
    //     top: 0,
    //   };
    // }
    return {
      top: 0,
    };
  },
});
// router.beforeEach(() => {
//   NProgress.start();
// });
/*
  1.如果新页面有axios请求则会在http.js中done
    因为在加载新页面时 拦截器的执行(主要是currentRequest++)比afteEach先
    这里的setTimeout提交的回调函数就是等DOM加载完且js线程空闲(拦截器也完事了)才能执行
  2.如果新页面没有axios请求 在dom更新后 js主线程也空闲了 轮到setTimeout提交的回调函数执行
    此时也就done了，解决了页面没有请求时进度条无法更新的问题
*/
// router.afterEach(() => {
//   // 使用 nextTick 确保在请求拦截器执行后再检查
//   setTimeout(() => {
//     // 如果没有正在进行的请求，关闭进度条
//     if (currentRequest.value === 0) {
//       console.log("router done...");
//       NProgress.done();
//     }
//   }, 0);
// });

export default router;
