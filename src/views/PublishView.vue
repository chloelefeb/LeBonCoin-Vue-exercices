<script setup>
import { ref, inject, computed } from 'vue'
import axios from 'axios'
import { useRouter } from 'vue-router'

const GlobalStore = inject('GlobalStore')

const router = useRouter()

const title = ref('')
const description = ref('')
const price = ref(null)
const pictures = ref(null)
const errorMessage = ref('')
const isCreating = ref(false)

const handleSubmit = async () => {
  try {
    isCreating.value = true
    if (title.value && description.value && price.value && pictures.value) {
      const formData = new FormData()

      for (const key in pictures.value) {
        if (Object.hasOwnProperty.call(pictures.value, key)) {
          formData.append('files.pictures', pictures.value[key])
        }
      }

      const stringifiedInfos = JSON.stringify({
        title: title.value,
        description: description.value,
        price: price.value,
        owner: GlobalStore.userInfos.value.id,
      })

      formData.append('data', stringifiedInfos)

      const { data } = await axios.post(
        'https://site--strapileboncoin--2m8zk47gvydr.code.run/api/offers',
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
            Authorization: `Bearer ${GlobalStore.userInfos.value.token}`,
          },
        },
      )
      console.log('data>>>>>>>', data)
      router.push({ name: 'offer', params: { id: data.data.id } })
    } else {
      errorMessage.value = 'Veuillez remplir tous les champs'
    }
  } catch (error) {
    console.log(error)
  }
  isCreating.value = false
}

const imagesPreview = computed(() => {
  const tab = []

  for (const key in pictures.value) {
    if (Object.hasOwnProperty.call(pictures.value, key)) {
      tab.push(URL.createObjectURL(pictures.value[key]))
    }
  }
  return tab
})

const selectPictures = (event) => {
  errorMessage.value = ''

  const numOfFiles = event.target.files.length

  if (numOfFiles <= 10) {
    pictures.value = event.target.files
  } else {
    errorMessage.value = '10 photos maximum'
  }
}
</script>

<template>
  <main>
    <div class="container">
      <h1>Déposer une annonce</h1>

      <form @submit.prevent="handleSubmit">
        <label for="title">Titre de l'annonce</label
        ><input
          type="text"
          name="title"
          id="title"
          v-model="title"
          @input="() => (errorMessage = '')"
        />
        <p>Vous n'avez pas besoin de mentionner « Achat » ou « Vente » ici.</p>

        <label for="description">Description de l'annonce</label>
        <textarea
          name="description"
          id="description"
          cols="30"
          rows="10"
          v-model="description"
          @input="() => (errorMessage = '')"
        ></textarea>
        <p>
          Nous vous rappelons que la vente de contrefaçons est interdite. Nous vous invitons à
          ajouter tout élément permettant de prouver l'authenticité de votre article: numéro de
          série, facture, certificat, inscription de la marque sur l'article, emballage etc.
          Indiquez dans le texte de l'annonce si vous proposez un droit de rétractation à
          l'acheteur. En l'absence de toute mention, l'acheteur n'en bénéficiera pas et ne pourra
          pas demander le remboursement ou l'échange du bien ou service proposé
        </p>

        <label for="price">Votre prix de vente</label>
        <div class="priceBloc">
          <input
            type="number"
            name="price"
            id="price"
            v-model="price"
            @input="() => (errorMessage = '')"
          />
          <p>€</p>
        </div>

        <label class="fileInput" for="pictures">
          <font-awesome-icon :icon="['fas', 'camera']" />
          <span>Sélectionner jusqu'à 10 photos</span>
        </label>
        <input type="file" name="pictures" id="pictures" multiple @input="selectPictures" />

        <div class="previews">
          <img v-for="url in imagesPreview" :src="url" alt="Preview Images" />
        </div>

        <p v-if="isCreating">Création en cours ...</p>
        <button v-else>Déposer mon annonce</button>

        <p v-if="errorMessage" class="errorMessage">{{ errorMessage }}</p>
      </form>
    </div>
  </main>
</template>

<style scoped>
main {
  background-color: var(--light-grey);
  padding: 40px 0;
}

.container {
  background-color: white;
  padding: 20px;
  border-radius: 20px;
}

h1 {
  font-size: 22px;
  font-weight: bold;
  margin-bottom: 40px;
}

form {
  /* width: 770px; */
  display: flex;
  flex-direction: column;
}

label {
  margin: 30px 0 10px 0;
}

p {
  font-size: 12px;
  width: 770px;
  color: var(--dark-grey);
  margin-top: 5px;
}

.container input,
textarea {
  border: 1px solid var(--dark-grey);
  border-radius: 15px;
  width: 770px;
}

.container input[type='text'] {
  height: 45px;
}

/* Price Bloc ------------ */
.priceBloc {
  height: 45px;
  display: flex;
  align-items: center;
  margin-bottom: 30px;
}

.priceBloc input {
  width: 190px;
  height: 100%;
  border: 1px solid var(--dark-grey);
  border-radius: 15px 0 0 15px;
}

/* Chrome, Safari, Edge, Opera */
input::-webkit-outer-spin-button,
input::-webkit-inner-spin-button {
  -webkit-appearance: none;
  margin: 0;
}

/* Firefox */
/* input[type='number'] {
  -moz-appearance: textfield;
} */

.priceBloc p {
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 0;
  font-size: 16px;
  width: 45px;
  height: 100%;
  border: 1px solid var(--dark-grey);
  border-left: none;
  border-radius: 0 15px 15px 0;
}

/* Input Files ------------- */
input[type='file'] {
  display: none;
}

.fileInput {
  border: 1px solid var(--dark-blue);
  border-radius: 15px;
  width: 150px;
  height: 150px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 10px;
  padding: 10px;
  color: var(--dark-blue);
  cursor: pointer;
}

.fileInput svg {
  font-size: 34px;
}

.fileInput span {
  text-align: center;
}

button {
  color: white;
  background-color: var(--orange);
  border-radius: 15px;
  padding: 10px 15px;
  border: none;
  align-self: flex-end;
  margin-top: 40px;
}

/* Previews IMG --------------- */
.previews {
  display: flex;
  flex-wrap: wrap;
  /* border: 1px solid red; */
  gap: 10px;
}

.previews img {
  border-radius: 10px;
  object-fit: cover;
  width: calc((100% - 40px) / 5);
  aspect-ratio: 1/1;
}

/* Error Message ---------- */
.errorMessage {
  font-size: 16px;
  color: var(--orange);
  text-align: center;
}
</style>
