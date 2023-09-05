import { defineStore } from 'pinia';
import { Component, computed, markRaw, ref } from 'vue';

interface Modal {
  component: Component;
  props: Record<string, unknown>;
  opts: ModalOpts;
}

interface ModalOpts {
  unclosable?: boolean;
}

export const useModalStore = defineStore('modals', () => {

  const queue = ref<Modal[]>([]);

  const add = (modal: Modal) => {
    queue.value.unshift(modal);
  };

  const close = () => {
    queue.value.shift();
  };

  const open = (component: Component, props: Record<string, unknown> = {}, opts: ModalOpts = { unclosable: false }) => {
    add({ component: markRaw(component), props, opts });
  };

  const current = computed(() => {
    const unclosable = queue.value.find((v) => v.opts.unclosable);
    if (unclosable) {
      return unclosable;
    }

    return queue.value[0];
  });

  return {
    open,
    close,
    current,
  };
});
