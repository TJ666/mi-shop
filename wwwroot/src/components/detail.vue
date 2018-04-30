<template>
    <div class="goods-detail">
        <mi-header></mi-header>
        <div class="goods-detail-tit">
            <p>{{goodsInfo.goodsName}}
                <span>{{goodsInfo.goodsIntro}}</span>
            </p>
        </div>
        <div class="goods-detail-wraper">
            <div class="goods-detail-left">
                <img :src="goodsInfo.goodsImgUrl">
            </div>
            <div class="goods-detail-right">
                <h2>{{goodsInfo.goodsName}}</h2>
                <p>{{goodsInfo.goodsIntro}}</p>
                <div class="address">
                    <p>请选择收货地址：</p>
                    <p>
                        <el-cascader :options="addressOpts" v-model="selectedAddress"></el-cascader>
                    </p>
                    <textarea class="address-detail" placeholder="详细地址" v-model="detailAddress"></textarea>
                </div>
                <p>
                    <el-input-number v-model="goodsNum" :min="1" :max="10" label="数量："></el-input-number>
                </p>
                <div class="totlePrice"> 总计 ：{{totalPrice}}元 </div>
                <button @click="addBuyCar">
                    加入购物车
                </button>
            </div>
        </div>
    </div>
</template>

<script>
import hub from "@/common/hub";
import miHeader from "@/common/miHeader";
export default {
    name: "goodsList",
    components: {
        miHeader
    },
    computed: {
        totalPrice() {
            return this.goodsInfo.goodsPrice * this.goodsNum;
        }
    },
    data() {
        return {
            goodsId: this.$route.query.id || "",
            goodsInfo: {},
            // 选择的商品信息
            selectedAddress: [],
            detailAddress: "",
            goodsNum: 1,
            addressOpts: [
                {
                    value: "山西省",
                    label: "山西省",
                    children: [
                        {
                            value: "太原",
                            label: "太原"
                        },
                        {
                            value: "大同",
                            label: "大同"
                        },
                        {
                            value: "忻州",
                            label: "忻州"
                        },
                        {
                            value: "朔州",
                            label: "朔州"
                        }
                    ]
                },
                {
                    value: "北京",
                    label: "北京",
                    children: [
                        {
                            value: "西城区",
                            label: "西城区"
                        },
                        {
                            value: "东城区",
                            label: "东城区"
                        },
                        {
                            value: "昌平区",
                            label: "昌平区"
                        },
                        {
                            value: "怀柔",
                            label: "怀柔"
                        }
                    ]
                }
            ]
        };
    },
    created() {
        this.init();
    },
    methods: {
        init() {
            this.getGoodsDetail();
        },
        getGoodsDetail() {
            let me = this;
            me.ajax({
                type: "post",
                data: { goodsId: me.goodsId },
                url: "/mi/getGoodsDetail",
                success(res) {
                    if (res.code !== 0) {
                        me.$alert(res.msg || "请求商品信息失败，请稍后重试！");
                        return;
                    }
                    me.goodsInfo = res.data[0];
                    console.log(me.goodsInfo);
                },
                error() {
                    me.$alert("请求商品信息失败，请稍后重试！");
                }
            });
        },
        addBuyCar() {
            let params = {
                goodsId: this.goodsId,
                selectedAddress: this.selectedAddress,
                detailAddress: this.detailAddress,
                goodsNum: this.goodsNum,
                ...this.goodsInfo,
                totalPrice: this.totalPrice
            };
            console.log(params);
            hub.$emit("addBuyCar", params);
            this.$message({
                message: "添加成功！",
                center: true
            });

            // this.$ajax({
            //     type: 'POST',
            //     data: params,
            //     url: '/mi/addBuyCar',
            //     success() {

            //     },
            //     error() {

            //     }
            // })
        }
    }
};
</script>

<style scoped lang="less">
.goods-detail {
    .goods-detail-tit {
        position: relative;
        line-height: 62px;
        height: 63px;
        width: 100%;
        margin-top: 0;
        color: #616161;
        position: relative;
        z-index: 4;
        background: #fff;
        border-top: 1px solid #e0e0e0;
        border-bottom: 1px solid #e0e0e0;
        -webkit-box-shadow: 0px 5px 5px rgba(0, 0, 0, 0.07);
        box-shadow: 0px 5px 5px rgba(0, 0, 0, 0.07);
        p {
            font-size: 20px;
            width: 1242px;
            margin: 0 auto;
            span {
                font-size: 16px;
                color: #666;
                margin-left: 20px;
            }
        }
    }
    .goods-detail-wraper {
        width: 1242px;
        margin: 20px auto;
        position: relative;
        overflow: hidden;
        .goods-detail-left {
            float: left;
            width: 60%;
            img {
                width: 600px;
                height: 600px;
            }
        }
        .goods-detail-right {
            float: right;
            width: 40%;
            h2 {
                font-size: 24px;
                font-weight: 400;
                margin: 40px 0 40px 20px;
            }
            p {
                font-size: 16px;
                margin: 0 0 10px 20px;
            }
            .address-detail {
                margin: 0 0 20px 20px;
                width: 300px;
                height: 100px;
                border: 1px solid #dcdfe6;
                border-radius: 3px;
                /* color: #ccc; */
                padding: 10px;
            }
            .totlePrice {
                color: #ff6700;
                font-size: 24px;
                padding-top: 20px;
                margin-left: 20px;
            }
            button {
                background-color: #ef5b00;
                border: 0;
                width: 340px;
                height: 50px;
                line-height: 50px;
                display: block;
                margin-left: 20px;
                text-align: center;
                font-size: 14px;
                color: #fff;
                cursor: pointer;
                margin-top: 40px;
            }
        }
    }
}
</style>
