const state = {
  data: [],
  paging: {},
};

const mutations = {
  updatePosts(state, res) {
    state.data = res.data;
    state.paging = res.paging;
  }
};

const actions = {
  getPosts({commit}, id) {
    window.FB.api(
      `/${id}/posts`,
      'GET', {},
      function (res) {
        commit('updatePosts', res);
      }
    );
  }
};

export default {
  namespaced: true,
  state,
  mutations,
  actions,
};
