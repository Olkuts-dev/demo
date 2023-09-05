<script setup lang="ts">
  import { useSlots } from 'vue';
  import { ref, computed } from 'vue';
  import LoadingIcon from '@assets/icons/loading.svg';

  interface ButtonProps {
    preset?: 'default' | 'primary' | 'link';
    
    text?: string;

    action?: () => Promise<unknown> | unknown;
    loading?: boolean;

    disabled?: boolean;
  }

  const slots = useSlots();

  const props = withDefaults(defineProps<ButtonProps>(), {
    preset: undefined,

    text: undefined,
    
    action : undefined,
    loading: undefined,

    disabled: undefined
  });

  const _actionProgress = ref<boolean>(false);

  const isProcessing = computed(() => _actionProgress.value || props.loading);

  const submit = async () => {
    if (!props.action) {
      return;
    }

    _actionProgress.value = true;

    try {
      await props.action();
    } finally {
      _actionProgress.value = false;
    }
  };
</script>

<template>
  <button
    :disabled="disabled || isProcessing"
    class="ra-button"
    :class="{
      disabled: !!props.disabled,
      icon: slots.icon,
      'preset': props.preset !== undefined,
      [preset ?? '']: true,
    }"
    @click="submit"
  >
    <div :class="isProcessing ? `opacity-0` : `opacity-100`">
      <slot />
    </div>
    <p :class="{ $slots }" :style="isProcessing ? `opacity: 0;` : 'opacity: 100;'">
      {{ props.text }}
    </p>
    <LoadingIcon v-if="isProcessing" class="loading-icon" />
  </button>
</template>

<style lang="scss">
.ra-button {
  @apply flex items-center justify-center;

  &.disabled {
    @apply cursor-not-allowed;
  }

  svg {
    @apply w-5;
  }

  &.preset {
    &:not(.link) {
      @apply px-3 py-2;
    }
    
    &.primary {
      @apply rounded-md;
      @apply bg-ra-primary text-white;

      svg {
        @apply fill-white;
      }
      
      &:hover {
        @apply bg-ra-primary-hover;
      }
    }

    &.default {
      @apply rounded-md;
      @apply bg-white/10 text-white/50;

      svg {
        @apply fill-white/50;
      }

      &:hover {
        @apply bg-white/20 text-white;
      }
    }

    &.link {
      @apply text-ra-primary-hover border-b-2 border-ra-primary ;

      svg {
        @apply fill-ra-primary-hover;
      }

      &:hover {
        @apply fill-ra-primary;
        @apply text-ra-primary;
        @apply border-ra-primary;
      }
    }
    

    &.disabled { 
      @apply text-white/25 border-white/25;
      
      svg {
        @apply fill-white/25;
      }

      &:not(.link) {
        @apply bg-white/5;
      }
    }
  }

  .loading-icon {
    @apply absolute w-5 h-5 animate-spin text-white/25 fill-white;
  }
}
</style>
