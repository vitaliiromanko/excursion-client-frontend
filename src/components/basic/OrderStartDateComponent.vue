<template>
  <p>{{ getStartDate }}</p>
</template>

<script setup>
import { computed } from "vue";
import dayjs from "dayjs";
import "dayjs/locale/uk";

dayjs.locale("uk");

const props = defineProps({
  startDate: {
    type: String,
    required: true,
  },
});

const getStartDate = computed(() => {
  return dayjs(props.startDate).format("dd, DD.MM.YYYY HH:mm");
});
</script>

<style scoped>
p {
  margin: 0;
}
</style>
