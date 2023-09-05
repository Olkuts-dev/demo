import { defineStore } from "pinia";
import { computed, ref } from "vue";

type AvailableTheme = 'dark' | 'light';

export const useThemeStore = defineStore('theme', () => {
  const currentTheme = ref<AvailableTheme>(document.documentElement.getAttribute('data-theme') as AvailableTheme);

  const isDark = computed(() => currentTheme.value === 'dark');
  const isLight = computed(() => currentTheme.value === 'light');

  const setTheme = (theme: AvailableTheme) => {
    currentTheme.value = theme;
    
    document.documentElement.setAttribute('data-theme', theme);
  };

  const switchTheme = () => {
    const theme = isDark.value ? 'light' : 'dark';

    setTheme(theme);
  };

  return { currentTheme, isDark, isLight, setTheme, switchTheme };
});