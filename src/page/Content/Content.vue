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
          <span>作者 {{author.loginname}}</span>
          <span>{{data.visit_count}} 次浏览</span>
          <span>来自 {{data.tab | tab}}</span>
        </div>
      </header>
      <article class="article" v-html="data.content"></article>
      <!-- 评论区 -->
      <ul class="replies" v-if="replies.length">
        <li>{{replies.length}}条回复 :</li>
        <li v-for="(replie,index) in replies" :key="index">
          <section>
            <div class="head">
              <router-link
              :to="{path:'/user'}"
              :src="replie.author.avatar_url"
              tag="img"
              alt="user"
              ></router-link>
              <span class="name">{{replie.author.loginname}}</span>
              <span class="timer">{{index+1}}楼 • {{replie.create_at | timeago}}</span>
            </div>
            <!-- 未登录下的点赞 -->
            <div class="ups" @click="openConfirm" v-if="!AccessToken">
              <i class="iconfont icon-appreciatefill"></i>
              <span>{{replie.ups.length}}</span>
            </div>
            <!-- 登录下的点赞 -->
            <div class="ups" v-if="AccessToken">
              <div class="upsBtn" @click="ups(index)">
                <i class="iconfont icon-appreciatefill"></i>
                <span>{{replie.ups.length}}</span>
              </div>
              <i @click="openReplyOne(index)" class="iconfont icon-edit"></i>
            </div>
          </section>
          <div class="body" v-html="replie.content"></div>
          <div class="reply" v-if="AccessToken" v-show="replie.isReply">
            <textarea v-model="replyOneContent" placeholder="请输入回复内容..." rows="5"></textarea>
            <div class="btn">
              <mt-button size="small" type="default" @click="closeReplyOne(index)">取消</mt-button>
              <mt-button size="small" type="primary" @click="subReplyOne(index)">确认</mt-button>
            </div>
          </div>
        </li>
      </ul>
      <div class="replyAll" v-if="AccessToken">
        <textarea v-model="replyAllContent" placeholder="请输入回复内容..." rows="5"></textarea>
          <mt-button type="primary" @click="subReplyAll">确认</mt-button>
      </div>
    </div>
  </div>
</template>

<script>
import timeago from 'timeago'
export default {
  data() {
    return {
      data:{},
      replies:[],
      author:'',
      AccessToken:'',
      replyOneContent:'',
      replyAllContent:''
    }
  },
  methods: {
    goBack() {
      this.$router.push('home')
    },
    // 未登录
    openConfirm() {
      this.$messagebox.confirm('您尚未登录，是否登录？').then(res => {
        localStorage.setItem('tabbarValue','mine')
        this.$router.push('mine')
      },err => {
        return
      })
    },
    //登录
    // 点赞功能(社区自行判定用户是否点赞，未赞+1，赞-1，且不能自己点赞)
    ups(index) {
      let reply_id = this.replies[index].id
      this.$axios.post('https://www.vue-js.com/api/v1/reply/' + reply_id + '/ups',{
        accesstoken: this.AccessToken
      })
      .then(res => {
        this.initData()
      })
    },
    //对评论进行回复
    openReplyOne(index) {
      let arr = this.replies
      //为replies数组添加flag
      arr.map((item,i) => {
        index === i ? this.$set(item,'isReply',true) : this.$set(item,'isReply',false)
      })
      this.replyOneContent = '@' + this.replies[index].author.loginname + ''
    },
    closeReplyOne(index) {
      this.replyOneContent = ''
      let arr = this.replies
      arr[index].isReply = false
      this.$set(arr,index,arr[index])
    },
    subReplyOne(index){
      let id = this.$route.query.id
      this.$axios.post('https://www.vue-js.com/api/v1/topic/' + id + '/replies',{
        accesstoken: this.AccessToken,
        content: this.replyOneContent,
        reply_id: this.replies[index].id
      })
      .then(res =>{
        this.$toast('回复成功')
        this.closeReplyOne(index)
        this.initData()
      })
      .catch(err => {
        this.$toast('请输入回复内容...')
      })
    },
    //对帖子进行回复
    subReplyAll() {
      let id = this.$route.query.id
      this.$axios.post('https://www.vue-js.com/api/v1/topic/' + id + '/replies',{
        accesstoken: this.AccessToken,
        content: this.replyAllContent
      })
      .then(res => {
        this.$toast('回复成功')
        this.replyAllContent = ''
        this.initData()
      })
      .catch(function(error) {
        this.$toast('请输入回复内容...')
      })
    },
    initData() {
      // 主题详情
      let id = this.$route.query.id
      let that = this
      let url = 'https://www.vue-js.com/api/v1/topic/' + id
      this.$axios.get(url).then(res => {
        // console.log(res.data.data)
        this.data = res.data.data
        this.replies = res.data.data.replies.reverse()
        this.author = res.data.data.author
      })
    }
  },
  filters: {
    timeago(val) {
      let time = new Date(val)
      let thisTime = timeago()
      return thisTime.format(time, 'zh_CN') //将UTC时间转换格式---> 几天前,几小时前...
    },
    tab(val) {
      if (val === 'share') {
        return '分享'
      } else if (val === 'ask') {
        return '问答'
      } else if (val === 'job') {
        return '招聘'
      }
    }
  },
  mounted() {
    this.AccessToken = localStorage.getItem('accesstoken') || ''
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
  .replies {
    overflow: hidden;
    padding: 0 1rem;
    .iconfont {
      font-size: 1rem;
    }
    li {
      margin-top: 1.5rem;
      section {
        display: flex;
        justify-content: space-between;
      }
      .head {
        font-size: .8rem;
        img {
          width: 3rem;
          height: 3rem;
          vertical-align: top;
          margin-right: .5rem;
        }
      }
      .ups {
        width: 4rem;
        display: flex;
        justify-content: space-around;
        color:$color;
        font-size: .8rem;
      }
      .body {
        margin-top: 1rem;
        font-size: .9rem;
        padding: .3rem;
        background-color: #ddd;
      }
      .reply {
        width: 100%;
        textarea {
          width: 100%;
        }
        .btn {
          display: flex;
          .mint-button--default {
            background-color: #ccc;
          }
          button {
            width: 50%;
            border-radius: 0;
          }
        }
      }
    }
  }
  .replyAll {
    width: 100%;
    padding: 1rem;
    textarea {
      width: 100%;
    }
    button {
      width: 100%;
      border-radius: 0;
    }
  }
}
</style>
