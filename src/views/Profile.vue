<template>
  <div class="container">
      <div class="back-img"></div>
      <div class="back_i" @click="goHome"></div>
      <div class="profile">
          <div class="profile-info">
            <div class="img-item">
                <van-image
                class="avastar-img"
                width="6rem"
                height="6rem"
                :src="require('../assets/cat.jpeg')"
                round>
                </van-image>
                <div class="user-name">{{ $store.state.username }}</div>
            </div>
            <div class="info-item">
                <div>获赞</div>
                <div class="data-num">{{ $store.state.receiveLikeCounts }}</div>
            </div>
            <div class="info-split"></div>
            <div class="info-item">
                <div>关注</div>
                <div class="data-num">{{ $store.state.followCounts }}</div>
            </div>
            <div class="info-split"></div>
            <div class="info-item">
                <div>粉丝</div>
                <div class="data-num">{{ $store.state.fansCounts }}</div>
            </div>
          </div>
            <van-tabs v-model="activeName">
                <van-tab title="作品" name="a">
                    内容1
                </van-tab>
                <van-tab title="喜欢" name="b">
                    内容2
                </van-tab>
            </van-tabs>
      </div>

      <bottom :tabIndex="2"></bottom>
  </div>
</template>

<script>
import Bottom from '@/components/Bottom';
export default {
    name: 'profile',
    data () {
        return {
            activeName: 'a',
        };
    },
    components: {
        Bottom,
    },
    methods: {
        goHome () {
            this.$router.push("home");
        },
    }
}
</script>

<style scoped>
    .container {
        width: 100vw;
        height: 100vh;
        position: relative;
    }
    .back-img {
        background: url('../assets/b.png') center center no-repeat;
        width: 100%;
        height: 300px;
        z-index: 3;
        position: absolute;
    }
    .back_i{
        position: fixed;
        top: 20px;
        left: 10px;
        width: 28px;
        height: 28px;
        z-index: 10;
        background: url('../assets/go-left.png') center center no-repeat;
        background-size: 23px 21px;
    }
    .profile {
        /* margin-top: 80px; */
        position:  relative;
        top: 80px;
        width: 100%;
        min-height: 100vh;
        box-shadow: 0 -2px 3px 0px rgb(64 60 67 / 16%);
        z-index: 4;
        background-color: #fff;
    }
    .profile-info {
        display: flex;
        width: 100%;
        justify-content: space-around;
        align-items: center;
    }
    .img-item {
        position: relative;
        width: 6rem;
        height: 6rem;
    }
    .avastar-img {
        position: absolute;
        left:0;
        top: -20px;
    }
    .user-name {
        position: absolute;
        bottom: 0px;
        left: 20%;
        font-weight: 700;
        /* transform: translateX(-50%); */
    }
    .info-split {
        width: 1px;
        height: 20px;
        background-color: rgb(0 0 0 / 36%);
    }
    .data-num {
        font-weight: 700;
    }
</style>