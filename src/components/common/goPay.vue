<template>
    <div class="pay-box"  @click="exitBox(1)">
        <div class="pay-box-menu" id="payPanel">
            <ul class="pay-control">
                <li class="pay-li">
                    <span @click="exitBox(0)" class="iconfont icon-xiangzuojiantou" style="font-size:20px;"></span>
                </li>
                <li class="pay-li">
                    确认付款
                </li>
                <li class="pay-li" @click="exitBox(0)">
                    <span class="iconfont icon-guanbi"></span>
                </li>
            </ul>
            <p style="font-size:35px; line-height:60px; height:60px;">
                ￥{{totalPrice}}
            </p>
            <div class="pay-label">
                <p style="text-align:left; float:left;">
                    付款账号
                </p>
                <p style="text-align:right; float:right;">
                    420***@sina.cn
                </p>
            </div>
            <div class="pay-label">
                <p style="text-align:left; float:left;">
                    付款方式
                </p>
                <p style="text-align:right; float:right;">
                    花呗>
                </p>
            </div>
            <input type="button" value="立即付款" style="width:100%; height:50px; background-color:#fc0000; color:#ffffff; font-size:20px;" @click="pay()">
        </div>
    </div>
</template>

<script>
// import {setOrderStatus} from '../../assets/js/config'
export default {
    props:["total-price",'pay-box'],
    data(){
        return {
            // total:this.totalPrice,
            // orderId:this.orderId,
            // payFlag:this.payBox,
        }
    },
    created(){
        // alert(this.total);
        // alert(this.totalPrice);
        // this.total = this.totalPrice;
        // this.payFlag = this.payBox;
    },
    methods:{
        pay(){
            alert("付款成功");
            this.$parent.setStatus();
        },
        exitBox(_flg){
            if(_flg==0){
                this.$emit('update:payBox', false);
            }else{
                var e = window.event || arguments.callee.caller.arguments[0];
                let sp = document.getElementById("payPanel");
                if(sp){
                    if(!sp.contains(e.target)){
                        this.$emit('update:payBox', false);
                    }else{
                        // alert("操作");
                    }
                }
            }
            
        },
    }

}
</script>

<style>
.pay-box{
     position: fixed;
    width: 100%;
    height: 100%;
    background-color: rgba(0,0,0,0.5);
    z-index: 100;
    left: 0;
    top: 0;
}
.pay-box-menu{
    position: fixed;
    left: 0;
    bottom: 0;
    background-color: #f1f1f1;
    width: 100%;
}
.pay-control{
    height: 40px;
    width: 100%;
    border-bottom: #dddddd solid 0.1px; 
    /* z-index: 999; */
    line-height: 40px;
    background-color: #ffffff !important;
}
.pay-control li +li {
    margin-left:120px;
}
.pay-li{
    display: inline-block;
    color: #000000;
    font-size: 16px;
}
.pay-label{
    border-bottom:solid #dddddd 0.5px;
    line-height: 50px;
    height: 50px;
    text-align: left;
    margin-left:20px; 
    margin-right:20px; 
}
</style>