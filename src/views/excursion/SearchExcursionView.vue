<template>
  <div class="container-xl">
    <div class="row">
      <div class="col-lg-3 mb-3">
        <excursion-filter-component
          v-if="selectedFilterValues !== null"
          @filter-change="getFilterValues"
          :filter-selected-values="selectedFilterValues"
        />
      </div>

      <div class="col-lg-9">
        <div v-if="cardExcursionsPage.content.length !== 0">
          <div
            class="d-flex flex-wrap justify-content-between align-items-center"
          >
            <div class="mb-3 data-container" ref="scrollElement">
              <p>
                Знайдено пропозицій:&nbsp;<span>{{
                  cardExcursionsPage.totalNumber
                }}</span>
              </p>
            </div>

            <div
              class="mb-3 sort-container d-flex flex-wrap align-items-center"
            >
              <div class="sort-title me-2">
                <p>Сортувати:</p>
              </div>

              <div>
                <Multiselect
                  v-model="sortSelect"
                  :close-on-select="true"
                  :searchable="false"
                  :canDeselect="false"
                  :canClear="false"
                  class="p-0 multiselect"
                  :options="[
                    'За рейтингом',
                    'Від новішого',
                    'Від найдешевшого',
                    'Від найдорожчого',
                    'Від найкоротшого',
                    'Від найдовшого',
                  ]"
                />
              </div>
            </div>
          </div>

          <div class="mb-3">
            <card-excursion-list-component
              :excursions="cardExcursionsPage.content"
            />
          </div>

          <div
            v-if="cardExcursionsPage.totalPages > 1"
            class="text-center mb-4"
          >
            <div class="pagination-div">
              <paginate
                v-model="pageNumber"
                :page-range="3"
                :margin-pages="1"
                :prev-text="'<'"
                :next-text="'>'"
                :page-count="cardExcursionsPage.totalPages"
                :container-class="'pagination'"
              />
            </div>
          </div>
        </div>

        <div v-else class="text-center">
          <p class="not-found-text">Пропозицій не знайдено...</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useRoute, useRouter } from "vue-router";
import ExcursionFilterComponent from "@/components/basic/ExcursionFilterComponent.vue";
import { onMounted, reactive, ref, toRaw, watch } from "vue";
import { CardExcursionItem, FilterValues } from "@/classes";
import store from "@/store";
import axios from "axios";
import CardExcursionListComponent from "@/components/excursion/CardExcursionListComponent.vue";
import Multiselect from "@vueform/multiselect";
import Paginate from "vuejs-paginate-next";
import { toast } from "vue3-toastify";

const cardExcursionsPage = reactive({
  content: [],
  totalNumber: null,
  totalPages: 0,
});

const pageNumber = ref(1);

const route = useRoute();
const router = useRouter();

const scrollElement = ref(null);

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

const sortSelect = ref("За рейтингом");
const sortField = ref(null);
const sortDirection = ref(null);

const selectedFilterValues = ref(null);

const getFilterValues = (value) => {
  value = toRaw(value);

  Object.keys(value).forEach((key) => {
    value[key] = value[key] === null ? undefined : value[key];
  });

  if (!isSearchParam) {
    router.push({ name: "search", query: value });
  }
};

let isSearchParam = false;

onMounted(async () => {
  const params = route.query;

  if (params.search === undefined) {
    await filterSelected(params);
  } else {
    await searchSelected(params);
  }
});

watch(
  () => route.query,
  async (newQuery) => {
    if (newQuery.search === undefined) {
      await filterSelected(newQuery);
    } else {
      await searchSelected(newQuery);
    }
  }
);

const filterSelected = async (param) => {
  getFilterQuery(param);
  await store.dispatch("setUsedFilter", true);

  await store.dispatch("setShow", true);

  await axios
    .get("/excursion/filter", {
      params: {
        page_size: 24,
        sort_by: sortField.value,
        sort_direction: sortDirection.value,
        ...param,
      },
    })
    .then((response) => {
      if (response.status === 200) {
        cardExcursionsPage.content = convertResponseContent(
          response.data.excursions.content
        );
        cardExcursionsPage.totalNumber = response.data.excursions.totalElements;
        cardExcursionsPage.totalPages = response.data.excursions.totalPages;

        if (pageNumber.value !== 1) {
          isNewPageConfig = true;
          pageNumber.value = 1;
        }
      }
    })
    .catch(() => {
      toast.error("Трапилася помилка! Спробуйте перезавантажити сторінку.");
    });

  await store.dispatch("setShow", false);
};

const searchSelected = async (param) => {
  isSearchParam = true;
  getEmptyFilterQuery();

  await store.dispatch("setShow", true);

  await axios
    .get("/excursion/search", {
      params: {
        page_size: 24,
        sort_by: sortField.value,
        sort_direction: sortDirection.value,
        ...param,
      },
    })
    .then((response) => {
      if (response.status === 200) {
        cardExcursionsPage.content = convertResponseContent(
          response.data.excursions.content
        );
        cardExcursionsPage.totalNumber = response.data.excursions.totalElements;
        cardExcursionsPage.totalPages = response.data.excursions.totalPages;

        if (pageNumber.value !== 1) {
          isNewPageConfig = true;
          pageNumber.value = 1;
        }
      }
      isSearchParam = false;
    })
    .catch(() => {
      toast.error("Трапилася помилка! Спробуйте перезавантажити сторінку.");
    });

  await store.dispatch("setShow", false);
};

watch(sortSelect, async (newValue) => {
  switch (newValue) {
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

  const param = route.query;

  await store.dispatch("setShow", true);

  if (route.query.search === undefined) {
    await axios
      .get("/excursion/filter", {
        params: {
          page_size: 24,
          sort_by: sortField.value,
          sort_direction: sortDirection.value,
          ...param,
        },
      })
      .then((response) => {
        if (response.status === 200) {
          cardExcursionsPage.content = convertResponseContent(
            response.data.excursions.content
          );
          if (pageNumber.value !== 1) {
            isNewPageConfig = true;
            pageNumber.value = 1;
          }
        }
      })
      .catch(() => {
        toast.error("Трапилася помилка! Спробуйте перезавантажити сторінку.");
      });
  } else {
    await axios
      .get("/excursion/search", {
        params: {
          page_size: 24,
          sort_by: sortField.value,
          sort_direction: sortDirection.value,
          ...param,
        },
      })
      .then((response) => {
        if (response.status === 200) {
          cardExcursionsPage.content = convertResponseContent(
            response.data.excursions.content
          );
          if (pageNumber.value !== 1) {
            isNewPageConfig = true;
            pageNumber.value = 1;
          }
        }
      })
      .catch(() => {
        toast.error("Трапилася помилка! Спробуйте перезавантажити сторінку.");
      });
  }

  await store.dispatch("setShow", false);
});

let isNewPageConfig = false;

watch(pageNumber, async (newValue) => {
  if (isNewPageConfig) {
    isNewPageConfig = false;
    return;
  }

  const param = route.query;

  await store.dispatch("setShow", true);

  if (route.query.search === undefined) {
    await axios
      .get("/excursion/filter", {
        params: {
          page_number: newValue - 1,
          page_size: 24,
          sort_by: sortField.value,
          sort_direction: sortDirection.value,
          ...param,
        },
      })
      .then((response) => {
        if (response.status === 200) {
          cardExcursionsPage.content = convertResponseContent(
            response.data.excursions.content
          );
          scrollElement.value.scrollIntoView();
        }
      })
      .catch(() => {
        toast.error("Трапилася помилка! Спробуйте перезавантажити сторінку.");
      });
  } else {
    await axios
      .get("/excursion/search", {
        params: {
          page_number: newValue - 1,
          page_size: 24,
          sort_by: sortField.value,
          sort_direction: sortDirection.value,
          ...param,
        },
      })
      .then((response) => {
        if (response.status === 200) {
          cardExcursionsPage.content = convertResponseContent(
            response.data.excursions.content
          );
          scrollElement.value.scrollIntoView();
        }
      })
      .catch(() => {
        toast.error("Трапилася помилка! Спробуйте перезавантажити сторінку.");
      });
  }

  await store.dispatch("setShow", false);
});

const getFilterQuery = (newQuery) => {
  selectedFilterValues.value = new FilterValues(
    newQuery.category === undefined ? null : newQuery.category,
    newQuery.price === undefined ? null : newQuery.price,
    newQuery.duration === undefined ? null : newQuery.duration,
    newQuery.movement_type === undefined ? null : newQuery.movement_type,
    newQuery.topic_type === undefined ? null : newQuery.topic_type,
    newQuery.conducting_type === undefined ? null : newQuery.conducting_type,
    newQuery.max_people_number === undefined
      ? null
      : newQuery.max_people_number,
    newQuery.start_date === undefined ? null : newQuery.start_date,
    newQuery.organizer === undefined ? null : newQuery.organizer
  );
};

const getEmptyFilterQuery = () => {
  selectedFilterValues.value = new FilterValues(
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null
  );
};
</script>

<style scoped>
p {
  margin: 0;
}

.not-found-text {
  font-size: 20px;
}

.pagination {
  cursor: pointer;
  margin: 0;
}
.pagination-div {
  display: inline-block;
  text-align: center;
}

.multiselect {
  min-width: 220px;

  --ms-tag-bg: #dbeafe;
  --ms-tag-color: #2564eb;

  --ms-border-color: var(--bs-border-color);
  --ms-border-color-active: #9db3d9;
  --ms-border-width: var(--bs-border-width);
  --ms-radius: var(--bs-border-radius);
  --ms-line-height: var(--bs-body-line-height);
  --ms-ring-width: 4px;
  --ms-ring-color: var(--bs-primary-border-subtle);

  --ms-py: 0.3rem;
  --ms-placeholder-color: #5b5d64;

  --ms-option-bg-selected: rgba(99, 99, 255, 0.99);
  --ms-option-bg-selected-pointed: #809ee5;
}

@media only screen and (max-width: 767px) {
  .data-container {
    width: 100%;
    text-align: center;
  }

  .sort-container {
    width: 100%;
    justify-content: center;
  }
}
</style>
