<template>
<div class="page-list">
  <h2>Your Manage Pages</h2>
  <div class="list">
    <ul v-if="pageList.length">
      <li v-for="item in pageList" :key="item.id" class="item" @click="goToPosts(item.id)">
        <div class="content"><div class="title">Name:</div>{{item.name}}</div>
        <div class="content"><div class="title">ID:</div>{{item.id}}</div>
      </li>
    </ul>
    <div class="hint">Click the page to manage your posts</div>
  </div>
</div>
</template>

<script>
import { createNamespacedHelpers } from 'vuex';
const { mapActions, mapState } = createNamespacedHelpers('page');

export default {
  name: 'PageList',
  methods: {
    ...mapActions(['getPageList']),
    goToPosts(id) {
      this.$router.push(`posts/${id}`);
    }
  },
  computed: {
    ...mapState({
      pageList: state => state.pageList.data || [],
    })
  },
  mounted() {
    this.getPageList();
  },
};
</script>

<style lang="scss" scoped>
.page-list {
  display: flex;
  flex-flow: column;
  align-items: center;
  h2 {
    text-align: center;
  }
  ul {
    text-align: center;
    padding: 5px;
    border: 1px solid #c3c3c3;
    border-radius: 5px;
    cursor: pointer;
  }
  .list {
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
          width: 60px;
        }
      }
    }
    .hint {
      position: absolute;
      white-space: nowrap;
      font-size: 12px;
      left: 50%;
    }
  }
}
</style>

