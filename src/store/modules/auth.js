const state = {
  loginStatus: {},
};

const mutations = {
  storeLoginStatus(state, loginStatus) {
    state.loginStatus = loginStatus;
  }
};

export default {
  namespaced: true,
  state,
  mutations,
};