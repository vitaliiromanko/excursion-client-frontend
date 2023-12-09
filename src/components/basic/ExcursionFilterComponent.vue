<template>
  <CCard class="border-bottom-0" v-if="filterData !== null">
    <div class="filter-group">
      <CCardHeader>
        <CButton
          class="filter-title-btn"
          @click="
            collapseVisibleList.categories = !collapseVisibleList.categories
          "
        >
          <span>Категорії</span>
        </CButton>
      </CCardHeader>

      <CCollapse :visible="collapseVisibleList.categories">
        <CCardBody class="filter-body">
          <div
            class="form-check"
            v-for="(categoryItem, index) in filterData.categories"
            :key="categoryItem.id"
          >
            <input
              class="form-check-input"
              :id="'categoryCheckBox' + index"
              @change="
                handleCheck(categoryItem.id, categories, $event.target.checked)
              "
              type="checkbox"
              :checked="selectedCategories.indexOf(categoryItem.id) !== -1"
            />
            <label class="form-check-label" :for="'categoryCheckBox' + index">{{
              categoryItem.name
            }}</label>
          </div>
        </CCardBody>
      </CCollapse>
    </div>

    <div class="filter-group">
      <CCardHeader>
        <CButton
          class="filter-title-btn"
          @click="
            collapseVisibleList.priceRange = !collapseVisibleList.priceRange
          "
        >
          <span>Діапазон цін</span>
        </CButton>
      </CCardHeader>

      <CCollapse :visible="collapseVisibleList.priceRange">
        <CCardBody class="filter-body">
          <div class="d-flex align-items-center">
            <div class="w-100">
              <Slider
                v-model="priceRange"
                class="slider-style"
                :min="filterData.price_range.start"
                :max="filterData.price_range.end"
                :step="-1"
                :format="(value) => `₴${value.toFixed(2)}`"
                :showTooltip="'drag'"
              />
            </div>

            <div class="ms-4">
              <button class="btn btn-primary" @click="setPrice">ОК</button>
            </div>
          </div>
        </CCardBody>
      </CCollapse>
    </div>

    <div class="filter-group">
      <CCardHeader>
        <CButton
          class="filter-title-btn"
          @click="
            collapseVisibleList.durationRange =
              !collapseVisibleList.durationRange
          "
        >
          <span>Діапазон тривалості</span>
        </CButton>
      </CCardHeader>

      <CCollapse :visible="collapseVisibleList.durationRange">
        <CCardBody class="filter-body">
          <div class="mb-3">
            <div class="mb-2">
              <p>Від:</p>
            </div>

            <div class="mb-3">
              <Multiselect
                v-model="startSelectedDurationUnit"
                :close-on-select="true"
                :searchable="false"
                :canDeselect="false"
                :canClear="false"
                class="p-0 multiselect"
                :options="['години', 'дні']"
              />
            </div>

            <div v-if="startSelectedDurationUnit === 'години'">
              <Slider
                v-model="startDuration"
                class="slider-style"
                :min="filterData.duration_range.hour.start"
                :max="filterData.duration_range.hour.end"
                :showTooltip="'drag'"
              />
            </div>

            <div v-else>
              <Slider
                v-model="startDuration"
                class="slider-style"
                :min="filterData.duration_range.day.start"
                :max="filterData.duration_range.day.end"
                :showTooltip="'drag'"
              />
            </div>
          </div>

          <div class="mb-3">
            <div class="mb-2">
              <p>До:</p>
            </div>

            <div class="mb-3">
              <Multiselect
                v-model="endSelectedDurationUnit"
                :close-on-select="true"
                :searchable="false"
                :canDeselect="false"
                :canClear="false"
                class="p-0 multiselect"
                :disabled="startSelectedDurationUnit === 'дні'"
                :options="['години', 'дні']"
              />
            </div>

            <div v-if="endSelectedDurationUnit === 'години'">
              <Slider
                v-model="endDuration"
                class="slider-style"
                :min="filterData.duration_range.hour.start"
                :max="filterData.duration_range.hour.end"
                :showTooltip="'drag'"
              />
            </div>

            <div v-else>
              <Slider
                v-model="endDuration"
                class="slider-style"
                :min="filterData.duration_range.day.start"
                :max="filterData.duration_range.day.end"
                :showTooltip="'drag'"
              />
            </div>
          </div>

          <div class="text-center">
            <button
              class="btn btn-primary"
              :disabled="
                startSelectedDurationUnit === endSelectedDurationUnit &&
                startDuration > endDuration
              "
              @click="setDuration"
            >
              ОК
            </button>
          </div>
        </CCardBody>
      </CCollapse>
    </div>

    <div class="filter-group">
      <CCardHeader>
        <CButton
          class="filter-title-btn"
          @click="
            collapseVisibleList.movementTypes =
              !collapseVisibleList.movementTypes
          "
        >
          <span>Способи пересування</span>
        </CButton>
      </CCardHeader>

      <CCollapse :visible="collapseVisibleList.movementTypes">
        <CCardBody class="filter-body">
          <div
            class="form-check"
            v-for="(movementType, index) in filterData.movement_types"
            :key="movementType.id"
          >
            <input
              class="form-check-input"
              :id="'movementTypeCheckBox' + index"
              @change="
                handleCheck(
                  movementType.id,
                  movementTypes,
                  $event.target.checked
                )
              "
              type="checkbox"
              :checked="selectedMovementTypes.indexOf(movementType.id) !== -1"
            />
            <label
              class="form-check-label"
              :for="'movementTypeCheckBox' + index"
              >{{ movementType.name }}</label
            >
          </div>
        </CCardBody>
      </CCollapse>
    </div>

    <div class="filter-group">
      <CCardHeader>
        <CButton
          class="filter-title-btn"
          @click="
            collapseVisibleList.topicTypes = !collapseVisibleList.topicTypes
          "
        >
          <span>Тематики</span>
        </CButton>
      </CCardHeader>

      <CCollapse :visible="collapseVisibleList.topicTypes">
        <CCardBody class="filter-body">
          <div
            class="form-check"
            v-for="(topicType, index) in filterData.topic_types"
            :key="topicType.id"
          >
            <input
              class="form-check-input"
              :id="'topicTypeCheckBox' + index"
              @change="
                handleCheck(topicType.id, topicTypes, $event.target.checked)
              "
              type="checkbox"
              :checked="selectedTopicTypes.indexOf(topicType.id) !== -1"
            />
            <label
              class="form-check-label"
              :for="'topicTypeCheckBox' + index"
              >{{ topicType.name }}</label
            >
          </div>
        </CCardBody>
      </CCollapse>
    </div>

    <div class="filter-group">
      <CCardHeader>
        <CButton
          class="filter-title-btn"
          @click="
            collapseVisibleList.maxPeopleNumberRange =
              !collapseVisibleList.maxPeopleNumberRange
          "
        >
          <span>Максимальна кількість учасників</span>
        </CButton>
      </CCardHeader>

      <CCollapse :visible="collapseVisibleList.maxPeopleNumberRange">
        <CCardBody class="filter-body">
          <div class="d-flex align-items-center">
            <div class="w-100">
              <Slider
                v-model="maxPeopleNumberRange"
                class="slider-style"
                :min="filterData.max_people_number_range.start"
                :max="filterData.max_people_number_range.end"
                :showTooltip="'drag'"
              />
            </div>

            <div class="ms-4">
              <button class="btn btn-primary" @click="setMaxPeopleNumber">
                ОК
              </button>
            </div>
          </div>
        </CCardBody>
      </CCollapse>
    </div>

    <div class="filter-group">
      <CCardHeader>
        <CButton
          class="filter-title-btn"
          @click="
            collapseVisibleList.conductingTypes =
              !collapseVisibleList.conductingTypes
          "
        >
          <span>Способи проведення</span>
        </CButton>
      </CCardHeader>

      <CCollapse :visible="collapseVisibleList.conductingTypes">
        <CCardBody class="filter-body">
          <div
            class="form-check"
            v-for="(conductingType, index) in filterData.conducting_types"
            :key="conductingType.id"
          >
            <input
              class="form-check-input"
              :id="'conductingTypeCheckBox' + index"
              @change="
                handleCheck(
                  conductingType.id,
                  conductingTypes,
                  $event.target.checked
                )
              "
              type="checkbox"
              :checked="
                selectedConductingTypes.indexOf(conductingType.id) !== -1
              "
            />
            <label
              class="form-check-label"
              :for="'conductingTypeCheckBox' + index"
              >{{ conductingType.name }}</label
            >
          </div>
        </CCardBody>
      </CCollapse>
    </div>

    <Transition>
      <div class="filter-group" v-if="conductingTypesIncludesPlanned">
        <CCardHeader>
          <CButton
            class="filter-title-btn"
            @click="
              collapseVisibleList.startDateRange =
                !collapseVisibleList.startDateRange
            "
          >
            <span>Діапазон дат початку екскурсій</span>
          </CButton>
        </CCardHeader>

        <CCollapse :visible="collapseVisibleList.startDateRange">
          <CCardBody class="filter-body">
            <div class="mb-3">
              <div class="mb-2">
                <label class="form-check-label" for="startStartDateInput"
                  >Від:</label
                >
              </div>
              <div class="w-100">
                <input
                  v-model="startStartDate"
                  class="form-control w-100"
                  id="startStartDateInput"
                  type="datetime-local"
                  :min="filterData.start_date_range.start"
                  :max="endStartDate"
                />
              </div>
            </div>

            <div class="mb-3">
              <div class="mb-2">
                <label class="form-check-label" for="endStartDateInput"
                  >До:</label
                >
              </div>
              <div class="w-100">
                <input
                  v-model="endStartDate"
                  class="form-control w-100"
                  id="endStartDateInput"
                  type="datetime-local"
                  :min="startStartDate"
                  :max="filterData.start_date_range.end"
                />
              </div>
            </div>

            <div class="text-center">
              <button
                class="btn btn-primary"
                :disabled="startStartDate > endStartDate"
                @click="setStartDate"
              >
                ОК
              </button>
            </div>
          </CCardBody>
        </CCollapse>
      </div>
    </Transition>

    <div class="filter-group">
      <CCardHeader>
        <CButton
          class="filter-title-btn"
          @click="
            collapseVisibleList.organizers = !collapseVisibleList.organizers
          "
        >
          <span>Організатори</span>
        </CButton>
      </CCardHeader>

      <CCollapse :visible="collapseVisibleList.organizers">
        <CCardBody class="filter-body">
          <div
            class="form-check"
            v-for="(organizer, index) in filterData.organizers"
            :key="organizer.id"
          >
            <input
              class="form-check-input"
              :id="'organizerCheckBox' + index"
              @change="
                handleCheck(organizer.id, organizers, $event.target.checked)
              "
              type="checkbox"
              :checked="selectedOrganizers.indexOf(organizer.id) !== -1"
            />
            <label
              class="form-check-label"
              :for="'organizerCheckBox' + index"
              >{{ organizer.name }}</label
            >
          </div>
        </CCardBody>
      </CCollapse>
    </div>
  </CCard>
</template>

<script setup>
import {
  CCard,
  CCardBody,
  CCardHeader,
  CButton,
  CCollapse,
} from "@coreui/bootstrap-vue";
import { computed, onMounted, reactive, ref, toRaw, watch } from "vue";
import axios from "axios";
import Slider from "@vueform/slider";
import "@vueform/slider/themes/default.css";
import Multiselect from "@vueform/multiselect";
import "@vueform/multiselect/themes/default.css";
import { FilterValues } from "@/classes";
import { toast } from "vue3-toastify";

const filterData = ref(null);

const collapseVisibleList = reactive({
  categories: true,
  priceRange: true,
  durationRange: true,
  movementTypes: true,
  topicTypes: true,
  conductingTypes: true,
  maxPeopleNumberRange: true,
  startDateRange: true,
  organizers: false,
});

const categories = ref([]);
const priceRange = ref([]);
const startDuration = ref(null);
const endDuration = ref(null);
const startSelectedDurationUnit = ref("години");
const endSelectedDurationUnit = ref("дні");
const movementTypes = ref([]);
const topicTypes = ref([]);
const conductingTypes = ref([]);
const maxPeopleNumberRange = ref([]);
const startStartDate = ref(null);
const endStartDate = ref(null);
const organizers = ref([]);

const filterValues = ref(new FilterValues());

const emit = defineEmits(["filterChange"]);

const props = defineProps({
  filterSelectedValues: {
    type: FilterValues,
    required: false,
    default: null,
  },
});

watch(filterValues.value, (newValue) => {
  emit("filterChange", newValue);
});

watch(categories.value, (newValue) => {
  if (newValue.length === 0) {
    filterValues.value.category = null;
  } else {
    filterValues.value.category = newValue.join();
  }
});

const setPrice = () => {
  if (
    priceRange.value[0] === filterData.value.price_range.start &&
    priceRange.value[1] === filterData.value.price_range.end
  ) {
    filterValues.value.price = null;
  } else {
    filterValues.value.price = priceRange.value.join("-");
  }
};

const setDuration = () => {
  if (
    startSelectedDurationUnit.value === "години" &&
    endSelectedDurationUnit.value === "дні" &&
    startDuration.value === filterData.value.duration_range.hour.start &&
    endDuration.value === filterData.value.duration_range.day.end
  ) {
    filterValues.value.duration = null;
  } else {
    filterValues.value.duration =
      startDuration.value +
      ":" +
      startSelectedDurationUnit.value +
      "-" +
      endDuration.value +
      ":" +
      endSelectedDurationUnit.value;
  }
};

watch(movementTypes.value, (newValue) => {
  if (newValue.length === 0) {
    filterValues.value.movement_type = null;
  } else {
    filterValues.value.movement_type = newValue.join();
  }
});

watch(topicTypes.value, (newValue) => {
  if (newValue.length === 0) {
    filterValues.value.topic_type = null;
  } else {
    filterValues.value.topic_type = newValue.join();
  }
});

watch(conductingTypes.value, (newValue) => {
  if (newValue.length === 0) {
    filterValues.value.conducting_type = null;

    filterValues.value.start_date = null;
    startStartDate.value = filterData.value.start_date_range.start;
    endStartDate.value = filterData.value.start_date_range.end;
  } else {
    if (
      !conductingTypes.value.includes(
        toRaw(filterData.value.conducting_types).filter((conductingType) => {
          return conductingType.name === "запланована";
        })[0].id
      )
    ) {
      filterValues.value.start_date = null;
      startStartDate.value = filterData.value.start_date_range.start;
      endStartDate.value = filterData.value.start_date_range.end;
    }
    filterValues.value.conducting_type = newValue.join();
  }
});

const setMaxPeopleNumber = () => {
  if (
    maxPeopleNumberRange.value[0] ===
      filterData.value.max_people_number_range.start &&
    maxPeopleNumberRange.value[1] ===
      filterData.value.max_people_number_range.end
  ) {
    filterValues.value.max_people_number = null;
  } else {
    filterValues.value.max_people_number = maxPeopleNumberRange.value.join("-");
  }
};

const setStartDate = () => {
  if (
    startStartDate.value === filterData.value.start_date_range.start &&
    endStartDate.value === filterData.value.start_date_range.end
  ) {
    filterValues.value.start_date = null;
  } else {
    filterValues.value.start_date =
      startStartDate.value + "--" + endStartDate.value;
  }
};

watch(organizers.value, (newValue) => {
  if (newValue.length === 0) {
    filterValues.value.organizer = null;
  } else {
    filterValues.value.organizer = newValue.join();
  }
});

const handleCheck = (optionId, checkList, checked) => {
  if (checked) {
    checkList.push(optionId);
    checkList.sort();
  } else {
    checkList.splice(checkList.indexOf(optionId), 1);
  }
};

const conductingTypesIncludesPlanned = computed(() => {
  return conductingTypes.value.includes(
    toRaw(filterData.value.conducting_types).filter((conductingType) => {
      return conductingType.name === "запланована";
    })[0].id
  );
});

onMounted(async () => {
  await axios
    .get("/excursion/filter-data")
    .then((response) => {
      if (response.status === 200) {
        filterData.value = response.data;

        priceRange.value.push(filterData.value.price_range.start);
        priceRange.value.push(filterData.value.price_range.end);

        startDuration.value = filterData.value.duration_range.hour.start;
        endDuration.value = filterData.value.duration_range.day.end;

        maxPeopleNumberRange.value.push(
          filterData.value.max_people_number_range.start
        );
        maxPeopleNumberRange.value.push(
          filterData.value.max_people_number_range.end
        );

        startStartDate.value = filterData.value.start_date_range.start;
        endStartDate.value = filterData.value.start_date_range.end;
      }
    })
    .catch(() => {
      toast.error("Трапилася помилка! Спробуйте перезавантажити сторінку.");
    });

  if (props.filterSelectedValues !== null) {
    loadSelectedValues();
  }
});

watch(startSelectedDurationUnit, (newValue) => {
  if (isStartSelectedDurationUnitLoad) {
    isStartSelectedDurationUnitLoad = false;
    return;
  }

  if (newValue === "години") {
    startDuration.value = filterData.value.duration_range.hour.start;
  } else {
    startDuration.value = filterData.value.duration_range.day.start;
    endSelectedDurationUnit.value = "дні";
  }
});

watch(endSelectedDurationUnit, (newValue) => {
  if (isEndSelectedDurationUnitLoad) {
    isEndSelectedDurationUnitLoad = false;
    return;
  }

  if (newValue === "години") {
    endDuration.value = filterData.value.duration_range.hour.end;
  } else {
    endDuration.value = filterData.value.duration_range.day.end;
  }
});

if (props.filterSelectedValues !== null) {
  watch(
    () => props.filterSelectedValues,
    () => {
      loadSelectedValues();
    }
  );
}

const selectedCategories = ref([]);
let isStartSelectedDurationUnitLoad = false;
let isEndSelectedDurationUnitLoad = false;
const selectedMovementTypes = ref([]);
const selectedTopicTypes = ref([]);
const selectedConductingTypes = ref([]);
const selectedOrganizers = ref([]);

const loadSelectedValues = () => {
  const rawFilterSelectedValues = toRaw(props.filterSelectedValues);

  if (rawFilterSelectedValues.category !== null) {
    selectedCategories.value = rawFilterSelectedValues.category.split(",");
    updateSelectedCheckBox(categories.value, selectedCategories.value);
  } else {
    selectedCategories.value = [];
    categories.value.length = 0;
  }

  if (rawFilterSelectedValues.price !== null) {
    priceRange.value = rawFilterSelectedValues.price.split("-");
    setPrice();
  } else {
    const rawPriceRangeValue = toRaw(priceRange.value);
    if (
      !compareArrays(
        [Number(rawPriceRangeValue[0]), Number(rawPriceRangeValue[1])],
        [
          toRaw(filterData.value.price_range.start),
          toRaw(filterData.value.price_range.end),
        ]
      )
    ) {
      priceRange.value = [
        filterData.value.price_range.start,
        filterData.value.price_range.end,
      ];
      setPrice();
    }
  }

  if (rawFilterSelectedValues.duration !== null) {
    const [durationPart1, durationPart2] =
      rawFilterSelectedValues.duration.split("-");
    const [duration1, unit1] = durationPart1.split(":");
    const [duration2, unit2] = durationPart2.split(":");

    if (toRaw(startSelectedDurationUnit.value) !== unit1) {
      isStartSelectedDurationUnitLoad = true;
      startSelectedDurationUnit.value = unit1;
    }

    if (toRaw(endSelectedDurationUnit.value) !== unit2) {
      isEndSelectedDurationUnitLoad = true;
      endSelectedDurationUnit.value = unit2;
    }

    startDuration.value = Number(duration1);
    endDuration.value = Number(duration2);
    setDuration();
  } else {
    if (
      toRaw(startDuration.value) !==
        toRaw(filterData.value.duration_range.hour.start) ||
      toRaw(endDuration.value) !==
        toRaw(filterData.value.duration_range.day.end) ||
      toRaw(startSelectedDurationUnit.value) !== "години" ||
      toRaw(endSelectedDurationUnit.value) !== "дні"
    ) {
      startDuration.value = filterData.value.duration_range.hour.start;
      endDuration.value = filterData.value.duration_range.day.end;
      startSelectedDurationUnit.value = "години";
      endSelectedDurationUnit.value = "дні";
      setDuration();
    }
  }

  if (rawFilterSelectedValues.movement_type !== null) {
    selectedMovementTypes.value =
      rawFilterSelectedValues.movement_type.split(",");
    updateSelectedCheckBox(movementTypes.value, selectedMovementTypes.value);
  } else {
    selectedMovementTypes.value = [];
    movementTypes.value.length = 0;
  }

  if (rawFilterSelectedValues.topic_type !== null) {
    selectedTopicTypes.value = rawFilterSelectedValues.topic_type.split(",");
    updateSelectedCheckBox(topicTypes.value, selectedTopicTypes.value);
  } else {
    selectedTopicTypes.value = [];
    topicTypes.value.length = 0;
  }

  if (rawFilterSelectedValues.max_people_number !== null) {
    maxPeopleNumberRange.value =
      rawFilterSelectedValues.max_people_number.split("-");
    setMaxPeopleNumber();
  } else {
    const rawMaxPeopleNumberRangeValue = toRaw(maxPeopleNumberRange.value);
    if (
      !compareArrays(
        [
          Number(rawMaxPeopleNumberRangeValue[0]),
          Number(rawMaxPeopleNumberRangeValue[1]),
        ],
        [
          toRaw(filterData.value.max_people_number_range.start),
          toRaw(filterData.value.max_people_number_range.end),
        ]
      )
    ) {
      maxPeopleNumberRange.value = [
        filterData.value.max_people_number_range.start,
        filterData.value.max_people_number_range.end,
      ];
      setMaxPeopleNumber();
    }
  }

  if (rawFilterSelectedValues.conducting_type !== null) {
    selectedConductingTypes.value =
      rawFilterSelectedValues.conducting_type.split(",");
    updateSelectedCheckBox(
      conductingTypes.value,
      selectedConductingTypes.value
    );
  } else {
    selectedConductingTypes.value = [];
    conductingTypes.value.length = 0;
  }

  if (rawFilterSelectedValues.start_date !== null) {
    const [selectedStartStartDate, selectedEndStartDate] =
      rawFilterSelectedValues.start_date.split("--");

    startStartDate.value = selectedStartStartDate;
    endStartDate.value = selectedEndStartDate;
    setStartDate();
  } else {
    if (
      toRaw(startStartDate.value) !==
        toRaw(filterData.value.start_date_range.start) ||
      toRaw(endStartDate.value) !== toRaw(filterData.value.start_date_range.end)
    ) {
      startStartDate.value = filterData.value.start_date_range.start;
      endStartDate.value = filterData.value.start_date_range.end;
      setStartDate();
    }
  }

  if (rawFilterSelectedValues.organizer !== null) {
    collapseVisibleList.organizers = true;
    selectedOrganizers.value = rawFilterSelectedValues.organizer.split(",");
    updateSelectedCheckBox(organizers.value, selectedOrganizers.value);
  } else {
    selectedOrganizers.value = [];
    organizers.value.length = 0;
  }
};

const updateSelectedCheckBox = (values, selectedValues) => {
  const rawValues = toRaw(values);
  const rawSelectedValues = toRaw(selectedValues);

  if (!compareArrays(rawValues, rawSelectedValues)) {
    if (rawValues.length === 0) {
      values.push(...rawSelectedValues);
    } else if (rawValues.length > rawSelectedValues.length) {
      rawValues.every((value) => {
        if (rawSelectedValues.indexOf(value) === -1) {
          handleCheck(value, values, false);
          return false;
        }
        return true;
      });
    } else {
      rawSelectedValues.every((selectedValue) => {
        if (rawValues.indexOf(selectedValue) === -1) {
          handleCheck(selectedValue, values, true);
          return false;
        }
        return true;
      });
    }
  }
};

const compareArrays = (a, b) => {
  return JSON.stringify(a) === JSON.stringify(b);
};
</script>

<style scoped>
p {
  margin: 0;
}

.form-check-label {
  width: 100%;
}
.filter-title-btn {
  background: none;
  color: inherit;
  border: none;
  padding: 0;
  font: inherit;
  cursor: pointer;
  outline: inherit;

  width: 100%;
}

.filter-title-btn span {
  font-weight: 700;
  font-size: 18px;
}

.filter-body {
  border-bottom: var(--bs-border-color-translucent) solid
    var(--bs-card-border-width);
}

.slider-style {
  --slider-connect-bg: var(--bs-primary);
  --slider-tooltip-bg: var(--bs-primary);
  --slider-handle-ring-color: var(--bs-primary-border-subtle);
  z-index: 10;
}

.multiselect {
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

.v-enter-active {
  transition: opacity 0.5s ease;
}

.v-enter-from,
.v-leave-to {
  opacity: 0;
}
</style>
