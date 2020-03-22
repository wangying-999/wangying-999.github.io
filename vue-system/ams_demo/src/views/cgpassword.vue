<template>
    <div id="changePwd">
      <el-form :model="changePwd" status-icon :rules="rules2" ref="changePwd" label-width="100px" style="margin:20px auto;width:40%;min-width:300px;">
        <el-form-item label="原密码" prop="pass">
          <el-input type="password" v-model="changePwd.pass" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="新密码" prop="passNew">
          <el-input type="password" v-model="changePwd.passNew" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="确认密码" prop="checkPass">
          <el-input type="password" v-model="changePwd.checkPass" autocomplete="off"></el-input>
        </el-form-item>

        <el-form-item>
          <el-button type="primary" @click="submitForm('changePwd')">提交</el-button>
          <el-button @click="resetForm('changePwd')">重置</el-button>
        </el-form-item>
      </el-form>
    </div>
</template>

<script>
    export default {
        name: "cgpassword",
      data:function() {
          var validatePass3=(rule, value, callback)=>{
            if (value!=this.pwd) {
              callback(new Error('密码错误，请重新输入！'));
            } else{
              callback();
            }
          };
        var validatePass = (rule, value, callback) => {
          if (value === '') {
            callback(new Error('请输入密码'));
          } else {
            if (this.changePwd.checkPass != '') {
              this.$refs.changePwd.validateField('checkPass');
            }
            callback();
          }
        };
        var validatePass2 = (rule, value, callback) => {
          if (value === '') {
            callback(new Error('请再次输入密码'));
          } else if (value !== this.changePwd.passNew) {
            callback(new Error('两次输入密码不一致!'));
          } else {
            callback();
          }
        };
        return {
          changePwd: {
            pass:'',
            passNew: '',
            checkPass: '',
          },
          admin:{ 
            username: '',
            password:''
          },
          pwd:"",
          rules2: {
            pass:[
              {required:true,validator:validatePass3,trigger:'blur'},
             
            ],
            passNew: [
              { required:true,validator: validatePass, trigger: 'blur' },
              
            ],
            checkPass: [
              { required:true,validator: validatePass2, trigger: 'blur' }
            ]
          }
        };
      },
      mounted(){
          let pwd = localStorage.getItem('ms_password');
          let username=localStorage.getItem('ms_username')
          this.pwd=pwd;
          this.admin.username=username;
        
      },
      methods: {
        submitForm(formName) {
          this.$refs[formName].validate((valid) => {
            if (valid) {
              this.$confirm(
                "确认修改",
                {
                  type:"warning"
                }
              ).then(()=>{
                this.admin.password=this.changePwd.passNew; //赋值新密码
             
               var that=this;
                this.$http.post("/vue/changepwd",this.admin).then(res=>{
                  console.log(res);
                    if(res.status==200){
                        this.$message.success(res.data.msg)
                        localStorage.setItem('ms_password', that.admin.password);
                        that.pwd=that.admin.password;
                        that.resetForm('changePwd');
                    }
                })
             
              }).catch(()=>{
                this.$message({
                  type:"info",
                  message:"已取消修改"
                });
              });

            } else {
              this.$message.error("请填写密码")
            }
          });
        },
        resetForm(formName) {
          this.$refs[formName].resetFields();
        }
      },
     
    }
</script>
<style scoped>

#changePwd{
    margin-top: 100px;
}
</style>