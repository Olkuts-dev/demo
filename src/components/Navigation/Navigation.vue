<script setup lang='ts'>
  import { NavigationsSection } from './navigation.dto';

  defineProps<{
    sections: NavigationsSection[]
  }>();

</script>

<template>
  <div class="module-navigation">
    <template v-for="section in sections" :key="section.id">
      <template v-if="section.name">
        <p class="section">{{ section.name }}</p>
      </template>

      <div class="flex flex-col gap-1 justify-center">
        <template v-for="(item, route) of section.items" :key="route">
          <RouterLink
            :to="{ name: route }"
            active-class="active-link"
            class="nav-item"
          >
            <p class="text pl-2">
              {{ item.name }}
            </p>
          </RouterLink>
        </template>
      </div>
    </template>
  </div>
</template>

<style lang='scss' scoped>

.module-navigation {
  @apply p-5;
  @apply bg-ra-dark-grey;
  @apply flex flex-col h-full;
  @apply border-r border-white/5;

  svg {
    @apply fill-white/50;
  }

    .section {
      @apply text-white/25;
      @apply text-sm;
      @apply my-2;
    }
}

.nav-item {
  @apply flex items-center gap-2;
  @apply p-2;
  @apply rounded-md;

  .text {
    @apply text-white/50;
    @apply text-lg font-normal;
    @apply leading-none;
  }

  &:hover {
    @apply bg-white/5;
  }

  &.active-link {
    @apply bg-ra-primary;

    .text {
      @apply text-white;
    }
  }
}
</style>