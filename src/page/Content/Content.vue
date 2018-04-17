<template>
  <div id="content">
    <mt-header :title="data.title" fixed>
        <mt-button icon="back" slot="left" @click="goBack"></mt-button>
    </mt-header>
    <!-- 内容区 -->
    <div class="content">
      <header>
        <h2>
          <span class="tag" v-if="data.top">置顶</span>
          <span class="tag" v-else-if="data.good">精华</span>
          {{data.title}}
        </h2>
        <div class="description">
          <span>发布于 {{data.create_at | timeago}}</span>
          <span>作者 {{author}}</span>
          <span>{{data.visit_count}} 次浏览</span>
          <span>来自 {{data.tab}}</span>
        </div>
      </header>
      <article class="article" v-html="data.content"></article>
    </div>
    <!-- 评论区 -->
    <div class="replies"></div>
  </div>
</template>

<script>
import timeago from 'timeago'
export default {
  data() {
    return {
      data:{},
      author:''
    }
  },
  methods: {
    goBack() {
      this.$router.push('home')
    },
    initData() {
      // 主题详情
      let id = this.$route.query.id
      let that = this
      let url = 'https://www.vue-js.com/api/v1/topic/' + id
      this.$axios.get(url).then(res => {
        console.log(res.data.data)
        this.data = res.data.data
        this.author = res.data.data.author.loginname
      })
    }
  },
  filters: {
    timeago(val) {
      let time = new Date(val)
      let thisTime = timeago()
      return thisTime.format(time, 'zh_CN') //将UTC时间转换格式---> 几天前,几小时前...
    }
  },
  mounted() {
    //隐藏tabbar
    this.$store.commit('unTabbar')
    this.initData()
  }
}
</script>

<style lang="scss">
$color:#26a2ff;
.mint-header {
  height: 2.5rem;
  font-size: .8rem;
}
.content {
  position: relative;
  overflow: hidden;
  // height: 100vh;
  padding: 2.5rem 0 0;
  header {
    padding: .3rem;
    border-bottom: 1px solid $color;
    h2 {
      font-weight: 700;
      font-size: 1.2rem;
    }
    .tag {
      background-color: $color;
      color: #fff;
      font-size: .8rem;
      padding: 0.1rem 0.6rem;
      border-radius: 0.2rem;
    }
    .description {
      margin: 1.2rem 0 .5rem;
      display: flex;
      justify-content: space-around;
      span {
        font-size: .6rem;
        color:$color;
      }
    }
  }
  // 设定v-html的样式
  .article {
    padding: 1rem;
    h1,h2,h3,h4,h5,h6 {
      font-weight: 700;
    }
    p {
      font-size: .8rem;
      line-height: 1.7em;
    }
    h2 {
      font-size: 1.1rem;
      margin: 1rem 0 .5rem;
      border-bottom: 1px solid #eee;
    }
    h3 {
      font-size: 1rem;
      margin: 1rem 0 .5rem;
      border-bottom: 1px solid #eee;
    }
    pre {
      font-family: Monaco, Menlo, Consolas, "Courier New", monospace;
      font-size: .6rem;
      border-radius: 0;
      padding: 1rem;
      border: 0;
      margin: 1rem 0;
      border-width: 1px 0;
      background: #f7f7f7;
    }
    code {
      color: $color;
    }
    ul {
      list-style-type: disc;
      margin: 0 0 1rem 2rem;
    }
    ol {
      list-style: decimal;
      margin-left: 2em;
    }
    li {
      line-height: 2.5rem;
    }
    a {
      display: inline-block;
      color: #ff4080;
    }
    img {
      height: auto;
      max-width: 100%;
      vertical-align: middle;
      border: 0;
    }
  }
  
}
</style>
