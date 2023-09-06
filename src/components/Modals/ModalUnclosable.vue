<script setup lang='ts'>
  import Button from '@components/Button.vue';
  import { useModalStore } from '@/store/modal';


</script>

<template>
  <div class="p-5 w-80">
    <p class="text-ra-white/75 text-xl text-center pb-5">
      Hey! It's unclosable. 
    </p>
    <p class="text-ra-white/75 pb-3">
      It's just can't be close by click outside.
    </p>
    <p class="text-ra-white/75 pb-10">
      By the way, you still can close it by button 
    </p>
    <div class="flex">
      <Button
        class="w-full"
        :action="() => { useModalStore().close() }"
        text="Accept all cookies"
        preset="primary"
      />
    </div>
  </div>
</template>

<style lang='scss' scoped>

</style>