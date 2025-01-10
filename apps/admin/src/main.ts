import { createApp } from 'vue'
import './style.css'
import App from './App.vue'

// import ProContainer from './components/ProContainer';

import router from './router'
import './permission'

// createApp(App).use(router).mount('#app')

const app = createApp(App)

app.use(router)

// app.component('pro-container', ProContainer)
router.isReady().then(() => {
    app.mount("#app")
})
