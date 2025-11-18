<script setup></script>

<template>
  <header>
    <div class="container">
      <!-- Premier bloc -->
      <div>
        <img src="../assets/logo.svg" alt="Logo leboncoin" />

        <div>
          <button><font-awesome-icon :icon="['far', 'plus-square']" /> Déposer une annonce</button>
          <div>
            <input type="text" name="search" id="search" />

            <font-awesome-icon :icon="['fas', 'search']" />
          </div>
        </div>

        <div>
          <font-awesome-icon :icon="['far', 'user']" />
          <p>Se connecter</p>
          <font-awesome-icon :icon="['fas', 'sign-out-alt']" />
        </div>
      </div>

      <!-- Deuxième bloc -->
      <div>
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
        <font-awesome-icon :icon="['fas', 'circle']" />
      </div>
    </div>
  </header>
</template>

<style setup>
header: {
  height: 110px;
}

.container > div:first-child {
  border: 1px solid red;
  display: flex;
}

img {
  width: 140px;
}
</style>
