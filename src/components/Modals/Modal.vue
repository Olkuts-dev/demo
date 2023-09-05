<script setup lang='ts'>
  import Button from '@components/Button.vue';
  import TextInput from '@components/TextInput.vue';
  import { useModalStore } from '@/store/modal';

  defineProps<{
    text?: string
  }>();

</script>

<template>
  <div class="p-5 w-96">
    <p class="text-white/75 text-xl text-center pb-5">
      Hey! That's modal component. 
    </p>
    <template v-if="text === undefined">
      <p class="text-white/75 pb-3">
        It's closable by click outside end ESC key
      </p>
      <p class="text-white/75 pb-3">
        Also you can close it by call 
        <span class="text-sky-600 font-semibold">useModalStore</span>
        <span class="font-semibold">().</span>
        <span class="text-sky-600 font-semibold">close</span>
        <span class="font-semibold">()</span>
      </p>
      <div class="flex">
        <TextInput placeholder="Your name" class="w-full" />
        <Button
          class="ml-3"
          :action="() => { useModalStore().close() }"
          text="OK"
          preset="primary"
        />
      </div>
    </template>
    <template v-else>
      <p class="text-white/75 pb-3">
        Value:
        <span>
          {{ text }}
        </span>
      </p>
    </template>
  </div>
</template>

<style lang='scss' scoped>

</style>