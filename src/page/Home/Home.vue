<template>
  <div id="home">
    <mt-header fixed title="vuejs社区App"></mt-header>
    <div class="content">
      <mt-navbar v-model="chosed">
        <mt-tab-item id="all">全部</mt-tab-item>
        <mt-tab-item id="good">精华</mt-tab-item>
        <mt-tab-item id="weex">weex</mt-tab-item>
        <mt-tab-item id="share">分享</mt-tab-item>
        <mt-tab-item id="ask">问答</mt-tab-item>
        <mt-tab-item id="job">招聘</mt-tab-item>        
      </mt-navbar>
      <!-- tab-container -->
      <section>
        <mt-loadmore :bottom-method="loadBottom" 
        :bottom-all-loaded="allLoaded" 
        :auto-fill="autos" :bottom-distance="distant"
        ref="loadmore">
          <m-list :list="items" :chose="chosed"></m-list>
        </mt-loadmore>
        <p class="isData" v-if="isData">没有跟多数据了~</p>
      </section>
    </div>
  </div>
</template>

<script>
import mList from '@/components/list'
export default {
  data() {
    return {
      chosed:'all',
      page: 1,
      limit: 10,
      url: 'https://www.vue-js.com/api/v1/topics?tab=',
      items: [],
      isData:false,
      allLoaded:false,  //是否禁止上拉加载
      distant:70,
      autos:false,
    }
  },
  components: {
    mList
  },
  methods:{
    initData() {
      let url = this.url + this.chosed + '&page=' +this.page +'&limit=' + this.limit
      this.$axios.get(url).then( res => {
        // console.log(res.data.data)
        if(res.data.data.length != 0 ) {
          this.items = this.items.concat(res.data.data)
          this.allLoaded = false;
          this.page += 1;
        }else {
          this.allLoaded = true;
          this.isData = true;
        }
      })
    },
    loadBottom() {
      setTimeout(() => {
        this.initData()
				this.$refs.loadmore.onBottomLoaded();
      }, 800);
    }
  },
  watch:{
    chosed(newVal,oldVal) {
      console.log(this.chosed)
      this.page = 1
      this.items = []
      this.isData = false
      this.initData()
    }
  },
  mounted() {
    //显示tabbar
    this.$store.commit('onTabbar')
    this.initData()
  }
}
</script>

<style lang="scss" scoped>
$color:#26a2ff;
.mint-header {
  height: 2.5rem;
  font-size: .8rem;
}
.content {
  position: relative;
  overflow: hidden;
  height: 100vh;
  padding: 2.5rem 0 3rem;
  .mint-navbar {
    position: fixed;
    top: 2.5rem;
    left: 0;
    right: 0;
    z-index: 2;
  }
  section {
    overflow: auto;
    height: 100%;
  }
  .isData {
    text-align: center;
    color: $color;
    padding: .5rem 0 0;
    font-size: .8rem;
    font-weight: 700;
  }
}

</style>