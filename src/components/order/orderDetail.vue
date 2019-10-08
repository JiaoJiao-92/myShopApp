<template>
<div>
    <div class="order-detail-item">
        <div style="text-align:left;" >
            <img :src="orderInfo.proList.info.picList[0]" class="order-detail-pic">
        </div>
            <p class="order-detail-title">
                {{orderInfo.proList.info.title+"_id:"+orderInfo.proList.info.id}}
            </p>
            <p class="order-detail-subtitle">{{orderInfo.proList.info.subTitle}}</p>
            <p class="order-detail-price">
                 ￥ {{orderInfo.proList.info.price}} *{{orderInfo.proList.num}}
            </p>
            <p style="line-height:30px; margin-right:10px; color:#fc0000; text-align:right;">
                    总价:{{orderInfo.totalPrice}}
            </p>
        <p v-show="orderInfo.status==0" style="text-align:right;clear:both;margin-right:10px;">
            <input type="button" value="取消订单" class="order-detail-pay-btn" @click="cancelOrder(orderInfo.orderId)">
            <input type="button" value="去付款" class="order-detail-pay-btn" @click="goPay(orderInfo.totalPrice,orderInfo.orderId)">
        </p>
        <p v-show="orderInfo.status==1" style="text-align:right;clear:both; margin-right:10px; color:#fc0000; font-size:14px;">
            已完成
        </p>
        <p v-show="orderInfo.status==-1" style="text-align:right;clear:both; margin-right:10px; color:#fc0000; font-size:14px;">
            已取消
        </p>
    </div>
    <commNav :showText="'订单详情'"></commNav>
    <goPay v-show="payBox==true" :total-price="totalPrice" :payBox.sync="payBox"></goPay>
</div>
</template>
<script>
import commNav from '../common/commNav';
import goPay from '../common/goPay';
import {getOrderInfo,setOrderStatus,deleteOrder} from '../../assets/js/config'
export default {
    components:{
        goPay,
        commNav,
    },
    data(){
        return {
            orderInfo:{},
            payBox:false,
            totalPrice:0,
        }
    },
    created(){
        this.getData();
    },
    methods:{
        getData(){
            this.orderInfo = getOrderInfo(this.$route.query.id);
            console.log(JSON.stringify(this.orderInfo));
            this.totalPrice = this.orderInfo.totalPrice;
        },
        //付款的时候的回调
        setStatus(){

        },
        goPay(tPrice,_oId){
            alert("去付款");
        }
    }
}
</script>

<style>

.order-detail-list{
    position: relative;
    margin-top:80px;
    width: 100%;
    text-align: left;
    padding-bottom:100px;
}
.order-detail-item{
    margin-top:40px;
    padding: 10px;
    margin-bottom:10px;
    text-align: left;
}
.order-detail-pic{
    width: 80px;
    height: 80px;
}
.order-detail-title{
    width:90%;
    line-height: 30px;
    font-size: 16px;
    color: #000000;
    text-align: left;
}
.order-detail-subtitle{
    line-height: 20px;
    font-size: 12px;
    color: #aaaaaa;
    /* clear: both; */
    width: 70%;
    text-align: left;
}
.order-detail-price{
    font-size: 15px;
    line-height: 30px;
    color: #ff1111;
}
</style>