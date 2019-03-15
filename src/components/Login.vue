<template>
<div id="login-page">
  <h1>Prive</h1>
  <button @click="login" class="login-button">Login</button>
  <!-- <div class="fb-login-button" data-size="large" data-button-type="continue_with" data-auto-logout-link="false" data-use-continue-as="false"></div> -->
</div>
</template>

<script>
import { createNamespacedHelpers } from 'vuex';
const { mapActions } = createNamespacedHelpers('auth');

export default {
  methods: {
    ...mapActions({
      login(dispath) {
        dispath('login', { goToPage: this.goToPage});
      }
    }),
    goToPage() {
      this.$router.replace('/page-list');
    },
  },
};
</script>

<style lang="scss" scoped>
#login-page {
  height: 100%;
  display: flex;
  flex-flow: column;
  align-items: center;
  h1 {
    margin: 200px 0 50px;
    font-size: 50px;
  }
  .login-button {
    height: 50px;
    color: white;
    background-color: #4065b4;
    font-size: 20px;
  }
  @media screen and (min-width: 1280px){
    .login-button {
      width: 400px;
    }
  }
  @media screen and (max-width: 1279px){
    .login-button {
      width: 90vw;
    }
  }
}
</style>
