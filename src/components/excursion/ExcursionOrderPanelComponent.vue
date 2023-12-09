<template>
  <div class="mb-4 d-flex align-items-end">
    <div class="me-2">
      <p class="price-title">Ціна:</p>
    </div>

    <div>
      <price-component
        :price="excursion.price"
        :discount="excursion.discount"
        price-size="35px"
        discount-size="20px"
      />
    </div>
  </div>

  <div class="d-flex fs-5 mb-4">
    <div class="d-flex w-50 pe-3 border-end align-items-center">
      <div class="me-2">
        <font-awesome-icon icon="fa-regular fa-clock" />
      </div>

      <div>
        <p>{{ excursion.duration }}&nbsp;{{ getDurationUnit }}</p>
      </div>
    </div>

    <div class="d-flex w-50 ps-3 align-items-center">
      <div class="me-2">
        <font-awesome-icon icon="fa-solid fa-chair" />
      </div>

      <div>
        <p>{{ excursion.max_people_number }}</p>
      </div>
    </div>
  </div>

  <div class="mb-4 pb-4 border-bottom">
    <button
      type="button"
      class="w-100 text-uppercase btn btn-primary"
      @click="showOrderModelEmitFunc"
      :disabled="excursion.status === 'ЗАВЕРШЕНА'"
    >
      Замовити
    </button>

    <p v-if="excursion.status === 'ЗАВЕРШЕНА'" class="mt-1 completed-text">
      *дана екскурсія завершена
    </p>
  </div>

  <div class="mb-3">
    <topic-types-component :topic-types="excursion.topic_types" />
  </div>

  <div class="mb-3">
    <p class="fw-bold">
      Категорія:&nbsp;<router-link
        class="link"
        :to="{
          name: 'search',
          query: { category: excursion.category.id },
        }"
        >{{ excursion.category.name }}</router-link
      >
    </p>
  </div>

  <div class="mb-1">
    <p class="fw-bold">
      Спосіб пересування:&nbsp;<router-link
        class="link"
        :to="{
          name: 'search',
          query: { movement_type: excursion.movement_type.id },
        }"
        >{{ excursion.movement_type.name }}</router-link
      >
    </p>
  </div>

  <div class="mb-3">
    <p class="fw-bold">
      Спосіб проведення:&nbsp;<router-link
        class="link"
        :to="{
          name: 'search',
          query: { conducting_type: excursion.conducting_type.id },
        }"
        >{{ excursion.conducting_type.name }}</router-link
      >
    </p>
  </div>
</template>

<script setup>
import PriceComponent from "@/components/basic/PriceComponent.vue";
import TopicTypesComponent from "@/components/basic/TopicTypesComponent.vue";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import { computed } from "vue";

const props = defineProps({
  excursion: {
    required: true,
  },
});

const emit = defineEmits(["showOrderModel"]);

const showOrderModelEmitFunc = () => {
  emit("showOrderModel");
};

const getDurationUnit = computed(() => {
  if (props.excursion.duration_unit === "години") {
    return "год.";
  } else if (props.excursion.duration_unit === "дні") {
    return "дн.";
  }
  return "";
});
</script>

<style scoped>
p {
  margin: 0;
}

.price-title {
  font-size: 20px;
}

.link {
  text-decoration: none;
  color: black;
  transition: 0.3s;
}

.link:hover {
  color: #ffb947;
  transition: 0.3s;
}

.completed-text {
  color: #868686;
}
</style>
