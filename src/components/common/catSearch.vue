<template>
<div class="cat-search">
    <span @click="$router.back(-1)" class="iconfont icon-xiangzuojiantou" style="font-size:20px;"></span>
    <div class="search-input">
        <!-- 搜索框 -->
        <span class="iconfont icon-sousuo"></span>
        <router-link to="/search" exact>
            <input type="text" name="" id="" placeholder="请输入商品名称" class="s-text">
        </router-link>
    </div>
    <div class="search-icon">
        <span class="iconfont icon-gengduo"></span>
    </div>
</div>
</template>

<script>
export default {
    data(){
        return {
            
        }
    }
}
</script>

<style>
.cat-search-active{
    background-color: #ffffff !important;
}
.cat-search{
   position: fixed;
   left: 0px;
   top: 0px;
   width: 100%;
   height:40px;
   z-index: 2;
   padding-top: 10px;
   border-bottom:#dddddd solid 0.1px;
}
.search-input{
    background-color: #eeeeee;
    border-radius: 15px;
    height: 30px;
    line-height: 30px;
    padding-left:10px;
    width: 70%; 
   display: inline-block;
   margin-left: 5px;
}
.s-text{
    font-size: 14px;
    background-color: transparent;
}
.search-icon{
   display: inline-block;
   margin-left: 5px;
   line-height: 30px;
   font-size: 24px;
   text-align: center; 
}
</style>