<template>
    <div style="min-height: 600px;position: relative">
        <el-dialog title="用户管理" :visible.sync="dialogVisible" width="50%" :before-close="handleReset">
            <el-form label-position="left" label-width="80px" :model="formData">
                <el-form-item label="用户名">
                    <el-input v-model="formData.userName"></el-input>
                </el-form-item>
                <el-form-item label="密码">
                    <el-input v-model="formData.passWords"></el-input>
                </el-form-item>
                <el-form-item label="电话">
                    <el-input v-model="formData.phoneNum"></el-input>
                </el-form-item>
                 <el-form-item label="邮箱">
                    <el-input v-model="formData.email"></el-input>
                </el-form-item>
            </el-form>
            <span slot="footer" class="dialog-footer">
                <el-button @click="handleReset">取 消</el-button>
                <el-button type="primary" @click="handleSave">确 定</el-button>
            </span>
        </el-dialog>
        <el-breadcrumb separator="/">
            <el-breadcrumb-item>首页</el-breadcrumb-item>
            <el-breadcrumb-item>用户管理</el-breadcrumb-item>
        </el-breadcrumb>
        <el-button class="add-btn" type="primary" size="small" @click="handleAdd">添加用户</el-button>
        <el-table :data="tableData" border style="width: 100%;">
            <el-table-column prop="userId" label="ID">
            </el-table-column>
            <el-table-column prop="userName" label="用户名">
            </el-table-column>
            <el-table-column prop="passWords" label="密码">
            </el-table-column>
            <el-table-column prop="phoneNum" label="电话">
            </el-table-column>
            <el-table-column prop="email" label="邮箱">
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
                userName: "",
                passWords: "",
                phoneNum: "",
                email: ""
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
                url: "/mi/manage/addUser",
                success(res) {
                    me.dialogVisible = false;
                    me.handleReset();
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
            let params = {userId: row.userId};
            let me = this;
            me.ajax({
                type: "post",
                data: params,
                url: "/mi/manage/delUser",
                success(res) {
                    me.$message("操作成功！");
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
                userName: "",
                passWords: "",
                phoneNum: "",
                email: ""
            };
        },
        getList() {
            let me = this;
            me.ajax({
                type: "get",
                url: "/mi/manage/getUserList",
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
