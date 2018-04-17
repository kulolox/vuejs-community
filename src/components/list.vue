<template>
  <div id="list">
    <mt-tab-container v-model="chose">
      <mt-tab-container-item :id="chose">
        <section class="list" v-for="(item,index) in list" :key="index">
          <router-link
          :to="{path:'/user',query:{user:item.author.loginname}}"
          :src="item.author.avatar_url"
          tag="img"
          alt="user"
          ></router-link>
          <router-link :to="{path:'/content',query:{id:item.id}}" tag="div" class="list-content">
            <div class="list-title">
              <span v-if="item.top">置顶</span>
              <span v-else-if="item.good">精华</span>
              <span v-else-if="item.tab === 'share'" :style="colorObj">分享</span>
              <span v-else-if="item.tab === 'ask'" :style="colorObj">问答</span>
              <span v-else-if="item.tab === 'job'" :style="colorObj">招聘</span>
              <p>{{item.title}}</p>
            </div>
            <div class="timer">
                <span>{{item.reply_count}} / {{item.visit_count}}</span>
                <span>{{item.last_reply_at | timeago}}</span>
            </div>
          </router-link>
        </section>
      </mt-tab-container-item>
    </mt-tab-container>    
  </div>
</template>

<script>
import timeago from 'timeago'
export default {
  props:['list','chose'],
  data() {
    return {
      colorObj: {
        backgroundColor: '#999'
      },
    }
  },
  filters: {
    timeago(val) {
      let time = new Date(val)
      let thisTime = timeago()
      return thisTime.format(time, 'zh_CN') //将UTC时间转换格式---> 几天前,几小时前...
    }
  },
}
</script>

<style lang="scss" scoped>
$color:#26a2ff;
#list {
  margin-top: 2.5rem;
}
.list {
  display: flex;
  overflow: hidden;
  border-bottom: 1px solid $color;
  padding: .5rem .8rem;
  &>img {
    width: 3.5rem;
    height: 3.5rem;
    border-radius: 50%;
    margin-right: 1rem;
  }
  .list-content {
    padding: 0 .2rem;
    flex:1;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    .list-title {
      overflow:hidden; 
      text-overflow:ellipsis;
      display:-webkit-box; 
      -webkit-box-orient:vertical;
      -webkit-line-clamp:2; 
      word-wrap:break-word;
      //长字母换行
      word-break:break-all
    }
    .list-title>span {
      background-color: $color;
      padding: 0.2rem;
      border-radius: 0.2rem;
      font-size: .6rem;
    }
    .list-title>p {
      display: inline;
      font-weight: 700;
      font-size: .9rem;
    }
    .timer {
      display: flex;
      justify-content: space-between;
      color: $color;
      font-size: .6rem;
    }
  }
}
</style>
