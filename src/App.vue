<script setup lang="ts">
  import { onMounted } from 'vue';

  import Navigation from '@components/Navigation/Navigation.vue';
  import { NavigationsSection } from '@components/Navigation/navigation.dto';
  import { Routes } from '@/router/router.dto';
  import { computed } from 'vue';
  onMounted(() => {
    document.documentElement.setAttribute('data-theme', 'dark');
  });

  const navigationSections = computed((): NavigationsSection[] => {
    return [
      {
        items: {
          [Routes.Main]: {
            name: 'Main',
          },
        },
      },
      {
        name : 'Common',
        items: {
          [Routes.Input]: {
            name: 'TextInput',
          },
        },
      },
    ];
  });

</script>

<template>
  <div id="app">
    <div class="flex h-full w-full">
      <Navigation :sections="navigationSections" class="navigation" />
      <RouterView class="router" />
    </div>
  </div>
</template>

<style lang="scss" scoped>
$navigation-width: 300px;

.navigation {
  @apply fixed;
  width: $navigation-width;
}
.router {
  margin-left: $navigation-width;
}

#app {
  height: 100vh;
}
</style>
