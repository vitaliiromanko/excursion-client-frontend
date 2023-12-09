<template>
  <div class="form-container">
    <Form @submit="submit">
      <div class="text-center">
        <h1 class="h3 mb-3 fw-normal">Відновлення пароля</h1>
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
          Відновити
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
import { useRoute, useRouter } from "vue-router";
import axios from "axios";
import { toast } from "vue3-toastify";
import store from "@/store";

const data = reactive({
  password: null,
  password_confirm: null,
});

const route = useRoute();
const router = useRouter();

const submit = async () => {
  await store.dispatch("setShow", true);

  await axios
    .put("/auth/reset", {
      reset_password_token: route.params.token,
      new_password: data.password,
    })
    .then(async (response) => {
      if (response.status === 200) {
        toast.success("Ваш пароль успішно відновлено!");
        await router.push("/login");
      }
    })
    .catch((error) => {
      if (
        error.response.status === 400 &&
        error.response.data.message === "Reset password token is invalid"
      ) {
        toast.error(
          "Трапилася помилка! Спробуйте повторно скористатися функцією відновлення пароля."
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
