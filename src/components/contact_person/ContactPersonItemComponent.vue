<template>
  <div class="row">
    <div class="col-md-4">
      <div class="mb-2 contact-data">
        <p class="name">
          {{ contactPerson.first_name }} {{ contactPerson.last_name }}
        </p>
      </div>
    </div>

    <div class="col-md-5">
      <div class="mb-2 contact-data">
        <a class="link" :href="'mailto:' + contactPerson.email">{{
          contactPerson.email
        }}</a>
      </div>
    </div>

    <div class="col-md-3">
      <div class="mb-2 contact-data">
        <div
          v-for="(phoneNumber, index) in contactPerson.phone_numbers"
          :key="index"
          :class="{ 'mb-1': index !== contactPerson.phone_numbers.length - 1 }"
        >
          <a class="link" :href="'tel:' + phoneNumber">{{ phoneNumber }}</a>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
defineProps({
  contactPerson: {
    required: true,
  },
});
</script>

<style scoped>
p {
  margin: 0;
}

.name {
  font-weight: 500;
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

@media only screen and (max-width: 767px) {
  .contact-data {
    text-align: center;
  }
}
</style>
