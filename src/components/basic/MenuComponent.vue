<template>
  <div class="navbar-client">
    <div v-if="isAuth" class="d-inline-block">
      <div
        class="dropdown text-end"
        @click="showMenu === true ? $event.stopPropagation() : null"
      >
        <a
          @click="showMenuFunc"
          :class="{ show: showMenu }"
          class="d-block link-dark text-decoration-none dropdown-toggle"
          data-bs-toggle="dropdown"
          :aria-expanded="showMenu"
        >
          <img
            v-if="clientPhoto === null"
            src="@/assets/images/default_user_photo.jpg"
            alt="mdo"
            class="rounded-circle nav-icon-size"
          />
          <img
            v-else
            :src="clientPhoto"
            alt="mdo"
            class="rounded-circle nav-icon-size"
          />
        </a>
        <ul
          ref="innerRect"
          :class="{ show: showMenu, 'ul-active': showMenu }"
          class="dropdown-menu text-small"
        >
          <li>
            <router-link
              to="/order"
              @click="closeMenuFunc"
              class="dropdown-item"
              >Мої замовлення</router-link
            >
          </li>
          <li>
            <router-link
              to="/profile"
              @click="closeMenuFunc"
              class="dropdown-item"
              >Профіль</router-link
            >
          </li>
          <li>
            <hr class="dropdown-divider" />
          </li>
          <li>
            <router-link
              to="/login"
              @click="closeMenuFunc"
              class="dropdown-item"
              >Вийти</router-link
            >
          </li>
        </ul>
      </div>
    </div>

    <div v-else>
      <router-link to="/login">Увійти</router-link>
    </div>
  </div>
</template>

<script setup>
import { computed, ref } from "vue";
import { useStore } from "vuex";
import "bootstrap/js/src/dropdown";
import "bootstrap";

const showMenu = ref(false);
const innerRect = ref(null);

const store = useStore();
const isAuth = computed(() => store.state.auth.isAuth);
const clientPhoto = computed(() => store.state.client.clientData.client_photo);

const showMenuFunc = () => {
  showMenu.value = !showMenu.value;
};

const closeMenuFunc = () => {
  showMenu.value = false;
};
</script>

<style scoped>
.navbar-client {
  text-align: right;
}

@media only screen and (max-width: 767px) {
  .navbar-client {
    margin-top: 10px;
    text-align: center;
  }
}
</style>
