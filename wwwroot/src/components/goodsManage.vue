<template>
    <div style="min-height: 600px;position: relative">
        <el-dialog title="商品管理" :visible.sync="dialogVisible" width="50%" :before-close="handleReset">
            <el-form label-position="left" label-width="80px" :model="formData">
                <el-form-item label="商品名称">
                    <el-input v-model="formData.goodsName"></el-input>
                </el-form-item>
                <el-form-item label="价格">
                    <el-input v-model="formData.goodsPrice"></el-input>
                </el-form-item>
                <el-form-item label="图片地址">
                    <el-input v-model="formData.goodsImgUrl"></el-input>
                </el-form-item>
                <el-form-item label="机身内存">
                    <el-input v-model="formData.goodsModel"></el-input>
                </el-form-item>
                <el-form-item label="商品介绍">
                    <el-input v-model="formData.goodsIntro"></el-input>
                </el-form-item>
            </el-form>
            <span slot="footer" class="dialog-footer">
                <el-button @click="handleReset">取 消</el-button>
                <el-button type="primary" @click="handleSave">确 定</el-button>
            </span>
        </el-dialog>
        <el-breadcrumb separator="/">
            <el-breadcrumb-item>首页</el-breadcrumb-item>
            <el-breadcrumb-item>商品管理</el-breadcrumb-item>
        </el-breadcrumb>
        <el-button class="add-btn" type="primary" size="small" @click="handleAdd">添加商品</el-button>
        <el-table :data="tableData" border style="width: 100%;">
            <el-table-column prop="goodsId" label="ID">
            </el-table-column>
            <el-table-column prop="goodsName" label="商品名称">
            </el-table-column>
            <el-table-column prop="goodsPrice" label="价格">
            </el-table-column>
            <el-table-column prop="goodsImgUrl" label="图片地址">
            </el-table-column>
            <el-table-column prop="goodsModel" label="容量">
            </el-table-column>
            <el-table-column prop="goodsIntro" label="介绍">
            </el-table-column>
            <el-table-column label="操作">
                <template slot-scope="scope">
                    <el-button @click="handleEdit(scope.row)" type="text" size="small">编辑</el-button>
                    <el-button @click="handleDel(scope.row)" type="text" size="small">删除</el-button>
                </template>
            </el-table-column>
        </el-table>
    </div>
</template>

<script>
export default {
    name: "userList",
    data() {
        return {
            tableData: [],
            dialogVisible: false,
            formData: {
                goodsName: "",
                goodsPrice: "",
                goodsImgUrl: "",
                goodsModel: "",
                goodsIntro: ""
            }
        };
    },
    created() {
        this.getList();
    },
    methods: {
        handleAdd() {
            this.dialogVisible = true;
        },
        handleSave() {
            let params = this.formData;
            let me = this;
            me.ajax({
                type: "post",
                data: params,
                url: "/mi/manage/addGood",
                success(res) {
                    me.dialogVisible = false;
                    me.$message('操作成功');
                    me.getList();
                },
                error() {
                    me.$alert("服务器出小差了~");
                }
            });
        },
        handleEdit(row) {
            this.formData = {...row};
            this.dialogVisible = true;
        },
        handleDel(row) {
            let params = {goodsId: row.goodsId};
            let me = this;
            me.ajax({
                type: "post",
                data: params,
                url: "/mi/manage/delGood",
                success(res) {
                    me.$message('删除成功');
                    me.getList();
                },
                error() {
                    me.$alert("服务器出小差了~");
                }
            });
        },
        handleReset() {
            this.dialogVisible = false;
            this.formData = {
                goodsName: "",
                goodsPrice: "",
                goodsImgUrl: "",
                goodsModel: "",
                goodsIntro: ""
            };
        },
        getList() {
            let me = this;
            me.ajax({
                type: "post",
                url: "/mi/manage/getGoodsList",
                success(res) {
                    me.tableData = res.data;
                },
                error() {
                    me.$alert("获取列表数据失败，稍后重试！");
                }
            });
        }
    }
};
</script>

<style scoped lang="less">
.el-breadcrumb {
    padding-bottom: 20px;
}
.add-btn {
    margin-bottom: 10px;
}
</style>
