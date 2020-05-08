<template>
    <div class="login-wrap" flex="main:center cross:center">
        <div class="ms-login">
            <el-form :model="form" :rules="rules" ref="form" label-width="0px" v-loading="loading">
                <el-form-item prop="account">
                    <el-input v-model="form.account" placeholder="账号"></el-input>
                </el-form-item>
                <el-form-item prop="password">
                    <el-input type="password" placeholder="密码" v-model="form.password"
                            @keyup.enter.native="submitForm('form')"></el-input>
                </el-form-item>
                <el-form-item v-if="validCodeEnabled" prop="validCode" >
                    <el-input placeholder="验证码" v-model="form.validCode"
                            @keyup.enter.native="submitForm('form')"></el-input>
                    <img :src="imgSrc" style="height: 25px; position: absolute;top: 8px;right:5px;"
                        @click="validCodeImage">
                </el-form-item>
                <el-form-item flex="main:center">
                    <el-button type="primary" style="padding:12px 50px" @click="submitForm('form')">登录</el-button>
                </el-form-item>
            </el-form>
        </div>
    </div>
</template>

<script>

    import md5 from 'crypto-js/md5'
    import { base64 } from '@/common/util'
    export default {
        data: function () {
            return {
                loading: false,
                form: {
                    account: '',
                    password: ''
                },
                rules: {
                    account: [
                        {required: true, message: '请输入用户名', trigger: 'blur'}
                    ],
                    password: [
                        {required: true, message: '请输入密码', trigger: 'blur'}
                    ]
                },
                imgSrc: '',
                remember: false,
                validCodeIdentity: null,
                first: true,
                validCodeEnabled: false,
                isLogin: false
            }
        },
        created() {
            this.getConfig();
        },
        methods: {
            getConfig(){
                this.$http.get("/api/front/index/config.json").then(({data}) => {
                    this.validCodeEnabled = data.t.enableValidCode == '1';
                    if(this.validCodeEnabled){
                        this.validCodeImage();
                    }
                })
            },
            submitForm(formName) {
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        this.login();
                    } else {
                        console.log('error submit!!');
                        return false;
                    }
                });
            },
            login() {
                this.loading = true;
                this.$http.post('/api/front/index/login', Object.assign({
                    validCodeIdentity: this.validCodeIdentity,
                    loginSrc: 0
                }, Object.assign({}, this.form, {password: md5(this.form.password).toString()}) )).then(({data}) => {
                    this.loading = false;
                    this.$message.success("登录成功");
                    this.isLogin = true;
                    location.href = `/#/?token=${base64.encode(data.t.token)}`
                }).catch((err)=>{
                    this.loading = false;
                    if (this.validCodeEnabled) {
                        this.validCodeImage();
                    }
                })
            },
            validCodeImage() {
                this.$http.post('/api/front/index/getvalidatecode', {lastIdentity: this.validCodeIdentity}).then((res) => {
                        if (res.data.success) {
                            this.validCodeIdentity = res.data.t.identity;
                            this.imgSrc = 'data:image/png;base64,' + res.data.t.img;
                        }
                    }, error => {
                        this.$alert(error.message);
                    }
                );
            }
        }
    }
</script>

<style>

    html,body,.login-wrap {
        width: 100%;
        height: 100%;
        background-color: #f5f5f5;
    }

    .ms-title {
        text-align: center;
        font-size: 30px;
        color: #fff;

    }

    .ms-login {
        
        width: 90vw;
        max-width: 350px;
        padding: 40px;
        border-radius: 5px;
        box-sizing: border-box;
        background: #fff;
    }

    .login-btn {
        text-align: center;
    }

    .login-btn button {
        width: 100%;
        height: 36px;
    }
</style>
