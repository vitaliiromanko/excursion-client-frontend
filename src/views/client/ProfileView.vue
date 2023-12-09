<template>
  <div class="container-xl px-4 mt-4">
    <div class="row">
      <div class="col-md-4">
        <div class="card mb-4 mb-xl-0">
          <div class="card-header">
            <div><strong>Фото профілю</strong></div>
          </div>
          <div class="card-body text-center">
            <div class="circular-landscape">
              <img
                v-if="clientProfileData.client_photo === null"
                class="circular_image mb-2"
                src="@/assets/images/default_user_photo.jpg"
                alt=""
              />
              <img
                v-else
                class="circular_image mb-2"
                :src="clientProfileData.client_photo"
                alt=""
              />
            </div>

            <div class="small font-italic text-muted mb-4">
              JPG або PNG не більше, ніж 5 MB
            </div>

            <div class="mb-3">
              <label for="formFile" class="form-label"
                >Завантажити нове фото</label
              >
              <input
                @change="handleImage"
                class="form-control position-relative"
                :class="{ 'is-invalid': isImageInvalid }"
                type="file"
                id="formFile"
              />

              <div
                v-if="isImageInvalid"
                class="invalid-feedback position-absolute m-0 text-end"
              >
                Файл не відповідає поставленим вимогам!
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="col-md-8">
        <div class="card mb-4">
          <div class="card-header d-flex justify-content-between flex-wrap">
            <div class="pe-3"><strong>Дані профілю</strong></div>

            <div>
              Статус акаунта:
              <span
                class="fw-bold"
                :class="{
                  'text-success':
                    clientProfileData.client_status === 'АКТИВНИЙ',
                  'text-warning':
                    clientProfileData.client_status === 'НЕ АКТИВОВАНИЙ',
                  'text-danger':
                    clientProfileData.client_status === 'ЗАБЛОКОВАНИЙ',
                }"
                >{{ clientProfileData.client_status }}</span
              >
            </div>
          </div>

          <div class="card-body">
            <Form @submit="submitProfileData" v-slot="{ errors }">
              <div class="row gx-3">
                <div class="col-md-6 mb-3">
                  <div>
                    <label class="small mb-1" for="inputFirstName">Ім'я</label>
                    <Field
                      id="inputFirstName"
                      name="firstName"
                      v-model="clientProfileData.first_name"
                      :class="{ 'is-invalid': errors.firstName }"
                      class="form-control position-relative"
                      placeholder="Введіть ваше ім'я"
                      rules="required|notOnlySpace|nameMinLength|nameMaxLength"
                      type="text"
                    />

                    <ErrorMessage
                      name="firstName"
                      as="div"
                      class="invalid-feedback position-absolute m-0 text-end"
                    />
                  </div>
                </div>

                <div class="col-md-6 mb-3">
                  <div>
                    <label class="small mb-1" for="inputLastName"
                      >Прізвище</label
                    >
                    <Field
                      id="inputLastName"
                      name="lastName"
                      v-model="clientProfileData.last_name"
                      :class="{ 'is-invalid': errors.lastName }"
                      class="form-control position-relative"
                      placeholder="Введіть ваше прізвище"
                      rules="required|notOnlySpace|nameMinLength|nameMaxLength"
                      type="text"
                    />

                    <ErrorMessage
                      name="lastName"
                      as="div"
                      class="invalid-feedback position-absolute m-0 text-end"
                    />
                  </div>
                </div>

                <div class="col-md-6 mb-3">
                  <div>
                    <label class="small mb-1" for="inputPatronymic"
                      >По батькові</label
                    >
                    <Field
                      id="inputPatronymic"
                      name="patronymic"
                      v-model="clientProfileData.patronymic"
                      :class="{ 'is-invalid': errors.patronymic }"
                      class="form-control position-relative"
                      placeholder="Введіть по батькові (необов'язково)"
                      rules="notOnlySpace|nameMinLength|nameMaxLength"
                      type="text"
                    />

                    <ErrorMessage
                      name="patronymic"
                      as="div"
                      class="invalid-feedback position-absolute m-0 text-end"
                    />
                  </div>
                </div>
              </div>

              <div class="row gx-3">
                <div class="col-md-12 mb-3">
                  <div>
                    <label class="small mb-1" for="inputEmailAddress"
                      >Електронна пошта</label
                    >
                    <Field
                      id="inputEmailAddress"
                      name="email"
                      v-model="clientProfileData.email"
                      :class="{ 'is-invalid': errors.email }"
                      class="form-control position-relative"
                      placeholder="Введіть електронну пошту"
                      rules="required|email"
                      type="email"
                    />

                    <ErrorMessage
                      name="email"
                      as="div"
                      class="invalid-feedback position-absolute m-0 text-end"
                    />
                  </div>
                </div>
              </div>

              <div class="row gx-3">
                <div class="col-md-6 mb-3">
                  <div>
                    <label class="small mb-1" for="inputPhone"
                      >Номер телефону</label
                    >
                    <Field
                      id="inputPhone"
                      name="phoneNumber"
                      v-model="clientProfileData.phone_number"
                      :class="{ 'is-invalid': errors.phoneNumber }"
                      class="form-control position-relative"
                      placeholder="Введіть номер телефону (необов'язково)"
                      rules="phoneNumber"
                      type="tel"
                    />

                    <ErrorMessage
                      name="phoneNumber"
                      as="div"
                      class="invalid-feedback position-absolute m-0 text-end"
                    />
                  </div>
                </div>

                <div class="col-md-6 mb-4">
                  <div>
                    <label class="small mb-1" for="inputBirthday"
                      >Дата народження</label
                    >
                    <Field
                      id="inputBirthday"
                      name="birthday"
                      v-model="clientBirthday"
                      :class="{ 'is-invalid': errors.birthday }"
                      :min="minBirthday"
                      :max="maxBirthday"
                      class="form-control position-relative"
                      placeholder="Введіть дату народження (необов'язково)"
                      rules="minBirthday|maxBirthday"
                      type="date"
                    />

                    <ErrorMessage
                      name="birthday"
                      as="div"
                      class="invalid-feedback position-absolute m-0 text-end"
                    />
                  </div>
                </div>
              </div>

              <div class="d-flex">
                <div>
                  <button class="btn btn-primary" type="submit">
                    Зберегти зміни
                  </button>
                </div>

                <div
                  v-if="clientProfileData.client_status === 'НЕ АКТИВОВАНИЙ'"
                  class="ms-3"
                >
                  <button
                    class="btn btn-warning"
                    type="button"
                    @click="sendActivationCodeAgain"
                  >
                    Надісляти код активації знову
                  </button>
                </div>
              </div>
            </Form>
          </div>
        </div>
      </div>
    </div>

    <div class="row">
      <div class="ms-auto col-md-8">
        <div class="card mb-4">
          <div class="card-header d-flex justify-content-between">
            <div><strong>Змінити пароль</strong></div>
          </div>

          <div class="card-body">
            <Form
              @submit="submitChangePassword"
              v-slot="{ errors }"
              ref="passwordForm"
            >
              <div class="row gx-3">
                <div class="col-md-6 mb-3">
                  <div>
                    <label class="small mb-1" for="inputOldPassword"
                      >Поточний пароль</label
                    >
                    <Field
                      id="inputOldPassword"
                      name="password"
                      v-model="clientProfilePasswordData.old_password"
                      :class="{ 'is-invalid': errors.password }"
                      class="form-control position-relative"
                      placeholder="Введіть поточний пароль"
                      rules="required|notOnlySpace|passwordLength"
                      type="password"
                    />

                    <ErrorMessage
                      name="password"
                      as="div"
                      class="invalid-feedback position-absolute m-0 text-end"
                    />
                  </div>
                </div>
              </div>

              <div class="row gx-3">
                <div class="col-md-6 mb-3">
                  <div>
                    <label class="small mb-1" for="inputNewPassword"
                      >Новий пароль</label
                    >
                    <Field
                      id="inputNewPassword"
                      name="newPassword"
                      v-model="clientProfilePasswordData.new_password"
                      :class="{ 'is-invalid': errors.newPassword }"
                      class="form-control position-relative"
                      placeholder="Введіть новий пароль"
                      rules="required|notOnlySpace|passwordLength"
                      type="password"
                    />

                    <ErrorMessage
                      name="newPassword"
                      as="div"
                      class="invalid-feedback position-absolute m-0 text-end"
                    />
                  </div>
                </div>

                <div class="col-md-6 mb-4">
                  <div>
                    <label class="small mb-1" for="inputConfirmNewPassword"
                      >Підтвердження нового пароля</label
                    >
                    <Field
                      id="inputConfirmNewPassword"
                      name="newPasswordConfirm"
                      v-model="clientProfilePasswordData.new_password_confirm"
                      :class="{ 'is-invalid': errors.newPasswordConfirm }"
                      class="form-control position-relative"
                      placeholder="Введіть підтвердження нового паролю"
                      rules="required|notOnlySpace|passwordLength|confirmed:newPassword"
                      type="password"
                    />

                    <ErrorMessage
                      name="newPasswordConfirm"
                      as="div"
                      class="invalid-feedback position-absolute m-0 text-end"
                    />
                  </div>
                </div>
              </div>

              <button class="btn btn-primary" type="submit">
                Зберегти новий пароль
              </button>
            </Form>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { Field, Form, ErrorMessage } from "vee-validate";
import { computed, reactive, ref, watch } from "vue";
import store from "@/store";
import axios from "axios";
import dayjs from "dayjs";
import { toast } from "vue3-toastify";
import { useRouter } from "vue-router";

const clientData = computed(() => store.state.client.clientData);
const clientProfileData = reactive({
  first_name: clientData.value.first_name,
  last_name: clientData.value.last_name,
  patronymic: clientData.value.patronymic,
  email: clientData.value.email,
  phone_number: clientData.value.phone_number,
  birthday: clientData.value.birthday,
  client_photo: clientData.value.client_photo,
  client_status: clientData.value.client_status,
});
const clientProfilePasswordData = reactive({
  old_password: null,
  new_password: null,
  new_password_confirm: null,
});

let loadImageEvent = null;

const passwordForm = ref("passwordForm");

const isImageInvalid = ref(false);
const previousImage = computed(() => clientData.value.client_photo);

const clientBirthday = ref(clientData.value.birthday);

const router = useRouter();

const minBirthday = computed(() => {
  const date = new Date();
  date.setFullYear(date.getFullYear() - 150);
  return dayjs(date).format("YYYY-MM-DD");
});

const maxBirthday = computed(() => {
  const date = new Date();
  date.setFullYear(date.getFullYear() - 5);
  return dayjs(date).format("YYYY-MM-DD");
});

watch(clientData, (newValue) => {
  clientProfileData.first_name = newValue.first_name;
  clientProfileData.last_name = newValue.last_name;
  clientProfileData.patronymic = newValue.patronymic;
  clientProfileData.email = newValue.email;
  clientProfileData.phone_number = newValue.phone_number;
  clientProfileData.birthday = newValue.birthday;
  clientProfileData.client_photo = newValue.client_photo;
  clientProfileData.client_status = newValue.client_status;
});

watch(clientBirthday, (newValue) => {
  clientProfileData.birthday = newValue;
});

const handleImage = (e) => {
  const selectedImage = e.target.files[0];
  if (selectedImage === undefined) {
    isImageInvalid.value = false;
    clientProfileData.client_photo = previousImage.value;
  } else {
    const ext = selectedImage.name.split(".").pop();
    if (ext === "jpg" || ext === "png") {
      if (selectedImage.size / 1024 / 1024 <= 5) {
        isImageInvalid.value = false;
        loadImageEvent = e;
        createBase64Image(selectedImage);
      } else {
        isImageInvalid.value = true;
        clientProfileData.client_photo = previousImage.value;
      }
    } else {
      isImageInvalid.value = true;
      clientProfileData.client_photo = previousImage.value;
    }
  }
};

const createBase64Image = (fileObject) => {
  const reader = new FileReader();
  reader.onload = (e) => {
    clientProfileData.client_photo = e.target.result;
  };
  reader.readAsDataURL(fileObject);
};

const submitProfileData = async () => {
  if (isImageInvalid.value) {
    return;
  }

  await store.dispatch("setShow", true);

  await axios
    .put("/profile/update-data", {
      first_name: clientProfileData.first_name,
      last_name: clientProfileData.last_name,
      patronymic: clientProfileData.patronymic,
      email: clientProfileData.email,
      phone_number: clientProfileData.phone_number,
      birthday: clientProfileData.birthday,
      client_photo: clientProfileData.client_photo,
    })
    .then(async (response) => {
      if (response.status === 200) {
        toast.success("Ваші дані успішно збережені!");

        await store.dispatch("setClientData", {
          id: store.state.client.clientData.id,
          first_name: clientProfileData.first_name,
          last_name: clientProfileData.last_name,
          patronymic: clientProfileData.patronymic,
          email: clientProfileData.email,
          phone_number: clientProfileData.phone_number,
          birthday: clientProfileData.birthday,
          client_photo: clientProfileData.client_photo,
          client_status: clientProfileData.client_status,
        });
        await store.dispatch("setClientStatus", response.data.client_status);
        clientProfileData.client_status = response.data.client_status;

        if (loadImageEvent !== null) {
          loadImageEvent.target.value = null;
        }
      }
    })
    .catch((error) => {
      if (
        error.response.status === 409 &&
        error.response.data.message === "Email is already used"
      ) {
        toast.error(
          "Вказана вами електронна пошта вже зареєстрована в системі!"
        );
      } else {
        toast.error("Трапилася помилка! Спробуйте перезавантажити сторінку.");
      }
    });

  await store.dispatch("setShow", false);
};

const submitChangePassword = async () => {
  await store.dispatch("setShow", true);

  await axios
    .put("/profile/update-password", {
      old_password: clientProfilePasswordData.old_password,
      new_password: clientProfilePasswordData.new_password,
    })
    .then((response) => {
      if (response.status === 200) {
        toast.success("Ваш новий пароль успішно збережений!");
        passwordForm.value.resetForm();
      }
    })
    .catch((error) => {
      if (
        error.response.status === 400 &&
        error.response.data.message === "Password is invalid"
      ) {
        toast.error("Ви некоректно ввели попередній пароль!");
      } else {
        toast.error("Трапилася помилка! Спробуйте перезавантажити сторінку.");
      }
    });

  await store.dispatch("setShow", false);
};

const sendActivationCodeAgain = async () => {
  await store.dispatch("setShow", true);

  await axios
    .post("/auth/activation-token-again", {
      client_id: store.state.client.clientData.id,
    })
    .then((response) => {
      if (response.status === 200) {
        toast.success(
          "Новий код активації надісланий на вказану електронну пошту."
        );
      }
    })
    .catch(async (error) => {
      if (
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
};
</script>

<style scoped>
body {
  margin-top: 20px;
  background-color: #f2f6fc;
  color: #69707a;
}
.circular_image {
  width: 200px;
  height: 200px;
  border-radius: 50%;
  overflow: hidden;
  display: inline-block;
  vertical-align: middle;
}
.circular_image img {
  width: 100%;
}
.card {
  box-shadow: 0 0.15rem 1.75rem 0 rgb(33 40 50 / 15%);
}
.card .card-header {
  font-weight: 500;
}
.card-header:first-child {
  border-radius: 0.35rem 0.35rem 0 0;
}
.card-header {
  padding: 1rem 1.35rem;
  margin-bottom: 0;
  background-color: rgba(33, 40, 50, 0.03);
  border-bottom: 1px solid rgba(33, 40, 50, 0.125);
}
.form-control {
  display: block;
  width: 100%;
  padding: 0.875rem 1.125rem;
  font-size: 0.875rem;
  font-weight: 400;
  line-height: 1;
  color: #69707a;
  background-color: #fff;
  background-clip: padding-box;
  border: 1px solid #c5ccd6;
  -webkit-appearance: none;
  -moz-appearance: none;
  appearance: none;
  border-radius: 0.35rem;
  transition: border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out;
}
</style>
