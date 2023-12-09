<template>
  <div>
    <p
      class="status"
      :class="{
        'text-success': status === 'ПІДТВЕРДЖЕНО' || status === 'ВИКОНАНО',
        'text-warning': status === 'ОПРАЦЬОВУЄТЬСЯ',
        'text-secondary':
          status === 'СКАСОВАНО КЛІЄНТОМ' ||
          status === 'СКАСОВАНО ОРГАНІЗАТОРОМ',
        'text-danger': status === 'ЕКСКУРСІЯ ЗАБЛОКОВАНА',
      }"
    >
      {{ getStatus }}
    </p>
  </div>
</template>

<script setup>
import { computed } from "vue";

const props = defineProps({
  status: {
    type: String,
    required: true,
  },
});

const getStatus = computed(() => {
  return props.status === "ВІДМОВЛЕНО КЛІЄНТОМ" ? "ВІДМОВЛЕНО" : props.status;
});
</script>

<style scoped>
p {
  margin: 0;
}

.status {
  font-weight: 500;
}
</style>
