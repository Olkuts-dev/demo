<script setup lang="ts">
  import { onMounted, watch } from 'vue';

  import Navigation from '@components/Navigation/Navigation.vue';
  import { NavigationsSection } from '@components/Navigation/navigation.dto';
  import { Routes } from '@/router/router.dto';
  import { computed } from 'vue';
  import Modal from '@components/Modal.vue';
  import Switch from '@components/Switch.vue';
  import { ref } from 'vue';
  import { useThemeStore } from '@/store/theme';
  import GithubIcon from '@assets/icons/github.svg';

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
            name: 'TextInput',
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

  onMounted(() => {
    _theme.setTheme('dark');
  });

  const isLight = ref<boolean>(_theme.isLight);

  watch(() => isLight.value, () => {
    _theme.switchTheme();
  });

</script>

<template>
  <div id="app">
    <Navigation :sections="navigationSections" class="navigation" />
    <div class="page">
      <div class="header">
        <span class="mr-auto">
          Header
        </span>
        <Switch
          v-model="isLight"
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
$navigation-width: 300px;

#app {
  height: 100vh;
}

.navigation {
  @apply fixed;
  width: $navigation-width;
}
.page {
  margin-left: $navigation-width;
  @apply h-full;

  .header {
    @apply bg-ra-dark-grey;
    @apply sticky top-0;
    @apply p-5;
    @apply text-white font-bold text-xl;
    @apply flex items-center gap-3;

    .divider {
      @apply w-0.5;
      @apply h-6;
      @apply bg-white/5;
    }

    .icon {
      @apply w-5;
      @apply fill-white/50;
      @apply cursor-pointer
    }
  }
}


</style>
