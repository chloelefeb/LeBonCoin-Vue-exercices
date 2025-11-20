<script setup>
import BtnPublishOffer from './BtnPublishOffer.vue'
</script>

<template>
  <header>
    <div class="container">
      <!-- Premier bloc -->
      <div class="topBloc">
        <img src="../assets/logo.svg" alt="Logo leboncoin" />

        <div class="middlePart">
          <BtnPublishOffer />
          <div>
            <input type="text" name="search" id="search" placeholder="Rechercher sur leboncoin" />

            <font-awesome-icon :icon="['fas', 'search']" />
          </div>
        </div>

        <div class="connectionPart">
          <div>
            <font-awesome-icon :icon="['far', 'user']" />
            <p>Se connecter</p>
          </div>

          <!-- <font-awesome-icon :icon="['fas', 'sign-out-alt']" /> -->
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
  height: 110px;
  /* border: 1px solid green; */
}

/* .container {
  /* border: 1px solid blue; */
/* } */

.container > div {
  /* border: 1px solid red; */
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

.middlePart > div {
  background-color: var(--light-grey);
  padding: 7px;
  border-radius: 10px;
  display: flex;
  align-items: center;
}

.middlePart > div svg {
  background-color: var(--orange);
  padding: 7px;
  border-radius: 5px;
  box-sizing: content-box;
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

.connectionPart > div {
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
