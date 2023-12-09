<template>
  <div class="row p-2 border rounded">
    <div class="col-lg-3 my-auto">
      <img
        ref="image"
        class="img-fluid img-responsive rounded product-image"
        :src="order.excursion.photo"
        alt="excursion_image"
        :style="{ height: imageWidth.width.value * 0.6 + 'px' }"
      />
    </div>

    <div class="col-lg-6 main-data-container">
      <div class="d-flex align-items-end mb-1">
        <div class="me-2">
          <p>Статус:</p>
        </div>

        <div>
          <template
            v-if="
              orderStatus === 'СКАСОВАНО КЛІЄНТОМ' ||
              orderStatus === 'СКАСОВАНО ОРГАНІЗАТОРОМ'
            "
          >
            <order-status-component :status="orderStatus" />
          </template>

          <template v-else>
            <template
              v-if="
                order.excursion_blocked === true ||
                order.organizer_blocked === true
              "
            >
              <order-status-component status="ЕКСКУРСІЯ ЗАБЛОКОВАНА" />
            </template>

            <template v-else>
              <order-status-component :status="orderStatus" />
            </template>
          </template>
        </div>
      </div>

      <div class="mb-2">
        <div>
          <order-creation-date-component :creation-date="order.creation_date" />
        </div>
      </div>

      <div class="mb-1">
        <router-link class="link" :to="'/excursion/' + order.excursion.id">
          <h3 class="name">
            {{ order.excursion.name }}
          </h3>
        </router-link>
      </div>

      <div class="d-flex align-items-end mb-1">
        <div class="me-2">
          <p>Кількість учасників:</p>
        </div>

        <div>
          <p>{{ order.people_number }}</p>
        </div>
      </div>

      <div class="d-flex flex-wrap align-items-end mb-1">
        <div class="me-2">
          <p>Дата екскурсії:</p>
        </div>

        <div>
          <order-start-date-component
            :start-date="order.excursion.start_date"
          />
        </div>
      </div>

      <div class="d-flex align-items-end mb-1">
        <div class="me-2">
          <p>Ціна:</p>
        </div>

        <div>
          <p class="price">₴{{ order.price }}</p>
        </div>
      </div>
    </div>

    <div class="col-lg-3 my-auto">
      <div class="d-flex flex-column">
        <button
          class="btn btn-danger"
          type="button"
          :disabled="
            orderStatus === 'ВИКОНАНО' ||
            orderStatus === 'СКАСОВАНО КЛІЄНТОМ' ||
            orderStatus === 'СКАСОВАНО ОРГАНІЗАТОРОМ'
          "
          @click="visibleCancelOrderModel = true"
        >
          Скасувати
        </button>
      </div>
    </div>
  </div>

  <cancel-order-model-component
    :order-id="order.id"
    :visible="visibleCancelOrderModel"
    @close-model="visibleCancelOrderModel = false"
    @cansel-status="canselStatusFunc"
  />
</template>

<script setup>
import { ref, watch } from "vue";
import { useElementSize } from "@vueuse/core";
import OrderStatusComponent from "@/components/basic/OrderStatusComponent.vue";
import OrderCreationDateComponent from "@/components/basic/OrderCreationDateComponent.vue";
import OrderStartDateComponent from "@/components/basic/OrderStartDateComponent.vue";
import CancelOrderModelComponent from "@/components/order/CancelOrderModelComponent.vue";

const props = defineProps({
  order: {
    required: true,
  },
});

const image = ref(null);
const imageWidth = useElementSize(image);

const visibleCancelOrderModel = ref(false);

const orderStatus = ref(props.order.status);

const canselStatusFunc = (status) => {
  orderStatus.value = status;
};

watch(visibleCancelOrderModel, (newValue) => {
  if (newValue) {
    document.body.style.overflowY = "hidden";
  } else {
    document.body.style.overflowY = null;
  }
});
</script>

<style scoped>
h3,
p {
  margin: 0;
}
.name {
  -webkit-box-orient: vertical;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  overflow: hidden;
  font-size: 23px;
}

.product-image {
  width: 100%;
  object-fit: cover;
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

.price {
  font-weight: 500;
  font-size: 25px;
  color: #ffb947;
}

@media only screen and (max-width: 991px) {
  .main-data-container {
    margin: 15px 0;
  }
}
</style>
