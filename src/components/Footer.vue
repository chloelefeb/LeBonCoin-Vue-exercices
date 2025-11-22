<script setup></script>

<template>
  <footer>
    <p class="container">
      Made by <a href="https://www.lereacteur.io"> Le Reacteur </a> with
      <a href="https://vuejs.org"> Vue.js</a>
    </p>
  </footer>
</template>

<style scoped>
footer {
  height: var(--height-footer);
  background-color: var(--light-grey);
}

p {
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 5px;
}

a {
  font-weight: bold;
}
</style>
