<template>
    <div>
        <p class="title">登录</p>
        <van-image
            round
            width="6rem"
            height="6rem"
            :src="require('../assets/cat.jpeg')"
        />
        <van-form>
            <van-field
                    v-model="username"
                    name="用户名"
                    clearable
                    label="用户名"
                    placeholder="用户名"
                    :rules="[{ required: true, message: '请填写用户名' }]"
            />
            <van-field
                    v-model="password"
                    type="password"
                    clearable
                    name="密码"
                    label="密码"
                    placeholder="密码"
                    :rules="[{ required: true, message: '请填写密码' }]"
            />
            <div style="margin: 16px;">
                <van-button round block type="info" native-type="submit" @click="onSubmit">登录</van-button>
            </div>
            <div class="reg">
                <div @click="toRegister">没有账号？立即注册</div>
            </div>
        </van-form>
        <bottom :tabIndex="2"></bottom>
    </div>
</template>

<script>
    import { Toast } from 'vant';
    import Bottom from '@/components/Bottom';
    import URL from '../util/URL';
    import tools from '../util/tools';
    export default {
        name: "Login",
        data() {
            return {
                username: '',
                password: '',
            };
        },
        components: {
            Bottom,
        },
        methods: {
            onSubmit() {
                let params = {
                    username: this.username,
                    password: this.password,
                };
                if(this.username=="" || this.password==""){
                    Toast('请输入账号或密码');
                } else {
                    this.$api.post(URL.LOGINURL, params).then(res => {
                        tools.log('login res:', res);
                        if (res.status === 200) {
                            Toast.success("登录成功");
                        } else {
                            Toast.fail(res.msg);
                        }
                    }).catch(err => {
                        tools.log('login err:', err);
                        Toast.fail(err.msg);
                    });
                }
                    // Toast.fail('账号或密码错误');
            },
            toRegister(){
                this.$router.push('/register')
            }
        }
    }

</script>

<style scoped>
    .title {
        /* border-radius: 15px; */
        size:1px;
        height: 50px;
        line-height: 50px;
        background-color: #20a0ff;
        color: #fff;
        text-align: center;
        margin-top: 0;
    }

</style>

