<script setup lang="ts">
  import { onMounted, watch } from 'vue';

  import Navigation from '@components/Navigation/Navigation.vue';
  import { NavigationsSection } from '@components/Navigation/navigation.dto';
  import { Routes } from '@/router/router.dto';
  import { computed } from 'vue';
  import Modal from '@components/Modal.vue';
  import Switch from '@components/Switch.vue';
  import { useMq } from "vue3-mq";
  import { ref } from 'vue';
  import { useThemeStore } from '@/store/theme';
  import GithubIcon from '@assets/icons/github.svg';

  type AvailableTheme = 'dark' | 'light';

  const mq = useMq();

  const _theme = useThemeStore();

  const navigationSections = computed((): NavigationsSection[] => {
    return [
      {
        id   : 1,
        items: {
          [Routes.Main]: {
            name: 'Main',
            // icon:
          },
        },
      },
      {
        id   : 2,
        name : 'Common Components',
        items: {
          [Routes.Input]: {
            name: 'Input',
            // icon:
          },
          [Routes.Button]: {
            name: 'Button',
            // icon:
          },
          [Routes.Modal]: {
            name: 'Modal',
            // icon:
          },
        },
      },
      {
        id   : 3,
        name : 'Content Components',
        items: {
          [Routes.Map]: {
            name: 'Map',
            // icon:
          },
        },
      },
    ];
  });
  const value = ref<boolean>(false);

  onMounted(() => {
    const theme = localStorage.getItem('theme') as AvailableTheme ?? 'dark';
    _theme.setTheme(theme);

    value.value = theme === 'light';
  });


  watch(() => value.value, (newValue) => {
    if (newValue !== null) {
      _theme.setTheme(newValue ? 'light' : 'dark');
    }
  });

</script>

<template>
  <div id="app" :class="mq.current">
    <Navigation :sections="navigationSections" class="navigation" />
    <div class="page">
      <div class="header">
        <span class="mr-auto">
          Header
        </span>
        <Switch
          v-model="value"
          text-on-true="LIGHT"
          text-on-false="DARK"
        />
        <div class="divider" />
        <a href="https://github.com/Olkuts-dev/demo" target="_blank">
          <GithubIcon class="icon" />
        </a>
      </div>
      <RouterView class="p-5" />
    </div>
    
    <Modal />
  </div>
</template>

<style lang="scss" scoped>
#app {
  height: 100vh;
  
  --navigation-width: 300px;
  --header-height: 68px;

  &.phone {
    --navigation-width: 120px;
  }

  .navigation {
    @apply fixed;
    width: var(--navigation-width);
  }
  .page {
    margin-left: var(--navigation-width);
    height: calc(100% - var(--header-height));

    .header {
      height: var(--header-height);
      @apply bg-ra-dark-grey;
      @apply sticky top-0;
      @apply z-10;
      @apply p-5;
      @apply text-ra-white font-bold text-xl;
      @apply flex items-center gap-3;

      .divider {
        @apply w-0.5;
        @apply h-6;
        @apply bg-ra-white/5;
      }

      .icon {
        @apply w-5;
        @apply fill-ra-white/50;
        @apply cursor-pointer
      }
    }
  }
}


</style>
