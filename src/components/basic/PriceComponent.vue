<template>
  <div>
    <div v-if="discount !== null" class="d-flex">
      <h4 class="price">₴{{ price - discount }}&nbsp;</h4>
      <h4 class="discount">₴{{ price }}</h4>
    </div>
    <div v-else class="d-flex">
      <h4 class="price">₴{{ price }}</h4>
    </div>
  </div>
</template>

<script setup>
defineProps({
  price: {
    type: Number,
    required: true,
  },
  discount: {
    type: Number,
    required: false,
  },
  priceSize: {
    type: String,
    required: false,
  },
  discountSize: {
    type: String,
    required: false,
  },
});
</script>

<style scoped>
h4 {
  margin: 0;
}

.price {
  color: #ffb947;
  font-size: v-bind(priceSize);
}

.discount {
  color: gray;
  text-decoration: line-through;
  font-size: v-bind(discountSize);
  font-weight: normal;
}
</style>
