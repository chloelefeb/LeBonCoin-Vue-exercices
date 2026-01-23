<script setup>
import axios from 'axios'
import { onMounted, ref, watchEffect } from 'vue'

import OfferCard from '../components/OfferCard.vue'
import TimeToSell from '../components/TimeToSell.vue'
import Filters from '../components/Filters.vue'
import Pagination from '../components/Pagination.vue'

const props = defineProps(['sort', 'pricemin', 'pricemax', 'title', 'page'])

const offersList = ref()
const numOfPages = ref(1)

onMounted(() => {
  watchEffect(async () => {
    try {
      let priceFilters = ''

      if (props.pricemax) {
        priceFilters += `&filters[price][$lte]=${props.pricemax}`
      }

      if (props.pricemin) {
        priceFilters += `&filters[price][$gte]=${props.pricemin}`
      }

      //Reacteur
      // const { data } = await axios.get(
      //   `https://site--strapileboncoin--2m8zk47gvydr.code.run/api/offers?populate[0]=pictures&populate[1]=owner.avatar${priceFilters}&sort=${props.sort}&filters[title][$containsi]=${props.title}&pagination[page]=${props.page}&pagination[pageSize]=10`,
      // )

      // Essaie local
      // const { data } = await axios.get(
      //   `http://localhost:1337/api/offers?populate[0]=pictures&populate[1]=owner.avatar${priceFilters}&sort=${props.sort}&filters[title][$containsi]=${props.title}&pagination[page]=${props.page}&pagination[pageSize]=10`,
      // )

      //Backend Northflank
      const { data } = await axios.get(
        `https://site--strapi-backend-leboncoin--sdpbxrgw6422.code.run/api/offers?populate[0]=pictures&populate[1]=owner.avatar${priceFilters}&sort=${props.sort}&filters[title][$containsi]=${props.title}&pagination[page]=${props.page}&pagination[pageSize]=10`,
      )

      // Pour vérifer les informations reçues
      // console.log('HomeView - data >>>', data.meta.pagination.pageCount)

      offersList.value = data.data
      numOfPages.value = data.meta.pagination.pageCount
    } catch (error) {
      console.log(error)
    }
  })
})
</script>

<template>
  <main>
    <p v-if="offersList === undefined" class="container">Chargement en cours ...</p>
    <div v-else class="container">
      <Filters :sort="sort" :pricemin="pricemin" :pricemax="pricemax" :title="title" :page="page" />

      <p>Des millions de petites annonces et autant d'occasions de se faire plaisir</p>
      <TimeToSell />

      <div class="offersList">
        <OfferCard v-for="offer in offersList" :key="offer.id" :offerInfos="offer" />
      </div>

      <Pagination
        :sort="sort"
        :pricemin="pricemin"
        :pricemax="pricemax"
        :title="title"
        :page="page"
        :numOfPages="numOfPages"
      />
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
  /* justify-content: center; */
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
  width: 100%;
  display: flex;
  flex-wrap: wrap;
  gap: 30px 15px;
}
</style>
