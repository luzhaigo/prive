<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script>
import { createNamespacedHelpers } from 'vuex';
const { mapActions } = createNamespacedHelpers('auth');

export default {
  name: 'app',
  methods: {
    ...mapActions(['logout']),
    initFB() {
      this.$router.replace('/login-status');
    }
  },
  mounted() {
    window.addEventListener('FBInit', this.initFB);
    if (!window.FB) {
      this.$router.replace('/');
    }
  },
  beforeDestroy() {
    window.removeEventListener('FBInit',  this.initFB);
    if (window.FB) {
      this.logout();
    }
  }
};
</script>

<style>
html, body {
  height: 100%;
}
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
}
</style>
