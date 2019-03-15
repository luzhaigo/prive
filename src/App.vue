<template>
  <div id="app">
    <div id="logout">
      <button v-if="status === 'connected'" @click="logout">Logout</button>
    </div>
    <router-view>
    </router-view>
  </div>
</template>

<script>
import { createNamespacedHelpers } from 'vuex';
const { mapActions, mapState } = createNamespacedHelpers('auth');

export default {
  name: 'app',
  computed: {
    ...mapState({
      status: state => state.loginStatus.status,
    }),
  },
  methods: {
    ...mapActions({
      logout(dispath) {
        dispath('logout', this.goToLogin);
      },
      getLoginStatus(dispath) {
        dispath('getLoginStatus', { goToLogin: this.goToLogin, goToPage: this.goToPage});
      }
    }),
    goToLogin() {
      this.$router.replace('/login');
    },
    goToPage() {
      this.$router.replace('/page-list');
    }
  },
  beforeMount() {
    if (!window.FB) {
      this.$router.replace('/');
    }
  },
  mounted() {
    window.fbAsyncInit = () => {
      window.FB.init({
        appId: process.env.VUE_APP_APPID,
        autoLogAppEvents: true,
        xfbml: true,
        version: 'v3.2'
      });
      window.FB.AppEvents.logPageView();
      this.getLoginStatus();
    };
  },
  beforeDestroy() {
    this.logout();
  }
};
</script>

<style lang="scss" scoped>
#app {
  #logout {
    button {
      width: 100%;
      height: 50px;
      color: white;
      background-color: #4065b4;
      font-size: 20px;
    }
  }
}
</style>
<style>
html, body {
  height: 100%;
}
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  height: 100%;
}
</style>
