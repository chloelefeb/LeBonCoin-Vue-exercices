<script setup>
import axios from 'axios'
import { onMounted, ref, watchEffect } from 'vue'

import OfferCard from '../components/OfferCard.vue'
import TimeToSell from '../components/TimeToSell.vue'
import Filters from '../components/Filters.vue'

const props = defineProps(['sort', 'pricemin', 'pricemax'])

const offersList = ref([])

onMounted(async () => {
  watchEffect(async () => {
    try {
      let priceFilters = ''

      if (props.pricemax) {
        priceFilters += `&filters[price][$lte]=${props.pricemax}`
      }

      if (props.pricemin) {
        priceFilters += `&filters[price][$gte]=${props.pricemin}`
      }

      const { data } = await axios.get(
        `https://site--strapileboncoin--2m8zk47gvydr.code.run/api/offers?populate[0]=pictures&populate[1]=owner.avatar${priceFilters}&sort=${props.sort}`,
      )

      offersList.value = data.data
    } catch (error) {
      console.log(error)
    }
  })
})
</script>

<template>
  <main>
    <p v-if="offersList.length === 0" class="container">Chargement en cours ...</p>
    <div v-else class="container">
      <Filters :sort="sort" :pricemin="pricemin" :pricemax="pricemax" />

      <p>Des millions de petites annonces et autant d'occasions de se faire plaisir</p>
      <TimeToSell />

      <div class="offersList">
        <OfferCard v-for="offer in offersList" :key="offer.id" :offerInfos="offer" />
      </div>
    </div>
  </main>
</template>

<style scoped>
main {
  min-height: calc(100vh - var(--height-header) - var(--height-footer));
}

.container {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 50px 0;
}

.container > p {
  font-size: 24px;
  font-weight: bold;
  margin-bottom: 50px;
}
.offersList {
  /* border: 1px solid purple; */
  display: flex;
  flex-wrap: wrap;
  gap: 30px 15px;
}
</style>
