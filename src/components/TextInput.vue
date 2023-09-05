<script setup lang="ts">
  import type { Component } from 'vue';
  import { computed } from 'vue';
  import { watch, ref, useSlots, onMounted, onBeforeUnmount } from 'vue';

  const emits = defineEmits(['update:modelValue']);

  const props = defineProps<{
    label?: string;
    placeholder?: string;
    // eslint-disable-next-line no-unused-vars
    validator?: (value: string) => string | null | undefined;
    prepend?: string | Component;
    type?: 'text' | 'password' | 'email' | 'number';
    theme?: 'light' | 'middle' | 'default' | 'dark';
    modelValue?: string;
    preinput?: string;
    autofocus?: boolean;
    maxLength?: number;
    delay?: number;
  }>();

  const slots = useSlots();

  const input = ref<string>('');
  const exception = ref<string | undefined | null>();

  const errorMessage = (value?: string) => {
    if (!props.validator) {
      return null;
    }

    return props.validator(value ?? '');
  };

  const applyException = () => {
    if (!input.value.length) {
      exception.value = null;
      return;
    }

    exception.value = errorMessage(input.value);
  };

  const confirmInput = () => {
    const error = errorMessage(input.value);

    if (!error) {
      exception.value = null;

      if (props.delay) {
        clearTimeout(timeout.value);

        timeout.value = setTimeout(() => {
          emits('update:modelValue', input.value);
        }, props.delay);
        return;
      }

      emits('update:modelValue', input.value);
    } else {
      emits('update:modelValue', '');
    }
  };

  const timeout = ref<NodeJS.Timeout | undefined>(undefined);

  onBeforeUnmount(() => {
    clearTimeout(timeout.value);
  });

  const inputRef = ref<HTMLElement>();

  onMounted(() => {
    input.value = props.preinput ?? '';

    if (props.autofocus) {
      inputRef.value?.focus();
    }
  });

  watch(
    () => props.preinput,
    () => {
      input.value = props.preinput ?? '';
    },
  );

  watch(
    () => props.autofocus,
    () => {
      if (props.autofocus) {
        inputRef.value?.focus();
      }
    },
  );

  watch(
    () => input.value,
    () => {
      confirmInput();
    },
  );

  const getBackground = computed(() => {
    switch (props.theme) {
      case 'light': {
        return 'bg-ra-middle-grey';
      }

      case 'middle': {
        return 'bg-ra-dark-grey';
      }

      case 'dark': {
        return 'bg-ra-dark';
      }

      case 'default':
      default: {
        return 'bg-black/50';
      }
    }
  });
</script>

<template>
  <div
    class="input-container"
    :class="{
      'without-effects': exception,
      error: exception,
    }"
  >
    <div v-if="props.label" class="label">
      <label for="input">
        {{ props.label }}
      </label>

      <slot name="action" />
    </div>

    <div
      class="input-box"
      :class="{ slot: slots.default }"
    >
      <div v-if="prepend" class="prepend">
        <p v-if="typeof prepend === 'string'">
          {{ prepend }}
        </p>
        <div v-else class="w-5 h-5">
          <component :is="prepend" />
        </div>
      </div>

      <div
        v-else-if="slots.default"
        :class="[
          'prepend slot',
          {
            [getBackground]: true,
          },
        ]"
      >
        <slot name="default" />
      </div>

      <input
        ref="inputRef"
        v-model="input"
        :onFocusout="applyException"
        :autofocus="autofocus"
        :onchange="confirmInput"
        :maxLength="maxLength"
        :placeholder="props.placeholder"
        :class="{
          [getBackground]: true,
          withRightIcon: !!slots.rightIcon,
        }"
        :type="type"
        autocomplete="cc-csc"
        @mouseleave="confirmInput"
      >
    </div>

    <div v-if="exception">
      <p class="text-ra-red/75 text-sm">⚠ {{ exception }}</p>
    </div>
  </div>
</template>

<style scoped lang="scss">
.input-container {
  .label {
    @apply inline-flex justify-between w-full mb-1;
    @apply text-ra-white/50;
  }

  .input-box {
    @apply h-10;
    @apply w-full;
    @apply flex items-center;

    &:not(.slot) {
      input {
        @apply pl-2.5;
      }
    }
    
    // Правильные бордеры и скругления
    &:not(:has(.prepend)) {
      input {
        @apply rounded-md;
        @apply border;
      }
    }
    
    input {
      @apply border-r rounded-r-md;
      @apply w-full h-full pr-2.5;
      @apply text-ra-white;

      // Точно есть бордер по Y, и у него серый цвет
      @apply border-y border-ra-white/10;

      &::placeholder {
        @apply text-ra-white/25;
        font-size: 16px;
      }
    }

    .prepend {
      @apply rounded-l-md;
      @apply flex items-center justify-center;
      @apply px-2.5;
      @apply h-full;

      // Если передадим текст, чтобы он был стандартным
      @apply font-medium;
      @apply text-ra-white/50;

      &:not(.slot) {
        @apply bg-ra-white/10;
        
        svg {
          @apply fill-ra-white/50;
        }

        // Если иконка - делаем квадратным
        &:not(:has(p)) {
          @apply aspect-square;
        }
      }

      &.slot {
        @apply border-l border-y border-ra-white/10;
      }

      p {
        text-wrap: nowrap;
      }
    }
  }

  &.error {
    input {
      @apply border-ra-red/50 text-ra-red;
    }
    .input-box {
      .prepend {
        @apply bg-ra-red;
        @apply text-ra-red;
        
        svg {
          @apply fill-ra-red;
        }
      }
    }
  }

  &:not(.error) {
    &:focus-within {
      .prepend,
      input {
        @apply border-ra-white/20;
      }

      .prepend {
        &:not(.slot) {
          @apply bg-ra-white/20;
          @apply text-ra-white;

          svg {
            @apply fill-ra-white;
          }
        }
      }
    }
  }
}

</style>
