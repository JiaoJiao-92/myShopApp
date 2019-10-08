<template>
<div>
    <div class="order-list" v-if="orderList.length>0">
        <div v-for="(item,index) in orderList" :key="'order-list'+index"  class="order-item" @click="goDetail(item.orderId,index)">
            <!-- <div v-for="(item,i) in orderObj.proList" :key="'order-item-'+i" class="order-item"> -->
                <div class="order-pic-div">
                    <img :src="item.proList.info.picList[0]" class="order-pic">
                </div>
                <div class="order-title-div">
                    <p class="order-title">
                        {{item.proList.info.title+"_id:"+item.proList.info.id}}
                    </p>
                    <p style="float:right; width:10%;" @click="delOrder(item.orderId)" :id="'deleteBtn'+index">
                        <span class="iconfont icon-guanbi" style="font-size:14px; text-align:right;"></span>
                    </p>
                    <p class="order-subtitle">{{item.proList.info.subTitle}}</p>
                    <p class="order-price">
                        <p style="float:left; color:#333333;">
                           ￥ {{item.proList.info.price}} *{{item.proList.num}}
                        </p>
                        <p style="float:right; line-height:30px; margin-right:10px; color:#fc0000;">
                            总价:{{item.totalPrice}}
                        </p>
                    </p>
                </div>
                <p v-show="item.status==0" style="text-align:right;clear:both;" :id="'controlBtn'+index">
                    <input type="button" value="取消订单" class="order-pay-btn" @click="cancelOrder(item.orderId)">
                    <input type="button" value="去付款" class="order-pay-btn" @click="goPay(item.totalPrice,item.orderId)">
                </p>
                <p v-show="item.status==1" style="text-align:right;clear:both; color:#fc0000; font-size:14px;">
                    已完成
                </p>
                <p v-show="item.status==-1" style="text-align:right;clear:both; color:#fc0000; font-size:14px;">
                    已取消
                </p>
            <!-- </div> -->
        </div>
    </div>
    <commNav :showText="'我的订单'"></commNav>
    <ul class="order-bar">
        <li class="order-bar-li" @click="getData()" :class="(queryStatus==null||queryStatus==undefined)?'red-class':''">
            全部订单
        </li>
        <li class="order-bar-li" @click="getData(0)" :class="(queryStatus==0)?'red-class':''">
            未付款
        </li>
        <li class="order-bar-li" @click="getData(1)" :class="(queryStatus==1)?'red-class':''">
            已完成
        </li>
        <li class="order-bar-li" @click="getData(-1)" :class="(queryStatus==-1)?'red-class':''">
            已取消
        </li>
    </ul>
    <goPay v-show="payBox==true" :total-price="totalPrice" :payBox.sync="payBox"></goPay>
</div>

</template>

<script>
import commNav from '../common/commNav';
import goPay from '../common/goPay';
import {getOrderList,setOrderStatus,deleteOrder} from '../../assets/js/config'
export default {
    components:{
        goPay,
        commNav,
    },
    created(){
        this.queryStatus = this.$route.query.status;
        this.getData(this.queryStatus)
    },
    data(){
        return {
            queryStatus:"",
            orderList:[],
            payBox:false,
            totalPrice:0,
            orderId:"",
        }
    },
    methods:{
        getData(_stu){
            this.queryStatus = _stu;
            this.orderList = getOrderList(_stu);
            console.log(this.orderList);
        },
        goPay(_totalPrice,_oId){
            this.totalPrice = _totalPrice;
            this.payBox = true;
            this.orderId = _oId;
        },
        setStatus(){
            setOrderStatus(1,this.orderId);
            this.payBox = false;
        },
        delOrder(_oId){
            deleteOrder(_oId);
            //删除之后重新获取
            this.getData(this.queryStatus);
        },
        cancelOrder(_oId){
            setOrderStatus(-1,_oId);
            this.getData(this.queryStatus);
        },
        goDetail(_oId,index){
            var e = window.event || arguments.callee.caller.arguments[0];
            let sp = document.getElementById("deleteBtn"+index);
            let sp1 = document.getElementById("controlBtn"+index);
            
            if(sp&&sp1){
                if((!sp.contains(e.target))&&(!sp1.contains(e.target))){
                    // alert("进详情")
                    this.$router.push({path:"/orderDetail",query:{id:_oId}});
                }else{
                    // alert("操作");
                }
            }
        }
    }
}
</script>

<style>
.red-class{
    color: #fc0000;
}
.order-pay-btn{
    background-color:#fc0000;
    color:#ffffff;
    padding:5px 10px;
    border-radius: 5px;
}
.order-bar{
    position: fixed;
    left: 0;
    top: 40px;
    width: 100%;
    height: 40px;
    line-height: 40px;
    border-bottom: 0.1px solid #cccccc;
    background-color: #ffffff !important;
}
.order-bar li +li{
    border-left: 0.1px solid #cccccc;
}
.order-bar-li{
    width: 22%;
    display: inline-block;
    text-align: center;
}

.order-list{
    position: relative;
    margin-top:80px;
    width: 100%;
    text-align: left;
    padding-bottom:100px;
}
.order-item{
    padding: 10px;
    margin-bottom:10px;
    /* height: 100px; */
    border-bottom: #dddddd solid 0.1px; 
    overflow: hidden;
}
.order-pic-div{
    float: left;
}
.order-pic{
    width: 80px;
    height: 80px;
}
.order-title-div{
    position: relative;
    margin-left:90px;
}
.order-title{
    float:left;
    width:90%;
    line-height: 30px;
    font-size: 16px;
    color: #000000;
}
.order-subtitle{
    line-height: 20px;
    font-size: 12px;
    color: #aaaaaa;
    /* clear: both; */
    width: 70%;
    text-align: left;
}
.order-price{
    font-size: 15px;
    line-height: 30px;
    color: #ff1111;
}
</style>