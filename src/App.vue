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
        id   : 1,
        items: {
          [Routes.Main]: {
            name: 'Main',
          },
        },
      },
      {
        id   : 2,
        name : 'Common',
        items: {
          [Routes.Input]: {
            name: 'TextInput',
          },
          [Routes.Button]: {
            name: 'Button',
          },
        },
      },
    ];
  });

</script>

<template>
  <div id="app">
    <Navigation :sections="navigationSections" class="navigation" />
    <RouterView class="router" />
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
.router {
  @apply p-5;
  margin-left: $navigation-width;
}


</style>
