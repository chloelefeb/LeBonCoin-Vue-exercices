<script setup>
import axios from 'axios'
import { onMounted, ref } from 'vue'

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
</script>

<template>
  <main>
    <p v-if="offerInfos === null" class="container">Chargement en cours...</p>

    <div v-else class="container">
      <!-- Première colonne -->

      <div class="leftColumn">
        <img :src="offerInfos.attributes.pictures.data[0].attributes.url" alt="firstPicture" />

        <p>{{ offerInfos.attributes.title }}</p>
        <p>{{ offerInfos.attributes.price }} €</p>
        <p>{{ offerInfos.attributes.publishedAt }}</p>

        <h2>Description</h2>

        <p>{{ offerInfos.attributes.description }}</p>
        <font-awesome-icon :icon="['fas', 'map-marker-alt']" />
        <span>Agon-Coutainville (50230)</span>
      </div>

      <!-- Deuxième colonne -->
      <div class="rightColumn">
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
        <button>Acheter</button><button>Message</button>
      </div>
    </div>
  </main>
</template>

<style scoped>
.container {
  display: flex;
  border: 1px solid purple;
}

.leftColumn {
  /* Ajout flex direction */
  display: flex;
  flex-direction: column;
  width: 65%;
  border: 1px solid red;
}

.rightColumn {
  /* Ajout flex direction */
  display: flex;
  flex-direction: column;
  width: 35%;
  border: 1px solid green;
  height: 365px;
  padding: 20px;
  box-shadow: 0 0 5px grey;
}

.rightColumn > div {
  display: flex;
  gap: 10px;
  margin-bottom: 20px;
}

.rightColumn img {
  height: 65px;
  width: 65px;
  border-radius: 50%;
}

.rightColumn > div p {
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
</style>
