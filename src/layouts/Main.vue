<script setup lang='ts'>


</script>

<template>
  <div class="p-5">
    <div class="card">
      <div class="flex items-center">
        <img src="src/assets/my-photo.jpg" class="avatar">

        <p class="text-ra-white pl-5 text-xl font-semibold">
          Hey there!
          <span>
            This is me
          </span>
        </p>
      </div>
    </div>
  </div>
</template>

<style lang='scss' scoped>
.card {
  @apply bg-ra-dark-grey;
  @apply flex;
  @apply p-3;
  @apply rounded-md;
  .avatar {
    width: 250px;
    @apply aspect-square;
    object-fit: contain;
    @apply rounded-full;
  }
}
</style>