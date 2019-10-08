
<template>
<div>
    <!-- 最上面展示的导航-->
    <nav-menu></nav-menu><!--整个app的导航 最下面的-->
    <commNav :showText="'购物车'"></commNav>

    <div v-show="shoppingCarList.length==0" style="text-align:center; margin-top:60px;">
        <p>
            <img src="http://localhost/personalCase/shopApp/src/assets/images/default.png">
        </p>
        <p>
            购物车空空如也，去<router-link to="/home"><span style="color:#fc0000; cursor:pointer;">逛逛</span></router-link>吧~
        </p>
    </div>
    <div class="car-list" v-if="shoppingCarList.length>0">
        <div v-for="(item,index) in shoppingCarList"  class="car-item" :key="'car-list'+index" @click="linkProd(index)">
            <div class="car-pic-div" style="width:20px; margin-right:10px; line-height:80px; height:80px;" :id="'checkBtn'+index">
                <input type="checkbox" class="car-check-box" :value="item.info.id" v-model="checkList" @change="computedPrice">
            </div>
            <div class="car-pic-div">
                <img :src="item.info.picList[0]" class="car-pic">
            </div>
            <div class="car-title-div">
                <p class="car-title">
                    {{item.info.title+"_id:"+item.info.id}}
                </p>
                <p style="float:right; width:20%; text-align:right;" :id="'deleteBtn'+index">
                    <input type="button" @click="deleteProd(index)" value="X" style="background-color:transparent" title="刪除">
                </p>
                <p class="car-subtitle">{{item.info.subTitle}}</p>
                <p class="car-price">
                    <p style="float:left;">
                        ￥{{item.info.price}}
                    </p>
                    <p style="float:right; line-height:30px;" :id="'nums'+index">
                        <input class="car-info-car-num" type="button" value="-" @click="add_Car(index,-1)">
                        <input class="car-info-car-num" type="text" v-model="item.num">
                        <input class="car-info-car-num" type="button" value="+" @click="add_Car(index,1)">
                    </p>
                </p>
            </div>
        </div>
    </div>
    <div class="control-car">
        <p style="float:left; margin-left:10px;">
            <input type="checkbox" class="car-check-box" value="all" :checked="checkList.length>0&&checkList.length===shoppingCarList.length" @change="chooseAll()">
        </p>
        <p style="float:right; margin-right:10px;">
            <span class="control-price">合计 {{totalPrice}}</span>
            <input type="button" :value="'结算('+checkList.length+')'" class="control-btn" @click="computedList()">
        </p>
    </div>
</div>
</template>
<script>
import navMenu from '../common/navMenu';
import commNav from '../common/commNav';
import {getCarList,deleteCar,pushCar} from '../../assets/js/config'
export default {
     components:{
        navMenu,
         commNav,
    },
    data(){
        return{
            shoppingCarList:[],
            totalPrice:0,
            checkList:[],
            addressList:[]
        }
    },
    created(){
        localStorage.setItem("chooseMenuPos","2");
        this.getData();
    },
    methods:{
        getData(){
            this.shoppingCarList = getCarList();
        },
        linkProd(_index){
            var e = window.event || arguments.callee.caller.arguments[0];
            // alert(e);
            let sp2 = document.getElementById("nums"+_index);
            let sp = document.getElementById("checkBtn"+_index);
            let sp1 = document.getElementById("deleteBtn"+_index);
            if(sp2&&sp&&sp1){
                if((!sp2.contains(e.target))&&(!sp.contains(e.target))&&(!sp1.contains(e.target))){
                    // alert("进详情")
                    this.$router.push({path:"/productDetail",query:{id:this.shoppingCarList[_index].info.id}})
                }else{
                    // alert("操作");
                }
            }
        },
        add_Car(_pos,_type){
            // return ;
            if(_type==-1){//删除购物车物品数量
                deleteCar(_pos);
                this.getData();
            }else{//增加数量
                pushCar(this.shoppingCarList[_pos].info,1);
                this.getData();
            }
        },
        //勾选或者取消勾选
        computedPrice(){
            this.totalPrice = 0;
            for(var i=0;i<this.checkList.length;i++){
                for(var j=0;j<this.shoppingCarList.length;j++){
                    if(this.checkList[i]==this.shoppingCarList[j].info.id){
                        this.totalPrice += this.shoppingCarList[j].info.price*this.shoppingCarList[j].num;
                    }
                }
            }
        },
        computedList(){
            if(this.checkList.length<=0){
                alert("请选择商品");
            }else{
                //结算
                var resultList = [];
                for(var i=0;i<this.checkList.length;i++){
                    for(var j=0;j<this.shoppingCarList.length;j++){
                        if(this.checkList[i]==this.shoppingCarList[j].info.id){
                            resultList.push(this.shoppingCarList[j]);
                        }
                    }
                }
                //提交订单
                var _res = JSON.stringify(resultList);
                localStorage.setItem("currOrderInfo",_res);
                this.$router.push("/carDetail");
            }
        },
        chooseAll(){
            if(this.checkList.length>0){
                this.checkList = [];
            }else{
                for(var i=0;i<this.shoppingCarList.length;i++){
                    this.checkList.push(this.shoppingCarList[i].info.id);
                }
            }
            this.computedPrice();//重新计算
        },
        deleteProd(_pos){
            for(var i=0;i<this.checkList.length;i++){
                if(this.checkList[i]==this.shoppingCarList[_pos].info.id){
                    this.checkList.splice(i,1);//如果被選中 要刪掉
                }
            }
            //購物車裡面的也要刪掉
            deleteCar(_pos,1);
            this.shoppingCarList = getCarList();
            // this.shoppingCarList.splice(_pos,1);
            this.computedPrice();//重新计算
        }
    }
}
</script>

<style>
.control-car{
    position: fixed;
    left: 0;
    bottom: 50px;
    width:100%;
    height: 60px;
    line-height: 60px;
    background-color: #ffffff;
    border-top: #cccccc solid 0.1px;
}
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
.car-check-box{
    width:20px;
    border:1px solid #000000;
    height:20px;
}
.control-btn{
    background-color: #ff0000;
    padding: 10px 20px;
    font-size: 16px;
    border-radius: 15px;
    color: #ffffff;
}
.car-control{
    position: fixed;
    top: 0px;
    left: 0px;
    height: 40px;
    width: 100%;
    border-bottom: #dddddd solid 0.1px; 
    z-index: 999;
    line-height: 40px;
    background-color: #ffffff !important;
}
.car-control li +li {
    margin-left:120px;
}
.car-li{
    display: inline-block;
    color: #000000;
}
.car-list{
    position: relative;
    margin-top:50px;
    width: 100%;
    text-align: left;
    padding-bottom:100px;
}
.car-item{
    padding: 10px;
    /* margin-bottom:10px; */
    /* height: 80px; */
    border-bottom: #dddddd solid 0.1px; 
    overflow: hidden;
}
.car-pic-div{
    float: left;
}
.car-pic{
    width: 80px;
    height: 80px;
}
.car-title-div{
    position: relative;
    margin-left:90px;
}
.car-title{
    line-height: 30px;
    font-size: 14px;
    color: #000000;
    /* width:80%; */
    float:left;
}
.car-subtitle{
    line-height: 20px;
    font-size: 12px;
    color: #aaaaaa;
    clear: both;
    text-align: left;
}
.car-price{
    font-size: 15px;
    line-height: 30px;
    color: #ff1111;
}
.car-info-car-num{
    background-color: #dddddd;
    color: #666666;
    width: 30px;
    height: 30px;
    line-height: 30px;
    font-size: 14px;
    text-align: center;
}
</style>