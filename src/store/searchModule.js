export const searchModule = {
  state: () => ({
    usedFilter: false,
  }),
  getters: {},
  mutations: {
    setUsedFilter(state, usedFilter) {
      state.usedFilter = usedFilter;
    },
  },
  actions: {
    setUsedFilter({ commit }, usedFilter) {
      commit("setUsedFilter", usedFilter);
    },
  },
};
