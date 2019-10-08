<template>
    <ul  class="nav-menu">
        <li class="menu-li" :style="initChoosePos==0?color:nocolor" @click="gotoLink(0)">
            <span class="iconfont icon-shouye menu-icon"></span><br/>
            <span class="menu-text">主页</span>
        </li>
        <li class="menu-li" :style="initChoosePos==1?color:nocolor" @click="gotoLink(1)">
            <span class="iconfont icon-sousuoleimu menu-icon"></span><br/>
            <span class="menu-text">分类</span>
        </li>
        <li class="menu-li" :style="initChoosePos==2?color:nocolor" @click="gotoLink(2)">
            <span class="iconfont icon-gouwuche menu-icon"></span><br/>
            <span class="menu-text">购物车</span>
        </li>
        <li class="menu-li" :style="initChoosePos==3?color:nocolor" @click="gotoLink(3)">
            <span class="iconfont icon-wode menu-icon"></span><br/>
            <span class="menu-text">我的</span>
        </li>
    </ul>
</template>

<script>
export default {
    data(){
        return {
            text:"#ff0000",
            color:{
                color:"#ff0000",
            },
            nocolor:{
               color:'#000000',
            },
            initChoosePos:0,
        }
    },
    created(){
        this.initChoosePos = localStorage.getItem('chooseMenuPos');
    },
    methods:{
        gotoLink(_pos){
            if(_pos==this.initChoosePos){
                return ;
            }
            localStorage.setItem('chooseMenuPos',""+_pos);
            if(_pos==0){
                this.$router.push('/home');
            }else if(_pos==1){
                this.$router.push('/catList');
            }else if(_pos==2){
                this.$router.push('/shoppingCar');
            }else if(_pos==3){
                this.$router.push('/myHome');
            }
        }
    }
}
</script>

<style>
.nav-menu{
   position: fixed;
   left: 0px;
   bottom: 0px;
   width: 100%;
   height:50px;
   z-index: 999;
   background-color: #ffffff; 
   border-top: #cccccc solid 0.2px;
   padding-top: 5px;
   text-align: center;
}
.menu-li{
    text-align: center;
    display: inline-block;
    /* margin-left: 20px; */
}
.menu-icon{
    font-size: 22px;
}
.menu-text{
    font-size: 14px;
}
.nav-menu li + li { margin-left:60px; } 
</style>