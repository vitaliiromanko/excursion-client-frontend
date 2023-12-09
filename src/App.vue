<template>
  <div class="main-container">
    <spinner-component v-if="showSpinner" />
    <navbar-component />
    <router-view />
    <footer-component />
  </div>
</template>

<script setup>
import NavbarComponent from "@/components/navbar/NavbarComponent.vue";
import FooterComponent from "@/components/navbar/FooterComponent.vue";
import SpinnerComponent from "@/components/basic/SpinnerComponent.vue";
import { computed, watch } from "vue";
import { useStore } from "vuex";

const store = useStore();
const showSpinner = computed(() => store.state.spinner.show);

watch(showSpinner, (newValue) => {
  hiddenBody(newValue);
});

const hiddenBody = (value) => {
  if (value) {
    document.body.style.overflowY = "hidden";
  } else {
    document.body.style.overflowY = null;
  }
};
</script>

<style>
.main-container {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
}
</style>
