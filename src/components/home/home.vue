<template>
<div id="catList">
    <nav-search :class="activeClass?'nav-search-active':''"></nav-search><!--顶上的搜索框-->
    <!-- <nav-slider></nav-slider> -->
    <nav-menu></nav-menu><!--整个app的导航 最下面的-->
    <div class="swiper-container swiper1">
        <div class="swiper-wrapper">
          <div v-for="(sw,i) in sliderList" class="swiper-slide" :key="'sl'+i">
              <img :src="sw.img" style="width:100%; height:100%"/>
          </div>
        </div>
        <!-- 如果需要分页器 -->
        <div class="swiper-pagination pagination1" style="cursor: pointer;"></div>
        <!-- 如果需要导航按钮 -->
        <div class="swiper-button-prev swiper-button-white" @click="mySwiper.slidePrev();"></div>
        <div class="swiper-button-next swiper-button-white" @click="mySwiper.slideNext();"></div>
        <!-- 如果需要滚动条 -->
        <!-- <div class="swiper-scrollbar"></div> -->
    </div>
    <section class="icon-list">
        <div class="icon-item" v-for="(icon,index) in iconList" :key="'icon'+index" @click="linkCat(icon.id)">
            <img class="icon-img" :src="icon.src" /><br/>
            <span class="icon-title">{{icon.title}}</span>
        </div>
    </section>
    <div v-for="(item,index) in listData"  class="cat-list" :key="'list'+index">
        <p class="cat-tyname">{{item.typeTitle}}</p>
        <div v-for="(obj,i) in item.list" @click="linkCat(obj.id)" :class="['cat-item cat-item-'+(i%4)]" :key="'cat'+i">
            <p class="cat-title">{{obj.title}}</p>
            <p class="cat-sub-title">{{obj.subTitle}}</p>
            <p><img class="cat-pic" :src="obj.picList[0]"><img class="cat-pic" :src="obj.picList[1]"></p>
        </div>
    </div>
</div>
</template>

<script>
import navMenu from '../common/navMenu';
import navSearch from '../common/navSearch';
import {getHomeData} from '../../assets/js/config';
export default {
    components:{
        navMenu,
        navSearch,
    },
    data(){
        return{
            activeClass:false,
            mySwiper:null,
            listData:[],
            iconList:[{id:0,src:"http://localhost/personalCase/shopApp/src/assets/images/1.png",title:"超市"},
                      {id:1,src:"http://localhost/personalCase/shopApp/src/assets/images/2.png",title:"全球购"},
                      {id:2,src:"http://localhost/personalCase/shopApp/src/assets/images/3.png",title:"时尚style"},
                      {id:3,src:"http://localhost/personalCase/shopApp/src/assets/images/4.png",title:"生鲜超市"},
                      {id:4,src:"http://localhost/personalCase/shopApp/src/assets/images/5.png",title:"超市到家"},
                      {id:5,src:"http://localhost/personalCase/shopApp/src/assets/images/6.png",title:"充值缴费"},
                      {id:6,src:"http://localhost/personalCase/shopApp/src/assets/images/7.png",title:"9.9元团"},
                      {id:7,src:"http://localhost/personalCase/shopApp/src/assets/images/8.png",title:"领券"},
                      {id:8,src:"http://localhost/personalCase/shopApp/src/assets/images/9.png",title:"省钱"},
                      {id:9,src:"http://localhost/personalCase/shopApp/src/assets/images/10.png",title:"全部"}
                      ],
            sliderList:[{img:"http://localhost/personalCase/shopApp/src/assets/images/banner1.jpg"},
                        {img:"http://localhost/personalCase/shopApp/src/assets/images/banner2.jpg"},
                        {img:"http://localhost/personalCase/shopApp/src/assets/images/banner3.jpg"},
                        {img:"http://localhost/personalCase/shopApp/src/assets/images/banner4.jpg"},
                        {img:"http://localhost/personalCase/shopApp/src/assets/images/banner5.jpg"},
                        ]
        }
    },
    created(){
        localStorage.setItem("chooseMenuPos","0");
        this.getData();
    },
    mounted(){
        this.mySwiper = new Swiper('.swiper1', {
            autoplay: 3000,//可选选项，自动滑动
            loop : true,
            //autoplayStopOnLast:true
            pagination: '.pagination1',//分页器
            paginationClickable :true,//分页器是否能点击
        })
        //监听页面滚动事件
        window.addEventListener('scroll', this.scrollHander)
        //注意：如果由于自己的vue中的样式导致监听不到，可以尝试监听body或者'#app-root'的滚动事件
    },
    destroyed () {
        window.removeEventListener('scroll', this.scrollHander)
    },
    methods: {
        scrollHander(){
            let scrollTop = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop
            console.log(scrollTop);
            scrollTop > 260 ? this.activeClass = true : this.activeClass = false;
            //scrollTop > 100 ? this.seclectActive = true : this.seclectActive = false
        },
        getData(){
            //this.text = "data----";
            getHomeData().then(response=>{
                this.listData = eval('('+response+')');
            }).catch(error=>{
                this.listData = error;
            });
        },
        linkCat(_id){
            this.$router.push({path: '/productList', query: {id: _id}})
        }
    }
}
</script>

<style>
#catList{
    text-align: left;
    background-color:#ffffff;    
    margin-bottom:50px; 
}
.cat-list{
    width:100%;
    height:auto;
    /* margin:0px auto; */
    /* margin-bottom: 20px; */
    text-align: center;
    background-color: #fdfdfd;
    
}
.cat-item{
    display: inline-block;
    padding-left:38px;
    padding-top: 10px;
    text-align: left;
}
.cat-item-0{
    border-right: 0.2px solid #cccccc;
    border-bottom: 0.2px solid #cccccc;
}
.cat-item-1{
    border-bottom: 0.2px solid #cccccc;
}
.cat-item-2{
    border-right: 0.2px solid #cccccc;
}
.cat-tyname{
    text-align: center;
    font-size: 16px;
    font-weight: bold;
    background-color: #cccccc;
    /* background-image: url(../../assets/images/t1.jpg); */
    height: 50px;
    line-height: 50px;
    /* margin-top: 20px; */
}
.cat-title{
    font-size: 15px;
    color: black;
    font-weight: bold;
}
.cat-sub-title{
   font-size: 14px;
    color: #ff0000; 
}
.cat-pic{
    width: 50px;
    height: 50px;
     margin: 10px;
}
.swiper-container {
  width: 100%;
  height: 300px;
}
.icon-list{
    margin:20px 0px; 
}
.icon-item{
    width: 65px;
    height: 50px;
    display: inline-block;
    text-align: center;
    margin: 10px 2px;
}
.icon-img{
   width: 40px;
   height:40px;
}
.icon-title{
    font-size: 14px;
}
</style>