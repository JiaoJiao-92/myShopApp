
<template>
<div>
        <!-- 最上面展示的导航-->
    <ul class="addr-detail-control">
        <li class="addr-detail-li">
            <span @click="$router.back(-1)" class="iconfont icon-xiangzuojiantou" style="font-size:20px;"></span>
        </li>
        <li class="addr-detail-li">
            地址管理
        </li>
        <li class="addr-detail-li" style="font-size:12px; color:#ff0000;" @click="$router.push('/addAddress')">
            添加新地址
        </li>
    </ul>
    <div v-if="addressList.length>0" style="z-index: 999; left:0px; text-align:left;height:120px; position:fixed; top:40px;width:100%;font-size:16px;  border-bottom:solid 0.1px #cccccc;line-height:30px; background-color:#eeeeee;">
        <p style="margin-left:10px;">当前地址：</p>
        <p style="margin-left:20px;">
            {{defaultAddress.username}}   {{defaultAddress.tel}}
        </p>
        <p style="margin-left:20px;">
            {{defaultAddress.address}}
        </p>
    </div>
    <div v-if="addressList.length<=0" @click="$router.push('/addAddress')" style="z-index: 999; left:0px; text-align:center;height:40px; position:fixed; top:40px;width:100%;font-size:16px;  border-bottom:solid 0.1px #cccccc;line-height:30px; background-color:#eeeeee;">
        新增收货地址   
    </div>
    <div class="addr-list" :style="addressList.length>0?'margin-top:160px':'margin-top:80px;'" v-if="addressList.length>0">
        <div v-for="(item,index) in addressList"  class="addr-list-item" :key="'addr_list_'+index">
            <div style="float:left; width:85%; border-right:0.1px solid #cccccc; padding-right:20px;">
                <p style="margin-left:20px;float:left; width:80%;" @click="chooseAddr(item.id)">
                    {{item.username}}   {{item.tel}}
                </p>
                <p style="margin-left:20px; margin-top:-10px;float:right;">
                    <input type="button" value="X" title="删除地址" @click="deleteAddr(item)" style=" background-color:transparent; color:#ff0000">
                </p>
                <p style="margin-left:20px; float:left; width:50%;" @click="chooseAddr(item.id)">
                    {{item.address}}
                </p>
                <p style="margin-left:20px; font-size:12px; float:right;">
                    <input type="radio" name="addrBtn" @click="item.isDefault = 1;defaultAddress = item;" :checked="item.isDefault==1?true:false">设为默认地址
                </p>
            </div>
            <div style="width:20px; font-size:12px; float:right; color:#fc0000;" @click="$router.push({path:'updateAddress',query:{id:item.id}})">
                编辑
            </div>
        </div>
    </div>
</div>
</template>
<script>
import {setAddrDefault,getAddressList,deleteAddress} from '../../assets/js/config'
export default {
    data(){
        return{
            addressList:[],
            defaultAddress:{},
            chooseAddrId:"",
            toPath:"",
        }
    },
    created(){
        this.chooseAddrId = this.$route.query.addrId;
        if(!this.chooseAddrId||this.chooseAddrId==""){
            this.chooseAddrId = localStorage.getItem("currChooseAddrId");
        }else{
            localStorage.setItem("currChooseAddrId",this.chooseAddrId);
        }
        this.getData();
    },
    /* beforeRouteEnter(to, from, next) {
        var that = this;
        next(()=>{          //  这里的vm指的就是vue实例，可以用来当做this使用
            console.log("beforeRouteEnter:");
            console.log(to)
            console.log(from.path);
        })
    }, */
    methods:{
        getData(){
            this.addressList = getAddressList();
            this.getDefaultAddr();
        },
        getDefaultAddr(){
            for(var i=0;i<this.addressList.length;i++){
                if(this.chooseAddrId==this.addressList[i].id){
                    this.defaultAddress = this.addressList[i];
                }
            }
        },
        deleteAddr(_obj){
            deleteAddress(_obj.id);
            this.addressList = getAddressList();
            if(this.addressList.length>0){
                if(_obj.id==this.chooseAddrId){//如果把当前选择的地址删除了 就设置默认地址 如果默认地址也被删除了 就选择第一个
                    if(_obj.isDefault==1){
                        this.addressList[0].isDefault = 1;
                        this.defaultAddress = this.addressList[0];
                    }else{
                        for(var i=0;i<this.addressList.length;i++){
                            if(this.addressList[i].isDefault==1){
                                this.defaultAddress = this.addressList[i];
                            }
                        }
                    }
                    this.chooseAddrId = this.defaultAddress.id;
                    localStorage.setItem("currChooseAddrId",this.chooseAddrId);
                }
            }else{
                this.defaultAddress ={};
                localStorage.removeItem("currChooseAddrId");
            }
        },
        chooseAddr(_id){
            this.chooseAddrId = _id;
            localStorage.setItem("currChooseAddrId",this.chooseAddrId);
            this.$router.replace({path:"/carDetail",query:{addrId:_id}});
        }
    }
}
</script>

<style>
.addr-detail-control{
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
.addr-detail-control li +li {
    margin-left:100px;
}
.addr-detail-li{
    display: inline-block;
    color: #000000;
}
.addr-list{
    /* margin-top: 160px; */
    width: 100%;
    text-align: left;
    padding-bottom:100px;
    clear: both;
}
.addr-list-item{
    padding: 10px;
    margin-bottom:10px;
    border-bottom: #dddddd solid 0.1px; 
    overflow: hidden;
}
</style>