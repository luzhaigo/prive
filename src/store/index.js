import Vue from 'vue';
import Vuex, { Store } from 'vuex';
import auth from './modules/auth';
import page from './modules/page';
import post from './modules/post';

Vue.use(Vuex);

const mutations = {
  setUserID(state, userID) {
    state.userID = userID;
  },
  clearUserID(state) {
    state.userID = '';
  },
  toggleApiLoading(state, status) {
    state.apiLoading = status;
  },
};

export default new Store({
  modules: {
    auth,
    page,
    post,
  },
  state: {
    userID: '',
    apiLoading: false,
  },
  mutations,
});
