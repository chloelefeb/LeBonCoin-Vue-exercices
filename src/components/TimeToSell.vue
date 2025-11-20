<script setup>
import BtnPublishOffer from './BtnPublishOffer.vue'
</script>

<template>
  <div class="bloc">
    <img src="../assets/onde-corail.svg" alt="" />
    <div>
      <p>C'est le moment de vendre</p>
      <BtnPublishOffer />
    </div>

    <img src="../assets/feuille-bleue.svg" alt="" />
  </div>
</template>

<style scoped>
.bloc {
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: var(--beige);
  width: 100%;
  margin-bottom: 40px;
  border-radius: 20px;
}

.bloc > div {
  display: flex;
  align-items: center;
  gap: 20px;
}

p {
  font-size: 20px;
  font-weight: bold;
}
img:first-child {
  border-radius: 20px 0 0 20px;
}

img:last-child {
  border-radius: 0 20px 20px 0;
}
</style>
