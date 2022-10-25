import { createApp } from "vue";
import App from './App.vue';
import router from './router';

import Amplify from 'aws-amplify';
import awsconfig from '@/aws-exports';

import {
    applyPolyfills,
    defineCustomElements,
} from '@aws-amplify/ui-components/loader';

applyPolyfills().then(() => {
    defineCustomElements(window)
});
Amplify.configure(awsconfig)

createApp(App).use(router).mount('#app')
