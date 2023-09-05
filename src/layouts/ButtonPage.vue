<script setup lang='ts'>
  import Button from '@components/Button.vue';

  import PlayerIcon from '@assets/icons/players.svg';

  const method = async () => {
    await new Promise((res) => {
      setTimeout(() => {
        res(1);
      }, 2000);
    });
  };
</script>

<template>
  <div class="flex flex-col gap-8">
    <div>
      <p class="text-white/50 pb-2">
        Just Buttons
      </p>
      <div class="flex">
        <Button
          :action="() => {}"
          text="Primary"
          preset="primary"
          class="mr-2"
        />
        <Button
          :action="() => {}"
          text="Default"
          preset="default"
          class="mr-2"
        />
        <Button
          :action="() => {}"
          text="Link"
          preset="link"
          class="mr-2"
        />
      </div>
    </div>

    <div>
      <p class="text-white/50 pb-2">
        Icon Button
      </p>
      <div class="flex">
        <Button
          :action="() => {}"
          preset="primary"
          class="mr-2"
        >
          <PlayerIcon />
        </Button>
        <Button
          :action="() => {}"
          preset="default"
          class="mr-2"
        >
          <PlayerIcon />
        </Button>
        <Button
          :action="() => {}"
          preset="link"
          class="mr-2"
        >
          <PlayerIcon />
        </Button>
      </div>
    </div>
    <div>
      <p class="text-white/50 pb-2">
        Button with icon and text
      </p>
      <div class="flex">
        <Button
          :action="() => {}"
          text="Text with icon"
          preset="primary"
          class="mr-2"
        >
          <PlayerIcon />
        </Button>
        <Button
          :action="() => {}"
          text="Text with icon"
          preset="default"
          class="mr-2"
        >
          <PlayerIcon />
        </Button>
        <Button
          :action="() => {}"
          text="Text with icon"
          preset="link"
          class="mr-2"
        >
          <PlayerIcon />
        </Button>
      </div>
    </div>
    
    <div>
      <p class="text-white/50 pb-2">
        Button with loading icon while awaiting async action
      </p>
      <div class="flex">
        <Button
          :action="() => method()"
          text="Text with icon"
          preset="default"
          class="mr-2"
        >
          <PlayerIcon />
        </Button>
      </div>
    </div>
  </div>
</template>

<style lang='scss' scoped>

</style>