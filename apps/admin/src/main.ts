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
    registerServiceWorker()
    app.mount("#app")
})

async function registerServiceWorker() {
    if ('serviceWorker' in navigator) {
        try {
            // 将配置转换为 URL 参数
            // const configParams = new URLSearchParams({
            //     config: JSON.stringify(mockConfig)
            // }).toString();

            const registration = await navigator.serviceWorker.register(new URL(`./mockServiceWorker.js`, import.meta.url));

            console.log('Mock Service Worker registered:', registration.scope);

            setInterval(() => {
                console.log('665+')
                registration.update(); // 强制检查更新
            }, 5000);
            if (navigator.serviceWorker.controller) {
                console.log('Service Worker 已激活');
            }

            registration.addEventListener('updatefound', () => {
                console.log('发现新版本updatefound');
                const newWorker = registration?.installing;
                if (newWorker) {
                    newWorker.addEventListener('statechange', () => {
                        if (newWorker.state === 'activated' && navigator.serviceWorker.controller) {
                            // callback && callback({ type: 'update', data: true });
                            console.log(newWorker)
                        }
                    });
                }
            });
            // 监听控制器变化
            navigator.serviceWorker.addEventListener('controllerchange', () => {
                console.log('Service Worker 控制器已变更');
            });
        } catch (error) {
            console.error('Mock Service Worker registration failed:', error);
        }
    }
}

