import './assets/main.css'

import { createApp } from 'vue'
import App from './App.vue'
import router from './router'

import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

import { faSignOutAlt, faSearch, faCircle } from '@fortawesome/free-solid-svg-icons'
import { faUser, faPlusSquare, faHeart } from '@fortawesome/free-regular-svg-icons'

library.add(faSignOutAlt, faUser, faSearch, faPlusSquare, faCircle, faHeart)

const app = createApp(App).component('font-awesome-icon', FontAwesomeIcon)

app.use(router)

app.mount('#app')
