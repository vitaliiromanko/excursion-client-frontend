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

    <Form @submit="submitCreateOrder" v-slot="{ errors }">
      <CModalBody>
        <div class="row">
          <div class="col-md-12 mb-3">
            <div class="d-flex align-items-end justify-content-center">
              <div class="me-2">
                <p>Вартість:</p>
              </div>

              <div>
                <p class="price">₴{{ price }}</p>
              </div>
            </div>
          </div>
        </div>

        <div class="row">
          <div class="col-md-8 mb-3">
            <div>
              <label class="mb-1" for="inputStartDate"
                >Дата та час екскурсії</label
              >
              <Field
                id="inputStartDate"
                name="startDate"
                v-model="startDate"
                :class="{ 'is-invalid': errors.startDate }"
                :min="currentDataTime"
                class="form-control position-relative"
                placeholder="Введіть дату та час екскурсії"
                rules="required|notPast"
                type="datetime-local"
              />

              <ErrorMessage
                name="startDate"
                as="div"
                class="invalid-feedback position-absolute m-0 text-end"
              />
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
                name="commentTextarea"
                v-model="comment"
                as="textarea"
                class="form-control position-relative"
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
import PeopleNumberComponent from "@/components/basic/PeopleNumberComponent.vue";
import { computed, ref, watch } from "vue";
import axios from "axios";
import store from "@/store";
import { toast } from "vue3-toastify";

const props = defineProps({
  visible: {
    type: Boolean,
    required: true,
  },
  excursionId: {
    type: String,
    required: true,
  },
  price: {
    required: true,
  },
});

const peopleNumber = ref(1);
const comment = ref(null);
const startDate = ref(null);

const emit = defineEmits(["closeOrderModel"]);

const currentDataTime = computed(() => {
  const dataTime = new Date().toLocaleString("sv").replace(" ", "T");
  return dataTime.slice(0, dataTime.length - 3);
});

const closeOrderModelEmitFunc = () => {
  emit("closeOrderModel");
};

watch(
  () => props.visible,
  (newValue) => {
    if (!newValue) {
      peopleNumber.value = 1;
      comment.value = null;
      startDate.value = null;
    }
  }
);

const submitCreateOrder = async () => {
  await store.dispatch("setShow", true);

  await axios
    .post("/order/individual", {
      excursion_id: props.excursionId,
      people_number: peopleNumber.value,
      comment: comment.value,
      start_date: startDate.value,
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
</style>
