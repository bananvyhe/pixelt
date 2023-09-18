// To see this message, add the following to the `<head>` section in your
// views/layouts/application.html.erb
//
//    <%= vite_client_tag %>
//    <%= vite_javascript_tag 'application' %>
console.log('Vite ⚡️ Rails')

// If using a TypeScript entrypoint file:
//     <%= vite_typescript_tag 'application' %>
//
// If you want to use .jsx or .tsx, add the extension:
//     <%= vite_javascript_tag 'application.jsx' %>

console.log('Visit the guide for more information: ', 'https://vite-ruby.netlify.app/guide/rails')

// Example: Load Rails libraries in Vite.
//
// import * as Turbo from '@hotwired/turbo'
// Turbo.start()
//
// import ActiveStorage from '@rails/activestorage'
// ActiveStorage.start()
//
// // Import all channels.
// const channels = import.meta.globEager('./**/*_channel.js')

// Example: Import a stylesheet in app/frontend/index.css
// import '~/index.css'
import { createApp, inject } from 'vue/dist/vue.esm-bundler';
import { createPinia } from 'pinia'
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate'
import App from '../app.vue'
import Notifications from '@kyvg/vue3-notification'
import axios from 'axios'
import VueAxios from 'vue-axios'
import { securedAxiosInstance, plainAxiosInstance } from '../backend/axios'

const customDarkTheme = {
  dark: true,
  colors: {
     background: "#adaada",
    // background: "#15202b",
    // surface: "#15202b",
     
 
    primary: "#3f51b5",
    secondary: "#03dac6",
    error: "#ff5722",
  },
};
import 'vuetify/styles'
import { createVuetify } from 'vuetify'
const vuetify = createVuetify({
  // icons: {
  //   defaultSet: 'mdi',
  //   aliases,
  //   sets: {
  //     mdi,
  //   }
  // },  
theme: {
    defaultTheme: 'customDarkTheme',
    themes: {
      customDarkTheme
    }  	
  }	
});

// const app = createApp({
// data() {
//     return {
//      course: 'Intro to Vue 3 and Rails'
//     }  
//   }  
// })  

const pinia = createPinia()
pinia.use(piniaPluginPersistedstate)
const app = createApp(App);
app.use(pinia)
app.use(VueAxios, {
  secured: securedAxiosInstance,
  plain: plainAxiosInstance
})
app.use(Notifications)
app.provide('plain', app.config.globalProperties.plain) 
app.provide('secured', app.config.globalProperties.secured) 
app.provide('axios', app.config.globalProperties.axios)
app.use(vuetify);
app.mount('#app');
 