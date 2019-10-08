<template>
<div class="nav-search">
    <router-link to="/catList" exact><span class="iconfont icon-caidan" style="font-size:24px; margin-left:10px;"></span></router-link>
    <div class="search-input">
        <!-- 搜索框 -->
        <span class="iconfont icon-sousuo"></span>
        <router-link to="/search" exact>
            <input type="text" name="" id="" placeholder="请输入商品名称" class="s-text">
        </router-link>
    </div>
    <div class="search-icon">
        <!-- 未登录的显示登录按钮   已登录显示我的头像 -->
        <router-link v-if="isLogin==false" to="/login" exact><span class="nav-text">登录</span></router-link>
        <router-link v-else to="/myHome" exact><span class="iconfont icon-wode" style="font-size:20px;"></span></router-link>
    </div>
</div>
</template>

<script>
export default {
    data(){
        return {
            isLogin:localStorage.getItem('isLogin')=="true"?true:false,
            
        }
    }
}
</script>

<style>
.nav-search-active{
    background-color: #ff6666 !important;
}
.nav-search{
   position: fixed;
   left: 0px;
   top: 0px;
   width: 100%;
   height:45px;
   z-index: 2;
   padding-top: 10px;
   background-color:transparent;
}
.search-input{
    background-color: #ffffff;
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
}
.nav-text{
    font-size: 16px;
    color:#ffffff;
}
.search-icon{
   display: inline-block;
   margin-left: 5px;
}
</style>