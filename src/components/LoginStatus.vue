<template>
<div>
</div>
</template>

<script>
import { createNamespacedHelpers } from 'vuex';
const { mapMutations } = createNamespacedHelpers('auth');

export default {
  methods: {
    ...mapMutations(['storeLoginStatus']),
  },
  mounted() {
    if (FB) {
      FB.getLoginStatus((res) => {
        if (res.status === 'connected') {
          this.storeLoginStatus(res);
          this.$router.replace('/page-list');
        } else {
          console.log(status, 'need login');
          this.$router.replace('/login');
        }
      });
    }
  }
};
</script>

<style lang="scss" scoped>

</style>
