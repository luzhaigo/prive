<template>
<div class="posts">
  <h2>Page: {{pageMap[$route.params.id].name}}</h2>
  <div class="container">
    <h5>Posts:</h5>
    <ul v-if="list.length">
      <li v-for="(item, idx) in list" :key="item.id" class="item">
        <img ref="more" class="more" src="../assets/more.svg" @click="dropDownIndex = idx"/>
        <ul v-if="idx === dropDownIndex" class="dropdown-menu">
          <li @click="deletePost({...deleteFeedParams, feedId: item.id})">Delete from page</li>
        </ul>
        <div class="content">
          <div class="avatar">{{pageMap[$route.params.id].name[0]}}</div>
          <div class="info">
            <div class="name">{{pageMap[$route.params.id].name}}</div>
            <div class="create-time">{{timeFormatString(item.created_time)}}</div>
          </div>
          </div>
        <div class="content"><div class="message">{{item.message}}</div></div>
        <div class="action-panel">
          <div class="action">
            <img src="../assets/like.svg"/>
            <span>Like</span>
          </div>
           <div class="action">
            <img src="../assets/comment.svg"/>
            <span>Comment</span>
          </div>
           <div class="action">
            <img src="../assets/share.svg"/>
            <span>Share</span>
          </div>
        </div>
      </li>
    </ul>
    <div v-else>No Feeds</div>
    <div class="paging">
      <button v-if="paging.previous" @click="getPosts({id: $route.params.id, before: paging.cursors.before})">previous</button>
      <button v-if="paging.next" @click="getPosts({id: $route.params.id, after: paging.cursors.after})">next</button>
    </div>
  </div>
</div>
</template>

<script>
import { createNamespacedHelpers } from 'vuex';
const { mapActions, mapState } = createNamespacedHelpers('post');
const { mapState: mapPageState } = createNamespacedHelpers('page');

export default {
  name: 'PostList',
  data() {
    return {
      dropDownIndex: -1,
    };
  },
  computed: {
    ...mapState({
      list: 'data',
      paging: 'paging',
    }),
    ...mapPageState(['pageMap']),
    deleteFeedParams() {
      return {
        accessToken: this.pageMap[this.$route.params.id].accessToken, 
        pageId: this.$route.params.id, 
      };
    }
  },
  methods: {
    ...mapActions(['getPosts', 'deletePost']),
    timeFormatString(time) {
      const index = time.indexOf('+');
      return time.slice(0, index).replace('T', ' ');
    },
    clickOutside(e) {
      if (this.dropDownIndex !== -1 && !this.$refs.more[this.dropDownIndex].contains(e.target)) {
        this.dropDownIndex = -1;
      }
    }
  },
  mounted() {
    this.getPosts({id: this.$route.params.id});
    document.addEventListener('click', this.clickOutside, true);
  },
  beforeDestroy() {
    document.removeEventListener('click', this.clickOutside, true);
  }
};
</script>

<style lang="scss" scoped>
.posts {
  display: flex;
  flex-flow: column;
  align-items: center;
  h5 {
    margin: 0;
  }
  ul {
    text-align: center;
    padding: 0;
  }
  position: relative;
  .item {
    border: 1px solid #c3c3c3;
    border-radius: 3px;
    position: relative;
    display: flex;
    flex-flow: column;
    text-align: left;
    &:not(:first-child) {
      margin-top: 5px;
    }
    padding: 10px 10px 0;
    white-space:pre-wrap;
    .more {
      position: absolute;
      width: 15px;
      height: 15px;
      top: 5px;
      right: 5px;
      cursor: pointer;
    }
    .dropdown-menu {
      cursor: pointer;
      position: absolute;
      padding: 0;
      background-color: white;
      border: 1px solid #c3c3c3;
      border-radius: 3px;
      top: 20px;
      right: 5px;
      padding: 0 5px;
      li {
        list-style-type: none;
        font-size: 14px;
        padding: 5px;
        &:hover {
          background-color: rgba(29, 33, 41, .04);
        }
      }
    }
    &:not(:first-child) {
      border-top: #c3c3c3 solid 1px;
    }
    .content {
      display: flex;
      margin: 5px 0;
      .message {
        font-weight: bold;
      }
      .avatar {
        width: 40px;
        height: 40px;
        border-radius: 50%;
        background-color: #ffdd7f;
        color: #b47904;
        display: flex;
        justify-content: center;
        align-items: center;
        font-weight: bold;
        font-size: 20px;
        margin-right: 20px;
      }
      .info {
        .name {
          font-weight: bold;
          font-size: 14px;
        }
        .create-time {
          font-size: 10px;
        }
      }
      .title {
        width: 100px;
      }
    }
    .action-panel {
      display: flex;
      border-top: #c3c3c3 solid 1px;
      margin-top: 15px;
      .action {
        cursor: pointer;
        flex: 1;
        padding: 5px;
        margin: 5px 0;
        display: flex;
        align-items: center;
        justify-content: center;
        &:hover {
          background-color: rgba(29, 33, 41, .04);
        }
        img {
          width: 15px;
          height: 15px;
          margin-right: 5px;
        }
        span {
          font-size: 14px;
          font-weight: bold;
          color: gray;
        }
      }
    }
  }
  @media screen and (max-width: 1279px){
    .container {
      width: 90vw;
    }
  }
  @media screen and (min-width: 1280px){
    .container {
      max-width: 100vw;
      min-width: 480px;
    }
  }
  .paging {
    display: flex;
    justify-content: flex-end;
    button:last-child {
      margin-left: 10px;
    }
  }
}
</style>