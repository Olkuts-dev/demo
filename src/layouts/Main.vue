<script setup lang='ts'>
  import Button from '@components/Button.vue';
  import ReadyIcon from '@assets/icons/ready.svg';
  
  import { useMq } from "vue3-mq";

  const mq = useMq();

  const skills = ['Vue.js', 'TypeScript', 'Vuex / Pinia', 'Git', 'HTML', 'CSS', 'SCSS', 'WebSocket', 'RestApi', 'SSR', 'Tailwind / Vuetify / Bootstrap', 'Nuxt', 'NodeJS'];
</script>

<template>
  <div class="wrapper" :class="mq.current">
    <div class="box general " >
      <div class="mask-avatar">
        <img src="/src/assets/my-photo.jpg">
      </div>
      <div class="paragraph">
        <p class="title">
          Olga Kutskova
        </p>
        <p class="subtitle">
          ... and the snowman
        </p>
        <div class="divider" />
        <p class="subtitle email">olkuts.dev@gmail.com</p>
        <a href="https://hh.ru/resume/f8071738ff064777eb0039ed1f3177684d6571" target="_blank">
          <Button
            preset="primary"
            text="My CV"
            class="w-1/2 mx-auto mt-5"
          />
        </a>
      </div>
    </div>
    <div class="box about">
      <p class="text-ra-white font-semibold text-3xl">
        About me
      </p>
      <p class="inline-flex items-center gap-2 text-green-600 pt-3">
        <ReadyIcon class="icon" />
        Open to work
      </p>
      <p class="text-ra-white/70 mt-4">
        I'm a frontend-developer with 4+ years of experience on Vue.js (v2/v3). This page was made to introduce a few of my components.
      </p>
      <p class="text-ra-white/70 mt-4">
        Born and raised in Kaliningrad. When I'm not busy coding, you'll likely find me playing computer or board games, spending time with my cats or camping with my friends outside the city.
      </p>
    </div>
    <div class="box additional">
      <p class="text-ra-white/70 text-xl">
        Skills
      </p>
      <div class="flex flex-wrap gap-2 mt-3">
        <template v-for="item in skills" :key="item">
          <div class="skill">
            {{ item }}
          </div>
        </template>
      </div>

      <p class="text-ra-white/70 text-xl mt-3">
        Where you can find me?
      </p>

      <p class="text-ra-white/50 font-normal mt-4">
        Telegram: 
        <span class="font-bold text-ra-white/70">
          @olkuts_dev
        </span>
        <br>
        E-mail: 
        <span class="font-bold text-ra-white/70">
          olkuts.dev@gmail.com
        </span>
      </p>
    </div>
  </div>
</template>

<style lang='scss' scoped>
.wrapper {
  min-width: 150px;
  max-width: 1000px;
  @apply m-auto;
  @apply p-2;
  @apply grid;
  grid-gap: 8px;
  
  &.laptop,
  &.desktop {
    grid-gap: 20px;
    @apply p-5;
    @apply grid grid-cols-2 grid-rows-2;

    .general {
      grid-column: 1;
      grid-row: 1 / 3 ;
    }

    .about {
      grid-column: 2 ;
      grid-row: 1;
    }

    .additional {
      grid-column: 2 ;
      grid-row: 2;
    }

    .box {
      @apply p-8;
    }
  }
  .box {
    @apply bg-ra-dark-grey;
    @apply p-3;
    @apply rounded-xl;
  }
  .general {
    .mask-avatar {
      @apply mx-auto;
      width: auto;
      max-width: 500px;
      @apply aspect-square;
      mask-image: url('/src/assets/icons/shape.svg');
      
      mask-repeat: no-repeat;
    }
    
    .title {
      @apply text-ra-white;
      @apply text-center;
      @apply flex-1;
      @apply text-3xl font-semibold; 
    }
    .subtitle {
      @apply text-ra-white/70;
      @apply text-center;
      &.email {
        @apply text-ra-white/50 text-sm;
      }
    }
    .divider {
      @apply w-full;
      @apply h-0.5;
      @apply my-8;
      @apply bg-ra-primary-hover/70;
      &.small {
        @apply w-1/2;
        @apply mx-auto;
        @apply my-4;
        @apply bg-ra-middle-grey;
      }
    }
  }
  .about {
    .icon {
      @apply fill-green-600;
      @apply aspect-square;
      @apply p-1;
      @apply w-6;
      @apply rounded-full;
      @apply border border-green-600;
    }
  }
  .additional {
    .skill {
      @apply text-ra-white/50;
      @apply bg-ra-middle-grey;
      @apply px-2 py-1;
      @apply rounded-full;
    }
  }
}
</style>