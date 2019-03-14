<template>
<div class="posts">
  <h2>Posts</h2>
  <ul v-if="list.length">
    <li v-for="item in list" :key="item.id" class="item">
      <img @click="deletePost({...deleteFeedParams, feedId: item.id})" src="../assets/delete-button.svg"/>
      <div class="content"><div class="title">message:</div>{{item.message}}</div>
      <div class="content"><div class="title">created time:</div>{{item.created_time}}</div>
    </li>
  </ul>
  <div class="paging">
    <button v-if="paging.previous" @click="getPosts({id: $route.params.id, before: paging.cursors.before})">previous</button>
    <button v-if="paging.next" @click="getPosts({id: $route.params.id, after: paging.cursors.after})">next</button>
  </div>
</div>
</template>

<script>
import { createNamespacedHelpers } from 'vuex';
const { mapActions, mapState } = createNamespacedHelpers('post');
const { mapState: mapPageState } = createNamespacedHelpers('page');

export default {
  computed: {
    ...mapState({
      list: 'data',
      paging: 'paging',
    }),
    ...mapPageState(['pageMap']),
    deleteFeedParams() {
      return {
        accessToken: this.pageMap[this.$route.params.id], 
        pageId: this.$route.params.id, 
      };
    }
  },
  methods: {
    ...mapActions(['getPosts', 'deletePost'])
  },
  mounted() {
    this.getPosts({id: this.$route.params.id});
  }
};
</script>

<style lang="scss" scoped>
.posts {
  display: flex;
  flex-flow: column;
  align-items: center;
  ul {
    width: 500px;
    text-align: center;
    padding: 5px;
    border: 1px solid #c3c3c3;
    border-radius: 5px;
    cursor: pointer;
  }
  position: relative;
  .item {
    position: relative;
    display: flex;
    flex-flow: column;
    text-align: left;
    padding: 20px;
    img {
      position: absolute;
      width: 20px;
      height: 20px;
      top: 5px;
      right: 0;
    }
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
  .paging {
    width: 500px;
    display: flex;
    justify-content: flex-end;
    button:last-child {
      margin-left: 10px;
    }
  }
}
</style>