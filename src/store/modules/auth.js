const state = {
  loginStatus: {},
};

const mutations = {
  storeLoginStatus(state, loginStatus) {
    state.loginStatus = {
      status: loginStatus.status,
      ...loginStatus.authResponse,
    };
  },
  clearUserInfo(state) {
    state.loginStatus = {};
  }
};

const actions = {
  getLoginStatus({commit}, { goToLogin, goToPage }) {
    window.FB.getLoginStatus((res) => {
      if (res.status === 'connected') {
        commit('storeLoginStatus', res);
        commit('setUserID', res.authResponse.userID, {root: true});
        goToPage();
      } else {
        console.log(res.status, 'need login');
        goToLogin();
      }
    });
  },
  login({commit}, { goToPage }) {
    window.FB.login((res) => {
      if (res.status === 'connected') {
        commit('storeLoginStatus', res);
        commit('setUserID', res.authResponse.userID, {
          root: true
        });
        goToPage();
      }
    }, {
      scope: 'public_profile, manage_pages, pages_show_list, publish_pages',
    });
  },
  logout({commit}, goToLogin) {
    if (window.FB) {
      window.FB.logout((res) => {
        if (res.status === 'unknown') {
          commit('clearUserInfo');
          commit('clearUserID', undefined, {root: true});
          commit('post/clearAll', undefined, {root: true});
          commit('page/clearAll', undefined, {root: true});
          goToLogin();
        }
      });
    }
  },
};

export default {
  namespaced: true,
  state,
  mutations,
  actions,
};