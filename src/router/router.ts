import Main from "@/layouts/Main.vue";
import InputPage from "@/layouts/InputPage.vue";
import ButtonPage from "@/layouts/ButtonPage.vue";
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
      },
      {
        path     : '/button',
        name     : Routes.Button,
        component: ButtonPage
      },
    ],
  });

  return router;
};