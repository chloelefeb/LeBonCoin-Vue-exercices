<script setup>
import axios from 'axios'
import { onMounted, ref, inject, computed } from 'vue'
import { useRouter } from 'vue-router'

import BtnPublishOffer from '../components/BtnPublishOffer.vue'

const GlobalStore = inject('GlobalStore')
const router = useRouter()

const userInfos = ref(null)

onMounted(async () => {
  try {
    // const { data } = await axios.get('https://site--strapileboncoin--2m8zk47gvydr.code.run/api/users/me?populate[0]=offers&populate[1]=offers.pictures&populate[2]=avatar', {
    //       headers: {
    //         Authorization: `Bearer ${GlobalStore.userInfos.value.token}`,
    //       },
    //     })

    //Essai local
    // const { data } = await axios.get(
    //   'http://localhost:1337/api/users/me?populate[0]=offers&populate[1]=offers.pictures&populate[2]=avatar',
    //   {
    //     headers: {
    //       Authorization: `Bearer ${GlobalStore.userInfos.value.token}`,
    //     },
    //   },
    // )

    // Backend Northflank
    const { data } = await axios.get(
      'https://site--strapi-backend-leboncoin--sdpbxrgw6422.code.run/api/users/me?populate[0]=offers&populate[1]=offers.pictures&populate[2]=avatar',
      {
        headers: {
          Authorization: `Bearer ${GlobalStore.userInfos.value.token}`,
        },
      },
    )

    console.log('data>>>>', data)

    userInfos.value = data
  } catch (error) {
    console.log(error)
  }
})

const totalOffers = computed(() => {
  const numOfOffers = userInfos.value.offers.length

  if (numOfOffers === 1) {
    return '1 annonce'
  } else {
    return `${numOfOffers} annonces`
  }
})

const deleteOffer = async (id) => {
  try {
    // const { data } = await axios.delete(`https://site--strapileboncoin--2m8zk47gvydr.code.run/api/offers/${id}`, {
    //       headers: {
    //         Authorization: `Bearer ${GlobalStore.userInfos.value.token}`,
    //       },
    //     })

    // Essai local
    // const { data } = await axios.delete(`http://localhost:1337/api/offers/${id}`, {
    //   headers: {
    //     Authorization: `Bearer ${GlobalStore.userInfos.value.token}`,
    //   },
    // })

    // Backend Northflank
    const { data } = await axios.delete(
      `https://site--strapi-backend-leboncoin--sdpbxrgw6422.code.run/api/offers/${id}`,
      {
        headers: {
          Authorization: `Bearer ${GlobalStore.userInfos.value.token}`,
        },
      },
    )

    console.log('response delete>>>>', data)
    router.go()
  } catch (error) {
    console.log(error)
  }
}
</script>

<template>
  <main>
    <p v-if="!userInfos" class="container">Chargement en cours ...</p>
    <div v-else class="container">
      <div class="userInfos">
        <img :src="userInfos.avatar.url" alt="" v-if="userInfos.avatar" />
        <div v-else class="firstLetter">
          <p>{{ userInfos.username[0] }}</p>
        </div>
        <div>
          <h1>{{ userInfos.username }}</h1>
          <p>{{ userInfos.email }}</p>
        </div>
      </div>

      <div class="noOffer" v-if="userInfos.offers.length === 0">
        <h3>Vous n'avez aucune annonce en ligne</h3>
        <BtnPublishOffer />
      </div>

      <div v-else class="totalAndOffers">
        <h3>{{ totalOffers }}</h3>

        <div class="offersBloc">
          <div v-for="offer in userInfos.offers" :key="offer.id">
            <img :src="offer.pictures[0].url" alt="" />
            <h2>{{ offer.title }}</h2>
            <p>{{ offer.price }} €</p>
            <font-awesome-icon :icon="['fas', 'trash']" @click="deleteOffer(offer.id)" />
          </div>
        </div>
      </div>
    </div>
  </main>
</template>

<style scoper>
main {
  min-height: calc(100vh - var(--height-header) - var(--height-footer));
}

h1 {
  font-weight: bold;
  font-size: 24px;
  margin-bottom: 10px;
}

h3 {
  font-weight: bold;
  font-size: 18px;
}

.userInfos {
  margin-top: 40px;
  border: 1px solid var(--dark-grey);
  border-radius: 15px;
  padding: 15px;
  display: flex;
  gap: 10px;
  flex-direction: row;
  align-items: center;
  margin-bottom: 40px;
}

.firstLetter {
  background-color: var(--dark-grey);
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 50%;
  width: 100px;
  height: 100px;
  font-size: 40px;
  color: white;
}

.totalAndOffers {
  display: flex;
  flex-direction: column;
  /* border: 1px solid green; */
}

.offersBloc {
  /* border: 1px solid red; */
  display: flex;
  flex-direction: column;
  gap: 15px;
  margin-top: 20px;
}

.offersBloc > div {
  display: flex;
  align-items: center;
  /* border: 1px solid green; */
  box-shadow: 0 0 7px var(--med-grey);
  border-radius: 10px;
  padding: 15px;
  height: 150px;
}

.offersBloc img {
  height: 100%;
  aspect-ratio: 1 / 1;
  object-fit: cover;
  border-radius: 10px;
  margin-right: 20px;
}

.offersBloc h2 {
  flex: 2;
  font-weight: bold;
  font-size: 22px;
}

.offersBloc p {
  flex: 1;
  color: var(--brown);
  font-weight: bold;
  font-size: 18px;
}

.offersBloc svg {
  color: var(--orange);
}

.noOffer {
  /* border: 1px red solid; */
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;
}
</style>
