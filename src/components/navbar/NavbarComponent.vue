<template>
  <header class="p-3 mb-3 border-bottom">
    <div class="container">
      <div class="row align-items-center">
        <div class="col-md-3 navbar-logo">
          <div class="d-flex justify-content-between">
            <div>
              <router-link to="/">
                <img
                  class="main-icon-size"
                  src="@/assets/images/logo.jpg"
                  alt="mdo"
                />
              </router-link>
            </div>

            <div v-if="windowSize.width.value <= 767">
              <menu-component />
            </div>
          </div>
        </div>

        <div class="col-md-6 navbar-search">
          <form
            class="px-3 search-form"
            role="search"
            @submit.prevent="submitSearchExcursion"
          >
            <div class="input-group">
              <input
                v-model="search"
                type="search"
                class="form-control"
                placeholder="Введіть назву екскурсії"
                aria-label="Введіть назву екскурсії"
              />
              <button class="btn btn-primary" type="submit">Пошук</button>
            </div>
          </form>
        </div>

        <div v-if="windowSize.width.value > 767" class="col-md-3">
          <menu-component />
        </div>
      </div>
    </div>
  </header>
</template>

<script setup>
import { computed, ref, watch } from "vue";
import { useStore } from "vuex";
import { useRouter } from "vue-router";
import MenuComponent from "@/components/basic/MenuComponent.vue";
import { useWindowSize } from "@vueuse/core";

const store = useStore();
const windowSize = useWindowSize();

const usedFilter = computed(() => store.state.search.usedFilter);

const search = ref(null);

const router = useRouter();

watch(usedFilter, async (newValue) => {
  if (newValue) {
    search.value = null;
    await store.dispatch("setUsedFilter", false);
  }
});

const submitSearchExcursion = () => {
  router.push({ name: "search", query: { search: search.value } });
};
</script>

<style scoped>
@media only screen and (max-width: 767px) {
  .navbar-logo {
    margin-bottom: 10px;
    text-align: center;
  }

  .search-form {
    padding: 0 !important;
  }
}
</style>
