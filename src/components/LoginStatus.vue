<template>
<div>
</div>
</template>

<script>
import { createNamespacedHelpers } from 'vuex';
const { mapActions, mapState } = createNamespacedHelpers('auth');

export default {
  computed: {
    ...mapState({
      status: state => state.loginStatus.status,
    })
  },
  watch: {
    status(newV) {
      if (newV === 'connected') {
        this.$router.replace('/page-list');
      } else if (newV !== undefined) {
        this.$router.replace('/login');
      } else {
        this.$router.replace('/login');
      }
    }
  },
  methods: {
    ...mapActions(['getLoginStatus']),
  },
  mounted() {
    if (window.FB) {
      this.getLoginStatus();
    }
  }
};
</script>

<style lang="scss" scoped>

</style>
