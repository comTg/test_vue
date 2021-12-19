<template>
  <div class="container">
      <div class="back_i" @click="goLast"></div>
      <div class="video-container">
          <video class="video_box" loop webkit-playsinline="true" x5-video-player-type="h5-page"
                x5-video-player-fullscreen="true" playsinline preload="auto"
                :poster="item.coverPath" :src="item.videoPath" :playOrPause="playOrPause"
                @click="pauseVideo" @ended="onPlayerEnded($event)"
        >
        </video>
      </div>
  </div>
</template>

<script>
export default {
    name: 'show-video',
    methods: {
        goLast () {
            this.$router.go(-1);
        }
    }
}
</script>

<style scoped>
.container {
    width: 100vw;
    height: 100vh;
}
</style>