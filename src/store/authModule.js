export const authModule = {
  state: () => ({
    isAuth: false,
  }),
  getters: {},
  mutations: {
    setIsAuth(state, isAuth) {
      state.isAuth = isAuth;
    },
  },
  actions: {
    setIsAuth({ commit }, isAuth) {
      commit("setIsAuth", isAuth);
    },
  },
};
