<template>
  <div
    v-for="(contactPerson, index) in contactPeople"
    :key="contactPerson.id"
    :class="{
      'mt-2': index !== 0,
      'pb-2 border-bottom': index !== contactPeople.length - 1,
    }"
  >
    <contact-person-item-component :contact-person="contactPerson" />
  </div>
</template>

<script setup>
import ContactPersonItemComponent from "@/components/contact_person/ContactPersonItemComponent.vue";

defineProps({
  contactPeople: {
    type: Array,
    required: true,
  },
});
</script>

<style scoped></style>
