<template>
    <!-- 底部操作栏 -->
    <div class="container_bottom">
        <div class="border_progress" :style="'width:'+videoProcess+'%'"></div>
        <div class="bottom_tab" :class="tabIndex==0?'tab_active':''" @click="changeTab(0)">
            <span class="bottom_tab_span ">首页</span>
        </div>
        <div class="bottom_tab" :class="tabIndex==1?'tab_active':''" @click="changeTab(1)">
            <van-uploader v-model="uploadFile" :after-read="afterRead"
                accept="video/*"
                @click-upload="clickUpload"
                :preview-image="false" :max-count="1">
                <img src="../assets/add.png" alt="" class="bottom_tab_icon">
            </van-uploader>
        </div>
        <div class="bottom_tab" :class="tabIndex==2?'tab_active':''" @click="changeTab(2)">
            <span class="bottom_tab_span">我的</span>
        </div>
        <van-action-sheet v-model="showPanel" title="上传视频" @closed="afterPanelClose">
            <div class="video-preview">
                <video style="width: 120px;height:120px;object-fit:cover;"
                  @canplay="getVideoTime"
                  :src="videoUrl"
                  v-if="videoUrl">
                </video>
            </div>
            <div class="content">
                <van-cell-group>
                    <van-field v-model="desc" label="描述" placeholder="请输入视频描述"></van-field>
                </van-cell-group>
                <div style="margin: 16px">
                    <van-button round block type="info" native-type="submit" @click="submitFile">提交</van-button>
                </div>
            </div>
        </van-action-sheet>
    </div>
</template>

<script>
import URL from '@/util/URL';
import { Toast } from 'vant';
export default {
    name: 'bottom',
    data () {
        return {
            msg: '',
            uploadFile: [],
            showPanel: false,
            videoUrl: '',
            videoTime: 0,
            desc: '',
        }
    },
    props: {
        tabIndex: {
            type: Number,
            required: true
        },
        videoProcess: {
            type: Number,
        }
    },
    methods: {
        changeTab (index) {
            console.log(index);
            if (index === 0) {
                this.$router.push("home");
            } else if (index === 2 && !sessionStorage.getItem("userId")) {
                this.$router.push("login");
            } else if (index === 2 && sessionStorage.getItem("userId")) {
                this.$router.push("profile");
            }
        },
        afterRead (file) {
            console.log('after read:', file);
            this.videoUrl = file.content;
            this.showPanel = true;
        },
        clickUpload (event) {
            console.log('click upload:', event);
            if (!sessionStorage.getItem('userToken')) {
                event.preventDefault();
                this.$router.push('login');
                return false;
            } else {
                return true;
            }
        },
        afterPanelClose () {
            this.videoUrl = '';
            this.uploadFile = [];
            this.desc = '';
            this.videoTime = 0;
        },
        getVideoTime (ele) {
            console.log('get video time:', ele);
            this.videoTime = ele.target.duration
        },
        submitFile () {
            console.log('upload file:', this.uploadFile);
            let form = new FormData();
            form.append('userId', sessionStorage.getItem('userId'));
            form.append('desc', this.desc);
            form.append('file',this.uploadFile[0].file);
            form.append('videoSeconds',this.videoTime);
            form.append('videoWidth', 720);
            form.append('videoHeight', 1280);
            this.$api.uploadFile(URL.UPLOADURL, form).then(res => {
                console.log('res:', res);
                if (res.status === 200) {
                    Toast.success('上传成功');
                    this.$emit('updateVideo');
                    this.showPanel = false;
                } else {
                    Toast.fail(res.message);
                }
            }).catch(e => {
                console.log(e);
                Toast.fail(e.message);
            });
        },
    }
}
</script>

<style scoped>
    .container_bottom {
        position: fixed;
        bottom: 0;
        width: 100%;
        background: rgba(0, 0, 0, 0.85);
        height: 48px;
        /*border-top: 1px solid rgba(255, 255, 255, 0.7);*/
        max-width: 550px;
        z-index: 10;
    }
    .border_progress {
        width: 0;
        height: 1px;
        background: #bababa;
        position: absolute;
        top: 0;
        transition: .1s all;
    }
    .bottom_tab {
        width: 33%;
        text-align: center;
        float: left;
        color: #c9c9c9;
        padding: 10px 0;
    }

    .bottom_tab_icon {
        width: 44px;
    }

    .bottom_tab_span {
        line-height: 28px;
        border-bottom: 2px solid transparent;
        font-weight: 600;
        font-size: 16px;
        display: inline-block;
        padding: 0 4px;
        transition: .5s all;
    }

    .tab_active .bottom_tab_span {
        border-bottom: 2px solid #fff;
        color: #fff;
    }

</style>