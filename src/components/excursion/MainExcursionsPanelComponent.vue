<template>
  <div>
    <div class="mt-4 d-flex flex-wrap justify-content-between">
      <div class="mb-4 data-container">
        <p class="excursion-number">
          Загальна кількість пропозицій:&nbsp;<span>{{
            excursionsTotalNumber
          }}</span>
        </p>
      </div>

      <div class="mb-4 sort-container d-flex flex-wrap align-items-center">
        <div class="sort-title me-2">
          <p>Сортувати:</p>
        </div>

        <div>
          <Multiselect
            v-model="sortField"
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
      <card-excursion-list-component :excursions="excursions" />
    </div>

    <div class="text-center" v-if="excursions.length !== excursionsTotalNumber">
      <button
        type="button"
        class="btn btn-warning text-uppercase"
        @click="loadMoreEmitFunc"
      >
        Завантажити ще {{ calcLoadMore() }}
      </button>
    </div>
  </div>
</template>

<script setup>
import CardExcursionListComponent from "@/components/excursion/CardExcursionListComponent.vue";
import { ref, toRaw, watch } from "vue";
import Multiselect from "@vueform/multiselect";

const props = defineProps({
  excursions: Array,
  excursionsTotalNumber: Number,
});

const sortField = ref("За рейтингом");

const emit = defineEmits(["sortChange", "loadMore"]);

const calcLoadMore = () => {
  const remainToLoad =
    toRaw(props.excursionsTotalNumber) - toRaw(props.excursions).length;
  if (remainToLoad >= 12) {
    return 12;
  } else {
    return remainToLoad;
  }
};

watch(sortField, (newValue) => {
  emit("sortChange", newValue);
});

const loadMoreEmitFunc = () => {
  emit("loadMore");
};
</script>

<style scoped>
p {
  margin: 0;
}
.sort-title,
.excursion-number {
  font-size: 20px;
}

.excursion-number span {
  font-weight: bold;
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
