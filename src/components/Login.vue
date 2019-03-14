<template>
<div>
  <button @click="login">Login</button>
  <div class="fb-login-button" data-size="large" data-button-type="continue_with" data-auto-logout-link="false" data-use-continue-as="false"></div>
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

</style>
