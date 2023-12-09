<template>
  <div
    v-for="(order, index) in orders"
    :key="order.id"
    :class="{ 'mb-3': index !== orders.length - 1 }"
    class="row justify-content-center"
  >
    <div class="col-md-9">
      <order-item-component :order="order" />
    </div>
  </div>
</template>

<script setup>
import OrderItemComponent from "@/components/order/OrderItemComponent.vue";

defineProps({
  orders: {
    type: Array,
    required: true,
  },
});
</script>

<style scoped></style>
