<template>
  <div class="container my-auto">
    <div v-if="orderPage.content.length !== 0">
      <div class="mb-4 text-center">
        <h2>Мої замовлення</h2>
      </div>

      <div class="px-3 mb-4">
        <order-list-component :orders="orderPage.content" />
      </div>

      <div v-if="orderPage.totalPages > 1" class="text-center mb-4">
        <div class="pagination-div">
          <paginate
            v-model="pageNumber"
            :page-range="3"
            :margin-pages="1"
            :prev-text="'<'"
            :next-text="'>'"
            :page-count="orderPage.totalPages"
            :container-class="'pagination'"
          />
        </div>
      </div>
    </div>

    <div v-else>
      <div class="row justify-content-center">
        <div class="col-md-6">
          <div class="p-3 border rounded">
            <div class="text-center mb-3">
              <p class="fs-5">Ви не замовили жодної екскурсіїї.</p>
            </div>

            <div class="d-flex justify-content-center">
              <router-link to="/search" class="btn btn-primary"
                >Пошук екскурсії</router-link
              >
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { onMounted, reactive, ref, watch } from "vue";
import axios from "axios";
import OrderListComponent from "@/components/order/OrderListComponent.vue";
import Paginate from "vuejs-paginate-next";
import store from "@/store";
import { toast } from "vue3-toastify";

const orderPage = reactive({
  content: [],
  totalPages: null,
});

const pageNumber = ref(1);

onMounted(async () => {
  await store.dispatch("setShow", true);

  await axios
    .get("/order/all")
    .then((response) => {
      if (response.status === 200) {
        orderPage.content = response.data.orders.content;
        orderPage.totalPages = response.data.orders.totalPages;
      }
    })
    .catch(() => {
      toast.error("Трапилася помилка! Спробуйте перезавантажити сторінку.");
    });

  await store.dispatch("setShow", false);
});

watch(pageNumber, async (newValue) => {
  await store.dispatch("setShow", true);

  await axios
    .get("/order/all", {
      params: {
        page_number: newValue - 1,
      },
    })
    .then((response) => {
      if (response.status === 200) {
        orderPage.content = response.data.orders.content;
        window.scrollTo(0, 0);
      }
    })
    .catch(() => {
      toast.error("Трапилася помилка! Спробуйте перезавантажити сторінку.");
    });

  await store.dispatch("setShow", false);
});
</script>

<style scoped>
h2,
p {
  margin: 0;
}

.pagination {
  cursor: pointer;
  margin: 0;
}
.pagination-div {
  display: inline-block;
  text-align: center;
}
</style>
