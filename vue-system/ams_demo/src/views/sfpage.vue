<template>
    <div>
        <el-row :gutter="20">
            <el-col :span="8">
                <el-card shadow="hover" class="mgb20" style="height:252px;">
                    <div class="user-info">
                        <img :src="img" class="user-avator" alt />
                        <div class="user-info-cont">
                            <div class="user-info-name"> {{name}}</div>
                            <div>{{role}}</div>
                        </div>
                    </div>
                    <div class="user-info-list">
                        登录时间：
                        <span>{{timedata}}</span>
                    </div>
                    <div class="user-info-list">
                        登录地点：
                        <span> {{locationProvince}}{{locationCity}}</span>
                    </div>
                </el-card>
                <el-card shadow="hover" style="height:300px;">
                    <div slot="header" class="clearfix">
                        <span>语言详情</span>
                    </div>
                    
                    Vue
                    <el-progress :percentage="48.2" color="#42b983"></el-progress>JavaScript
                    <el-progress :percentage="21.1" color="#f1e05a"></el-progress>
                    Node
                    <el-progress :percentage="20.1" color="#333"></el-progress>
                    CSS
                    <el-progress :percentage="13.5"></el-progress>Mongodb
                    <el-progress :percentage="6.2" color="#f56c6c"></el-progress>HTML
                    <el-progress :percentage="5.9" color="#f56c6c"></el-progress>
                </el-card>
            </el-col>

            <el-col :span="16">
                <el-autocomplete
                    style="width:100%;"
                    popper-class="autoAddressClass"
                    v-model="form.address"
                    :fetch-suggestions="querySearchAsync"
                    :trigger-on-focus="false"
                    placeholder="详细地址"
                    @select="handleSelect"
                    clearable>
                    <template slot-scope="{ item }">
                        <i class="el-icon-search fl mgr10"></i>
                        <div style="overflow:hidden;">
                        <div class="title">{{ item.title }}</div>
                        <span class="address ellipsis">{{ item.address }}</span>
                        </div>
                    </template>
                    </el-autocomplete>
                <div id="map-container"></div>

            </el-col>
            
        </el-row>
    </div>
</template>

<script>

import BMap from 'BMap';
import Schart from 'vue-schart';
import bus from '../components/common/bus';
import img from "../assets/img/img.jpg";
export default {
    name: 'sfpage',
    data() {
        return {
            name: localStorage.getItem('ms_username'),
         
          form: {
            address: '', //详细地址
            addrPoint: { //详细地址经纬度
                lng: 0,
                lat: 0
            }
            },
            map: '', //地图实例
            mk: '',//Marker实例
            locationCity:'加载中...',
            locationProvince:"",
            timedata:'',
            img:img
            
        };
    },
    components: {
        Schart
    },
    computed: {
        role() {
            return this.name === 'wyadmin' ? '超级管理员' : '普通用户';
        },
        
    },
    created(){
        var aData = new Date();
        this.timedata =
      aData.getFullYear() + "-" + (aData.getMonth() + 1) + "-" + aData.getDate();
    },
    mounted(){
       this.initMap();
        this.dz();
        bus.$on('avatar', msg => {
            console.log(msg);
            this.img = msg;

        });
    
      
    },
   
    methods: {
      initMap() {
            var that = this;
            this.map = new BMap.Map("map-container", {enableMapClick:false})  //新建地图实例，enableMapClick:false ：禁用地图默认点击弹框
            var point = new BMap.Point(113.92,30.93);
            this.map.centerAndZoom(point,19);
            this.mk = new BMap.Marker(point,{enableDragging:true}) ;//创建一个图像标注实例，enableDragging：是否启用拖拽，默认为false
            this.map.addOverlay(this.mk); //将覆盖物添加到地图中

            this.mk.addEventListener('dragend', function(e){
                that.getAddrByPoint(e.point) //拖拽结束后调用逆地址解析函数，e.point为拖拽后的地理坐标
            });
                var navigationControl = new BMap.NavigationControl({ //创建一个特定样式的地图平移缩放控件
                anchor: BMAP_ANCHOR_TOP_RIGHT, //靠右上角位置
                type: BMAP_NAVIGATION_CONTROL_SMALL //SMALL控件类型
            });
            this.map.addControl(navigationControl ); //将控件添加到地图

            var geolocationControl = new BMap.GeolocationControl({anchor: BMAP_ANCHOR_BOTTOM_LEFT}) ;//创建一个地图定位控件
            geolocationControl.addEventListener("locationSuccess", function(e){ //绑定定位成功后事件
                that.getAddrByPoint(e.point) //定位成功后调用逆地址解析函数
            });
            geolocationControl.addEventListener("locationError",function(e){ //绑定定位失败后事件
                alert(e.message);
            });
            this.map.addControl(geolocationControl); //将控件添加到地图

            this.geolocation();

            this.map.addEventListener('click', function(e){ //给地图绑定点击事件
                that.getAddrByPoint(e.point) //点击后调用逆地址解析函数
            });
        },
        getAddrByPoint(point){
            var that = this;
            var geco = new BMap.Geocoder();
            geco.getLocation(point, function(res){
                
                that.mk.setPosition(point) //重新设置标注的地理坐标
                that.map.panTo(point)  //将地图的中心点更改为给定的点
                that.form.address = res.address;  //记录该点的详细地址信息
                that.form.addrPoint = point;  //记录当前坐标点
            })
        },
        geolocation() {
            var that = this;
            var geolocation = new BMap.Geolocation();
            geolocation.getCurrentPosition(function(res){
               
                if(this.getStatus() == BMAP_STATUS_SUCCESS){
                that.getAddrByPoint(res.point) //当成功时，调用逆地址解析函数
                } else {
                // alert('failed'+this.getStatus()); //失败时，弹出失败状态码
                }        
            },{enableHighAccuracy: true}) //enableHighAccuracy：是否要求浏览器获取最佳效果，默认为false

        },
        querySearchAsync(str,cb){
            var options = {
                onSearchComplete: function(res){ //检索完成后的回调函数
                var s = [];
                if (local.getStatus() == BMAP_STATUS_SUCCESS){
                    for (var i = 0; i < res.getCurrentNumPois(); i ++){
                    s.push(res.getPoi(i));
                    }
                    cb(s) //获取到数据时，通过回调函数cb返回到<el-autocomplete>组件中进行显示
                } else{
                    cb(s)
                }
                }
            }
            var local = new BMap.LocalSearch(this.map, options) //创建LocalSearch构造函数
            local.search(str) //调用search方法，根据检索词str发起检索

        },

        handleSelect(item) {
        this.form.address = item.address + item.title; //记录详细地址，含建筑物名
        this.form.addrPoint = item.point; //记录当前选中地址坐标
        this.map.clearOverlays() //清除地图上所有覆盖物
        this.mk = new BMap.Marker(item.point) //根据所选坐标重新创建Marker
        this.map.addOverlay(this.mk) //将覆盖物重新添加到地图中
        this.map.panTo(item.point) //将地图的中心点更改为选定坐标点
        },

        dz() {
                    var that=this
                    var geolocation = new BMap.Geolocation();
                    geolocation.getCurrentPosition(function getinfo(position) { 
                         
                        let city = position.address.city; //获取城市信息  
                         
                        let province = position.address.province;
                        // console.log(city+'--'+province)
                        that.locationCity=city	;	//将城市名称保存到locationCity中
                        that.locationProvince=province;
                        
                    }, function(e) {        
                        that.locationCity='定位失败'
                    }, {
                        provider: 'baidu',
                    });
                }
  
    }
};
</script>


<style scoped>
.el-row {
    margin-bottom: 20px;
}

.user-info {
    display: flex;
    align-items: center;
    padding-bottom: 20px;
    border-bottom: 2px solid #ccc;
    margin-bottom: 20px;
}

.user-avator {
    width: 120px;
    height: 120px;
    border-radius: 50%;
}

.user-info-cont {
    padding-left: 50px;
    flex: 1;
    font-size: 14px;
    color: #999;
}

.user-info-cont div:first-child {
    font-size: 30px;
    color: #222;
}

.user-info-list {
    font-size: 14px;
    color: #999;
    line-height: 25px;
}

.user-info-list span {
    margin-left: 70px;
}

#map-container {
     width:100%;
     height:540px;
     margin-top: 2px;
}


    i.el-icon-search {margin-top:11px;}
    .mgr10 {margin-right: 10px;}
    .title {
      text-overflow: ellipsis;
      overflow: hidden;
    }
    .address {
      line-height: 1;
      font-size: 12px;
      color: #b4b4b4;
      margin-bottom: 5px;
    }

</style>
