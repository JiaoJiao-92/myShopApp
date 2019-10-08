<template>
<div>
    <!-- 最上面展示的导航-->
    <ul class="detail-control">
        <li class="detail-li">
            <span @click="$router.back(-1)" class="iconfont icon-xiangzuojiantou" style="font-size:20px;"></span>
        </li>
        <li class="detail-li">
            <ul class='detail-ul'>
                <li :class="chooseTopPos==0?'detail-li detail-font-red':'detail-li'" @click="chooseTopPos = 0;scrollTo('.detail-page')">
                商品
                <span v-if="chooseTopPos==0" class="iconfont icon-shouhuodizhi"></span>
                </li>
                <li :class="chooseTopPos==1?'detail-li detail-font-red':'detail-li'" @click="chooseTopPos = 1;scrollTo('.detail-con-ul')">
                商品详情
                <span v-if="chooseTopPos==1" class="iconfont icon-shouhuodizhi"></span>
                </li>
                <li :class="chooseTopPos==2?'detail-li detail-font-red':'detail-li'" @click="chooseTopPos = 2;scrollTo('.detail-con-ul')">
                商品推荐
                <span v-if="chooseTopPos==2" class="iconfont icon-shouhuodizhi"></span>
                </li>
            </ul>
        </li>
        <li class="detail-li">
            <span class="iconfont icon-gengduo"></span>
        </li>
    </ul>

    <!-- 详情部分 -->
    <div class="detail-page">
        <!-- 中间商品图详情 -->
        <div class="swiper-container swiper2">
            <div class="swiper-wrapper">
            <div v-for="(pSrc,i) in productData.picList" class="swiper-slide" :key="'detail_sl_'+i" @click="scrollTo('.detail-con-ul')">
                <img :src="pSrc" style="width:100%; height:100%"/>
            </div>
            </div>
            <!-- 如果需要分页器 -->
            <div class="swiper-pagination pagination2" style="cursor: pointer;"></div>
            <!-- 如果需要导航按钮 -->
            <div class="swiper-button-prev swiper-button-white" @click="mySwiper1.slidePrev();"></div>
            <div class="swiper-button-next swiper-button-white" @click="mySwiper1.slideNext();"></div>
        </div>
        <div class="detail-title-div">
            <p class="detail-title">{{productData.title}}</p>
            <p class="detail-desc">{{productData.subTitle}}</p>
            <div style="width:100%; height:30px; line-height:30px;">
                <p class="detail-price">￥{{productData.price}}</p>
                <p class="detail-stock">库存{{productData.stock}}</p>
            </div>
        </div>
        <p style="height:10px; background-color:#eeeeee; margin-top:10px;"></p>
        <ul class="detail-con-ul">
            <li class="detail-con-li">
                概述<span class="detail-con-span">|</span>
            </li>
            <li class="detail-con-li">
                参数<span class="detail-con-span">|</span>
            </li>
            <li class="detail-con-li">
                安装服务<span class="detail-con-span">|</span>
            </li>
            <li class="detail-con-li">
                常见问题
            </li>
        </ul>
        <div class="prodDesc" style="height:300px; margin-left:10px; border-bottom:solid #cccccc 0.1px;">
            {{productData.desc}}
        </div>
        <div class="prodParams" style="height:300px; margin-left:10px;border-bottom:solid #cccccc 0.1px;">
            {{productData.params}}
        </div>
        <div class="prodService" style="height:300px; margin-left:10px;border-bottom:solid #cccccc 0.1px;">
            {{productData.service}}
        </div>
        <div class="prodQues" style="height:300px; margin-left:10px;">
            {{productData.ques}}
        </div>
    </div>
    <!-- 添加购物车导航-->
    <div class="detail-bar">
        <p style="float:left;width:25%; margin-top:5px; line-height:25px; text-align:center;" @click="productData.isFav==0?productData.isFav = 1:productData.isFav = 0;">
            <span class="iconfont" :class="productData.isFav==0?'icon-jushoucang':'icon-jushoucanggift'"></span>
            <br>
            <span>
                喜欢
            </span>
        </p>
        <p style="float:left;width:25%;  margin-top:5px; line-height:25px; text-align:center;" @click="$router.push('/shoppingCar')">
            <span class="iconfont icon-gouwuche"></span><br>
            <span>
                购物车
            </span>
        </p>
        <p style="float:right; background-color:#fc0000;width:50%; color:#ffffff;" @click="showBox()">
            加入购物车
        </p>
    </div>
    <!-- 点击添加购物车展示的弹框 -->
    <section class="detail-info" :style="height" v-on:click="exitBox" v-show="showBoxFlag==true">
        <div class="detail-car-info" id="detailInfoCar">
            <div style="margin-left:20px; height:auto;">
                <p style="float:left;">
                    <img :src="picSrc" style="width:80px; height:80px;">
                </p>
                <p style="float:left; margin-left:30px; line-height:50px;">
                    <span style="color:#ff0000">
                        ￥{{productData.price}}
                    </span><br>
                    <span>
                        {{productData.title}}
                    </span>
                </p>
                <p style="float:right;">
                    <input type="button" value="X" @click="showBoxFlag = false;" style="background-color:transparent; width:30px; height:30px; color:#aaaaaa; font-size:22px;">
                </p>
            </div>
            <div style="margin-top:50px; clear:both; text-align:left;margin-left:20px;">
                <span style="color:#cccccc; line-height:20px;">
                    商品介绍
                </span><br/>
                <span style="color:#000000;line-height:30px;">
                    {{productData.desc}}
                </span>
            </div>
            <div style="margin-top:20px;">
                <p style="float:left; line-height:30px; width:100px;">
                    数量
                </p>
                <p style="float:right; line-height:30px; margin-right:20px;">
                    <input class="detail-info-car-num" type="button" value="-" @click="carNum>1?carNum--:carNum">
                    <input class="detail-info-car-num detail-info-car-input" type="text" name="carNum" v-model="carNum">
                    <input class="detail-info-car-num" type="button" value="+" @click="carNum++">
                </p>
            </div>
            <div @click="addCar()" style="width:100%; margin-top:200px; line-height:50px; height:50px; background-color:#ff0000; text-align:center; font-size:20px; color:#ffffff;">
                确认 
            </div>
        </div>
    </section>
    
</div>
</template>
<script>
import {getProductDetail,pushCar} from '../../assets/js/config'
export default {
    data(){
        return{
            height: {
                height: window.innerHeight+ 'px'//上下60+60  滚动条16左右就会消失
            },
            mySwiper1:null,
            activeClass:false,
            chooseTopPos:0,//页面最上面的下标 0商品 1详情 2推荐
            conPos:0,//0概述 1概述 2服务 3常见问题
            productData:{},//数据
            detailData:"",
            showBoxFlag:false,
            picSrc:"",
            carNum :1,//添加购物车数量
        }
    },
    created(){
        this.getData();
    },
    mounted(){
        this.mySwiper1 = new Swiper('.swiper2', {
            autoplay: 3000,//可选选项，自动滑动
            loop : true,
            //autoplayStopOnLast:true
            pagination: '.pagination2',//分页器
            paginationClickable :true,//分页器是否能点击
            //下面两个不加上 这个页面的swiper不起作用(可能是和首页的有冲突了)
            observer:true, //修改swiper自己或子元素时，自动初始化swiper
            observeParents:true,//修改swiper的父元素时，自动初始化swiper
        });
        
        // document.documentElement.scrollTop = 0;
        // document.body.scrollTop = 0;
        //监听页面滚动事件
        //window.addEventListener('scroll', this.scrollHander)
        //注意：如果由于自己的vue中的样式导致监听不到，可以尝试监听body或者'#app-root'的滚动事件
    },
    destroyed () {
       // window.removeEventListener('scroll', this.scrollHander)
    },
    methods:{
        // scrollHander(){
        //     let scrollTop = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop
        //     console.log(scrollTop);
        //     scrollTop > 0 ? this.activeClass = true : this.activeClass = false;
        //     //scrollTop > 100 ? this.seclectActive = true : this.seclectActive = false
        // },
        defaultFun(){
            return false;
        },
        getData(){
            //alert(this.$route.query.id);
            getProductDetail(this.$route.query.id).then(response=>{
                this.productData = eval('('+response+')');
                this.productData.id = this.$route.query.id;//测试用
                console.log(this.productData);
                this.picSrc = this.productData.picList[0];
            }).catch(error=>{
                this.productData = error;
            });
        },
        //滚动到某个位置
        scrollTo(_clsName){
        //     console.log(document.querySelector(_clsName).getBoundingClientRect().top);
        //     var _top = document.querySelector(_clsName).getBoundingClientRect().top;
        //     // document.getElementsByClassName(_top).scrollIntoView();
        //     document.documentElement.scrollTop = _top;
        //     document.body.scrollTop = _top;
        },
        showBox(){
            this.showBoxFlag = true;
        },
        //关闭弹框
        exitBox(event){
            let sp2 = document.getElementById("detailInfoCar");
            if(sp2){
                if(!sp2.contains(event.target)){
                    this.showBoxFlag = false;
                }
            }
        },
        addCar(){
            if(localStorage.getItem('isLogin')=="true"){
                pushCar(this.productData,this.carNum);
                //加完购物车 弹框消失
                this.showBoxFlag = false;
            }else{
                this.$router.push("/login");
            }
        }
    }
}
</script>

<style>
.detail-info{
    position: fixed;
    width: 100%;
    height: 100%;
    background-color: rgba(0,0,0,0.5);
    z-index: 100;
    left: 0;
    top: 0;
}
.detail-info-car-num{
    background-color: #dddddd;
    color: #666666;
    width: 30px;
    height: 30px;
    line-height: 30px;
    font-size: 14px;
    text-align: center;
}
.detail-car-info{
    position: fixed;
    left: 0;
    bottom: 0;
    padding-top:20px; 
    background-color: #f1f1f1;
    width: 100%;
}
.swiper-container {
  width: 100%;
  height: 300px;
}
.detail-control{
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
.detail-bar{
    position: fixed;
    bottom: 0px;
    left: 0px;
    height: 60px;
    width: 100%;
    line-height: 60px;
    background-color: #f1f1f1
}
.detail-control li +li {
    margin-left:30px; 
}
.detail-li{
    display: inline-block;
    color: #000000;
}
.detail-font-red{
    color: #ff0000;
}
.detail-ul li + li{
    margin-left:15px; 
}

.detail-page{
    position: relative;
    margin-top:40px; 
    text-align: left;
}
.detail-pic{
    width: 100%;
    height: 280px;
}
.detail-title{
    color: #000000;
    line-height: 40px;
    font-size: 20px;
    margin-left:10px;
}
/*描述详情 */
.detail-desc{
    color: #cccccc;
    font-size: 14px;
    line-height: 40px;
    margin-left:10px;
}
.detail-price{
    color: #ff0000;
    line-height: 30px;
    font-size: 22px;
    float: left;
    margin-left:10px;
}
.detail-stock{
    color: #cccccc;
    line-height: 30px;
    font-size: 14px;
    float: right; 
    margin-right:10px;
}
.detail-con-ul{
    text-align: center;
    font-size: 16px;
    line-height: 30px;
    height: 30px;
    margin-top:5px; 
}
.detail-con-ul li + li{
    margin-left:20px; 
}
.detail-con-span{
    margin-left:20px; 
}
.detail-con-li{
    display: inline-block;
}
</style>