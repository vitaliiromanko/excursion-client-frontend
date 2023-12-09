<template>
  <div
    ref="carouselContainer"
    id="carouselContainer"
    class="carousel slide"
    data-bs-ride="carousel"
  >
    <div v-if="photos.length > 1" class="carousel-indicators">
      <button
        v-for="index in photos.length"
        :key="index"
        type="button"
        data-bs-target="#carouselContainer"
        :data-bs-slide-to="index - 1"
        :class="{ active: index - 1 === 0 }"
        :aria-current="{ true: index - 1 === 0 }"
        :aria-label="'Slide ' + (index + 1)"
      ></button>
    </div>

    <div class="carousel-inner">
      <div
        v-for="(photo, index) in photos"
        :key="index"
        class="carousel-item"
        :class="{ active: index === 0 }"
        :style="{ height: width * 0.6 + 'px' }"
      >
        <img
          :src="photo"
          class="d-block w-100 h-100"
          :alt="'Slide ' + (index + 1)"
        />
      </div>
    </div>

    <button
      v-if="photos.length > 1"
      class="carousel-control-prev"
      type="button"
      data-bs-target="#carouselContainer"
      data-bs-slide="prev"
    >
      <span class="carousel-control-prev-icon" aria-hidden="true"></span>
      <span class="visually-hidden">Previous</span>
    </button>
    <button
      v-if="photos.length > 1"
      class="carousel-control-next"
      type="button"
      data-bs-target="#carouselContainer"
      data-bs-slide="next"
    >
      <span class="carousel-control-next-icon" aria-hidden="true"></span>
      <span class="visually-hidden">Next</span>
    </button>
  </div>
</template>

<script setup>
import * as bootstrap from "bootstrap";
import { onMounted, ref } from "vue";
import { useElementSize } from "@vueuse/core";

defineProps({
  photos: {
    type: Array,
    required: true,
  },
});

const carouselContainer = ref(null);
const { width } = useElementSize(carouselContainer);

onMounted(() => {
  new bootstrap.Carousel(carouselContainer.value, {
    interval: 8000,
  });
});
</script>

<style scoped>
#carouselContainer {
  border-radius: 5px;
  overflow: hidden;
}

.carousel-item img {
  object-fit: cover;
  position: relative;
}
</style>
