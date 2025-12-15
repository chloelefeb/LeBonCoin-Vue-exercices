<script setup>
import { RouterLink, useRoute, useRouter } from 'vue-router'
import BtnPublishOffer from './BtnPublishOffer.vue'
import { inject, ref } from 'vue'

const route = useRoute()
const router = useRouter()

const GlobalStore = inject('GlobalStore')
// console.log(GlobalStore.userInfos)

const search = ref('')

const disconnectUser = () => {
  GlobalStore.changeUserInfos(null)
  $cookies.remove('userInfos')
}

const handleSubmit = () => {
  console.log('handleSubmit>>>>>>>>', search.value, route.query)

  const queries = { ...route.query }

  if (search.value) {
    queries.title = search.value
  } else {
    delete queries.title
  }

  queries.page = 1

  router.push({ name: 'home', query: queries })
}
</script>

<template>
  <header>
    <div class="container">
      <!-- Premier bloc -->
      <div class="topBloc">
        <RouterLink :to="{ name: 'home' }"
          ><img src="../assets/logo.svg" alt="Logo leboncoin"
        /></RouterLink>

        <div class="middlePart">
          <BtnPublishOffer />

          <form @submit.prevent="handleSubmit">
            <input
              type="text"
              name="search"
              id="search"
              placeholder="Rechercher sur leboncoin"
              v-model="search"
            />
            <button>
              <font-awesome-icon :icon="['fas', 'search']" />
            </button>
          </form>
        </div>

        <div class="connectionPart">
          <RouterLink :to="{ name: 'login' }" v-if="!GlobalStore.userInfos.value">
            <font-awesome-icon :icon="['far', 'user']" />
            <p>Se connecter</p>
          </RouterLink>

          <div v-else class="disconnectPart">
            <div>
              <font-awesome-icon :icon="['far', 'user']" />
              <p>{{ GlobalStore.userInfos.value.username }}</p>
            </div>
            <font-awesome-icon :icon="['fas', 'sign-out-alt']" @click="disconnectUser" />
          </div>
        </div>
      </div>

      <!-- Deuxième bloc -->
      <div class="bottomBloc">
        <span>Véhicules</span>
        <font-awesome-icon :icon="['fas', 'circle']" />

        <span>Locations de vacances</span>
        <font-awesome-icon :icon="['fas', 'circle']" />

        <span>Emploi</span>
        <font-awesome-icon :icon="['fas', 'circle']" />

        <span>Mode</span>
        <font-awesome-icon :icon="['fas', 'circle']" />

        <span>Maison & Jardin</span>
        <font-awesome-icon :icon="['fas', 'circle']" />

        <span>Famille</span>
        <font-awesome-icon :icon="['fas', 'circle']" />

        <span>Electronique</span>
        <font-awesome-icon :icon="['fas', 'circle']" />

        <span>Loisirs</span>
        <font-awesome-icon :icon="['fas', 'circle']" />

        <span>Autres</span>
      </div>
    </div>
  </header>
</template>

<style setup>
header {
  height: var(--height-header);
  position: fixed;
  top: 0;
  width: 100%;
  background-color: white;
  border-bottom: var(--dark-grey) 1px solid;
}

.container > div {
  display: flex;
}
/* ----------Top Bloc----------- */

.topBloc {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px 0;
}

.middlePart {
  display: flex;
  gap: 20px;
  align-items: center;
}

.middlePart > form {
  background-color: var(--light-grey);
  padding: 7px;
  border-radius: 10px;
  display: flex;
  align-items: center;
}

.middlePart > form svg {
  background-color: var(--orange);
  padding: 7px;
  border-radius: 5px;
  box-sizing: content-box;
}

.middlePart > form button {
  background-color: #ffffff00;
  border: none;
  cursor: pointer;
}

input {
  width: 250px;
  border: none;
  background-color: var(--light-grey);
}

input:focus {
  outline: none;
}

input::placeholder {
  color: black;
}

.connectionPart > a {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;
  font-size: 12px;
}

.connectionPart svg {
  font-size: 18px;
}

img {
  width: 140px;
}

.disconnectPart {
  display: flex;
  align-items: center;
  gap: 20px;
}

.disconnectPart > div {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;
}

/* --------Bottom Bloc----------- */

.bottomBloc {
  margin-top: 10px;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.bottomBloc svg {
  font-size: 3px;
}

.bottomBloc span {
  font-size: 14px;
}
</style>
