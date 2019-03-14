const state = {
  loginStatus: {},
};

const mutations = {
  storeLoginStatus(state, loginStatus) {
    state.loginStatus = {
      status: loginStatus.status,
      ...loginStatus.authResponse,
    };
  }
};

const actions = {
  getLoginStatus({commit}) {
    window.FB.getLoginStatus((res) => {
      if (res.status === 'connected') {
        commit('storeLoginStatus', res);
        commit('setUserID', res.authResponse.userID, {root: true});
      } else {
        console.log(status, 'need login');
      }
    });
  },
  logout() {
    window.FB.logout(res => {
      console.log('logout', res);
    });
  },
};

export default {
  namespaced: true,
  state,
  mutations,
  actions,
};