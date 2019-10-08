<template>
<div>
    <div class="user-info-box">
        <p style="text-align:right; color:#dedede; margin-right:10px; font-size:14px; padding-top:5px;" @click="$router.push('/userInfo')">
            账号管理
        </p>
        <p style="float:left; margin-left:10px;">
            <img src="http://localhost/personalCase/shopApp/src/assets/images/user.png" alt="" style="width:60px; height:60px;">
        </p>
        <p style="float:left; margin-left:20px; line-height:20px; font-size:14px; color:#ffffff;">
            <span style="color:#ffffff;">
                {{userInfo.username}}
            </span>
            <br>
            <span style="color:#ffffff;">
                用户名：{{userInfo.username}}
            </span><br>
            <span style="color:#ffffff;">
                {{userInfo.tel}}
            </span>
        </p>
    </div>
    <ul class="user-order-box">
        <li class="user-order-li" @click="linkOrder(0)">
            <span class="iconfont icon-pay user-order-li-sp"></span><br>
            待付款
        </li>
        <li class="user-order-li" @click="linkOrder(1)">
            <span class="iconfont icon-deliver user-order-li-sp"></span><br>
            已完成
        </li>
        <li class="user-order-li" @click="linkOrder(-1)">
            <span class="iconfont icon-refund user-order-li-sp"></span><br>
            已取消
        </li>
        <li class="user-order-li" @click="linkOrder()">
            <span class="iconfont icon-form user-order-li-sp"></span><br>
            全部订单
        </li>
    </ul>
    <ul class="user-recomm">
        <li style="font-size:16px; line-height:40px; height:40px; margin-left:10px; text-align:left;border-bottom: 0.1px solid #aaaaaa;">
            为你推荐
        </li>
        <li class="recomm-item" @click="linkProd(item.id)" v-for="(item,index) in recommList" :key="'order-recomm-item'+index" :class="index%2==0?'border-right-bottom':'border-bottom'">
            <p>
                <img :src="item.picList[0]" alt="" style="width:120px; height:120px;border: 0.1px solid #aaaaaa;">
            </p>
            <p>
                {{item.title}}
            </p>
            <p>
                ￥{{item.price}}
            </p>
        </li>
    </ul>
        <!-- 最上面展示的导航-->
    <commNav :showText="'我的主页'"></commNav>
    <nav-menu></nav-menu><!--整个app的导航 最下面的-->
</div>
</template>
<script>
import navMenu from '../common/navMenu';
import commNav from '../common/commNav';
import {getUserInfo,getRecommProduct} from '../../assets/js/config';
export default {
     components:{
        navMenu,
         commNav,
    },
    data(){
        return{
            userInfo:{},
            recommList:[],
        }
    },
    created(){
        localStorage.setItem("chooseMenuPos","3");
        this.getData();
    },
    methods:{
        getData(){
            this.userInfo = getUserInfo();
            getRecommProduct().then(response=>{
                this.recommList = eval(response);
            }).catch(e=>{
                alert("错误")
            })
        },
        linkProd(_id){
             this.$router.push({path: '/productDetail', query: {id: _id}});
        },
        linkOrder(_stu){
            this.$router.push({path: '/orderList', query: {status: _stu}});
        }
    }
}
</script>

<style>
.recomm-item{
    display: inline-block;
    padding: 10px 20px;
    text-align: center;
}
.border-right-bottom{
    border-bottom: 0.1px solid #aaaaaa;
    border-right: 0.1px solid #aaaaaa;
}
.border-bottom{
    border-bottom: 0.1px solid #aaaaaa;
}

.user-info-box{
    margin-top:50px; 
    margin-left:10px;
    background-color: #cf0000;
    height: 100px;
    width: 95%;
    /* border: 0.1px solid #cccccc; */
    color: #ffffff;
    border-radius: 15px;
    box-shadow: 0 0 5px #666666; 
    text-align: left;
}
.user-order-box{
    background-color: #efefef;
    margin-top:10px;
    width:100%;
    height: 60px;
}
.user-order-box li + li{
    margin-left:40px;
}
.user-order-li{
    display:inline-block;
    color: #333333;
    font-size: 12px;
    text-align: center;
    padding-top:10px;
    line-height: 20px;
}
.user-order-li-sp{
    font-size: 20px;
    color: #fc5500;
}
.user-recomm{
    margin-top:10px;
    background-color: #efefef;
}
.user-recomm li +li{
    margin-left:0px;
}
</style>