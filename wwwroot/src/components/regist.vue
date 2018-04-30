<template>
    <div class="regist">
        <div class="regist-wrap">
            <img src="../assets/imgs/account-logo.png" alt="logo">
            <div class="regist-box">
                <h4>账号</h4>
                <input type="text" placeholder="请输入小米账号" v-model="userName">
                <h4>密码</h4>
                <input type="text" placeholder="请输入密码" v-model="passWords">
                <button @click="regist">
                    注册
                </button>
            </div>

            <section>
                <p>
                    注册帐号即表示您同意并愿意遵守小米
                    <strong>用户协议</strong> 和
                    <strong>隐私政策</strong>
                </p>
            </section>
        </div>
        <div class="n-footer">

            <p class="nf-intro">
                <span>小米公司版权所有-京ICP备10046444-
                    <a class="beianlink beian-record-link" target="_blank" href="http://www.beian.gov.cn/portal/registerSystemInfo?recordcode=11010802020134">
                        <span><img src="https://account.xiaomi.com/static/res/9204d06/account-static/respassport/acc-2014/img/ghs.png"></span>京公网安备11010802020134号</a>-京ICP证110507号</span>
            </p>
        </div>
    </div>
</template>

<script>
export default {
    name: "HelloWorld",
    data() {
        return {
            userName: "",
            passWords: ""
        };
    },
    methods: {
        regist() {
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
                url: "/mi/regist",
                success() {
                    me.$alert("提示", "注册成功", {
                        confirmButtonText: "跳转登录页",
                        callback: action => {
                            me.$router.push({path: '/login'});
                        }
                    });
                },
                error() {
                    me.$alert("注册失败！");
                }
            });
        }
    }
};
</script>

<style scoped lang="less">
.regist {
    width: 100%;
    height: 640px;
    background: #f9f9f9;
    .regist-wrap {
        width: 854px;
        margin: 0 auto;
        padding-bottom: 10px;
        background: #fff;
        height: 550px;
        p {
            color: #9d9d9d;
            margin: 0 auto;
            text-align: center;
        }
        img {
            margin: 0px auto;
            width: 205px;
            display: block;
        }
        .regist-box {
            width: 332px;
            padding: 30px 0;
            line-height: 20px;
            margin: 0 auto;
            input {
                height: 22px;
                line-height: 22px;
                padding: 13px 16px 13px 14px;
                display: block;
                width: 306px;
                font-size: 16px;
                display: block;
                margin: 14px auto;
            }
            button {
                background-color: #ef5b00;
                border: 0;
                width: 340px;
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
        }
    }
}
.n-footer {
    color: #9d9d9d;
    text-align: center;
    height: 80px;
    margin-top: -80px;
    .nf-link-area {
        text-align: center;
    }
    .nf-intro {
        padding: 10px;
    }
    .beianlink {
        color: #9d9d9d;
    }
}
</style>
