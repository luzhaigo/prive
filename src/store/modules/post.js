const state = {
  data: [],
  paging: {},
};

const mutations = {
  updatePosts(state, res) {
    state.data = res.data;
    state.paging = res.paging;
  },
  clearAll(state) {
    state.data = [];
    state.paging = {};
  }
};

const actions = {
  getPosts({commit}, {id, after, before}) {
    window.FB.api(
      `/${id}/feed`,
      'GET', {
        limit: 10,
        after,
        before,
      },
      function (res) {
        commit('updatePosts', res);
      }
    );
  },
  deletePost({dispatch}, {accessToken, feedId, pageId}) {
    window.FB.api(
      `/${feedId}`,
      "DELETE",
      {access_token: accessToken},
      function (response) {
        if (response.success) {
          dispatch('getPosts', pageId);
        }
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
