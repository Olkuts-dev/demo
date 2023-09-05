<script setup lang='ts'>
  import { NavigationsSection } from './navigation.dto';

  const props = defineProps<{
    sections: NavigationsSection[]
  }>();
</script>

<template>
  <div class="module-navigation">
    <div class="sections">
      <template v-for="section in sections">
        <!--eslint-disable-next-line vue/require-v-for-key-->
        <div>
          <template v-if="section.name">
            <p class="section">{{ section.name }}</p>
          </template>

          <div class="flex flex-col gap-1 justify-center">
            <template v-for="(item, route) of section.items" :key="route">
              <RouterLink
                :to="{ name: route, query: { ...(item.query ?? {})} }"
                active-class="active-link"
                class="nav-item first-letter overflow-hidden"
              >
                <p class="text pl-2">
                  {{ item.name }}
                </p>
              </RouterLink>
            </template>
          </div>
        </div>
      </template>
    </div>
  </div>
</template>

<style lang='scss' scoped>

.module-navigation {
  @apply p-5;
  @apply bg-ra-dark-grey;
  @apply flex flex-col gap-5 h-full;

  svg {
    @apply fill-white/50;
  }

  .search {
    transition: all 0.5s;
    @apply cursor-pointer;
    @apply inline-flex justify-between;
    @apply bg-white/5;
    @apply rounded-md;
    @apply px-2 py-2;

    .plus {
      @apply text-white/25;
      @apply text-xs;
      @apply font-medium;
    }
  }
  .sections {
    @apply h-full;

    .section {
    transition: all 0.2s;
      @apply text-white/25;
      @apply text-sm;
      @apply my-2;
    }
  }
}

.fade-leave-from {
  opacity: 0;
}
.fade-enter-from {
  opacity: 0;
}
.fade-enter-to {
  opacity: 1;
}

.nav-item {
  @apply flex items-center gap-2;
  @apply p-2;
  @apply rounded-md;

  .icon {
    @apply fill-white/50;
  }

  .text {
    @apply text-white/50;
    @apply text-lg font-normal;
    @apply leading-none;
  }

  &:hover {
    @apply bg-white/5;
  }

  &.active-link {
    @apply bg-white/10;

    .text {
      @apply text-white;
    }

    .icon {
      @apply fill-white;
    }
  }
}
</style>