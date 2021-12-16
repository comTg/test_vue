<template>
   <div>
       <div class="icon-back" @click="tologin">
           <van-icon size="25" name="arrow-left" />
       </div>
       <div>
           <p>注册</p>
       </div>
       <van-form autocomplete="off">
           <!-- <van-field name="uploader" label="上传头像">
               <template #input>
                   <van-uploader v-model="uploader" />
               </template>
           </van-field> -->
           <van-cell-group>
               <van-field
                       v-model="username"
                       required clearable
                       label="用户名"
                       placeholder="请输入用户名"
               />
               <van-field
                       v-model="nickname"
                       required clearable
                       autocomplete="off"
                       label="昵称"
                       placeholder="请输入昵称"
               >
               </van-field>
               <van-field
                       v-model="password"
                       required
                       type="password"
                       autocomplete="off"
                       label="密码"
                       placeholder="请输入密码"
               />
               <van-field
                       v-model="password1"
                       required
                       type="password"
                       label="确认密码"
                       placeholder="请再次输入密码"
               />
           </van-cell-group>
       </van-form>
       <div style="margin: 16px">
           <van-button round block type="info" native-type="submit" @click="onsubmit">注册</van-button>
       </div>
       <bottom :tabIndex="2"></bottom>
   </div>
</template>

<script>
    import { Toast } from 'vant';
    import Bottom from '@/components/Bottom';
    import URL from '../util/URL';
    import tools from '../util/tools';

    export default {
        data() {
            return {
                username:'',
                nickname:'',
                password:'',
                password1:'',
                // uploader: [{ url: 'https://img01.yzcdn.cn/vant/leaf.jpg' }],
                value: '',
                // columns: ["城中区", "鱼峰区", "柳南区", "柳北区", "柳江区"],
                // showPicker: false,
            };
        },
        components: {
            Bottom,
        },
        methods: {
            onConfirm(value) {
                this.value = value;
                this.showPicker = false;
            },
            tologin(){
                this.$router.push("login");
            },
            onsubmit(){
                if(this.username==""||this.nickname==""||this.password==""||this.password1==""){
                    Toast('注册失败！信息未完善');
                }
                else if(this.password!=this.password1){
                    Toast('密码输入两次不一致！');
                }
                else{
                    let params = {
                        username: this.username,
                        nickname: this.nickname,
                        password: this.password
                    };
                    this.$api.post(URL.REGISTURL, params).then(res => {
                        tools.log('regist:', res);
                        if (res.status === 200) {
                            Toast.success('注册成功');
                            this.$notify({
                                type: "success",
                                message: "注册成功，3s后返回登录",
                                duration: 3000,
                            });
                            setTimeout(() => {
                                this.tologin();
                            }, 3000);
                        } else {
                            Toast.error(res.msg);
                        }
                    }).catch(error => {
                        tools.log('regist error:', error);
                    });

                }
            }
        },
    };
</script>

<style scoped>
    .icon-back{
        position: absolute;
        left: 2px;
        top:15px
    }
</style>

