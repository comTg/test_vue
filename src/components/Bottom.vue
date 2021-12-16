<template>
    <!-- 底部操作栏 -->
    <div class="container_bottom">
        <div class="border_progress" :style="'width:'+videoProcess+'%'"></div>
            <div class="bottom_tab" :class="tabIndex==0?'tab_active':''" @click="changeTab(0)">
                <span class="bottom_tab_span ">首页</span>
            </div>
            <div class="bottom_tab" :class="tabIndex==1?'tab_active':''" @click="changeTab(1)">
                <img src="../assets/add.png" alt="" class="bottom_tab_icon">
            </div>
            <div class="bottom_tab" :class="tabIndex==2?'tab_active':''" @click="changeTab(2)">
                <span class="bottom_tab_span">我的</span>
            </div>
    </div>
</template>

<script>
export default {
    name: 'bottom',
    data () {
        return {
            msg: '',
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
            }
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