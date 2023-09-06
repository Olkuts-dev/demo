
import './assets/styles/tailwind.scss';

import { createApp } from 'vue';
import App from './App.vue';
import { Vue3Mq } from "vue3-mq";
import { createPinia } from 'pinia';
import { useRouter } from '@/router/router';

const app = createApp(App);

app.use(useRouter());
app.use(Vue3Mq, {
  preset: 'devices'
});
app.use(createPinia());
app.mount('#app');
