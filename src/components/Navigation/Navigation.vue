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
  @apply p-4;
  @apply bg-ra-dark-grey;
  @apply flex flex-col h-full;
  @apply border-r border-ra-white/5;

  svg {
    @apply fill-ra-white/50;
  }

    .section {
      @apply text-ra-white/30;
      @apply text-sm;
      @apply my-2;

      // обрезание
      @apply whitespace-nowrap;
      @apply text-ellipsis;
      @apply overflow-hidden;
    }
}

.nav-item {
  @apply flex items-center gap-2;
  @apply p-2;
  @apply rounded-md;

  .text {
    @apply text-ra-white/50;
    @apply text-base;
    @apply leading-none;
  }

  &:hover {
    @apply bg-ra-white/5;
  }

  &.active-link {
    @apply bg-ra-primary;

    .text {
      @apply text-ra-white;
    }
  }
}
</style>