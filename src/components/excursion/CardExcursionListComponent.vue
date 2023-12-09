<template>
  <div class="row">
    <card-excursion-item-component
      v-for="excursion in excursions"
      :key="excursion.excursion_id"
      :excursion="excursion"
    />
  </div>
</template>

<script setup>
import CardExcursionItemComponent from "@/components/excursion/CardExcursionItemComponent.vue";

defineProps({
  excursions: Array,
});
</script>

<style scoped></style>
