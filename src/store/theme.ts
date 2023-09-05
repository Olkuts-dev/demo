import { defineStore } from "pinia";
import { ref } from "vue";

type AvailableTheme = 'dark' | 'light';

export const useThemeStore = defineStore('theme', () => {
  const currentTheme = ref<AvailableTheme>(document.documentElement.getAttribute('data-theme') as AvailableTheme);


  const setTheme = (theme: AvailableTheme) => {
    currentTheme.value = theme;
    localStorage.setItem('theme', theme);
    
    document.documentElement.setAttribute('data-theme', theme);
  };

  return { currentTheme, setTheme };
});