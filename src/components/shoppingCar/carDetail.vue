
<template>
<div>
    
    <p style="text-align:left; padding-left:10px; height:30px; margin-top:80px; line-height:30px; font-weight:bold;">
        订单信息如下:
    </p>
    <div class="car-detail-list" v-if="carList.length>0">
        <div v-for="(item,index) in carList"  class="car-detail-item" :key="'car-detail-list'+index">
            <div class="car-detail-pic-div">
                <img :src="item.info.picList[0]" class="car-detail-pic">
            </div>
            <div class="car-detail-title-div">
                <p class="car-detail-title">
                    {{item.info.title+"_id:"+item.info.id}}
                </p>
                <p class="car-detail-subtitle">{{item.info.subTitle}}</p>
                <p class="car-detail-price">
                    <p style="float:left; color:#ff0000;">
                        ￥{{item.info.price}}
                    </p>
                    <p style="float:right; line-height:30px; margin-right:10px;">
                        数量:{{item.num}}
                    </p>
                </p>
            </div>
        </div>
    </div>
    <div class="control-car-detail">
        <p style="float:right; margin-right:10px;">
            <span class="control-price">合计 {{totalPrice}}</span>
            <input type="button" value="提交订单" class="control-btn" @click="submitOrder()">
        </p>
    </div>
        <!-- 最上面展示的导航-->
    
    <commNav :showText="'订单确认'"></commNav>
    <div style="position:fixed; left:0px; top:40px; width:100%;font-size:16px;  border-bottom:solid 0.1px #cccccc;line-height:40px; background-color:#eeeeee;">
        <p v-if="addressList.length<=0" @click="$router.push('/addAddress')">
            新增收货地址
        </p>
        <p v-else @click="$router.push({path:'/addressList',query:{addrId:defaultAddress.id}})">
            {{defaultAddress.address}}  >
        </p> 
    </div>
    <goPay v-show="payBox==true" :total-price="totalPrice" :payBox.sync="payBox"></goPay>
</div>
</template>
<script>
import {createOrder,getAddressList,deleteCarList,setOrderStatus} from '../../assets/js/config'
import goPay from '../common/goPay';
import commNav from '../common/commNav';
export default {
    components:{
        goPay,
        commNav,
    },
    data(){
        return{
            carList:[],
            totalPrice:0,
            addressList:[],
            defaultAddress:{},
            payBox:false,
            orderIds:[],
        }
    },
    created(){
        var _res = localStorage.getItem("currOrderInfo");
        console.log("_res:"+_res);
        this.carList = JSON.parse(_res);
        this.getData();
        this.getAddress();
    },
    methods:{
        getData(){
            // this.carList = getOrderList(-1);
            //this.carList[j].proList
            for(var j=0;j<this.carList.length;j++){
                this.totalPrice += this.carList[j].info.price*this.carList[j].num;
            }
        },
        getAddress(){
            this.addressList = getAddressList();
            console.log(this.addressList);
            for(var i=0;i<this.addressList.length;i++){
                //没选择的时候 默认显示 默认地址 手动选择 之后带个参数进来
                if(this.$route.query.addrId&&this.$route.query.addrId==this.addressList[i].id){
                    this.defaultAddress = this.addressList[i];
                }else{
                    if(this.addressList[i].isDefault==1){
                        this.defaultAddress = this.addressList[i];
                    }
                }
            }
        },
        //提交订单
        submitOrder(){
            if(this.addressList.length<=0){
                alert("请添加收货地址")
            }else{
                //没有创建订单的话去创建订单 已经创建了的 直接弹出付款框
                if(this.orderIds.length>0){
                    this.payBox = true;
                }else{
                    localStorage.removeItem("currOrderInfo");
                    deleteCarList(this.carList);
                    this.payBox = true;
                    for(var i=0;i<this.carList.length;i++){
                        var oIds = createOrder(this.carList[i],this.defaultAddress.id,this.carList[i].info.price*this.carList[i].num);
                        console.log("create-success--id:"+oIds);
                        this.orderIds.push(oIds);
                    }
                    // this.orderId = createOrder(this.carList,this.defaultAddress.id,this.totalPrice);
                }
            }
        },
        setStatus(){
            // alert("调用成功");
            for (let i = 0; i < this.orderIds.length; i++) {
                setOrderStatus(1,this.orderIds[i]);
            }
            this.$router.replace("/orderList");
        }
    }
}
</script>

<style>
.control-car-detail{
    position: fixed;
    left: 0;
    bottom: 0px;
    width:100%;
    height: 60px;
    line-height: 60px;
    background-color: #ffffff;
    border-top: #cccccc solid 0.1px; 
}
.control-price{
    font-size: 16px;
    color: #ff0000;
    margin-right:20px; 
}

.control-btn{
    background-color: #ff0000;
    padding: 10px 20px;
    font-size: 16px;
    border-radius: 15px;
    color: #ffffff;
}
.car-detail-list{
    /* position: relative; */
    /* margin-top:50px; */
    width: 100%;
    text-align: left;
    padding-bottom:100px;
}
.car-detail-item{
    padding: 10px;
    margin-bottom:10px;
    height: 80px;
    border-bottom: #dddddd solid 0.1px; 
    overflow: hidden;
}
.car-detail-pic-div{
    float: left;
}
.car-detail-pic{
    width: 80px;
    height: 80px;
}
.car-detail-title-div{
    position: relative;
    margin-left:90px;
}
.car-detail-title{
    line-height: 30px;
    font-size: 14px;
    color: #000000;
}
.car-detail-subtitle{
    line-height: 20px;
    font-size: 12px;
    color: #aaaaaa;
    clear: right;
    text-align: left;
}
.car-detail-price{
    font-size: 15px;
    line-height: 30px;
    color: #ff1111;
}
</style>