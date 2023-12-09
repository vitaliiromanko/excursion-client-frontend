<template>
  <div class="col-lg-4 col-sm-6 col-12">
    <div class="custom-card mb-3">
      <div class="card-excursion-container">
        <div
          class="card-excursion-img-container"
          :style="{ height: imageWidth * 0.6 + 'px' }"
        >
          <img
            ref="image"
            class="card-excursion-img"
            :src="excursion.excursion_photo"
            alt="excursion_photo"
          />
        </div>

        <div class="card-excursion-content-container">
          <div class="card-excursion-title-container">
            <router-link
              :to="'/excursion/' + excursion.excursion_id"
              class="card-excursion-title-link"
            >
              <h3 class="card-excursion-title">
                {{ excursion.excursion_name }}
              </h3>
            </router-link>
          </div>

          <div class="card-excursion-rating-container">
            <rating-component
              :rating="excursion.excursion_rating"
              :review-number="excursion.excursion_review_number"
            />
          </div>

          <div class="card-excursion-duration-people-container">
            <div class="card-excursion-duration-container">
              <div class="card-excursion-duration-icon">
                <font-awesome-icon icon="fa-regular fa-clock" />
              </div>

              <div class="card-excursion-duration">
                <p>
                  {{ excursion.excursion_duration }}&nbsp;{{
                    excursion.excursion_duration_unit
                  }}
                </p>
              </div>
            </div>

            <div class="card-excursion-max-people-number-container">
              <div class="card-excursion-max-people-number-icon">
                <font-awesome-icon icon="fa-solid fa-chair" />
              </div>

              <div class="card-excursion-max-people-number">
                <p>{{ excursion.excursion_max_people_number }}</p>
              </div>
            </div>
          </div>

          <div class="card-excursion-price-container">
            <div class="card-excursion-price-title">
              <p>Ціна:</p>
            </div>

            <div class="card-excursion-price">
              <price-component
                :discount="excursion.excursion_discount"
                :price="excursion.excursion_price"
                price-size="25px"
                discount-size="15px"
              />
            </div>
          </div>

          <div class="card-excursion-button-container">
            <router-link
              :to="'/excursion/' + excursion.excursion_id"
              type="button"
              class="btn btn-outline-warning w-100"
              >Детальніше</router-link
            >
          </div>
        </div>
      </div>

      <div class="card-excursion-description-container">
        <div class="card-excursion-description">
          <p>{{ excursion.excursion_description }}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { CardExcursionItem } from "@/classes";
import { useElementSize } from "@vueuse/core";
import { ref } from "vue";
import RatingComponent from "@/components/basic/RatingComponent.vue";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import PriceComponent from "@/components/basic/PriceComponent.vue";

defineProps({
  excursion: CardExcursionItem,
});

const image = ref(null);
const imageWidth = useElementSize(image).width;
</script>

<style scoped>
.custom-card {
  position: relative;
}

.card-excursion-container {
  border: var(--bs-border-width) var(--bs-border-style) var(--bs-border-color);
  border-radius: var(--bs-border-radius-sm);
}

.card-excursion-img-container {
  overflow: hidden;
  border-radius: var(--bs-border-radius-sm) var(--bs-border-radius-sm) 0 0;
}

.custom-card:hover .card-excursion-img {
  transform: scale(1.05);
  transition: 0.5s;
}

.card-excursion-img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: 0.5s;
}

.card-excursion-content-container {
  padding: 15px 20px 20px;
}

h3,
p {
  margin: 0;
}

.card-excursion-title-container {
  display: flex;
  margin-bottom: 10px;
  height: 48px;
}

.card-excursion-title-link {
  color: inherit;
  text-decoration: inherit;
  height: fit-content;
}

.card-excursion-title {
  font-size: 20px;
  transition: 0.5s;
  -webkit-box-orient: vertical;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  overflow: hidden;
}

.card-excursion-title-link:hover .card-excursion-title {
  color: #ffb947;
  transition: 0.5s;
}

.card-excursion-rating-container {
  display: flex;
  margin-bottom: 10px;
}

.card-excursion-duration-people-container {
  display: flex;
  margin-bottom: 15px;
}

.card-excursion-duration-container {
  display: flex;
  width: 50%;
  padding-right: 20px;
  border-right: var(--bs-border-width) var(--bs-border-style)
    var(--bs-border-color);
}

.card-excursion-duration-icon,
.card-excursion-max-people-number-icon {
  margin-right: 5px;
  display: flex;
  justify-content: center;
  align-items: center;
}

.card-excursion-duration-icon i,
.card-excursion-max-people-number-icon i {
  font-size: 1.3em;
}

.card-excursion-duration {
  display: flex;
}

.card-excursion-max-people-number-container {
  display: flex;
  width: 50%;
  padding-left: 20px;
}

.card-excursion-price-container {
  padding-top: 15px;
  border-top: var(--bs-border-width) var(--bs-border-style)
    var(--bs-border-color);
  display: flex;
  align-items: flex-end;
  margin-bottom: 10px;
}

.card-excursion-price-title {
  margin-right: 10px;
}

.custom-card:hover .card-excursion-description-container {
  animation: showDescriptionBlock 0.3s ease forwards;
  animation-iteration-count: 1;
}

.card-excursion-description-container {
  position: absolute;
  width: 100%;
  padding: 0 20px 20px 20px;
  border: var(--bs-border-width) var(--bs-border-style) var(--bs-border-color);
  border-radius: 0 0 var(--bs-border-radius-sm) var(--bs-border-radius-sm);
  border-top: none;
  top: calc(100% - 20px);
  background-color: white;
  z-index: 5;
  animation: hideDescriptionBlock 0.3s ease forwards;
  animation-iteration-count: 1;
}

.card-excursion-description {
  font-size: 15px;
  -webkit-box-orient: vertical;
  display: -webkit-box;
  -webkit-line-clamp: 5;
  overflow: hidden;
}

@keyframes showDescriptionBlock {
  0% {
    opacity: 0;
  }
  100% {
    transform: translateY(18px);
  }
}

@keyframes hideDescriptionBlock {
  0% {
    transform: translateY(18px);
    opacity: 1;
  }
  100% {
    transform: translateY(0);
    opacity: 0;
    visibility: hidden;
  }
}
</style>
