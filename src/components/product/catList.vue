<template>
<div>
    <cat-search :class="activeClass?'cat-search-active':''"></cat-search><!--顶上的搜索框--><!-- <nav-slider></nav-slider> -->
    <nav-menu></nav-menu><!--整个app的导航 最下面的-->
    <div class="catlist-list">
        <ul class="catlist-list-ul" ref="leftMenu" id="leftMenu">
           <li v-for="(item,index) in catList" :key="'catlist-menu-'+index" :class="index==menuPos ? 'catlist-list-menu catlist-list-menu-choose' : 'catlist-list-menu'" @click="showSubCat(index)">{{item.title}}</li>
        </ul>
        <div class="catlist-prod-list" ref="rightMenu" id="rightMenu">
            <div v-show="isAdPoster" style="width:100%"><img :src="adPosterUrl"  class="catlist-ad"></div>
            <div v-for="(item,index) in subCatList"  class="catlist-list-item" :key="'list'+index">
                <p class="catlist-tyname">{{item.title}}</p>
                <div v-for="(obj,i) in item.subCat" @click="linkCat(obj.id)" class="catlist-item" :key="'cat'+i">
                    <p><img class="catlist-pic" :src="obj.poster"></p>
                    <p class="catlist-title">{{obj.title}}</p>
                </div>
            </div>
        </div>
    </div>    
</div>
</template>
<script>
import navMenu from '../common/navMenu';
import catSearch from '../common/catSearch';
import {getCatList} from '../../assets/js/config'
export default {
     components:{
        navMenu,
        catSearch,
    },
    data(){
        return{
            activeClass:false,
            isAdPoster:false,
            adPosterUrl:"",
            catList:[],//整个栏目页数据
            subCatList:[],//右边的所有数据
            menuPos:0//当前选中的左边的下标
        }
    },
    created(){
        localStorage.setItem("chooseMenuPos","1");
        this.getData();
    },
    mounted(){
         //监听页面滚动事件
        console.log(this.$refs.leftMenu);
        this.$refs.leftMenu.addEventListener('scroll', this.LeftScrollHander,false);
        this.$refs.rightMenu.addEventListener('scroll', this.rightScrollHander,false);
    },
    destroyed () {
        // this.$refs.leftMenu.removeEventListener('scroll', this.LeftScrollHander);
        // this.$refs.rightMenu.removeEventListener('scroll', this.rightScrollHander);
    },
    methods:{
        LeftScrollHander(){
            let scrollTop = this.$refs.leftMenu.pageYOffset || document.getElementById("leftMenu").scrollTop;
            console.log(scrollTop);
        },
        rightScrollHander(){
            let scrollTop = this.$refs.rightMenu.pageYOffset || document.getElementById("rightMenu").scrollTop;
            console.log(scrollTop);
        },
        showSubCat(_index){
            this.menuPos = _index;
            this.subCatList = this.catList[this.menuPos].subCat;
            this.adPosterUrl = this.catList[this.menuPos].adPoster;
            this.isAdPoster = this.adPosterUrl==""?false:true;
        },
        getData(){
            var that = this;
            getCatList().then(response=>{
                that.catList = eval('('+response+')');
                that.showSubCat(that.menuPos);
            }).catch(error=>{
                that.catList = error;
            });
        },
        //点击子类别
        linkCat(_id){
           this.$router.push({path: '/productList', query: {id: _id}})
        }
    }
}
</script>

<style>

.catlist-list{
    position: relative;
    margin-top:50px;
    width: 100%;
    /* height: 300px; */
    text-align: left;
    padding-bottom:80px; 
}
.catlist-list-ul{
    float: left;
    width: 100px;
    background-color: #f0f0f0;
    line-height: 50px;
    font-size: 14px;
    color: #000000;
    height: 450px;
    overflow-y: scroll;
}
.catlist-list-menu,.catlist-list-menu-choose{
    /* position:relative;
    float:left; */
    width: 100px;
    text-align: center;
    overflow-y: scroll;
}
.catlist-list-menu{
    background-color: #f0f0f0;
    color: #000000;
}
.catlist-list-menu-choose{
    background-color: #ffffff;
    color: #ff0000;
}
/* 整个右侧 */
.catlist-prod-list{
    position: relative;
    margin-left:120px; 
}
/* 右侧广告图 */
.catlist-ad{
    width: 220px;
    height: 80px;
}
/* 右侧单个 */
.catlist-item{
    display: inline-block;
    text-align: center;
    margin-left:10px; 
}
/* 右侧一级栏目标题 */
.catlist-tyname{
    text-align: left;
    font-size: 16px;
    font-weight: bold;
    height: 50px;
    line-height: 50px;
}
/* 右侧二级标题 */
.catlist-title{
    font-size: 12px;
    color: black;
}
/* 二级图 */
.catlist-pic{
    width: 50px;
    height: 100px;
}
</style>