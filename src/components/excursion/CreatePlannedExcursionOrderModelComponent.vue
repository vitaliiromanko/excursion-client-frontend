<template>
  <CModal
    backdrop="static"
    alignment="center"
    size="lg"
    :visible="visible"
    @close="closeOrderModelEmitFunc"
  >
    <CModalHeader>
      <CModalTitle>Замовлення екскурсії</CModalTitle>
    </CModalHeader>

    <Form @submit="submitCreateOrder" v-slot="{ errors }" ref="newOrderForm">
      <CModalBody>
        <div class="row">
          <div class="col-md-12 mb-3">
            <div class="d-flex align-items-end justify-content-center">
              <div class="me-2">
                <p>Вартість:</p>
              </div>

              <div>
                <p class="price">₴{{ calcPrice }}</p>
              </div>
            </div>
          </div>
        </div>

        <div class="row">
          <div class="col-md-8 mb-3">
            <div class="mb-1">
              <p>Дата екскурсії</p>
            </div>

            <div>
              <Field
                v-model="selectSchedule"
                name="selectSchedule"
                rules="required"
                v-slot="{ field, errorMessage }"
              >
                <Multiselect
                  v-bind="field"
                  placeholder="Оберіть дату екскурсії"
                  :close-on-select="true"
                  :searchable="false"
                  :canDeselect="false"
                  :canClear="false"
                  class="p-0 multiselect position-relative"
                  :options="getSelectScheduleOptions"
                  :class="{
                    'invalid-multiselect': errorMessage,
                  }"
                  @close="newOrderForm.validate()"
                />

                <div
                  v-if="errorMessage"
                  class="invalid-multiselect-feedback position-absolute m-0 text-end"
                >
                  {{ errorMessage }}
                </div>
              </Field>
            </div>
          </div>

          <div class="col-md-4 mb-3">
            <div class="d-flex">
              <div class="mx-auto">
                <div class="mb-1">
                  <p>Кількість осіб</p>
                </div>

                <div>
                  <people-number-component v-model="peopleNumber" />
                </div>
              </div>
            </div>
          </div>
        </div>

        <div class="row">
          <div class="col-md-12 mb-3">
            <div>
              <label for="commentTextarea" class="form-label"
                >Коментар до замовлення</label
              >
              <Field
                id="commentTextarea"
                v-model="comment"
                as="textarea"
                class="form-control position-relative"
                name="commentTextarea"
                placeholder="Введіть коментар до замовлення (необов'язково)"
                :class="{ 'is-invalid': errors.commentTextarea }"
                rules="notOnlySpace"
                rows="7"
              />

              <ErrorMessage
                name="commentTextarea"
                as="div"
                class="invalid-feedback position-absolute m-0 text-end"
              />
            </div>
          </div>
        </div>
      </CModalBody>

      <CModalFooter class="d-flex justify-content-center">
        <button class="btn btn-primary" type="submit">Замовити</button>
      </CModalFooter>
    </Form>
  </CModal>
</template>

<script setup>
import { Field, Form, ErrorMessage } from "vee-validate";
import {
  CModal,
  CModalBody,
  CModalFooter,
  CModalHeader,
  CModalTitle,
} from "@coreui/bootstrap-vue";
import Multiselect from "@vueform/multiselect";
import { computed, ref, toRaw, watch } from "vue";
import dayjs from "dayjs";
import "dayjs/locale/uk";
import PeopleNumberComponent from "@/components/basic/PeopleNumberComponent.vue";
import axios from "axios";
import store from "@/store";
import { toast } from "vue3-toastify";

dayjs.locale("uk");

const props = defineProps({
  visible: {
    type: Boolean,
    required: true,
  },
  selectedSchedule: {
    type: String,
    default: null,
  },
  excursionItems: {
    type: Array,
    required: true,
  },
  price: {
    required: true,
  },
});

const selectSchedule = ref(null);
const peopleNumber = ref(1);
const comment = ref(null);

const emit = defineEmits(["closeOrderModel"]);

const newOrderForm = ref("newOrderForm");

const calcPrice = computed(() => {
  return peopleNumber.value * props.price;
});

const getSelectScheduleOptions = computed(() => {
  const rawExcursionItems = toRaw(props.excursionItems);
  const newKeys = { id: "value", start_date: "label" };
  const selectOptions = Array.from(rawExcursionItems, (excursionItem) =>
    renameKeys(excursionItem, newKeys)
  );
  return Array.from(selectOptions, (option) => {
    option.label = convertStartDate(option.label);
    return option;
  });
});

const renameKeys = (obj, newKeys) => {
  const keyValues = Object.keys(obj).map((key) => {
    const newKey = newKeys[key] || key;
    return { [newKey]: obj[key] };
  });
  return Object.assign({}, ...keyValues);
};

const convertStartDate = (startDate) => {
  return capitalizeFirstLetter(dayjs(startDate).format("dd, DD.MM.YYYY HH:mm"));
};

const capitalizeFirstLetter = (string) => {
  return string.charAt(0).toUpperCase() + string.slice(1);
};

const closeOrderModelEmitFunc = () => {
  emit("closeOrderModel");
};

watch(
  () => props.visible,
  (newValue) => {
    if (newValue) {
      selectSchedule.value = props.selectedSchedule;
    } else {
      selectSchedule.value = null;
      peopleNumber.value = 1;
      comment.value = null;
    }
  }
);

const submitCreateOrder = async () => {
  await store.dispatch("setShow", true);

  await axios
    .post("/order/planned", {
      excursion_item_id: selectSchedule.value,
      people_number: peopleNumber.value,
      comment: comment.value,
    })
    .then((response) => {
      if (response.status === 201) {
        toast.success("Замовлення створене!");
      }
    })
    .catch(async (error) => {
      if (
        error.response.status === 422 &&
        error.response.data.message === "Excursion is not activated"
      ) {
        toast.error("Дана екскурсія не активна!");
      } else if (
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
  closeOrderModelEmitFunc();
};
</script>

<style scoped>
p {
  margin: 0;
}

.price {
  font-size: 25px;
  font-weight: 500;
  color: #ffb947;
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

.invalid-multiselect {
  --ms-border-color: var(--bs-danger);
}

.invalid-multiselect-feedback {
  width: 100%;
  margin-top: 0.25rem;
  font-size: 0.875em;
  color: var(--bs-danger-text);
}
</style>
