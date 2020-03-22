<template>
    <div>
        <div class="crumbs">
            <el-breadcrumb separator="/">
                
                <el-breadcrumb-item >                    
                     仪器金额
                </el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <div class="container">
            <div class="handle-box">
                <el-button
                    type="primary"
                    icon="el-icon-delete"
                    class="handle-del mr10"
                    @click="delAllSelection"
                >批量删除</el-button>
              
                <el-input v-model="query.searchData" placeholder="资产编号" class="handle-input mr10"></el-input>
                <el-button type="primary" icon="el-icon-search" @click="handleSearch">搜索</el-button>
                <el-button class="btn" type="primary" icon="el-icon-folder-add" @click="handleSave">添加</el-button>

            </div>
            <el-table
                :data="tableData"
                border
                class="table"
                ref="multipleTable"
                header-cell-class-name="table-header"
                @selection-change="handleSelectionChange"
            >
                <el-table-column type="selection" width="55" align="center"></el-table-column>
                <el-table-column prop="id" label="资产编号" width="160" align="center"></el-table-column>
                <el-table-column prop="assetname" label="资产名称" align="center"></el-table-column>
                <el-table-column  prop="price" label="单价" width="180" align="center">
                   
                </el-table-column>
                <el-table-column prop="number" label="数量" align="center" width="180">
                    
                </el-table-column>
              
                <el-table-column prop="allprice" label="总金额" align="center" width="180">
                    
                </el-table-column>
                
                <el-table-column label="操作" width="180" align="center">
                    <template slot-scope="scope">
                        <el-button
                            type="text"
                            icon="el-icon-edit"
                            @click="handleEdit(scope.$index, scope.row)"
                        >编辑</el-button>
                        <el-button
                            type="text"
                            icon="el-icon-delete"
                            class="red"
                            @click="handleDelete(scope.$index, scope.row)"
                        >删除</el-button>
                    </template>
                </el-table-column>
            </el-table>
            <div class="pagination">
                <el-pagination
                    background
                    layout="total, prev, pager, next"
                    :current-page="query.pageIndex"
                    :page-size="query.pageSize"
                    :total="pageTotal"
                    @current-change="handlePageChange"
                ></el-pagination>
            </div>
        </div>

        <!-- 编辑弹出框 -->
        <el-dialog title="编辑" :visible.sync="editVisible" width="30%">
            <el-form ref="form" :model="form" label-width="70px">
                <el-form-item label="资产名称">
                    <el-input v-model="form.assetname"></el-input>
                </el-form-item>
                <el-form-item label="单价">
                    <el-input v-model="form.price"></el-input>
                </el-form-item>
                <el-form-item label="数量">
                    <el-input v-model="form.number"></el-input>
                </el-form-item>
                 <el-form-item label="总金额">
                    <el-input v-model="form.allprice"></el-input>
                </el-form-item>
                
            </el-form>
            <span slot="footer" class="dialog-footer">
                <el-button @click="editVisible = false">取 消</el-button>
                <el-button type="primary" @click="saveEdit">确 定</el-button>
            </span>
        </el-dialog>

        <!-- 添加弹出框 -->

        <el-dialog title="添加" :visible.sync="insertVisible" width="30%">
            <el-form ref="form" :model="insertlist" label-width="70px">
                <el-form-item label="资产编号">
                    <el-input v-model="insertlist.id" placeholder="资产编号"></el-input>
                </el-form-item>
                <el-form-item label="资产名称">
                    <el-input v-model="insertlist.assetname" placeholder="资产名称"></el-input>
                </el-form-item>
                <el-form-item label="型号">
                    <el-input v-model="insertlist.model" placeholder="型号"></el-input>
                </el-form-item>
                <el-form-item label="规格">
                    <el-input v-model="insertlist.standard" placeholder="规格"></el-input>
                </el-form-item>
                <el-form-item label="购置日期">
                    <el-date-picker
                    v-model="insertlist.buydata"               
                    type="date"
                    placeholder="选择日期"
                    value-format="yyyy-MM-dd"
                    :picker-options="pickerOptions"
                    >
                    </el-date-picker>
                </el-form-item>
                <el-form-item label="单价">
                    <el-input v-model="insertlist.price" placeholder="单价"></el-input>
                </el-form-item>
                <el-form-item label="数量">
                    <el-input v-model="insertlist.number" placeholder="数量"></el-input>
                </el-form-item>
                <el-form-item label="总金额">
                    <el-input v-model="insertlist.allprice" placeholder="总金额"></el-input>
                </el-form-item>
                <el-form-item label="领用日期">
                    <el-date-picker
                    v-model="insertlist.usedata"               
                    type="date"
                    placeholder="选择日期"
                    value-format="yyyy-MM-dd"
                    :picker-options="pickerOptions"
                    >
                    </el-date-picker>
                </el-form-item>
                <el-form-item label="管理单位">
                    <el-input v-model="insertlist.adminunit" placeholder="管理单位"></el-input>
                </el-form-item>
                 <el-form-item label="使用单位">
                    <el-input v-model="insertlist.useunit" placeholder="使用单位"></el-input>
                </el-form-item>
                 <el-form-item label="管理人">
                    <el-input v-model="insertlist.admin" placeholder="管理人"></el-input>
                </el-form-item>
                 <el-form-item label="存放地点">
                    <el-input v-model="insertlist.place" placeholder="存放地点"></el-input>
                </el-form-item>
                 <el-form-item label="设备用途">
                    <el-input v-model="insertlist.equse" placeholder="设备用途"></el-input>
                </el-form-item>
                  <el-form-item label="品牌">
                    <el-input v-model="insertlist.brand" placeholder="品牌"></el-input>
                </el-form-item>
            </el-form>
            <span slot="footer" class="dialog-footer">
                <el-button @click="insertVisible = false">取 消</el-button>
                <el-button type="primary" @click="saveInsert">确 定</el-button>
            </span>
        </el-dialog>
    </div>
</template>

<script>

export default {
    name: 'ismoney',
    data() {
        return {
            query: {
                searchData: '',
                pageIndex: 1,
                pageSize: 10
            },
             pickerOptions: {
                disabledDate(time) {
                    return time.getTime() > Date.now();
                },
                shortcuts: [{
                    text: '今天',
                    onClick(picker) {
                    picker.$emit('pick', new Date());
                    }
                }, {
                    text: '昨天',
                    onClick(picker) {
                    const date = new Date();
                    date.setTime(date.getTime() - 3600 * 1000 * 24);
                    picker.$emit('pick', date);
                    }
                }, {
                    text: '一周前',
                    onClick(picker) {
                    const date = new Date();
                    date.setTime(date.getTime() - 3600 * 1000 * 24 * 7);
                    picker.$emit('pick', date);
                    }
                }]
                },
            tableData: [],
            multipleSelection: [],
            delList: [],
            list:[],
            editVisible: false,
            insertVisible : false,
            pageTotal: 0,
            form: {},
            insertlist:{},
            idx: -1,
            id: -1
        };
    },
    created() {
        this.getData();
    },
    methods: {
        
        getData(){
            this.$http.get("/vue/data").then(res=>{
                console.log(res);
                // console.log(this.query.pageIndex);
                this.list = res.data.result;
                // this.pageTotal=res.data.result.length;
           
                let list = this.list.filter((item,index) =>
                    item.id.match(this.query.searchData) || item.assetname.match(this.query.searchData) || item.allprice.match(this.query.searchData)
                )
            
                //过滤分页
                this.tableData = list.filter((item, index) =>
                    index < this.query.pageIndex * this.query.pageSize && index >= this.query.pageSize * (this.query.pageIndex - 1)
                )
                //分页的总数据
                this.pageTotal = list.length


            })
        },

      
        // 触发搜索按钮
        handleSearch() {
            this.$set(this.query, 'pageIndex', 1);
            this.getData();
        },
        // 删除操作
        handleDelete(index, row) {
            // 二次确认删除
            this.$confirm('确定要删除吗？', '提示', {
                type: 'warning'
            })
                .then(() => {

                    this.$http.post("/vue/delect",row).then(res=>{
                        console.log(res);
                        this.getData();
                        this.$message.success('删除成功');
                        // this.tableData.splice(index, 1);
                    })


                  
                })
                .catch(() => {});
        },
        // 多选操作
        handleSelectionChange(val) {
            this.multipleSelection = val;
        },
        delAllSelection() {
            const length = this.multipleSelection.length;
            for (let i = 0; i < length; i++) {
            this.delList.push(this.multipleSelection[i].id)
            }
          

            this.$confirm('确定要删除吗？', '提示', {
                type: 'warning'
            })
                .then(() => {

                this.$http.post("/vue/alldelect",this.delList).then(res=>{
                    console.log(res);
                      if(!!res.data.flag){
                        this.getData();
                        this.$message.error(`删除了${length}条数据`);
                        this.multipleSelection = [];
                      }else{
                         this.$message.error(res.data.msg);
                        this.multipleSelection = []; 
                        this.$refs.multipleTable.clearSelection();
                      }
                       

                    })
            })
            .catch(() => {});
            

            
        },
        handleSave(){
            this.insertVisible=true;
        },
        saveInsert(){
            this.$http.post("/vue/insert",this.insertlist).then(res=>{
                console.log(res);
                if(!!res.data.flag){
                this.getData();
                this.insertVisible=false;
                this.$message.success('添加成功');
                this.insertlist={}
                }else{
                this.insertVisible=false;
                this.$message.error(res.data.msg);
                }
                
            })
        },
        // 编辑操作
        handleEdit(index, row) {
            this.idx = index;
            this.form = row;
            this.editVisible = true;
            
        },
        // 保存编辑
        saveEdit() {
         
            this.$http.post("/vue/edittwo",this.form).then(res=>{
                console.log(res);               
                this.$set(this.tableData, this.idx, this.form);
                this.editVisible = false;
                this.$message.success(`修改第 ${this.idx + 1} 行成功`);
            })
        },
        // 分页导航
        handlePageChange(val) {
            this.$set(this.query, 'pageIndex', val);
            this.getData();
        }
    }
};
</script>

<style scoped>
.handle-box {
    margin-bottom: 20px;
}

.handle-select {
    width: 120px;
}

.handle-input {
    width: 300px;
    display: inline-block;
}
.table {
    width: 100%;
    font-size: 14px;
}
.red {
    color: #ff0000;
}
.mr10 {
    margin-right: 10px;
}
.table-td-thumb {
    display: block;
    margin: auto;
    width: 40px;
    height: 40px;
}
.btn{
    margin-left: 10px;
}
</style>
