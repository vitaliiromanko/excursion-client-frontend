<template>
  <div class="form-container">
    <Form @submit="submit">
      <div class="text-center">
        <h1 class="h3 mb-3 fw-normal">Реєстрація</h1>
      </div>

      <div class="mb-3">
        <label for="firstName" class="form-label mb-1">Ім'я</label>
        <Field
          v-model="data.first_name"
          name="firstName"
          rules="required|notOnlySpace|nameMinLength|nameMaxLength"
          v-slot="{ field, errorMessage, meta }"
        >
          <input
            v-bind="field"
            type="text"
            class="form-control position-relative"
            id="firstName"
            aria-describedby="firstName"
            placeholder="Введіть ваше ім'я"
            :class="{
              'is-valid': !errorMessage && meta.touched,
              'is-invalid': errorMessage,
            }"
          />

          <div
            v-if="errorMessage"
            class="invalid-feedback position-absolute m-0 text-end"
          >
            {{ errorMessage }}
          </div>
        </Field>
      </div>

      <div class="mb-3">
        <label for="lastName" class="form-label mb-1">Прізвище</label>
        <Field
          v-model="data.last_name"
          name="lastName"
          rules="required|notOnlySpace|nameMinLength|nameMaxLength"
          v-slot="{ field, errorMessage, meta }"
        >
          <input
            v-bind="field"
            type="text"
            class="form-control position-relative"
            id="lastName"
            aria-describedby="lastName"
            placeholder="Введіть ваше прізвище"
            :class="{
              'is-valid': !errorMessage && meta.touched,
              'is-invalid': errorMessage,
            }"
          />

          <div
            v-if="errorMessage"
            class="invalid-feedback position-absolute m-0 text-end"
          >
            {{ errorMessage }}
          </div>
        </Field>
      </div>

      <div class="mb-3">
        <label for="email" class="form-label mb-1">Електронна пошта</label>
        <Field
          v-model="data.email"
          name="email"
          rules="required|email"
          v-slot="{ field, errorMessage, meta }"
        >
          <input
            v-bind="field"
            type="email"
            class="form-control position-relative"
            id="email"
            aria-describedby="email"
            placeholder="Введіть електронну пошту"
            :class="{
              'is-valid': !errorMessage && meta.touched,
              'is-invalid': errorMessage,
            }"
          />

          <div
            v-if="errorMessage"
            class="invalid-feedback position-absolute m-0 text-end"
          >
            {{ errorMessage }}
          </div>
        </Field>
      </div>

      <div class="mb-3">
        <label for="password" class="form-label mb-1">Пароль</label>
        <Field
          v-model="data.password"
          name="password"
          rules="required|notOnlySpace|passwordLength"
          v-slot="{ field, errorMessage, meta }"
        >
          <input
            v-bind="field"
            type="password"
            class="form-control position-relative"
            id="password"
            aria-describedby="password"
            placeholder="Введіть придуманий пароль"
            :class="{
              'is-valid': !errorMessage && meta.touched,
              'is-invalid': errorMessage,
            }"
          />

          <div
            v-if="errorMessage"
            class="invalid-feedback position-absolute m-0 text-end"
          >
            {{ errorMessage }}
          </div>
        </Field>
      </div>

      <div class="mb-4">
        <label for="passwordConfirm" class="form-label mb-1"
          >Підтвердження пароля</label
        >
        <Field
          v-model="data.password_confirm"
          name="passwordConfirm"
          rules="required|notOnlySpace|passwordLength|confirmed:password"
          v-slot="{ field, errorMessage, meta }"
        >
          <input
            v-bind="field"
            type="password"
            class="form-control position-relative"
            id="passwordConfirm"
            aria-describedby="passwordConfirm"
            placeholder="Введіть пароль повторно"
            :class="{
              'is-valid': !errorMessage && meta.touched,
              'is-invalid': errorMessage,
            }"
          />

          <div
            v-if="errorMessage"
            class="invalid-feedback position-absolute m-0 text-end"
          >
            {{ errorMessage }}
          </div>
        </Field>
      </div>

      <div>
        <button class="w-100 btn btn-lg btn-primary" type="submit">
          Зареєструватися
        </button>
      </div>

      <div class="mt-3 text-center">
        <router-link to="/login">Авторизуватися</router-link>
      </div>
    </Form>
  </div>
</template>

<script setup>
import { Field, Form } from "vee-validate";
import { reactive } from "vue";
import { useRouter } from "vue-router";
import axios from "axios";
import { toast } from "vue3-toastify";
import store from "@/store";

const data = reactive({
  first_name: null,
  last_name: null,
  email: null,
  password: null,
  password_confirm: null,
});

const router = useRouter();

const submit = async () => {
  await store.dispatch("setShow", true);

  await axios
    .post("/auth/register", {
      first_name: data.first_name,
      last_name: data.last_name,
      email: data.email,
      password: data.password,
    })
    .then(async (response) => {
      if (response.status === 201) {
        toast.success(
          "Лист з посиланням для активації облікового запису був надісланий вам на електронну пошту."
        );
        await router.push("/login");
      }
    })
    .catch((error) => {
      if (
        error.response.status === 409 &&
        error.response.data.message === "Email is already used"
      ) {
        toast.error("Вказана електронна пошта вже зареєстрована в системі!");
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
