import { createApp } from 'vue'
import Element3 from 'element3'
import 'element3/lib/theme-chalk/index.css'
import NProgress from 'nprogress';
import App from './App.vue'

import router from './router/index'
import store from './store/index'
import focusDirective from './directive/focus';

let app = createApp(App)
    .use(store)
    .use(router)
    .use(Element3)
    .use(focusDirective)

app.mount('#app')


router.beforeEach(async (to, from, next) => {
    //next('/login')
    NProgress.start()
    next()
})

router.afterEach(() => {
    NProgress.done()
})