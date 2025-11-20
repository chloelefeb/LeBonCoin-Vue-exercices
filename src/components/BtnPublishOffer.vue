<script setup></script>

<template>
  <button><font-awesome-icon :icon="['far', 'plus-square']" /> Déposer une annonce</button>
</template>

<style scoped>
button {
  color: white;
  background-color: var(--orange);
  border: none;
  padding: 7px 10px 5px 10px;
  border-radius: 10px;
  font-family: inherit;
  font-weight: bold;
  font-size: inherit;
}

button svg {
  margin-right: 5px;
}
</style>
