<template>
  <div class="container-xl">
    <div class="row flex-row-reverse">
      <div class="col-xl-9 mb-3">
        <div v-if="carouselExcursions.length !== 0">
          <main-carousel-component :carousel-excursions="carouselExcursions" />
        </div>

        <div
          class="mb-3"
          v-if="
            windowSize.width.value >= 1200 &&
            cardExcursionsPage.content.length !== 0
          "
        >
          <main-excursions-panel-component
            :excursions="cardExcursionsPage.content"
            :excursions-total-number="cardExcursionsPage.totalNumber"
            @sort-change="getSortValue"
            @load-more="loadMoreValues"
          />
        </div>
      </div>

      <div class="col-xl-3 mb-3">
        <excursion-filter-component @filter-change="getFilterValues" />
      </div>

      <div
        class="mb-3"
        v-if="
          windowSize.width.value < 1200 &&
          cardExcursionsPage.content.length !== 0
        "
      >
        <main-excursions-panel-component
          :excursions="cardExcursionsPage.content"
          :excursions-total-number="cardExcursionsPage.totalNumber"
          @sort-change="getSortValue"
          @load-more="loadMoreValues"
        />
      </div>
    </div>
  </div>
</template>

<script setup>
import MainCarouselComponent from "@/components/basic/MainCarouselComponent.vue";
import { onMounted, reactive, ref, toRaw } from "vue";
import axios from "axios";
import { CardExcursionItem, SiteCarouselExcursionItem } from "@/classes";
import ExcursionFilterComponent from "@/components/basic/ExcursionFilterComponent.vue";
import { useWindowSize } from "@vueuse/core";
import MainExcursionsPanelComponent from "@/components/excursion/MainExcursionsPanelComponent.vue";
import { useRouter } from "vue-router";
import store from "@/store";
import { toast } from "vue3-toastify";

const windowSize = useWindowSize();

const carouselExcursions = ref([]);

const cardExcursionsPage = reactive({
  content: [],
  totalNumber: null,
});

let pageNumber = 1;

const sortField = ref(null);
const sortDirection = ref(null);

const convertResponseContent = (content) => {
  return Array.from(
    content,
    (excursion) =>
      new CardExcursionItem(
        excursion.excursion_id,
        excursion.excursion_name,
        excursion.excursion_description,
        excursion.excursion_price,
        excursion.excursion_discount,
        excursion.excursion_photo,
        excursion.excursion_rating,
        excursion.excursion_review_number,
        excursion.excursion_max_people_number,
        excursion.excursion_duration,
        excursion.excursion_duration_unit
      )
  );
};

const router = useRouter();

const getFilterValues = (value) => {
  value = toRaw(value);
  router.push({ name: "search", query: value });
};

const getSortValue = async (value) => {
  value = toRaw(value);

  switch (value) {
    case "Від новішого":
      sortField.value = "creationDate";
      sortDirection.value = null;
      break;
    case "Від найдешевшого":
      sortField.value = "activePrice";
      sortDirection.value = "ASC";
      break;
    case "Від найдорожчого":
      sortField.value = "activePrice";
      sortDirection.value = null;
      break;
    case "Від найкоротшого":
      sortField.value = "duration";
      sortDirection.value = "ASC";
      break;
    case "Від найдовшого":
      sortField.value = "duration";
      sortDirection.value = null;
      break;
    default:
      sortField.value = null;
      sortDirection.value = null;
  }

  await store.dispatch("setShow", true);

  await axios
    .get("/excursion/filter", {
      params: {
        sort_by: sortField.value,
        sort_direction: sortDirection.value,
      },
    })
    .then((response) => {
      if (response.status === 200) {
        cardExcursionsPage.content = convertResponseContent(
          response.data.excursions.content
        );
      }
      pageNumber = 1;
    })
    .catch(() => {
      toast.error("Трапилася помилка! Спробуйте перезавантажити сторінку.");
    });

  await store.dispatch("setShow", false);
};

const loadMoreValues = async () => {
  await store.dispatch("setShow", true);

  await axios
    .get("/excursion/filter", {
      params: {
        page_number: pageNumber,
        sort_by: sortField.value,
        sort_direction: sortDirection.value,
      },
    })
    .then((response) => {
      if (response.status === 200) {
        cardExcursionsPage.content.push(
          ...convertResponseContent(response.data.excursions.content)
        );
        pageNumber++;
      }
    })
    .catch(() => {
      toast.error("Трапилася помилка! Спробуйте перезавантажити сторінку.");
    });

  await store.dispatch("setShow", false);
};

onMounted(async () => {
  await store.dispatch("setShow", true);

  await axios
    .get("/site/carousel-excursions")
    .then((response) => {
      if (response.status === 200) {
        carouselExcursions.value = Array.from(
          response.data.excursions,
          (excursion) =>
            new SiteCarouselExcursionItem(
              excursion.excursion_id,
              excursion.excursion_name,
              excursion.excursion_description,
              excursion.excursion_price,
              excursion.excursion_discount,
              excursion.excursion_photo
            )
        );
      }
    })
    .catch(() => {
      toast.error("Трапилася помилка! Спробуйте перезавантажити сторінку.");
    });

  await axios
    .get("/excursion/filter")
    .then((response) => {
      if (response.status === 200) {
        cardExcursionsPage.content = convertResponseContent(
          response.data.excursions.content
        );
        cardExcursionsPage.totalNumber = response.data.excursions.totalElements;
      }
    })
    .catch(() => {
      toast.error("Трапилася помилка! Спробуйте перезавантажити сторінку.");
    });

  await store.dispatch("setShow", false);
});
</script>
