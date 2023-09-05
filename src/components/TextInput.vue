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
    height?: string;
    preinput?: string;
    autofocus?: boolean;
    maxLength?: number;
    delay?: number;
  }>();

  const _height = computed(() => Math.max(40, +(props.height ?? '40')));

  const slots = useSlots();

  const input = ref<string>(props.preinput ?? '');
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
    :class="[
      'input-container',
      {
        'without-effects':  exception,
        error: exception,
      },
    ]"
    :style="`height: calc(${_height}px + ${label ? '28px' : '0'});`"
  >
    <div v-if="props.label" class="input-label">
      <label for="input">
        {{ props.label }}
      </label>
      <slot name="action" />
    </div>

    <div
      :style="`height: ${_height}px;`"
      :class="[
        'input-box',
        {
          slot: slots.leftIcon,
        },
      ]"
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
          withoutEffects,
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
  &:not(.no-border, .without-effects, .error) {
    &:focus-within {
      .prepend,
      .append,
      input {
        @apply border-white/20;
      }

      .prepend {
        &:not(.slot) {
          @apply bg-white/20;
          @apply text-white;

          svg {
            fill: white;
          }
        }
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

  &.no-border {
    input {
      @apply border-none;
    }

    .prepend {
      @apply border-none;
    }

    .append {
      @apply border-none;
    }
  }
}

.input-label {
  @apply inline-flex justify-between w-full mb-1;
  @apply text-white/25;
}

.input-box {
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
      @apply rounded-l-md;
      @apply border-l rounded-l-md;
    }
  }
  &:not(:has(.append)) {
    input {
      @apply rounded-r-md;
      @apply border-r rounded-r-md;
    }
  }

  .prepend {
    // Общий мусор
    @apply rounded-l-md;
    @apply px-2.5;
    @apply h-full;

    // Стандартный цвет задника - серый, а цвет свг - светлосерый
    &:not(.slot) {
      // Делаем квадратик с иконкой квадратным
      &:not(:has(p)) {
        @apply aspect-square;
      }

      @apply bg-white/10;
      svg {
        @apply fill-white/50;
      }
    }

    &.slot {
      @apply border-l border-y border-white/10;
    }

    // Если вдруг передадим текст, чтобы он был стандартным
    @apply font-medium;
    @apply text-white/50;

    // Центруем контент
    @apply flex items-center justify-center;

    p {
      text-wrap: nowrap;
    }
  }

  input {
    &::placeholder {
      @apply text-white/25;
      font-size: 16px;
    }

    @apply w-full h-full pr-2.5;

    // Точно есть бордер по Y, и у него серый цвет
    @apply border-y border-white/10;

    @apply text-white;
  }

  .append {
    @apply border-y border-r border-white/10;
    @apply rounded-r-md;
    @apply h-full;

    @apply flex items-center gap-0.5;
    @apply pr-3;
    @apply text-white;

    .plus {
      @apply text-ra-light-grey;
      @apply text-xs;
      @apply font-medium;
    }
  }
}
</style>
