<template>
  <div class="form-container">
    <Form @submit="submit" v-slot="{ errors }">
      <div class="text-center">
        <h1 class="h3 mb-3 fw-normal">Авторизація</h1>
      </div>

      <div class="mb-3">
        <label for="email" class="form-label mb-1">Електронна пошта</label>
        <Field
          v-model="data.email"
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

      <div class="mb-4">
        <label for="password" class="form-label mb-1">Пароль</label>
        <Field
          v-model="data.password"
          name="password"
          type="password"
          class="form-control position-relative"
          id="password"
          aria-describedby="password"
          placeholder="Введіть пароль"
          rules="required|notOnlySpace|passwordLength"
          :class="{ 'is-invalid': errors.password }"
        />

        <ErrorMessage
          name="password"
          as="div"
          class="invalid-feedback position-absolute m-0 text-end"
        />
      </div>

      <div>
        <button class="w-100 btn btn-lg btn-primary" type="submit">
          Увійти
        </button>
      </div>

      <div>
        <div class="mt-3 text-center">
          <router-link to="/register">Зареєструватися</router-link>
        </div>
        <div class="mt-1 text-center">
          <router-link to="/forgot">Забули пароль?</router-link>
        </div>
      </div>
    </Form>
  </div>
</template>

<script setup>
import { Field, Form, ErrorMessage } from "vee-validate";
import { reactive } from "vue";
import { useRouter } from "vue-router";
import axios from "axios";
import store from "@/store";
import { toast } from "vue3-toastify";

const data = reactive({
  email: "",
  password: "",
});

const router = useRouter();

const submit = async () => {
  await store.dispatch("setShow", true);
  await axios
    .post("/auth/login", data, {
      withCredentials: true,
    })
    .then((response) => {
      if (response.status === 200) {
        axios.defaults.headers.common[
          "Authorization"
        ] = `Bearer ${response.data.access_token}`;

        axios
          .get("/profile", {
            withCredentials: true,
          })
          .then(async (secondResponse) => {
            if (secondResponse.status === 200) {
              await store.dispatch("setIsAuth", true);
              await store.dispatch("setClientData", secondResponse.data);
              await router.push("/");
            }
          });
      }
    })
    .catch((error) => {
      if (
        error.response.status === 400 &&
        error.response.data.message === "Client email or password is invalid"
      ) {
        toast.error("Ви некоректно ввели електронну пошту чи пароль!");
      } else if (
        error.response.status === 403 &&
        error.response.data.message === "Client is blocked"
      ) {
        toast.error("Ваш обліковий запис заблоковано!");
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
