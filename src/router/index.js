//createRouter:创建router实例对象
//createwebHistory:创建history模式的路由
import { createRouter, createWebHistory } from "vue-router";
import Login from "@/views/Login/index.vue";
import Layout from "@/views/Layout/index.vue";
import Home from "@/views/Home/index.vue";
import Category from "@/views/Category/index.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "Layout",
      redirect:"/home",
      component: Layout,
      children: [
        {
          path: "/home",
          component: Home,
        },
        {
          path: "/Category",
          component: Category,
        },
      ],
    },
    {
      path: "/Login",
      name: "Login",
      component: Login,
    },
  ],
});

export default router;
