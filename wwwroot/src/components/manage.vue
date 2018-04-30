<template>
    <el-container class="manage-wrap">
        <el-header class="manage-header">
            <div class="manage-tit">小米商城后台管理系统</div>
            <div class="manage-user"  style="cursor: pointer" @click="handleLogout">退出 </div>
            <div class="manage-user"> 用户名</div>
        </el-header>
        <el-container>
            <el-aside width="200px">
                <el-menu default-active="userList" class="el-menu-vertical" @select="handleSelect"  background-color="#545c64" text-color="#fff" active-text-color="#ffd04b">
                    <el-menu-item index="userList">
                        <i class="el-icon-menu"></i>
                        <span slot="title">用户管理</span>
                    </el-menu-item>
                    <el-menu-item index="goodsManage">
                        <i class="el-icon-setting"></i>
                        <span slot="title">商品管理</span>
                    </el-menu-item>
                </el-menu>
            </el-aside>
            <el-main>
                <component :is="curComponent"></component>
            </el-main>
        </el-container>
    </el-container>
</template>

<script>
import goodsManage from './goodsManage';
import userList from './userList';
export default {
    name: "HelloWorld",
    components: {
        userList,
        goodsManage,
        userName: sessionStorage.getItem('userName') || ''
    },
    data() {
        return {
            userName: '',
            curComponent: 'userList'
        };
    },
    methods: {
        handleSelect(key, keyPath) {
            console.log(key, keyPath);
            this.curComponent = key;
        },
        handleLogout() {
            sessionStorage.removeItem('userName');
            this.$router.push({path: '/login'});
        },
        regist() {
            let me = this;
            let params = {
                userName: me.userName,
                passWord: me.passWord
            };
            if (!params.userName || !params.passWord) {
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
                            me.$router.push({ path: "/login" });
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
.manage-wrap {
    .manage-header {
        background: #4f4f4f;
        line-height: 60px;
        position: relative;
        overflow: hidden;
    };
    .manage-tit {
        font-size: 18px;
        color: #fff;
        float: left;
    }
    .manage-user {
        color: #fff;
        float: right;
        margin-left: 10px;
    }
}
.el-menu {
    height: 100%;
}
</style>
