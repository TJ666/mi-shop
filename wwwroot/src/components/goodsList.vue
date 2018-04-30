<template>
    <div class="goods-list">
        <mi-header></mi-header>
        <div class="search-box">
            <el-input placeholder="请输入内容" v-model="searchCon" class="input-with-select">
                <el-button slot="append" icon="el-icon-search" @click="serachGoods"></el-button>
            </el-input>
        </div>
        <el-carousel :interval="5000" arrow="always" height='620px'>
            <el-carousel-item>
                <div class="banner-wraper">
                    <a href="javascript:;" @click="jumpDetail(1)">
                        <img src="../assets/imgs/good-banner-01.jpg" alt="banner">
                    </a>
                </div>
            </el-carousel-item>
            <el-carousel-item>
                <div class="banner-wraper">
                    <a href="javascript:;" @click="jumpDetail(2)">
                        <img src="../assets/imgs/good-banner-02.jpg" alt="banner">
                    </a>
                </div>
            </el-carousel-item>
        </el-carousel>
        <p class="goods-list-tit">小米手机</p>
        <div class="goods-wraper">
            <div style="width: 100%; height: 400px; line-height: 400px;font-size:32px;text-align:center;" v-if="goodsListData.length == 0">未找到此商品~</div>
            <div class="product-cell shadow" v-for="item in goodsListData" :key="item.goodsId">
                <div class="figure">
                    <a class="exposure" href="javascript:;" @click="jumpDetail(item.goodsId)">
                    <img class="J_lazy" :alt="item.goodsName" style="background-color:#C2C7C6;" :src='item.goodsImgUrl'> </a>
                </div>
                <h3 class="title">
                    <a class="exposure" href="javascript:;" @click="jumpDetail(item.goodsId)">{{item.goodsName}}</a>
                </h3>
                <p class="desc">{{item.goodsIntro}}</p>
                <p class="price">
                    <strong>{{item.goodsPrice}}</strong>元
                </p>
            </div>
        </div>
    </div>
</template>

<script>
import miHeader from "@/common/miHeader";
export default {
    name: "goodsList",
    components: {
        miHeader
    },
    data() {
        return {
            goodsListData: [],
            searchCon: ''
        };
    },
    created() {
        this.init();
    },
    methods: {
        init() {
            this.getGoodsList();
        },
        getGoodsList() {
            let me = this;
            me.ajax({
                type: "post",
                data: {},
                url: "/mi/manage/getGoodsList",
                success(res) {
                    if (res.code !== 0) {
                        me.$alert(res.msg || "请求商品列表失败，请稍后重试！");
                        return;
                    }
                    me.goodsListData = res.data;
                },
                error() {
                    me.$alert("请求商品列表失败，请稍后重试！");
                }
            });
        },
        serachGoods() {
            let me = this;
            me.ajax({
                type: "post",
                data: {goodsName: me.searchCon},
                url: "/mi/manage/getGoodsList",
                success(res) {
                    if (res.code !== 0) {
                        me.$alert(res.msg || "请求商品列表失败，请稍后重试！");
                        return;
                    }
                    me.goodsListData = res.data;
                },
                error() {
                    me.$alert("请求商品列表失败，请稍后重试！");
                }
            });
        },
        jumpDetail(id) {
            this.$router.push({path: '/detail', query: {id: id}});
        }
    }
};
</script>

<style scoped lang="less">
.search-box {
    padding: 10px 60px;
}
.goods-list {
    background: #f5f5f5;
    .banner-wraper {
        position: relative;
        overflow: hidden;
        width: 100%;
        height: 620px;
        img {
            position: absolute;
            width: 2560px;
            height: 620px;
            top: 0;
            left: 50%;
            margin-left: -1280px;
        }
    }
    .goods-list-tit {
        width: 1226px;
        margin: 0 auto;
        line-height: 64px;
        padding-top: 4px;
        color: #333;
        font-size: 24px;
        font-weight: normal;
    }
    .goods-wraper {
        width: 1226px;
        margin-right: auto;
        margin-left: auto;
        display: flex;
        flex-shrink: 1;
        flex-wrap: wrap;
        /* justify-content: space-between; */
        align-content: flex-start;
        .product-cell {
            transition: all .2s linear;
            position: relative;
            background: #fff;
            text-align: center;
            width: 400px;
            margin-right: 6px;
            margin-bottom: 6px;
            &:hover {
                box-shadow: 0 15px 30px rgba(0,0,0,0.1);
                -webkit-transform: translate3d(0, -5px, 0);
                transform: translate3d(0, -5px, 0);
                z-index: 3;
            }
            .figure {
                height: 266px;
                img {
                    display: block;
                    width: 100%;
                    height: 100%;
                }
            }
            .title {
                line-height: 20px;
                margin: 18px 0 0;
                font-weight: normal;
                white-space: nowrap;
                text-overflow: ellipsis;
                overflow: hidden;
                _zoom: 1;
            }
            .desc {
                line-height: 14px;
                margin: 6px 0 0;
                color: #333333;
                color: rgba(51,51,51,0.7);
                font-size: 14px;
            }
            .price {
                line-height: 30px;
                margin: 9px 0 0;
                color: #ff6700;
                font-size: 12px;
                font-weight: bold;
                strong {
                    font-family: "pricefont","Helvetica Neue",Helvetica,Arial,"Microsoft Yahei","Hiragino Sans GB","Heiti SC","WenQuanYi Micro Hei",sans-serif;
                    font-weight: normal;
                    font-size: 24px;
                }
            }
        }
    }
}
</style>
