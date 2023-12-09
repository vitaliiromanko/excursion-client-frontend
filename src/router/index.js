import { createRouter, createWebHistory } from "vue-router";
import MainView from "@/views/excursion/MainView.vue";
import LoginView from "@/views/auth/LoginView.vue";
import RegisterView from "@/views/auth/RegisterView.vue";
import ActivateView from "@/views/auth/ActivateView.vue";
import ForgotView from "@/views/auth/ForgotView.vue";
import ResetView from "@/views/auth/ResetView.vue";
import ProfileView from "@/views/client/ProfileView.vue";
import ExcursionView from "@/views/excursion/ExcursionView.vue";
import SearchExcursionView from "@/views/excursion/SearchExcursionView.vue";
import OrderView from "@/views/order/OrderView.vue";
import NotFoundView from "@/views/not_found/NotFoundView.vue";

import axios from "axios";
import store from "@/store/index.js";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      component: MainView,
      beforeEnter(to, from, next) {
        beforeEnterClientPages(next);
      },
    },
    {
      path: "/login",
      component: LoginView,
      beforeEnter(to, from, next) {
        beforeEnterClientAuthPages(next);
      },
    },
    {
      path: "/register",
      component: RegisterView,
      beforeEnter(to, from, next) {
        beforeEnterClientAuthPages(next);
      },
    },
    {
      path: "/activate/:token",
      component: ActivateView,
      beforeEnter(to, from, next) {
        beforeEnterClientAuthPages(next);
      },
    },
    {
      path: "/forgot",
      component: ForgotView,
      beforeEnter(to, from, next) {
        beforeEnterClientAuthPages(next);
      },
    },
    {
      path: "/reset/:token",
      component: ResetView,
      beforeEnter(to, from, next) {
        beforeEnterClientAuthPages(next);
      },
    },
    {
      path: "/profile",
      component: ProfileView,
      beforeEnter(to, from, next) {
        beforeEnterClientRequireAuthPages(next);
      },
    },
    {
      path: "/excursion/:token",
      component: ExcursionView,
      beforeEnter(to, from, next) {
        beforeEnterClientPages(next);
      },
    },
    {
      path: "/search",
      name: "search",
      component: SearchExcursionView,
      beforeEnter(to, from, next) {
        beforeEnterClientPages(next);
      },
    },
    {
      path: "/order",
      component: OrderView,
      beforeEnter(to, from, next) {
        beforeEnterClientRequireAuthPages(next);
      },
    },
    {
      path: "/:pathName(.*)*",
      component: NotFoundView,
      beforeEnter(to, from, next) {
        beforeEnterClientPages(next);
      },
    },
  ],
});

const loadClientData = async () => {
  await store.dispatch("setShow", true);
  try {
    await axios
      .get("/profile", {
        withCredentials: true,
      })
      .then(async (response) => {
        if (response.status === 200) {
          await store.dispatch("setIsAuth", true);
          await store.dispatch("setClientData", response.data);
        }
      });
  } catch (e) {
    await clearClientLoadData();
  }
  await store.dispatch("setShow", false);
};

const logout = async () => {
  await store.dispatch("setShow", true);

  await axios.delete("/auth/logout", { withCredentials: true });
  await clearClientLoadData();

  await store.dispatch("setShow", false);
};

const clearClientLoadData = async () => {
  delete axios.defaults.headers.common["Authorization"];
  await store.dispatch("setIsAuth", false);
  await store.dispatch("clearClientData");
};

const beforeEnterClientPages = (next) => {
  if (!store.state.auth.isAuth) {
    loadClientData().then(() => next());
  } else {
    next();
  }
};

const beforeEnterClientAuthPages = (next) => {
  if (store.state.auth.isAuth) {
    logout().then(() => next());
  } else {
    next();
  }
};

const beforeEnterClientRequireAuthPages = (next) => {
  if (!store.state.auth.isAuth) {
    loadClientData().then(() => {
      if (store.state.auth.isAuth) {
        next();
      } else {
        next("/login");
      }
    });
  } else {
    next();
  }
};

export default router;
