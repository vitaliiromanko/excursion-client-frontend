import { createStore } from "vuex";
import { clientModule } from "@/store/clientModule";
import { authModule } from "@/store/authModule";
import { searchModule } from "@/store/searchModule";
import { spinnerModule } from "@/store/spinnerModule";

export default createStore({
  modules: {
    client: clientModule,
    auth: authModule,
    search: searchModule,
    spinner: spinnerModule,
  },
});
