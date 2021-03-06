const state = {
  pageList: [],
  pageMap: {},
};

const mutations = {
  storePageList(state, pageList) {
    state.pageList = pageList;
    state.pageMap = pageList.data.reduce((acc, page) => {
      acc[page.id] = { accessToken: page.access_token, name: page.name};
      return acc;
    }, {});
  },
  clearAll(state) {
    state.pageList = [];
    state.pageMap = {};
  }
};

const actions = {
  getPageList({commit, rootState}) {
    window.FB.api(`/${rootState.userID}/accounts`, 'GET', {}, function (response) {
      commit('storePageList', response);
    });
  },
};

export default {
  namespaced: true,
  state,
  mutations,
  actions,
};