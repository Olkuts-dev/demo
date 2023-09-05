<script setup lang='ts'>
  import Button from '@components/Button.vue';
  import { useModalStore } from '@/store/modal';
  import Modal from '@components/Modals/Modal.vue';
  import ModalUnclosable from '@components/Modals/ModalUnclosable.vue';
  import TextInput from '@components/TextInput.vue';
  import { ref } from 'vue';

  const _modals = useModalStore();
  const open = () => {
    _modals.open(Modal);
  };

  const openUnclosable = () => {
    _modals.open(ModalUnclosable, {}, { unclosable: true});
  };

  const input1 = ref<string>();

  const openWithProps = () => {
    _modals.open(Modal, { text: input1.value });
  };

</script>

<template>
  <div>
    <Button
      :action="() => open()"
      text="Open modal"
      preset="default"
      class="mb-4"
    />
    <Button
      :action="() => openUnclosable()"
      text="Open unclosable modal"
      preset="default"
      class="mb-4"
    />

    <div class="flex gap-3 items-end">
      <TextInput
        v-model="input1"
        label="Write something"
        placeholder="Your text"
      />
      <Button
        :action="() => openWithProps()"
        text="Open it with props"
        preset="default"
        class="h-10"
      />
    </div>
  </div>
</template>

<style lang='scss' scoped>

</style>