
import './assets/styles/tailwind.scss';

import { createApp } from 'vue';
import App from './App.vue';
import { createPinia } from 'pinia';
import { useRouter } from '@/router/router';

const app = createApp(App);

app.use(useRouter());
const pinia = 
app.use(createPinia());
app.mount('#app');
