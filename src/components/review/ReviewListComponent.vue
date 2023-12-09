<template>
  <div
    v-for="(review, index) in reviews"
    :key="review.id"
    :class="{ 'mb-3': index !== reviews.length - 1 }"
  >
    <review-item-component :review="review" />
  </div>
</template>

<script setup>
import ReviewItemComponent from "@/components/review/ReviewItemComponent.vue";

defineProps({
  reviews: {
    type: Array,
    required: true,
  },
});
</script>

<style scoped></style>
