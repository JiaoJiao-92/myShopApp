<template>
<div>
    <cat-search :class="activeClass?'cat-search-active':''"></cat-search><!--顶上的搜索框--><!-- <nav-slider></nav-slider> -->
    <ul :class="activeClass?'cat-search-active prod-control':'prod-control'">
        <li :class="sortPos==0?'prod-li prod-font-red':'prod-li'" @click="prodSort(0)">
            综合排序
        </li>
        <li :class="sortPos==1?'prod-li prod-font-red':'prod-li'" @click="prodSort(1)">
            升序<span class="iconfont icon-xiangshangjiantou"></span>
        </li>
        <li :class="sortPos==2?'prod-li prod-font-red':'prod-li'" @click="prodSort(2)">
            降序<span class="iconfont icon-xiangxiajiantou"></span>
        </li>
        <li :class="sortPos==3?'prod-li prod-font-red':'prod-li'" @click="prodSort(3)">
            筛选<span class="iconfont icon-shaixuan"></span>
        </li>
    </ul>
    <div class="prod-list">
        <div v-for="(item,index) in productList"  class="prod-item" :key="'list'+index" @click="linkProduct(item.id,index)">
            <div class="prod-pic-div">
                <img :src="item.picList[0]" class="prod-pic">
            </div>
            <div class="prod-title-div">
                <span class="prod-title">{{item.title}}</span><br/>
                <span class="prod-subtitle">{{item.subTitle}}</span><br/>
                <span class="prod-price">￥{{item.price}}</span>
            </div>
        </div>
    </div>
</div>
</template>
<script>
import catSearch from '../common/catSearch';
import {getProductList} from '../../assets/js/config'
import {getProductList1} from '../../assets/js/config'
export default {
     components:{
        catSearch,
    },
    data(){
        return{
            sortPos:0,//默认中和排序
            activeClass:false,
            productList:[],//数据
        }
    },
    created(){
        this.getData();
    },
    mounted(){
      //监听页面滚动事件
        window.addEventListener('scroll', this.scrollHander)
        //注意：如果由于自己的vue中的样式导致监听不到，可以尝试监听body或者'#app-root'的滚动事件
    },
    destroyed () {
        window.removeEventListener('scroll', this.scrollHander)
    },
    methods:{
        scrollHander(){
            let scrollTop = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop
            console.log(scrollTop);
            scrollTop > 0 ? this.activeClass = true : this.activeClass = false;
            //scrollTop > 100 ? this.seclectActive = true : this.seclectActive = false
        },
        getData(){
            //alert(this.$route.query.id);
            getProductList(this.$route.query.id).then(response=>{
                this.productList = eval('('+response+')');
            }).catch(error=>{
                this.productList = error;
            });
        },
        //点击子类别
        linkProduct(_id,_index){
           this.$router.push({path: '/productDetail', query: {id: _id}})
        },
        //排序
        prodSort(_index){
            this.sortPos = _index;
            //假排序
            if(this.sortPos==0){//综合排序的直接用原始值
                this.getData();
            }else{
                //alert(this.$route.query.id);
                getProductList1(this.$route.query.id).then(response=>{
                    this.productList = eval('('+response+')');
                }).catch(error=>{
                    this.productList = error;
                });
            }
            
        }
    }
}
</script>

<style>
.cat-search-active{
    background-color: #ffffff !important;
}
.prod-control{
    position: fixed;
    top: 50px;
    height: 40px;
    width: 100%;
    border-bottom: #dddddd solid 0.1px; 
    z-index: 999;
}
.prod-li{    
    display: inline-block;
    font-size: 13px;
    text-align: left;
    line-height: 40px;
    color: #000000;
}
.prod-font-red{
    color: #ff1111;
}
.prod-control li + li { margin-left:40px; } 
.prod-list{
    position: relative;
    margin-top:90px;
    width: 100%;
    text-align: left;
}
.prod-item{
    padding: 10px;
    margin-bottom:10px;
    height: 80px;
    border-bottom: #dddddd solid 0.1px; 
    overflow: hidden;
}
.prod-pic-div{
    float: left;
}
.prod-pic{
    width: 80px;
    height: 80px;
}
.prod-title-div{
    position: relative;
    margin-left:90px;
}
.prod-title{
    line-height: 30px;
    font-size: 14px;
    color: #000000;
}
.prod-subtitle{
    line-height: 20px;
    font-size: 12px;
    color: #aaaaaa;
}
.prod-price{
    font-size: 15px;
    line-height: 30px;
    color: #ff1111;
}
</style>