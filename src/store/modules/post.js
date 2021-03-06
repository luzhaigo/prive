const state = {
  data: [],
  paging: {},
};

const mutations = {
  updatePosts(state, res) {
    state.data = res.data;
    state.paging = res.paging || {};
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
        limit: 5,
        after,
        before,
      },
      function (res) {
        commit('updatePosts', res);
      }
    );
  },
  deletePost({dispatch, commit}, {accessToken, feedId, pageId}) {
    commit('toggleApiLoading', true, {root: true});
    window.FB.api(
      `/${feedId}`,
      "DELETE",
      {access_token: accessToken},
      function (response) {
        commit('toggleApiLoading', false, {root: true});
        if (response.success) {
          dispatch('getPosts', { id: pageId });
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
