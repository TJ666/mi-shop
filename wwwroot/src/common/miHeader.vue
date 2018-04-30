
<template>
    <div class="site-topbar">

        <div class="container">
            <div class="topbar-nav">
                <a href="/#/goodsList">小米商城</a>
                <span class="sep">|</span>
                <a href="#">MIUI</a>
                <span class="sep">|</span>
                <a href="#">IoT</a>
                <span class="sep">|</span>
                <a href="#">云服务</a>
            </div>
            <div class="topbar-cart" id="J_miniCartTrigger">
                <a class="cart-mini" id="J_miniCartBtn" href="javascript:;" @click="buyCarList">
                    <i class="iconfont">&#xe6a2;</i>购物车
                    <span class="cart-mini-num J_cartNum">（{{carGoodsNum}}）</span>
                </a>
                <div class="cart-menu" id="J_miniCartMenu">
                    <div class="loading">
                        <div class="loader"></div>
                    </div>
                </div>
            </div>
            <div class="topbar-info" id="J_userInfo" v-if="!userName">
                <a class="link" href="/#/login">登录</a>
                <span class="sep">|</span>
                <a class="link" href="/#/regist">注册</a>
            </div>
            <div class="topbar-info" id="J_userInfo" v-else>
                <a class="link" href="javascript:;">{{userName}}</a>
                <span class="sep">|</span>
                <a class="link" href="JavaScript:;" @click="logout">注销</a>
            </div>
        </div>
        <el-dialog title="我的购物车" 
            :modal-append-to-body="false"
            :show-close="false"
            :visible="dialogVisible"
            width="60%"
            >
            <div class="car-list">
                <div class="list-item" v-for="item in buyCarGoods" :key='item.goodsId'>
                    <p>
                        <img :src="item.goodsImgUrl" alt="">
                        <span>{{item.goodsName}}</span>
                        <span>商品数量： {{item.goodsNum}}</span>
                        <span>总价：{{item.totalPrice}}</span>
                        <el-button type="danger" icon="el-icon-delete" circle @click="deleteCarGood(item.carId)"></el-button>
                    </p>
                </div>
                <p v-if="buyCarGoods.length == 0" style="font-size:18px; text-align:center">
                    购物车空空如也，快去剁手吧！
                </p>
            </div>
            <span slot="footer" class="dialog-footer">
                <el-button @click="dialogVisible = false">取 消</el-button>
                <el-button v-show="buyCarGoods.length !== 0" type="primary" @click="goPay">去支付</el-button>
            </span>
        </el-dialog>
    </div>
</template>

<script>
import hub from "@/common/hub";
export default {
    name: "HelloWorld",
    data() {
        return {
            buyCarGoods: [],
            dialogVisible: false,
            userName: sessionStorage.getItem('userName')
        };
    },
    computed: {
        carGoodsNum() {
            let num = 0;
            this.buyCarGoods.forEach(item => {
                num += item.goodsNum;
            });
            return num;
        }
    },
    created() {
        console.log(this.userName);
        hub.$on("addBuyCar", params => {
            params.carId = new Date().getTime();
            this.buyCarGoods.push(params);
        });
    },
    methods: {
        init() {
            let me = this;
            let params = {
                userName: me.userName,
                passWord: me.passWord
            };
            if (!params.userName || !params.passWord) {
                this.$alert("用户名或密码不能为空！");
                return;
            }
        },
        buyCarList() {
            this.dialogVisible = true;
        },
        goPay() {
            let me = this;
             me.$alert("支付成功", "提示", {
                confirmButtonText: "继续购物",
                callback: action => {
                    me.buyCarGoods = [];
                    me.$router.push({path: '/goodsList'});
                }
            });
        },
        deleteCarGood(carId) {
            this.buyCarGoods = this.buyCarGoods.filter(item => {
                return item.carId != carId;
            })
        },
        logout() {
            sessionStorage.removeItem('userName');
            this.$router.push({path: '/login'});
        }
    }
};
</script>

<style lang="less">
.site-topbar {
    position: relative;
    z-index: 30;
    height: 40px;
    font-size: 12px;
    color: #b0b0b0;
    background: #333;
    .container {
        width: 1224px;
        margin-right: auto;
        margin-left: auto;
        .iconfont {
            margin: 0 3px;
        }
    }
    .container:before,
    .container:after {
        content: " ";
        display: table;
    }
}
.site-topbar .topbar-nav {
    float: left;
    height: 40px;
    line-height: 40px;
    overflow: hidden;
    _zoom: 1;
}
.site-topbar a {
    color: #b0b0b0;
}
.site-topbar .sep {
    margin: 0 0.5em;
    color: #424242;
}
.sep,
.ndash {
    margin: 0 0.25em;
    font-family: sans-serif;
}
.site-topbar .topbar-cart {
    width: 120px;
    margin-left: 15px;
}

.site-topbar .topbar-cart,
.site-topbar .topbar-info {
    position: relative;
    float: right;
    _display: inline;
    height: 40px;
}
.site-topbar .topbar-info {
    line-height: 40px;
}
.site-topbar .topbar-cart,
.site-topbar .topbar-info {
    position: relative;
    float: right;
    _display: inline;
    height: 40px;
}
.site-topbar .topbar-info .link,
.site-topbar .topbar-info .user,
.site-topbar .topbar-info .message,
.site-topbar .topbar-info .sep {
    float: left;
}
.site-topbar .topbar-info {
    line-height: 40px;
}
.site-topbar .topbar-cart,
.site-topbar .topbar-info {
    position: relative;
    float: right;
    _display: inline;
    height: 40px;
}
.site-topbar .cart-mini {
    position: relative;
    z-index: 32;
    display: block;
    height: 40px;
    line-height: 40px;
    text-align: center;
    color: #b0b0b0;
    background: #424242;
}
.car-list {
    img {
        width: 80px;
        height: 80px;
        vertical-align: bottom;
    }
    .list-item {
        span {
            font-size: 16px;
            line-height: 40px;
            margin: 0 10px;
        }
    }
}
</style>
