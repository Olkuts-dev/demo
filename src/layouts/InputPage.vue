<script setup lang='ts'>
  import TextInput from '@components/TextInput.vue';
  import { ref } from 'vue';
  import PlayerIcon from '@assets/icons/players.svg';

  const input1 = ref<string>('');
  const input2 = ref<string>('');
</script>

<template>
  <div class="flex flex-col gap-8">
    <p class="text-ra-white/80 text-lg">
      There are some inputs with different props
    </p>

    <div class="flex items-center gap-3 flex-wrap">
      <TextInput
        v-model="input1"
        label="With reactive value"
        placeholder="Your text"
      />
      <p class="text-ra-white/50">
        <span>Value: </span>  
        <span>{{ input1 }}</span>  
      </p>
    </div>
      
    <div class="flex items-center gap-4">
      <TextInput
        label="With validation"
        placeholder="Your text"
        :validator="(value) => value.length < 8 ? 'Length must be at least 8' : null"
      />
    </div>

    <div class="flex items-center gap-3 flex-wrap">
      <TextInput
        v-model="input2"
        label="Delay in 1500ms"
        placeholder="Your text"
        :delay="1500"
      />
      <p class="text-ra-white/50">
        <span>Value: </span>  
        <span>{{ input2 }}</span>  
      </p>
    </div>

    <div class="flex items-center gap-3 flex-wrap">
      <TextInput
        label="With prepend as text"
        placeholder="Your text"
        prepend="text"
      />
      <TextInput
        label="Or icon"
        placeholder="Your text"
        :prepend="PlayerIcon"
      />
    </div>

    <div class="flex items-center gap-3">
      <TextInput
        label="Slot inside input box"
        placeholder="Your text"
      >
        <PlayerIcon class="fill-ra-white/50 w-4" />
      </TextInput>
    </div>

    <div class="flex items-center gap-3">
      <TextInput
        label="Default value"
        placeholder="Your text"
        preinput="value"
      />
    </div>
  </div>
</template>

<style lang='scss' scoped>

</style>