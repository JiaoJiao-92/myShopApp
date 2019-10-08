<template>
  <ul class="car-detail-control">
        <li class="car-detail-li">
            <span @click="$router.back(-1)" class="iconfont icon-xiangzuojiantou" style="font-size:20px;"></span>
        </li>
        <li class="car-detail-li">
            {{text}}
        </li>
        <li class="car-detail-li">
            <span class="iconfont icon-gengduo"></span>
        </li>
    </ul>
</template>

<script>
export default {
    props:["show-text"],
    data(){
        return {
            text:this.showText,
        }
    }

}
</script>

<style>
.car-detail-control{
    position: fixed;
    top: 0px;
    left: 0px;
    height: 40px;
    width: 100%;
    border-bottom: #dddddd solid 0.1px; 
    /* z-index: 999; */
    line-height: 40px;
    background-color: #ffffff !important;
}
.car-detail-control li +li {
    margin-left:120px;
}
.car-detail-li{
    display: inline-block;
    color: #000000;
}

</style>