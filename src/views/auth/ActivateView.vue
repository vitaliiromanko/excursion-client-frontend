<template>
  <div class="container m-auto text-center">
    <div v-if="isActivated">
      <h1 class="h3 mb-3 fw-normal">
        Вітаю, ви супішно активували обліковий запис!
      </h1>

      <div class="mt-4 text-center">
        <router-link to="/" class="btn btn-warning btn-lg"
          >Перейти на головну сторінку</router-link
        >
      </div>
    </div>
  </div>
</template>

<script setup>
import { onMounted, ref } from "vue";
import axios from "axios";
import { useRoute, useRouter } from "vue-router";
import store from "@/store";
import { toast } from "vue3-toastify";

const isActivated = ref(false);
const route = useRoute();
const router = useRouter();

onMounted(async () => {
  await store.dispatch("setShow", true);

  await axios
    .put(
      "/auth/activate",
      {
        activation_token: route.params.token,
      },
      {
        withCredentials: true,
      }
    )
    .then(async (response) => {
      if (response.status === 200) {
        isActivated.value = true;

        axios.defaults.headers.common[
          "Authorization"
        ] = `Bearer ${response.data.access_token}`;

        await axios
          .get("/profile", {
            withCredentials: true,
          })
          .then(async (secondResponse) => {
            if (secondResponse.status === 200) {
              await store.dispatch("setIsAuth", true);
              await store.dispatch("setClientData", secondResponse.data);
            }
          });
      }
    })
    .catch(async (error) => {
      if (
        error.response.status === 400 &&
        error.response.data.message === "Activation token is invalid"
      ) {
        toast.error(
          "Трапилася помилка! Спробуйте авторизуватися та повторно надіслати лист активації акаунта."
        );
        await router.push("/login");
      } else if (
        error.response.status === 403 &&
        error.response.data.message === "Client is blocked"
      ) {
        toast.error("Ваш обліковий запис заблоковано!");
        await router.push("/login");
      } else {
        toast.error("Трапилася помилка! Спробуйте перезавантажити сторінку.");
      }
    });

  await store.dispatch("setShow", false);
});
</script>

<style scoped></style>
