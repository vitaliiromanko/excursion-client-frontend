<template>
  <div class="rating mr-2 d-inline-block">
    <font-awesome-icon
      v-for="n in 5"
      :key="n"
      class="text-warning"
      :icon="rating <= n - 1 ? 'fa-star fa-regular' : 'fa-star'"
    />

    <span v-if="reviewNumber !== 0" class="ms-2"
      >{{ reviewNumber }}&nbsp;{{ reviewWord }}</span
    >
  </div>
</template>

<script setup>
import { computed, toRaw } from "vue";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";

const props = defineProps({
  rating: {
    type: Number,
    required: true,
  },
  reviewNumber: {
    type: Number,
    required: true,
  },
});

const reviewWord = computed(() => {
  const reviewNumberArray = Array.from(
    String(toRaw(props.reviewNumber)),
    Number
  );

  const reviewNumberArrayFirstElement = reviewNumberArray[0];
  const reviewNumberArrayLastElement =
    reviewNumberArray[reviewNumberArray.length - 1];

  if (reviewNumberArrayLastElement === 0) {
    return "відгуків";
  } else if (
    reviewNumberArray.length === 2 &&
    reviewNumberArrayFirstElement === 1
  ) {
    return "відгуків";
  } else if (reviewNumberArrayLastElement === 1) {
    return "відгук";
  }
  if (
    reviewNumberArrayLastElement === 2 ||
    reviewNumberArrayLastElement === 3 ||
    reviewNumberArrayLastElement === 4
  ) {
    return "відгука";
  } else {
    return "відгуків";
  }
});
</script>

<style scoped></style>
