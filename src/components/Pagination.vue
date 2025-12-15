<script setup>
import { useRouter } from 'vue-router'

const router = useRouter()

const props = defineProps(['title', 'page', 'sort', 'pricemin', 'pricemax', 'numOfPages'])

const changePage = (num) => {
  const queries = { ...props }
  delete queries.numOfPages

  queries.page = num

  router.push({ name: 'home', query: queries })
}
</script>

<template>
  <section>
    <font-awesome-icon
      :icon="['fas', 'angle-left']"
      @click="changePage(page - 1)"
      v-if="page > 1"
    />
    <font-awesome-icon :icon="['fas', 'angle-left']" v-else class="disabled" />
    <div>
      <p v-for="num in numOfPages" @click="changePage(num)" :class="{ selected: num === page }">
        {{ num }}
      </p>
    </div>
    <font-awesome-icon
      :icon="['fas', 'angle-right']"
      @click="changePage(page + 1)"
      v-if="page < numOfPages"
    />
    <font-awesome-icon :icon="['fas', 'angle-right']" v-else class="disabled" />
  </section>
</template>

<style scoped>
section {
  display: flex;
  align-items: center;
  margin-top: 30px;
  gap: 10px;
}

section > div {
  display: flex;
}

p {
  width: 40px;
  height: 40px;
  display: flex;
  justify-content: center;
  align-items: center;
  /* border: 1px solid red; */
  border-radius: 5px;
  cursor: pointer;
}

.selected {
  color: white;
  background-color: black;
}

svg {
  cursor: pointer;
}

.disabled {
  color: var(--med-grey);
}
</style>
