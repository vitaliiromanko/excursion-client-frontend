<template>
  <div class="form-container">
    <Form @submit="submit" v-slot="{ errors }">
      <div class="text-center">
        <h1 class="h3 mb-3 fw-normal">Відновлення пароля</h1>
      </div>

      <div class="mb-4">
        <label for="email" class="form-label mb-1">Електронна пошта</label>
        <Field
          v-model="email"
          name="email"
          type="email"
          class="form-control position-relative"
          id="email"
          aria-describedby="email"
          placeholder="Введіть електронну пошту"
          rules="required|email"
          :class="{ 'is-invalid': errors.email }"
        />

        <ErrorMessage
          name="email"
          as="div"
          class="invalid-feedback position-absolute m-0 text-end"
        />
      </div>

      <div>
        <button class="w-100 btn btn-lg btn-primary" type="submit">
          Надіслати
        </button>
      </div>

      <div class="mt-3 text-center">
        <router-link to="/login">Авторизуватися</router-link>
      </div>
    </Form>
  </div>
</template>

<script setup>
import { ref } from "vue";
import axios from "axios";
import { ErrorMessage, Form, Field } from "vee-validate";
import { toast } from "vue3-toastify";
import { useRouter } from "vue-router";
import store from "@/store";

const email = ref();

const router = useRouter();

const submit = async () => {
  await store.dispatch("setShow", true);

  await axios
    .post("/auth/forgot", {
      email: email.value,
    })
    .then(async (response) => {
      if (response.status === 200) {
        toast.success(
          "Лист з посиланням для відновлення пароля надіслано на вашу електронну пошту."
        );
        await router.push("/login");
      }
    })
    .catch((error) => {
      if (
        error.response.status === 400 &&
        error.response.data.message === "Email is invalid"
      ) {
        toast.error(
          "За вказаною електронною поштою облікового запису не знайдено!"
        );
      } else {
        toast.error("Трапилася помилка! Спробуйте перезавантажити сторінку.");
      }
    });

  await store.dispatch("setShow", false);
};
</script>

<style scoped>
.form-container {
  width: 330px;
  padding: 10px;
  margin: auto;
}
</style>
