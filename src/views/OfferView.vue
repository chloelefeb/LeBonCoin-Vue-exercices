<script setup>
import axios from 'axios'
import { onMounted, ref, computed } from 'vue'
import { useCycleList } from '@vueuse/core'

const props = defineProps({ id: String })

const offerInfos = ref(null)

onMounted(async () => {
  try {
    const { data } = await axios.get(
      `https://site--strapileboncoin--2m8zk47gvydr.code.run/api/offers/${props.id}?populate[0]=pictures&populate[1]=owner.avatar`,
    )

    console.log(
      'Response offerview >>>',
      data.data.attributes.owner.data.attributes.avatar.data.attributes.url,
    )

    offerInfos.value = data.data
  } catch (error) {
    console.log('catch offerView >>>>>', error)
  }
})

const formatedDate = computed(() => {
  return offerInfos.value.attributes.publishedAt.split('T')[0].split('-').reverse().join('/')
})

const cycleList = computed(() => {
  if (offerInfos.value.attributes.pictures.data) {
    const { state, next, prev } = useCycleList(offerInfos.value.attributes.pictures.data)

    return { state, next, prev }
  } else {
    return {}
  }
})
</script>

<template>
  <main>
    <p v-if="offerInfos === null" class="container">Chargement en cours...</p>

    <div v-else class="container">
      <!-- Première colonne -->

      <div class="leftColumn">
        <div class="caroussel">
          <font-awesome-icon
            :icon="['fas', 'angle-left']"
            @click="cycleList.prev()"
            v-if="offerInfos.attributes.pictures.data?.length > 1"
          /><img :src="cycleList.state.value.attributes.url" alt="Pictures" /><font-awesome-icon
            :icon="['fas', 'angle-right']"
            @click="cycleList.next()"
            v-if="offerInfos.attributes.pictures.data?.length > 1"
          />
        </div>

        <p class="title">{{ offerInfos.attributes.title }}</p>
        <p class="price">{{ offerInfos.attributes.price }} €</p>
        <p class="date">{{ formatedDate }}</p>

        <h2>Description</h2>

        <p>{{ offerInfos.attributes.description }}</p>
        <div class="location">
          <font-awesome-icon :icon="['fas', 'map-marker-alt']" />
          <p>Agon-Coutainville (50230)</p>
        </div>
      </div>

      <!-- Deuxième colonne -->
      <div class="rightColumn">
        <div class="owner">
          <div>
            <img
              :src="offerInfos.attributes.owner.data.attributes.avatar.data.attributes.url"
              alt="Avatar"
            />
            <p>{{ offerInfos.attributes.owner.data.attributes.username }}</p>
          </div>

          <p class="identity">
            <font-awesome-icon :icon="['fas', 'check-double']" />Pièce d'identité vérifiée
          </p>
          <p><font-awesome-icon :icon="['far', 'clock']" />Répond généralement en 1 heure</p>
        </div>

        <div class="btnPart">
          <button>Acheter</button>
          <button>Message</button>
        </div>
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
  gap: 20px;
  /* border: 1px solid purple; */
}

/* -----------Left Column------------ */

.leftColumn {
  /* Ajout flex direction */
  display: flex;
  flex-direction: column;
  width: 65%;
  /* border: 1px solid red; */
}

.leftColumn img {
  width: 100%;
  height: 350px;
  object-fit: contain;
  margin-bottom: 40px;
}

.caroussel {
  display: flex;
  align-items: center;
}

.caroussel svg {
  font-size: 18px;
  cursor: pointer;
}

.title {
  font-weight: bold;
  font-size: 24px;
  margin-bottom: 20px;
}

.price {
  font-weight: bold;
  font-size: 18px;
  margin-bottom: 20px;
}

.date {
  font-size: 12px;
  color: var(--dark-grey);
  margin-bottom: 50px;
}

h2 {
  font-weight: bold;
  font-size: 18px;
  padding-top: 20px;
  margin-bottom: 20px;
  border-top: 1px solid var(--light-grey);
}

h2 + p {
  padding-bottom: 50px;
  border-bottom: 1px solid var(--light-grey);
  margin-bottom: 20px;
}

.location {
  display: flex;
  gap: 5px;
}
/* -------Right Column--------- */

.rightColumn {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  width: 35%;
  /* border: 1px solid green; */
  height: 365px;
  padding: 20px;
  box-shadow: 0 0 5px grey;
}

.owner > div {
  display: flex;
  gap: 10px;
  margin-bottom: 20px;
}

.owner img {
  height: 65px;
  width: 65px;
  border-radius: 50%;
}

.owner > div p {
  font-size: 18px;
  font-weight: bold;
  text-transform: uppercase;
}

.identity {
  color: var(--brown);
  background-color: var(--beige);
  font-size: 12px;
  padding: 5px;
  border-radius: 10px;
  width: fit-content;
  margin-bottom: 20px;
}

.identity + p {
  font-size: 14px;
}

.btnPart {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

button {
  background-color: var(--orange);
  border: none;
  color: white;
  font-weight: bold;
  border-radius: 15px;
  padding: 15px 0;
  font-size: inherit;
}

button:last-child {
  background-color: var(--dark-blue);
}
</style>
