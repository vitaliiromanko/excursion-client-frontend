<template>
  <div class="container">
    <div class="d-flex justify-content-center my-auto px-3">
      <div class="my-5 page-container">
        <div class="text-center w-100">
          <img class="w-100" src="@/assets/images/404-error.png" alt="404" />
        </div>

        <div class="mt-3 text-center">
          <h2>Такої сторінки не знайдено</h2>
        </div>

        <div class="mt-3 text-center">
          <p>
            Можливо ви неправильно набрали адресу або такої сторінки не існує
          </p>
        </div>

        <div class="mt-4 text-center">
          <router-link to="/" class="btn btn-warning btn-lg"
            >Перейти на головну сторінку</router-link
          >
        </div>
      </div>
    </div>
  </div>
</template>

<script setup></script>

<style scoped>
.page-container {
  width: 100%;
  max-width: 550px;
}
</style>
