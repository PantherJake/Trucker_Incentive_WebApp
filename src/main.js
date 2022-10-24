import { createApp } from "vue";
import App from './App.vue';
import router from './router';

import Amplify from 'aws-amplify';
import awsConfig from '@/aws-exports';

import {
    applyPolyfills,
    defineCustomElements,
} from '@aws-amplify/ui-components/loader';

applyPolyfills().then(() => {
    defineCustomElements(window)
});
Amplify.configure(awsConfig)

createApp(App).use(router).mount('#app')
