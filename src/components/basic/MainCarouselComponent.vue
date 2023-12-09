<template>
  <div
    ref="carouselContainer"
    id="carouselContainer"
    class="carousel slide w-100"
    data-bs-ride="carousel"
  >
    <div v-if="carouselExcursions.length > 1" class="carousel-indicators">
      <button
        v-for="index in carouselExcursions.length"
        :key="index"
        type="button"
        data-bs-target="#carouselContainer"
        :data-bs-slide-to="index - 1"
        :class="{ active: index - 1 === 0 }"
        :aria-current="{ true: index - 1 === 0 }"
        :aria-label="'Slide' + (index + 1)"
      ></button>
    </div>

    <div class="carousel-inner">
      <div
        v-for="(excursion, index) in carouselExcursions"
        :key="index"
        class="carousel-item"
        :class="{ active: index === 0 }"
        :style="{ height: width * 0.6 + 'px' }"
      >
        <img
          :src="excursion.excursion_photo"
          class="d-block w-100 h-100"
          alt="..."
        />
        <div class="image-gradient"></div>

        <div class="carousel-caption">
          <div class="row text-start mb-2">
            <div class="col-md-9">
              <div class="mb-2">
                <router-link
                  class="carousel-link"
                  :to="'/excursion/' + excursion.excursion_id"
                >
                  <p class="excursion-title">
                    {{ excursion.excursion_name }}
                  </p>
                </router-link>
              </div>

              <div>
                <p class="excursion-description">
                  {{ excursion.excursion_description }}
                </p>
              </div>
            </div>

            <div class="price-container col-md-3 mt-auto">
              <div>
                <div>
                  <p class="excursion-price">
                    <span>₴</span
                    >{{
                      excursion.excursion_price - excursion.excursion_discount
                    }}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <button
      v-if="carouselExcursions.length > 1"
      class="carousel-control-prev"
      type="button"
      data-bs-target="#carouselContainer"
      data-bs-slide="prev"
    >
      <span class="carousel-control-prev-icon" aria-hidden="true"></span>
      <span class="visually-hidden">Previous</span>
    </button>

    <button
      v-if="carouselExcursions.length > 1"
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
import { onMounted, ref } from "vue";
import { useElementSize } from "@vueuse/core";
import * as bootstrap from "bootstrap";

defineProps({
  carouselExcursions: Array,
});
onMounted(() => {
  const myCarouselElement = document.querySelector(".carousel");
  new bootstrap.Carousel(myCarouselElement, {
    interval: 5000,
  });
});
const carouselContainer = ref(null);
const { width } = useElementSize(carouselContainer);
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

.carousel-item .image-gradient {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: linear-gradient(
    to bottom,
    rgba(0, 0, 0, 0) 0%,
    rgba(0, 0, 0, 1) 85%
  );
}

p {
  margin: 0;
}

.carousel-link {
  text-decoration: none;
  color: white;
  transition: 0.5s;
}

.carousel-link:hover {
  color: #ffb947;
  transition: 0.5s;
}

.excursion-title {
  font-size: 30px;
  font-weight: 700;
}

.excursion-price {
  font-size: 40px;
  font-weight: 700;
  color: #ffb947;
}

.excursion-title,
.excursion-description {
  -webkit-box-orient: vertical;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  overflow: hidden;
  /*text-overflow: ellipsis;*/
  /*white-space: normal;*/
}

.price-container {
  border-left: 1px solid;
}

@media only screen and (max-width: 767px) {
  .excursion-title {
    font-size: 20px;
  }

  .excursion-description {
    display: none;
  }

  .price-container {
    border-left: none;
  }
}

@media only screen and (max-width: 576px) {
  .excursion-title {
    font-size: 15px;
  }

  .excursion-price {
    font-size: 25px;
  }
}
</style>
