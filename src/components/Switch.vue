<script setup lang="ts">
  import { computed } from 'vue';

  const props = withDefaults(defineProps<{
    modelValue?: boolean;
    readonlyValue?: boolean | undefined;
    small?: boolean;
    textOnTrue?: string;
    textOnFalse?: string;
  }>(), {
    modelValue   : undefined,
    readonlyValue: undefined,
    small        : false
  });

  const emit = defineEmits(['update:modelValue']);

  const toggle = () => {
    if (props.modelValue !== undefined) {
      emit('update:modelValue', !props.modelValue);
    }
  };

  const checked = computed(() => {
    if (props.readonlyValue !== undefined) {
      return props.readonlyValue;
    }

    if (props.modelValue !== undefined) {
      return props.modelValue;
    }

    return false;
  });

  defineExpose({ toggle });
</script>

<template>
  <label :class="['custom-switch', { small: small }]">
    <input
      class="hidden peer"
      type="checkbox"
      :checked="checked"
      :disabled="modelValue === undefined"
      @click="toggle()"
    >
    <div
      class="slider peer"
      :data-before-content="modelValue ? textOnTrue : textOnFalse"
      :style="`--content: ${modelValue ? textOnTrue : textOnFalse}`"
    />
  </label>
</template>

<style lang="scss" scoped>
:root {
}
.custom-switch {
  position: relative;
  display: inline-flex;
  @apply items-center;
  @apply cursor-pointer;

  .slider {
    @apply w-16 h-6 bg-black/50;
    @apply rounded-full;
  }

  .peer::after {
    content: '';
    @apply absolute;
    @apply top-1;
    @apply left-1;
    @apply rounded-full;
    @apply w-4 h-4;
    @apply transition-all;
    background-color: rgba(255, 255, 255, 0.08);
  }
  .peer::before {
    content: attr(data-before-content);
    @apply absolute;
    @apply top-1;
    @apply right-2;
    @apply text-white/30;
    @apply text-xs;
    @apply transition-all;
  }
  .peer:checked + .peer {
    @apply bg-ra-primary-hover;
  }
  .peer:checked + .peer::after {
    @apply translate-x-10;
    @apply bg-white;
  }

  .peer:checked + .peer::before {
    @apply -translate-x-4;
  }

  &.small {
    .slider {
      @apply w-7 h-4;
    }
    .peer::after {
      @apply w-3 h-3;
      @apply top-0.5 left-0.5;
    }
  }
}
</style>
