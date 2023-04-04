import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from '@/renderer/App.vue'
import router from '@/renderer/router'
import vuetify from '@/renderer/plugins/vuetify'
import i18n from '@/renderer/plugins/i18n'

// Add API key defined in contextBridge to window object type
declare global {
  // eslint-disable-next-line no-unused-vars
  interface Window {
    mainApi?: any
  }
}

router.beforeEach(async (to, from, next) => {
  const token = await window.mainApi.send('checkToken');
  if (token !== undefined && token !== null && token.length > 0){
    next();
  } else if (to.path !== '/login') {
    next('/login');
  }else{
    next();
  }
});

const app = createApp(App)

app.use(vuetify).use(i18n).use(router).use(createPinia())

app.mount('#app')
