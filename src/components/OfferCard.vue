<script setup>
const props = defineProps({
  offerInfos: Object,
})

console.log(props.offerInfos.attributes.pictures.data[0].attributes.url)
</script>

<template>
  <div>
    <img :src="offerInfos.attributes.pictures.data[0].attributes.url" alt="" />
    <p>{{ offerInfos.attributes.title }}</p>
    <p>{{ offerInfos.attributes.price }} €</p>

    <div>
      <p>{{ offerInfos.attributes.publishedAt }}</p>
      <font-awesome-icon :icon="['far', 'heart']" />
    </div>
  </div>
</template>

<style setup>
img {
  width: 150px;
  height: 200px;
  object-fit: cover;
}
</style>
