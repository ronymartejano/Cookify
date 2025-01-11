//import './assets/main.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'

// Vuetify
import '@mdi/font/css/materialdesignicons.css' // Ensure you are using css-loader
import 'vuetify/styles'
import { createVuetify } from 'vuetify'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'

import App from './App.vue'
import router from './router'

const app = createApp(App)

const vuetify = createVuetify({
  icons: {
    defaultSet: 'mdi', // This is already the default value - only for display purposes
  },
  components,
  directives,
})

app.use(createPinia())
app.use(router)
app.use(vuetify)
app.mount('#app')


router.beforeEach((to, from, next) => {
  // Show the loader
  const loader = document.getElementById('loader');
  if (loader) {
    loader.classList.remove('hidden', 'fade-out');
  }
  next();
});

router.afterEach(() => {
  // Hide the loader with a delay
  setTimeout(() => {
    const loader = document.getElementById('loader');
    if (loader) {
      loader.classList.add('fade-out');
      loader.addEventListener('animationend', () => {
        loader.classList.add('hidden');
      });
    }
  }, 5000); // Adjust delay if necessary
});