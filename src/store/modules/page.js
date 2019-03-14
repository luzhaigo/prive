const state = {
  pageList: [],
};

const mutations = {
  storePageList(state, pageList) {
    state.pageList = pageList;
  }
};

const actions = {
  getPageList({commit, rootState}) {
    window.FB.api(`/${rootState.userID}/accounts`, 'GET', {}, function (response) {
      commit('storePageList', response);
    });
  }
};

export default {
  namespaced: true,
  state,
  mutations,
  actions,
};