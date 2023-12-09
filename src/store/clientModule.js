export const clientModule = {
  state: () => ({
    clientData: {
      id: "",
      first_name: "",
      last_name: "",
      patronymic: "",
      email: "",
      phone_number: "",
      birthday: "",
      client_photo: "",
      client_status: "",
    },
  }),
  getters: {},
  mutations: {
    setClientData(state, clientData) {
      state.clientData = clientData;
    },
    clearClientData(state) {
      state.clientData = {
        id: "",
        first_name: "",
        last_name: "",
        patronymic: "",
        email: "",
        phone_number: "",
        birthday: "",
        client_photo: "",
        client_status: "",
      };
    },
    setClientStatus(state, clientStatus) {
      state.clientData.client_status = clientStatus;
    },
  },
  actions: {
    setClientData({ commit }, clientData) {
      commit("setClientData", clientData);
    },
    clearClientData({ commit }) {
      commit("clearClientData");
    },
    setClientStatus({ commit }, clientStatus) {
      commit("setClientStatus", clientStatus);
    },
  },
};
