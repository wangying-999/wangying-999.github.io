<template>
    <div class="login-wrap">
        <div class="ms-login">
            <div class="ms-title">资产管理系统</div>
            <el-form :model="param" :rules="rules" ref="login" label-width="0px" class="ms-content">
                <el-form-item prop="username">
                    <el-input v-model="param.username" placeholder="用户名">
                        <el-button slot="prepend" icon="el-icon-lx-people"></el-button>
                    </el-input>
                </el-form-item>
                <el-form-item prop="password">
                    <el-input
                        type="password"
                        placeholder="密码"
                        v-model="param.password"
                        show-password
                        @keyup.enter.native="submitForm()"

                    >
                        <el-button slot="prepend" icon="el-icon-lx-lock"></el-button>
                    </el-input>
                </el-form-item>
                <div class="login-btn">
                    <el-button type="primary" @click="submitForm()">登录</el-button>
                </div>
                <p class="login-tips">
                    <router-link to="/register" class="tip">
                           Tips : 立即注册。
                    </router-link>
                </p>
            </el-form>
        </div>
    </div>
</template>

<script>


export default {
    data: function() {
        return {
            param: {
                username: '',
                password: '',
            },
            rules: {
                username: [{ required: true, message: '请输入用户名', trigger: 'blur' }],
                password: [{ required: true, message: '请输入密码', trigger: 'blur' }],
            },
        };
    },
    methods: {
        submitForm() {
            this.$refs.login.validate(valid => {
                if (valid) {
                    var that=this;
                    this.$http.post("/vue/login",that.param)
                    .then(res=>{
                        // console.log(res);
                        if(!!res.data.flag){
                        this.$message({
                            showClose: true,
                            message: res.data.msg,
                            type: 'success'
                            });
                        localStorage.setItem('ms_username', this.param.username);
                        localStorage.setItem('ms_password', this.param.password);
                        this.$router.push('/sfpage');                                                               
                        }else{
                            this.$message({
                            showClose: true,
                            message: res.data.msg,
                            type: 'error'
                            });
                        }
                    })          
                } else {
                    this.$message({
                    showClose: true,
                    message: '请输入账号和密码',
                    type: 'error'
                    });
                    console.log('error submit!!');
                    return false;
                }
            });
        },
    },
    created(){
        let username = localStorage.getItem('username');
        this.param.username=username;
    }
};
</script>

<style scoped>
.login-wrap {
    position: relative;
    width: 100%;
    height: 100%;
    background-image: url(../assets/img/login-bg.jpg);
    background-size: 100%;
}
.ms-title {
    width: 100%;
    line-height: 50px;
    text-align: center;
    font-size: 20px;
    color: #eee;
    border-bottom: 1px solid #ddd;
}
.ms-login {
    position: absolute;
    left: 50%;
    top: 50%;
    width: 350px;
    margin: -190px 0 0 -175px;
    border-radius: 5px;
    background: rgba(255, 255, 255, 0.3);
    overflow: hidden;
}
.ms-content {
    padding: 30px 30px;
}
.login-btn {
    text-align: center;
}
.login-btn button {
    width: 100%;
    height: 36px;
    margin-bottom: 10px;
}
.login-tips {
    font-size: 12px;
    line-height: 30px;
    
}
.login-tips .tip{
    color: #fff;
}
.login-tips .tip:hover{
    color: brown;
}
</style>