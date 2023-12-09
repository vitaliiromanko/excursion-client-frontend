export const spinnerModule = {
  state: () => ({
    show: false,
  }),
  getters: {},
  mutations: {
    setShow(state, show) {
      state.show = show;
    },
  },
  actions: {
    setShow({ commit }, show) {
      commit("setShow", show);
    },
  },
};
