<script setup lang="ts">
  import { useModalStore } from '@/store/modal';
  import { storeToRefs } from 'pinia';
  import { onMounted, provide } from 'vue';

  const modalsStore = useModalStore();
  const { close } = modalsStore;
  const { current } = storeToRefs(modalsStore);

  const onClose = () => {
    if (!current.value?.opts.unclosable) {
      close();
    }
  };

  onMounted(() => {
    window.addEventListener('keydown', function (e) {
      if (e.key == 'Escape') {
        e.preventDefault();

        onClose();
      }
    });
  });

  provide('close', () => onClose());
</script>

<template>
  <div>
    <Transition name="fade">
      <div
        v-if="current"
        class="modal-backdrop"
        @click="onClose()"
      />
    </Transition>
    <Transition name="pop">
      <div
        v-if="current"
        :key="JSON.stringify(current.props)"
        :class="['modal-border']"
        @click.stop=""
      >
        <div class="modal">
          <component
            :is="current.component"
            :key="JSON.stringify(current.props)"
            v-bind="current.props"
            @close="close"
          />
        </div>
      </div>
    </Transition>
  </div>
</template>

<style scoped lang="scss">
.modal-backdrop {
  content: '';
  @apply fixed inset-0;
  @apply bg-black/80;
  @apply flex items-center justify-center;
  @apply cursor-pointer;

  z-index: 99999;
  backdrop-filter: blur(4px);
}

.modal-border {
  @apply fixed inset-0;
  @apply m-auto;
  @apply h-fit w-fit;
  @apply bg-ra-dark-grey/25;
  padding: 10px;
  backdrop-filter: blur(25px);
  @apply rounded-lg;

  z-index: 999999;
}
.modal {
  @apply bg-ra-dark-grey;
  @apply overflow-x-auto;
  @apply flex flex-col;
  @apply rounded-lg;
}

.fade-enter-active {
  transition: opacity 0.25s cubic-bezier(0.36, 0.01, 0, 1.32);
}
.fade-leave-active {
  transition: opacity 0.25s cubic-bezier(0.71, 0.16, 0, 1.04);
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

.pop-enter-active {
  transition: all 0.25s cubic-bezier(0.36, 0.01, 0, 1.32);
}
.pop-leave-active {
  transition: all 0.25s cubic-bezier(0.71, 0.16, 0, 1.04);
}

.pop-enter-from,
.pop-leave-to {
  transform: scale(0);
  -webkit-transform: scale(0);
}
</style>
