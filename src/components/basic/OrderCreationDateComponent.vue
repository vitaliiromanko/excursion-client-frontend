<template>
  <p>{{ getCreationDate }}</p>
</template>

<script setup>
import { computed } from "vue";
import dayjs from "dayjs";

const props = defineProps({
  creationDate: {
    type: String,
    required: true,
  },
});

const getCreationDate = computed(() => {
  return dayjs(props.creationDate).format("DD.MM.YYYY HH:mm");
});
</script>

<style scoped>
p {
  margin: 0;
}
</style>
