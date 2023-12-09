<template>
  <div v-if="excursion !== null" class="container">
    <div class="row">
      <nav aria-label="breadcrumb">
        <ol class="breadcrumb">
          <li class="breadcrumb-item">
            <router-link class="link" to="/">Головна</router-link>
          </li>
          <li class="breadcrumb-item">
            <router-link class="link" to="/search">Екскурсії</router-link>
          </li>
          <li class="breadcrumb-item active" aria-current="page">
            {{ excursion.name }}
          </li>
        </ol>
      </nav>
    </div>

    <div class="row">
      <div class="mb-2">
        <h2>{{ excursion.name }}</h2>
      </div>

      <div class="mb-3">
        <rating-component
          :review-number="excursion.review_number"
          :rating="excursion.rating"
        />
      </div>
    </div>

    <div class="row">
      <div class="col-lg-8 col-12">
        <div class="mb-4">
          <excursion-carousel-component :photos="excursion.photos" />
        </div>

        <div v-if="windowSize.width.value < 992" class="col-12">
          <excursion-order-panel-component
            :excursion="excursion"
            @show-order-model="showCreateOrderModelValue"
          />
        </div>

        <div class="mb-4 pb-4 border-bottom">
          <div class="mb-2">
            <h3>Опис:</h3>
          </div>

          <div>
            <p class="description">{{ excursion.description }}</p>
          </div>
        </div>

        <div
          v-if="
            excursion.conducting_type.name === 'запланована' &&
            excursion.status !== 'ЗАВЕРШЕНА'
          "
          class="mb-4 pb-4 border-bottom"
        >
          <div class="d-flex justify-content-between align-items-center">
            <div>
              <h3>Розклад</h3>
            </div>

            <div>
              <button
                type="button"
                class="btn btn-outline-secondary"
                @click="scheduleVisible = !scheduleVisible"
              >
                {{ scheduleVisible ? "приховати" : "показати" }}
              </button>
            </div>
          </div>

          <CCollapse :visible="scheduleVisible">
            <div class="schedule-container">
              <div
                v-for="(excursionItem, index) in excursion.excursion_items"
                :key="excursionItem.id"
                class="d-flex justify-content-between align-items-center"
                :class="{
                  'border-bottom':
                    index !== excursion.excursion_items.length - 1,
                  'mb-3': index !== excursion.excursion_items.length - 1,
                  'pb-3': index !== excursion.excursion_items.length - 1,
                }"
              >
                <div>
                  <p class="fs-5">
                    {{ convertStartDate(excursionItem.start_date) }}
                  </p>
                </div>

                <div>
                  <button
                    type="button"
                    class="btn btn-primary"
                    @click="
                      showCreateModelValueWithSelectedSchedule(excursionItem.id)
                    "
                  >
                    Замовити
                  </button>
                </div>
              </div>
            </div>
          </CCollapse>
        </div>

        <div class="mb-4 pb-4 border-bottom">
          <div
            class="d-flex justify-content-between align-items-center flex-wrap"
          >
            <div class="mb-2 pe-3">
              <h3>Організатор:</h3>
            </div>

            <div>
              <router-link
                class="link"
                :to="{
                  name: 'search',
                  query: { organizer: excursion.organizer.id },
                }"
              >
                <div class="d-flex align-items-center">
                  <div v-if="excursion.organizer.logo !== null" class="me-2">
                    <img
                      class="rounded-circle"
                      :src="excursion.organizer.logo"
                      width="35"
                      height="35"
                      alt="logo"
                    />
                  </div>

                  <div>
                    <p class="organizer-name">{{ excursion.organizer.name }}</p>
                  </div>
                </div>
              </router-link>
            </div>
          </div>

          <div
            v-if="excursion.organizer.contact_people.length > 0"
            class="mt-3"
          >
            <div>
              <h5>Контакти:</h5>
            </div>

            <div class="ms-5 contact-person-container">
              <div class="mt-3">
                <contact-person-list-component
                  :contact-people="excursion.organizer.contact_people"
                />
              </div>
            </div>
          </div>
        </div>

        <div class="mb-4">
          <div class="mb-4 d-flex justify-content-between align-items-center">
            <div>
              <h3>Відгуки</h3>
            </div>

            <div>
              <button
                type="button"
                class="btn btn-primary"
                @click="
                  () => {
                    visibleCreateReviewModel = true;
                  }
                "
              >
                Залишити відгук
              </button>

              <CModal
                v-if="isAuth"
                backdrop="static"
                alignment="center"
                size="lg"
                :visible="visibleCreateReviewModel"
                @close="
                  () => {
                    visibleCreateReviewModel = false;
                  }
                "
              >
                <CModalHeader>
                  <CModalTitle>Створення відгуку</CModalTitle>
                </CModalHeader>

                <Form @submit="submitCreateNewReview" v-slot="{ errors }">
                  <CModalBody>
                    <div class="mb-3">
                      <div class="mb-2">
                        <p class="model-item-title">Оціність екскурсію</p>
                      </div>

                      <div>
                        <font-awesome-icon
                          v-for="n in 5"
                          :key="n"
                          class="text-warning fs-5"
                          @mouseover="startRating = n"
                          @mouseleave="startRating = createNewReview.rating"
                          @click="createNewReview.rating = n"
                          :icon="
                            startRating <= n - 1
                              ? 'fa-star fa-regular'
                              : 'fa-star'
                          "
                        />
                      </div>
                    </div>

                    <div class="form-group mb-3">
                      <label
                        class="model-item-title mb-2"
                        for="newReviewComment"
                        >Коментар</label
                      >
                      <Field
                        id="newReviewComment"
                        name="newReviewComment"
                        v-model="createNewReview.comment"
                        as="textarea"
                        class="form-control position-relative"
                        placeholder="Введіть ваш коментар"
                        :class="{ 'is-invalid': errors.newReviewComment }"
                        rules="required|notOnlySpace"
                        rows="7"
                      />

                      <ErrorMessage
                        name="newReviewComment"
                        as="div"
                        class="invalid-feedback position-absolute m-0 text-end"
                      />
                    </div>
                  </CModalBody>

                  <CModalFooter class="d-flex justify-content-center">
                    <CButton color="primary" variant="outline" type="submit"
                      >Залишити відгук
                    </CButton>
                  </CModalFooter>
                </Form>
              </CModal>

              <CModal
                v-else
                backdrop="static"
                alignment="center"
                size="lg"
                :visible="visibleCreateReviewModel"
                @close="
                  () => {
                    visibleCreateReviewModel = false;
                  }
                "
              >
                <CModalHeader />

                <CModalBody>
                  <div class="text-center">
                    <p>Лише авторизовані користувачі можуть залишити відгук</p>
                  </div>
                </CModalBody>

                <CModalFooter class="d-flex justify-content-center">
                  <router-link to="/login" class="btn btn-primary"
                    >Авторизація</router-link
                  >
                </CModalFooter>
              </CModal>
            </div>
          </div>

          <div v-if="reviewsPage.content.length !== 0">
            <div class="review-container">
              <review-list-component :reviews="reviewsPage.content" />
            </div>

            <div
              v-if="reviewsPage.content.length !== reviewsPage.totalNumber"
              class="d-flex justify-content-center mt-3"
            >
              <button
                type="button"
                class="btn btn-warning text-uppercase"
                @click="loadMoreFunc"
              >
                Завантажити ще {{ calcLoadMore }}
              </button>
            </div>
          </div>

          <div v-else class="text-center">
            <p>Немає залишених відгуків...</p>
          </div>
        </div>
      </div>

      <div v-if="windowSize.width.value >= 992" class="col-lg-4 col-12">
        <excursion-order-panel-component
          :excursion="excursion"
          @show-order-model="showCreateOrderModelValue"
        />
      </div>
    </div>

    <template v-if="isAuth">
      <create-planned-excursion-order-model-component
        v-if="excursion.conducting_type.name === 'запланована'"
        :visible="visibleCreateOrderModel"
        :selected-schedule="selectedSchedule"
        :excursion-items="excursion.excursion_items"
        :price="excursion.price - excursion.discount"
        @close-order-model="closeCreateOrderModelValue"
      />

      <create-individual-excursion-order-model-component
        v-else
        :visible="visibleCreateOrderModel"
        :excursion-id="excursion.id"
        :price="excursion.price - excursion.discount"
        @close-order-model="closeCreateOrderModelValue"
      />
    </template>

    <template v-else>
      <CModal
        backdrop="static"
        alignment="center"
        size="lg"
        :visible="visibleCreateOrderModel"
        @close="
          () => {
            visibleCreateOrderModel = false;
          }
        "
      >
        <CModalHeader />

        <CModalBody>
          <div class="text-center">
            <p>Лише авторизовані користувачі можуть замовити екскурсію</p>
          </div>
        </CModalBody>

        <CModalFooter class="d-flex justify-content-center">
          <router-link to="/login" class="btn btn-primary"
            >Авторизація</router-link
          >
        </CModalFooter>
      </CModal>
    </template>
  </div>
</template>

<script setup>
import { Field, Form, ErrorMessage } from "vee-validate";
import { computed, onMounted, reactive, ref, watch } from "vue";
import { useRoute, useRouter } from "vue-router";
import axios from "axios";
import ExcursionCarouselComponent from "@/components/basic/ExcursionCarouselComponent.vue";
import RatingComponent from "@/components/basic/RatingComponent.vue";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import {
  CButton,
  CCollapse,
  CModal,
  CModalBody,
  CModalFooter,
  CModalHeader,
  CModalTitle,
} from "@coreui/bootstrap-vue";
import dayjs from "dayjs";
import "dayjs/locale/uk";
import ReviewListComponent from "@/components/review/ReviewListComponent.vue";
import ExcursionOrderPanelComponent from "@/components/excursion/ExcursionOrderPanelComponent.vue";
import { useWindowSize } from "@vueuse/core";
import { useStore } from "vuex";
import CreatePlannedExcursionOrderModelComponent from "@/components/excursion/CreatePlannedExcursionOrderModelComponent.vue";
import CreateIndividualExcursionOrderModelComponent from "@/components/excursion/CreateIndividualExcursionOrderModelComponent.vue";
import ContactPersonListComponent from "@/components/contact_person/ContactPersonListComponent.vue";
import { toast } from "vue3-toastify";

dayjs.locale("uk");

const windowSize = useWindowSize();

const store = useStore();
const isAuth = computed(() => store.state.auth.isAuth);

const excursion = ref(null);
const reviewsPage = reactive({
  content: [],
  totalNumber: null,
  pageNumber: null,
});

const route = useRoute();
const router = useRouter();

const scheduleVisible = ref(false);

const visibleCreateReviewModel = ref(false);
const visibleCreateOrderModel = ref(false);

const selectedSchedule = ref(null);

const showCreateOrderModelValue = () => {
  visibleCreateOrderModel.value = true;
};

const closeCreateOrderModelValue = () => {
  selectedSchedule.value = null;
  visibleCreateOrderModel.value = false;
};

const showCreateModelValueWithSelectedSchedule = (id) => {
  selectedSchedule.value = id;
  visibleCreateOrderModel.value = true;
};

const createNewReview = ref({
  excursion_id: route.params.token,
  rating: 5,
  comment: null,
});

const startRating = ref(5);

const calcLoadMore = computed(() => {
  const remainToLoad = reviewsPage.totalNumber - reviewsPage.content.length;
  if (remainToLoad >= 10) {
    return 10;
  } else {
    return remainToLoad;
  }
});

const loadMoreFunc = async () => {
  await store.dispatch("setShow", true);

  await axios
    .get("/review", {
      params: {
        page_number: reviewsPage.pageNumber + 1,
        excursion_id: excursion.value.id,
        status: "АКТИВНИЙ",
      },
    })
    .then((response) => {
      if (response.status === 200) {
        reviewsPage.content.push(...response.data.reviews.content);
        reviewsPage.pageNumber = response.data.reviews.pageable.pageNumber;
      }
    });

  await store.dispatch("setShow", false);
};

watch(visibleCreateReviewModel, (newValue) => {
  if (newValue) {
    document.body.style.overflowY = "hidden";
  } else {
    document.body.style.overflowY = null;
    createNewReview.value.rating = 5;
    createNewReview.value.comment = null;
    startRating.value = 5;
  }
});

watch(visibleCreateOrderModel, (newValue) => {
  if (newValue) {
    document.body.style.overflowY = "hidden";
  } else {
    document.body.style.overflowY = null;
  }
});

const convertStartDate = (startDate) => {
  return capitalizeFirstLetter(dayjs(startDate).format("dd, DD.MM.YYYY HH:mm"));
};

const capitalizeFirstLetter = (string) => {
  return string.charAt(0).toUpperCase() + string.slice(1);
};

const submitCreateNewReview = async () => {
  await store.dispatch("setShow", true);

  await axios
    .post("/review", createNewReview.value)
    .then((response) => {
      if (response.status === 201) {
        toast.success("Ваш коментар успішно додано!");

        reviewsPage.content = response.data.reviews.content;
        reviewsPage.totalNumber = response.data.reviews.totalElements;
        reviewsPage.pageNumber = response.data.reviews.pageable.pageNumber;
        excursion.value.rating = response.data.excursion_rating;
        excursion.value.review_number = response.data.excursion_review_count;
      }
    })
    .catch((error) => {
      if (
        error.response.status === 403 &&
        error.response.data.message === "Client is not activated"
      ) {
        toast.error(
          "Не активованим користувачам заборонено виконувати дану дію!"
        );
      } else {
        toast.error("Трапилася помилка! Спробуйте перезавантажити сторінку.");
      }
    });

  await store.dispatch("setShow", false);

  visibleCreateReviewModel.value = false;
};

onMounted(async () => {
  const excursionId = route.params.token;

  await store.dispatch("setShow", true);

  await axios
    .get("/excursion/details", {
      params: {
        excursion_id: excursionId,
      },
    })
    .then((response) => {
      if (response.status === 200) {
        excursion.value = response.data;
      }
    })
    .catch(async (error) => {
      if (
        (error.response.status === 403 &&
          error.response.data.message === "Excursion organizer is blocked") ||
        (error.response.status === 403 &&
          error.response.data.message === "Excursion is not allowed to show")
      ) {
        toast.error("Дана екскурсія не доступна для перегляду!");
        await router.push("/");
      } else {
        toast.error("Трапилася помилка! Спробуйте перезавантажити сторінку.");
      }
    });

  await axios
    .get("/review", {
      params: {
        excursion_id: excursionId,
        status: "АКТИВНИЙ",
      },
    })
    .then((response) => {
      if (response.status === 200) {
        reviewsPage.content = response.data.reviews.content;
        reviewsPage.totalNumber = response.data.reviews.totalElements;
        reviewsPage.pageNumber = response.data.reviews.pageable.pageNumber;
      }
    })
    .catch(() => {
      toast.error("Трапилася помилка! Спробуйте перезавантажити сторінку.");
    });

  window.scrollTo({
    top: 0,
    left: 0,
    behavior: "instant",
  });

  await store.dispatch("setShow", false);
});
</script>

<style scoped>
h2,
h3,
h5,
p {
  margin: 0;
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

.breadcrumb-item {
  font-size: 13px;
}

.description {
  white-space: pre-wrap;
}

.organizer-name {
  font-size: 20px;
}

.model-item-title {
  font-size: 18px;
}

.schedule-container {
  margin-left: 3rem;
  margin-top: 1.5rem;
}

.review-container {
  margin-left: 3rem;
}

@media only screen and (max-width: 575px) {
  .schedule-container {
    margin-left: 0;
  }

  .review-container {
    margin: 0;
  }

  .contact-person-container {
    margin: 0 !important;
  }
}
</style>
