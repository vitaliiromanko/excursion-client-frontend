<template>
  <CModal
    backdrop="static"
    alignment="center"
    size="lg"
    :visible="visible"
    @close="closeModelEmitFunc"
  >
    <CModalHeader>
      <CModalTitle>Скасування замовлення</CModalTitle>
    </CModalHeader>

    <Form @submit="submitCancelOrder" v-slot="{ errors }">
      <CModalBody>
        <div class="row">
          <div class="col-md-12">
            <div class="mb-2">
              <label for="reasonTextarea" class="form-label mb-1"
                >Причина скасування замовлення</label
              >
              <Field
                v-model="reason"
                as="textarea"
                name="reason"
                :class="{ 'is-invalid': errors.reason }"
                class="form-control position-relative"
                rules="notOnlySpace"
                id="reasonTextarea"
                placeholder="Введіть причину скасування замовлення (необов'язково)"
                rows="7"
              />

              <ErrorMessage
                name="reason"
                as="div"
                class="invalid-feedback position-absolute m-0 text-end"
              />
            </div>
          </div>
        </div>
      </CModalBody>

      <CModalFooter class="d-flex justify-content-center">
        <button class="btn btn-danger" type="submit">Скасувати</button>
      </CModalFooter>
    </Form>
  </CModal>
</template>

<script setup>
import { Field, Form, ErrorMessage } from "vee-validate";
import { ref } from "vue";
import {
  CModal,
  CModalHeader,
  CModalFooter,
  CModalTitle,
  CModalBody,
} from "@coreui/bootstrap-vue";
import axios from "axios";
import store from "@/store";
import { toast } from "vue3-toastify";

const props = defineProps({
  visible: {
    type: Boolean,
    required: true,
  },
  orderId: {
    type: String,
    required: true,
  },
});

const reason = ref(null);

const emit = defineEmits(["closeModel", "canselStatus"]);

const closeModelEmitFunc = () => {
  reason.value = null;
  emit("closeModel");
};

const submitCancelOrder = async () => {
  await store.dispatch("setShow", true);

  await axios
    .put("/order/cancel", {
      order_id: props.orderId,
      reason: reason.value,
    })
    .then((response) => {
      if (response.status === 200) {
        emit("canselStatus", response.data.order_status);
      }
    })
    .catch(() => {
      toast.error("Трапилася помилка! Спробуйте перезавантажити сторінку.");
    });

  await store.dispatch("setShow", false);
  closeModelEmitFunc();
};
</script>

<style scoped></style>
