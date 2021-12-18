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
                @click="showPanel"
                :src="$store.state.faceImage"
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
                    <div class="img-container">
                        <van-image
                         v-for="(item,index) in videoList" :key="index"
                         :src="item.coverPath"
                         height="10rem"
                         width="6rem"></van-image>
                    </div>
                </van-tab>
                <van-tab title="喜欢" name="b">
                    内容2
                </van-tab>
            </van-tabs>
      </div>

      <van-action-sheet v-model="panelShow" cancel-text="取消">
          <van-uploader
            ref="uploadImgRef" :preview-image="false"
            accept="image/*" :after-read="afterReadImg">
            <div class="sheet-item">上传头像</div>
          </van-uploader>
          <div class="sheet-item" @click="logOut">退出登录</div>
      </van-action-sheet>

      <!-- <van-action-sheet v-model="panelShow" :actions="actions" @select="onSelect" cancel-text="取消">
      </van-action-sheet>
      <van-uploader
        ref="uploadImgRef"
        :show-upload="false" accept="image/*" :after-read="afterReadImg">
      </van-uploader> -->

      <bottom :tabIndex="2"></bottom>
  </div>
</template>

<script>
import Bottom from '@/components/Bottom';
import URL from '@/util/URL';
import { Toast, Dialog } from 'vant';
import lodash from 'lodash';
export default {
    name: 'profile',
    data () {
        return {
            activeName: 'a',
            videoList: [],
            baseUrl: 'http://localhost:443',
            actions: [{ name: '上传头像' }, { name: '退出登录' }],
            panelShow: false,
        };
    },
    components: {
        Bottom,
    },
    created () {
        this.getMyVideo(1);
    },
    methods: {
        goHome () {
            this.$router.push("home");
        },
        showPanel () {
            this.panelShow = true;
        },
        updateUserInfo () {
            let params = {
                userId: this.$store.state.userId,
            };
            this.$api.post(URL.QUERYUSER + '?userId=' + this.$store.state.userId).then(res => {
                console.log('update user info:', res);
                if (res.status === 200) {

                }
            }).catch(err => {
                console.log('update user info error:', err);
            });
        },
        getMyVideo (page) {
            let params = {
                userId: this.$store.state.userId,
            };
            this.$api.post(URL.SHOWALLURL + '?page=' + page, params).then(res => {
                console.log('res:', res);
                if (res.status === 200) {
                    if (res.data && res.data.rows) {
                        let oldData = lodash.cloneDeep(this.videoList);
                        res.data.rows.forEach(item => {
                            item.coverPath = this.baseUrl + item.coverPath;
                            item.videoPath = this.baseUrl + item.videoPath;
                            let flag = oldData.some(item2 => {
                                if (item2.id === item.id) {
                                    item2 = Object.assign(item2, item);
                                    return true;
                                } else {
                                    return false;
                                }
                            });
                            if (flag === false) {
                                oldData.push(item);
                            }
                            // this.videoList.push(item);
                        });
                        this.videoList = oldData;
                    }
                }
            }).catch(error => {
                Toast.fail(error.message);
            });
        },
        logOut () {
            sessionStorage.setItem('userId', '');
            sessionStorage.setItem("userToken", '');
            sessionStorage.setItem("username", '');
            this.$store.state.fansCounts = 0;
            this.$store.state.followCounts = 0;
            this.$store.state.receiveLikeCounts = 0;
            this.$store.state.username = '';
            this.$store.state.userId = '';
            this.$store.state.faceImage = '';
            this.$router.push('home');
        },
        onSelect (item) {
            console.log('on select item:', item);
            if (item.name === '退出登录') {
                this.logOut();
            } else if (item.name === '上传头像') {
                this.$refs.uploadImgRef.chooseFile();
            }
        },
        onCancel () {
            console.log('on cancel');
        },
        afterReadImg (file) {
            console.log('after read img:', file);
            Dialog.confirm({
                title: '提示',
                message: '是否确认使用此图像?'
            }).then(() => {
                let form = new FormData();
                form.append('userId', this.$store.state.userId);
                form.append('file', file.file);
                this.$api.uploadFile(URL.UPLOADFACE, form).then(res => {
                    if (res.status === 200) {
                        Toast.success('上传成功');
                        this.$store.state.faceImage = this.baseUrl + res.data;
                        // this.updateUserInfo();
                    } else {
                        Toast.fail(res.msg);
                    }
                }).then(err => {
                    Toast.fail(err.msg);
                });
                this.panelShow = false;
            }).catch(() => {
                this.panelShow = false;
            });
        }
    }
}
</script>

<style scoped>
    .container {
        width: 100vw;
        height: 100vh;
        position: relative;
    }
    .container::-webkit-scrollbar { width: 0 !important }
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
    .img-container {
        display: flex;
        flex-wrap: wrap;
        justify-content: space-around;
    }
    .sheet-item {
        height: 51px;
        line-height: 51px;
    }
</style>