<script setup>
import { onMounted, ref, computed, onBeforeMount, inject } from 'vue'
import axios from 'axios'
import { loadStripe } from '@stripe/stripe-js'

const GlobalStore = inject('GlobalStore')

const stripePromise = loadStripe(
  'pk_test_51Sp6MkFBF92n8mlkfiigavlq1ekHVdcaFgcgCcmUsK2D6Oo02QhLDGrfMdUwlKB2qovuE3bBJUEtI2T0t5fcmCOy00Sbc3wERH',
)
const props = defineProps({ id: String })

const isLoading = ref(true)
const offerInfos = ref(null)
const option = ref('faceToFace')
const cardElement = ref(null)

const firstname = ref('')
const lastname = ref('')
const phone = ref('')

onBeforeMount(async () => {
  const stripe = await stripePromise

  const elements = stripe.elements()

  cardElement.value = elements.create('card')

  cardElement.value.mount('#card-element')
})

onMounted(async () => {
  try {
    const { data } = await axios.get(
      `https://site--strapileboncoin--2m8zk47gvydr.code.run/api/offers/${props.id}?populate[0]=pictures`,
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
  try {
    const stripe = await stripePromise

    const { token } = await stripe.createToken(cardElement.value)

    const stripeToken = token.id

    const { data } = await axios.post(
      'https://site--strapileboncoin--2m8zk47gvydr.code.run/api/offers/buy',
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
  } catch (error) {
    console.log(error)
  }
}
</script>

<template>
  <main>
    <div class="container">
      <h1>Finalisez votre paiement</h1>

      <div>
        <div class="firstCol">
          <div>
            <h2>Informations personnelles</h2>
            <p>Une pièce d'identité vous sera demandée pour récupérer votre colis.</p>

            <label for="firstname">Prénom :</label>
            <input
              type="text"
              name="firstname"
              id="firstname"
              placeholder="Prénom"
              v-model="firstname"
            />

            <label for="lastname">Nom :</label>
            <input type="text" name="lastname" id="lastname" placeholder="Nom" v-model="lastname" />

            <label for="phone">Téléphone :</label>
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

            <button @click="handlePayment">Payer</button>

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
          <div class="offerInfosPart">
            <img :src="offerInfos.attributes.pictures.data[0].attributes.url" alt="" />
            <h3>{{ offerInfos.attributes.title }}</h3>
            <p>{{ offerInfos.attributes.price }} €</p>
          </div>

          <div class="optionPart">
            <h3>Mode de paiement</h3>

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
              <p>15.60 €</p>
            </div>

            <div>
              <h3>Protection leboncoin</h3>
              <p>0.99 €</p>
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
            <p>{{ total }} €</p>
          </div>
        </div>
      </div>
    </div>
  </main>
</template>

<style setup>
.container > div {
  display: flex;
  gap: 20px;
}

/* SECOND COL --------------- */
.secondCol > div:first-child img {
  width: 100px;
  height: 100px;
  object-fit: cover;
}
</style>
