
import './assets/styles/tailwind.scss';

import { createApp } from 'vue';
import App from './App.vue';
import { useRouter } from '@/router/router';

const app = createApp(App);

app.use(useRouter());
app.mount('#app');
