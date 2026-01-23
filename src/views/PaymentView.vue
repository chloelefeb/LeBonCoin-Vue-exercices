<script setup>
import { onMounted, ref, computed, onBeforeMount, inject } from 'vue'
import axios from 'axios'
import { useRouter } from 'vue-router'
import { loadStripe } from '@stripe/stripe-js'

const GlobalStore = inject('GlobalStore')

const router = useRouter()

const stripePromise = loadStripe(
  'pk_test_51Sp6MkFBF92n8mlkfiigavlq1ekHVdcaFgcgCcmUsK2D6Oo02QhLDGrfMdUwlKB2qovuE3bBJUEtI2T0t5fcmCOy00Sbc3wERH',
)
const props = defineProps({ id: String })

const isLoading = ref(true)
const offerInfos = ref(null)
const option = ref('faceToFace')
const cardElement = ref(null)
const isProcessing = ref(false)

const firstname = ref('')
const lastname = ref('')
const phone = ref('')
const errorMessage = ref('')

onBeforeMount(async () => {
  const stripe = await stripePromise

  const elements = stripe.elements()

  cardElement.value = elements.create('card')

  cardElement.value.mount('#card-element')
})

onMounted(async () => {
  try {
    // const { data } = await axios.get(
    //   `https://site--strapileboncoin--2m8zk47gvydr.code.run/api/offers/${props.id}?populate[0]=pictures`,
    // )

    // Essai local
    // const { data } = await axios.get(
    //   `http://localhost:1337/api/offers/${props.id}?populate[0]=pictures`,
    // )

    // Backend NorthFlank
    const { data } = await axios.get(
      `https://site--strapi-backend-leboncoin--sdpbxrgw6422.code.run/api/offers/${props.id}?populate[0]=pictures`,
    )

    console.log('data>>>>>>', data)
    offerInfos.value = data.data
  } catch (error) {
    console.log(error)
  }
  isLoading.value = false
})

const total = computed(() => {
  let optionPrice = 0
  if (option.value === 'delivery') {
    optionPrice = 15.6
  }
  return 0.99 + optionPrice + offerInfos.value.attributes.price
})

const handlePayment = async () => {
  if (!firstname.value || !lastname.value) {
    return (errorMessage.value = 'Votre nom et prénom sont obligatoires')
  }
  isProcessing.value = true
  try {
    const stripe = await stripePromise

    const { token } = await stripe.createToken(cardElement.value)

    const stripeToken = token.id

    // const { data } = await axios.post(
    //   'https://site--strapileboncoin--2m8zk47gvydr.code.run/api/offers/buy',
    //   {
    //     token: stripeToken,
    //     amount: total.value,
    //     title: offerInfos.value.attributes.title,
    //   },
    //   {
    //     headers: {
    //       Authorization: `Bearer ${GlobalStore.userInfos.value.token}`,
    //     },
    //   },
    // )

    // Essaie local
    // const { data } = await axios.post(
    //   'http://localhost:1337/api/offers/buy',
    //   {
    //     token: stripeToken,
    //     amount: total.value,
    //     title: offerInfos.value.attributes.title,
    //   },
    //   {
    //     headers: {
    //       Authorization: `Bearer ${GlobalStore.userInfos.value.token}`,
    //     },
    //   },
    // )

    const { data } = await axios.post(
      'https://site--strapi-backend-leboncoin--sdpbxrgw6422.code.run/api/offers/buy',
      {
        token: stripeToken,
        amount: total.value,
        title: offerInfos.value.attributes.title,
      },
      {
        headers: {
          Authorization: `Bearer ${GlobalStore.userInfos.value.token}`,
        },
      },
    )

    console.log('data - payment>>>>>>>', data)

    if (data.status === 'succeeded') {
      alert(
        `Paiement de ${total.value} € validé pour l'achat du produit ${offerInfos.value.attributes.title} par ${firstname.value} ${lastname.value}`,
      )

      //replace pour éviter de pouvoir revenir sur cette même page une deuxième fois, au lieu de push
      router.replace({ name: 'home' })
    }
  } catch (error) {
    console.log(error)
  }
  isProcessing.value = false
}
</script>

<template>
  <main>
    <div class="container">
      <h1>Finalisez votre paiement</h1>

      <div class="center">
        <div class="firstCol">
          <div>
            <h2>Informations personnelles</h2>
            <p>Une pièce d'identité vous sera demandée pour récupérer votre colis.</p>

            <label for="firstname">Prénom</label>
            <input
              type="text"
              name="firstname"
              id="firstname"
              placeholder="Prénom"
              v-model="firstname"
              @input="errorMessage = ''"
            />

            <label for="lastname">Nom</label>
            <input
              type="text"
              name="lastname"
              id="lastname"
              placeholder="Nom"
              v-model="lastname"
              @input="errorMessage = ''"
            />

            <label for="phone">Téléphone</label>
            <input type="text" name="phone" id="phone" placeholder="Téléphone" v-model="phone" />
            <p>Recevoir un SMS pour l'arrivée de votre colis ou votre code de locker</p>
          </div>

          <p>
            Vous ne serez débité que lorsque le vendeur aura confirmé la disponibilité de la
            commande.
          </p>

          <div>
            <h2>Coordonnées bancaires</h2>

            <div id="card-element"></div>

            <div class="btnPay">
              <button @click="handlePayment" :disabled="isProcessing">Payer</button>

              <p v-if="errorMessage">{{ errorMessage }}</p>
            </div>

            <p>
              Paiement sécurisé Votre banque peut vous demander d'autoriser le paiement pour
              compléter votre achat.
            </p>
            <p>
              Vous êtes sur un serveur de paiement sécurisé par les normes ssl (https) et pcidss de
              nos partenaires bancaires. Vos données sont encryptées pour plus de sécurité.
            </p>
          </div>
        </div>

        <p v-if="isLoading">Chargement en cours ...</p>

        <div v-else class="secondCol">
          <div>
            <div class="imgAndTitle">
              <img :src="offerInfos.attributes.pictures.data[0].attributes.url" alt="" />
              <h3>{{ offerInfos.attributes.title }}</h3>
            </div>

            <p class="price">{{ offerInfos.attributes.price }} €</p>
          </div>

          <div class="optionPart">
            <h3>Mode de remise</h3>

            <div>
              <input
                type="radio"
                name="faceToFace"
                value="faceToFace"
                id="faceToFace"
                v-model="option"
              />
              <label for="faceToFace">
                <p>Remise en main propre</p>
                <p>Payer en ligne et récupérez votre achat en main</p>
                <p>propre lors de votre rendez-vous avec le vendeur</p>
              </label>
            </div>

            <div>
              <input type="radio" name="delivery" value="delivery" id="delivery" v-model="option" />
              <label for="delivery">
                <p>Colissimo</p>
                <p>à votre domicile sous 2-3 jours</p>
              </label>
              <p class="prices">15.60 €</p>
            </div>

            <div>
              <h3>Protection leboncoin</h3>
              <p class="prices">0.99 €</p>
            </div>
            <p>
              <font-awesome-icon :icon="['fas', 'check']" />
              <span>Votre argent est sécurisé et versé au bon moment</span>
            </p>
            <p>
              <font-awesome-icon :icon="['fas', 'check']" />
              <span>Notre service client dédié vous accompagne</span>
            </p>
          </div>

          <div class="totalPart">
            <h2>Total</h2>
            <p class="prices">{{ total }} €</p>
          </div>
        </div>
      </div>
    </div>
  </main>
</template>

<style setup>
main {
  padding: 20px 0;
  min-height: calc(100vh - var(--height-header) - var(--height-footer));
}

h1 {
  font-weight: bold;
  font-size: 24px;
  margin-bottom: 20px;
}

h2 {
  font-weight: bold;
  font-size: 18px;
}

h2 + p {
  font-size: 12px;
  line-height: 20px;
  margin-bottom: 15px;
}

h3 {
  font-size: 16px;
  font-weight: bold;
  margin-bottom: 10px;
}

.center {
  display: flex;
  gap: 20px;
  align-items: flex-start;
}

/* FIRST COL --------------- */

.firstCol {
  flex: 1;
}

.firstCol > div {
  box-shadow: 0 0 7px var(--med-grey);
  border-radius: 10px;
  padding: 20px 30px;
  display: flex;
  flex-direction: column;
}

.firstCol p {
  font-size: 12px;
}

.firstCol > p {
  margin: 20px 0;
}

.firstCol label {
  margin-bottom: 10px;
}

.firstCol input {
  border: 1px solid var(--med-grey);
  border-radius: 15px;
  height: 45px;
  margin-bottom: 15px;
  padding-left: 10px;
}

#card-element {
  margin: 20px 0;
  border: 1px solid var(--med-grey);
  min-height: 45px;
  border-radius: 15px;
  padding: 15px;
}

.firstCol button {
  align-self: flex-start;
  background-color: var(--orange);
  color: white;
  padding: 7px 15px;

  border: none;
  border-radius: 15px;
  font-weight: bold;
}

.firstCol button:disabled {
  opacity: 0.5;
  cursor: auto;
}
.btnPay {
  display: flex;

  justify-content: space-between;
  margin-bottom: 20px;
  align-items: center;
}

.btnPay p {
  color: var(--orange);
  font-size: 16px;
}

/* SECOND COL --------------- */
.secondCol {
  width: 355px;

  box-shadow: 0 0 7px var(--med-grey);

  border-radius: 10px;
}

.imgAndTitle {
  display: flex;
  gap: 10px;
  align-items: center;
  font-weight: bold;
}

.secondCol > div:not(:nth-child(2)) {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 15px;
}

.secondCol > div:first-child img {
  width: 80px;
  height: 80px;
  object-fit: cover;
  border-radius: 5px;
}

.optionPart {
  border-top: 1px solid var(--med-grey);
  border-bottom: 1px solid var(--med-grey);
  padding: 15px;
  margin: 20px 0;
}

.optionPart > div {
  display: flex;

  justify-content: space-between;
  align-items: center;
  gap: 10px;
  margin: 10px 0;
}

.optionPart label p:not(:first-child) {
  font-size: 12px;
  color: var(--med-grey);
  line-height: 25px;
}

.optionPart > p {
  display: flex;
  gap: 15px;
  margin-bottom: 10px;
}

.optionPart svg {
  color: var(--green);
}

.prices {
  font-weight: bold;
  color: var(--brown);
  font-size: 16px;
  margin-bottom: 0;
}
</style>
