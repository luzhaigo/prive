<template>
<div class="posts">
  <h2>Posts</h2>
  <ul v-if="list.length">
    <li v-for="item in list" :key="item.id" class="item">
      <div class="content"><div class="title">message:</div>{{item.message}}</div>
      <div class="content"><div class="title">created time:</div>{{item.created_time}}</div>
    </li>
  </ul>
</div>
</template>

<script>
import { createNamespacedHelpers } from 'vuex';
const { mapActions, mapState } = createNamespacedHelpers('post');

export default {
  computed: {
    ...mapState({
      list: 'data',
      paging: 'paging',
    }),
  },
  methods: {
    ...mapActions(['getPosts'])
  },
  mounted() {
    this.getPosts(this.$route.params.id);
  }
};
</script>

<style lang="scss" scoped>
.posts {
  display: flex;
  flex-flow: column;
  align-items: center;
  ul {
    text-align: center;
    padding: 5px;
    border: 1px solid #c3c3c3;
    border-radius: 5px;
    cursor: pointer;
  }
  position: relative;
  .item {
    display: flex;
    flex-flow: column;
    text-align: left;
    padding: 5px;
    &:not(:first-child) {
      border-top: #c3c3c3 solid 1px;
    }
    .content {
      display: flex;
      .title {
        width: 100px;
      }
    }
  }
}
</style>