<template>
    <div class="login">
        <header></header>
        <section>
            <div class="login-box">
                <h3>账号登录</h3>
                <input type="text" placeholder="请输入小米账号" v-model="userName">
                <input type="text" placeholder="密码" v-model="passWords">
                <button @click="login">
                    登录
                </button>
                <p @click="jumpRegist">立即注册</p>
            </div>
        </section>
    </div>
</template>

<script>
export default {
    name: "HelloWorld",
    data() {
        return {
            userName: '',
            passWords: ''
        };
    },
    methods: {
        login() {
            let me = this;
            let params = {
                userName: me.userName,
                passWords: me.passWords
            };
            if (!params.userName || !params.passWords) {
                this.$alert("用户名或密码不能为空！");
                return;
            }
            me.ajax({
                type: "post",
                data: params,
                url: "/mi/login",
                success(res) {
                    if (res.code === 0) {
                        me.$alert("登录成功", "提示", {
                            confirmButtonText: "确定",
                            callback: action => {
                                if (res.data.userId == 1) {
                                    sessionStorage.setItem('userName', params.userName);
                                    me.$router.push({path: '/manage'});
                                } else {
                                    sessionStorage.setItem('userName', params.userName);
                                    me.$router.push({path: '/goodsList'});
                                }
                            }
                        });
                    } else {
                        me.$alert("用户名或密码错误！");
                    }
                },
                error() {
                    me.$alert("用户名或密码错误！");
                }
            });
        },
        jumpRegist() {
            this.$router.push({path: '/regist'});
        }
    }
};
</script>

<style lang="less">
.login {
    header {
        width: 1100px;
        height: 100px;
        margin: 0 auto;
        background: url(../assets/imgs/logo.png) left top no-repeat;
    }
    section {
        position: relative;
        width: 100%;
        height: 500px;
        background: url(~@/assets/imgs/login-banner.png) 100px center no-repeat #f2dfc1 ;
    }
    .login-box {
        width: 420px;
        height: 400px;
        background: #fff;
        position: absolute;
        right: 100px;
        top: 50px;
        h3 {
            color: #f56600;
            font-size: 24px;
            text-align: center;
            margin: 30px;
        }
        input {
            height: 22px;
            line-height: 22px;
            padding: 13px 16px 13px 14px;
            display: block;
            width: 306px;
            font-size: 16px;
            display: block;
            margin: 30px auto;
        }
        button {
            background-color: #ef5b00;
            border: 0;
            width: 340px;;
            height: 50px;
            line-height: 50px;
            display: block;
            margin: 0 auto;
            margin-bottom: 14px;
            text-align: center;
            font-size: 14px;
            color: #fff;
            cursor: pointer;
        }
        p {
            color: #666;
            &:hover {
                color: #ef5b00;
            }
            margin-left: 320px;
            margin-top: 20px;
            cursor: pointer;
        }
    }
}
</style>
