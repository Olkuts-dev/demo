import Main from "@/layouts/Main.vue";
import InputPage from "@/layouts/InputPage.vue";
import { createRouter, createWebHistory } from "vue-router";
import { Routes } from "./router.dto";

export const useRouter = () => {
  const router = createRouter({
    history: createWebHistory(),
    routes : [
      {
        path     : '/',
        name     : 'Main',
        component: Main,
      },
      {
        path     : '/input',
        name     : Routes.Input,
        component: InputPage
      }
    ],
  });

  return router;
};