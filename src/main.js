import { createApp } from "vue";
import App from './App.vue'
import router from './router'

// import Amplify, * as AmplifyModules from 'aws-amplify'
// import { AmplifyPlugin } from 'aws-amplify-vue'
// import awsmobile from "./aws-exports";
//
// Amplify.configure(awsmobile)
createApp(App).use(router).mount('#app')
