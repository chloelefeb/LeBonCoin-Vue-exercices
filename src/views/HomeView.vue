<script setup>
import axios from 'axios'
import { onMounted, ref } from 'vue'

import OfferCard from '../components/OfferCard.vue'

const offersList = ref([])

onMounted(async () => {
  try {
    const { data } = await axios.get(
      'https://site--strapileboncoin--2m8zk47gvydr.code.run/api/offers?populate[0]=pictures&populate[1]=owner.avatar',
    )
    // console.log(data.data)
    offersList.value = data.data
  } catch (error) {
    console.log(error)
  }
})
</script>

<template>
  <main>
    <div class="container">
      <p>Des millions de petites annonces et autant d'occasions de se faire plaisir</p>
      <div>
        <p>C'est le moment de vendre</p>
        <button><font-awesome-icon :icon="['far', 'plus-square']" /> Déposer une annonce</button>
      </div>

      <div class="offersList">
        <OfferCard v-for="offer in offersList" :key="offer.id" :offerInfos="offer" />
      </div>
    </div>
  </main>
</template>

<style scoped>
.offersList {
  border: 1px solid purple;
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
}
</style>
