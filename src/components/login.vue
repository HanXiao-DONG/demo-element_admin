<template>
    <div class="layout">
        <div class="main_body">
            <el-card>
                <p slot="header">element后台demo</p>
                <el-form label-position="right" class="form" ref="ruleUserInfo" :model="userInfo" :rules="ruleUserInfo" label-width="0">
                    <el-form-item prop="userName">
                        <el-input prefix-icon="iconfont iconyonghuming" v-model="userInfo.userName" clearable placeholder="请输入用户名"></el-input>
                    </el-form-item>
                    <el-form-item prop="password">
                        <el-input prefix-icon="iconfont iconmima1" type="password" v-model="userInfo.password" clearable placeholder="请输入密码" @keyup.enter.native="login('ruleUserInfo')"></el-input>
                    </el-form-item>
                    <el-form-item>
                        <el-button type="success" style="width: 100%;" @click="login('ruleUserInfo')">登录</el-button>
                    </el-form-item>
                </el-form>
            </el-card>
        </div>
    </div>
</template>
<script type="text/ecmascript-6">
    import crypto from 'crypto';
    export default {
        data: function () {
            return {
                userInfo: {
                    userName: null,
                    password: null,
                    role: 'novel'
                },
                ruleUserInfo: {
                    userName: [
                        {required: true, message: '请输入用户名', trigger: 'blur'}
                    ],
                    password: [
                        {required: true, message: '请输入密码', trigger: 'blur'}
                    ],
                }
            }
        },

        methods: {

            emptyMenu() {
                this.$store.commit('SET_BAR_INDEX', null);
                this.$store.commit('SET_ROLE', null);
                this.$store.commit('SET_INDEX', null);
            },

            // 登陆
            login (name) {
                this.$refs[name].validate((valid) => {
                    if (valid) {
                        const userData = JSON.parse(JSON.stringify({userName: 'test', permission: ['all'], role: 'novel'}));
                        userData.permissions = userData.permission;
                        localStorage.setItem('mis_element_demo', JSON.stringify(userData));
                        this.$router.push({path: '/'});
                        this.emptyMenu();
                        // const postData = {
                        //     userName: this.userInfo.userName.trim(),
                        //     userPassword: crypto.createHash('md5').update(this.userInfo.password.trim(), 'utf8').digest('hex'),
                        //     role: this.userInfo.role
                        // };
                        // this.$axios.post('/index.php/index/Api/managers', postData).then(res => {
                        //     if (res.code === 3) {
                        //         this.$Message.warning(res.msg);
                        //         this.userInfo.userName = null;
                        //         this.userInfo.password = null;
                        //         return false;
                        //     }
                        //     const userData = JSON.parse(JSON.stringify(res.data));
                        //     userData.permissions = res.data.permission;
                        //     delete userData.permission;
                        //     localStorage.setItem('mis_element_demo', JSON.stringify(userData));
                        //     this.emptyMenu();
                        //     this.$router.push({path: '/'});
                        // }).catch(error => {
                        //     this.$Message.error(error);
                        //     return false;
                        // });
                    }
                })
            }
        }
    }
</script>
<style scoped>
    .layout {
        background: #ebf1f6;
        position: relative;
        border-radius: 4px;
        overflow: hidden;
    }

    .main_body {
        position: fixed;
        width: 100% !important;
        height: 100% !important;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        background-color: #ebf1f6;
    }

    .title {
        color: #ffffff;
        font-weight: bold;
        font-size: 24px;
        margin-bottom: 50px;
    }

    .form {
        background-color: #ffffff;
        width: 400px;
        padding: 30px;
        border-radius: 10px;
    }
</style>
