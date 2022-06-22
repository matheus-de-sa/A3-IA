import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import readFile from './utils/readFile'
import Loader from './components/Loader'
import emitterPlugin from './utils/emitter'

const app = createApp(App)

app.use(emitterPlugin)

app.mixin({
    components: {
        Loader
    },
    methods: {
        readFile,
    }
})

app.use(router)

app.mount('#app')
