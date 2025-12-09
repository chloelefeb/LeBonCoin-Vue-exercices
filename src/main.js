import './assets/main.css'

import { createApp, ref } from 'vue'
import App from './App.vue'
import router from './router'
import VueCookies from 'vue-cookies'

import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

import {
  faSignOutAlt,
  faSearch,
  faCircle,
  faMapMarkerAlt,
  faCheckDouble,
  faAngleLeft,
  faAngleRight,
  faArrowRight,
} from '@fortawesome/free-solid-svg-icons'
import {
  faUser,
  faPlusSquare,
  faHeart,
  faClock,
  faEyeSlash,
  faEye,
} from '@fortawesome/free-regular-svg-icons'

library.add(
  faSignOutAlt,
  faUser,
  faSearch,
  faPlusSquare,
  faCircle,
  faHeart,
  faMapMarkerAlt,
  faCheckDouble,
  faClock,
  faAngleLeft,
  faAngleRight,
  faArrowRight,
  faEyeSlash,
  faEye,
)

const app = createApp(App).component('font-awesome-icon', FontAwesomeIcon)

app.use(router)
app.use(VueCookies)

const userInfos = ref($cookies.get('userInfos') || null)

const changeUserInfos = (infos) => {
  userInfos.value = infos
}

app.provide('GlobalStore', { userInfos: userInfos, changeUserInfos: changeUserInfos })

app.mount('#app')
