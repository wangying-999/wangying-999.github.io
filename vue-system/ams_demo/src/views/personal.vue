<template>
    <div>
        <div class="crumbs">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item>
                    <i class="el-icon-lx-calendar"></i> 个人中心
                </el-breadcrumb-item>
                
            </el-breadcrumb>
        </div>
        <div class="container">
            <div class="form-box">
                <el-form ref="form" :model="form" label-width="80px" size="mini">
                    <el-form-item label="姓名"  >
                        <el-col :span="12">
                        <el-input v-model="form.name" ></el-input>
                        </el-col>
                    </el-form-item>
                    <el-form-item label="微信"  >
                        <el-col :span="12">
                        <el-input v-model="form.weixin" ></el-input>
                        </el-col>
                    </el-form-item>
                      <el-form-item label="电话"  >
                        <el-col :span="12">
                        <el-input v-model="form.phone" ></el-input>
                        </el-col>
                    </el-form-item>
                     <el-form-item label="年龄"  >
                        <el-col :span="12">
                        <el-input v-model="form.age" ></el-input>
                        </el-col>
                    </el-form-item>
                    
                
                    <el-form-item label="情感状态">
                        
                        <el-radio-group v-model="form.type">
                            <el-radio label="已婚"></el-radio>
                            <el-radio label="单身"></el-radio>
                            <el-radio label="恋爱"></el-radio>
                        </el-radio-group>
                            
                            
                    </el-form-item>
                    
                    <el-form-item label="个性签名">
                        <el-input type="textarea" rows="5" v-model="form.sign"></el-input>
                    </el-form-item>
                    <el-form-item>
                        <el-button type="primary" @click="onSubmit">表单提交</el-button>
                        <el-button>取消</el-button>
                    </el-form-item>
                </el-form>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'personal',
    data() {
        return {
            form: {
                name: '',
                weixin: '',
                phone:'',
                age:'',
                type:'',
                sign:'',
                username:''
            }
        };
    },
   
    mounted(){
        var that=this;
        let username=localStorage.getItem('ms_username');
        this.form.username=username;
        this.$http.post("/vue/everydata",this.form).then(res=>{
         
            that.form.name=res.data.result.name;
            that.form.weixin=res.data.result.weixin;
            that.form.phone=res.data.result.phone;
            that.form.age=res.data.result.age;
            that.form.type=res.data.result.type;
            that.form.sign=res.data.result.sign;
          
        })
    },
    methods: {
        onSubmit() {
           this.$http.post("/vue/person",this.form).then(res=>{
          
               if(!!res.data.flag){
                   this.$message.success(res.data.msg);
               }
           })
        }
    }
};
</script>

<style  scoped>

.form-box{
    margin-left: 350px;
}
</style>