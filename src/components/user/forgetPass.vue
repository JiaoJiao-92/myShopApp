<template>
<div>
    <ul class="login-top">
        <li class="iconfont icon-xiangzuojiantou icon-back" @click="$router.back(-1)"></li>
        <li class="login-title">修改用户密码</li>
    </ul>
    <div style="margin-top:60px; padding-left:20px;">
        <p v-if="step==0" class="up-p">
            <input type="text" name="" v-model="username" placeholder="请输入用户名" class="up-input">
        </p>
        <p v-if="step==1" class="up-p">
            <input type="text" name="" v-model="password" placeholder="请重置密码" class="up-input">
        </p>
    </div>
    <div v-if="step==0" class="user-btn">
      <input type="button" value="下一步" @click="next()">
    </div> 
    <div v-if="step==1" class="user-btn">
      <input type="button" value="提交" @click="save()">
    </div>    
    <p v-show="errorText!=''" style="text-align:center;font-size:16px; color:#ff0000;">
      {{errorText}}
    </p>
</div> 
</template>

<script>
import {getUserInfo,saveUserInfo,login} from '../../assets/js/config'
export default {
    data(){
        return {
            username:"",
            password:"",
            errorText:"",
            userInfo:{},
            step:0,
        }
    },
    created(){
        this.getData();
    },
    methods:{
        getData(){
            login(this.username,this.password).then(response=>{
                var data = eval('('+response+')');
                this.userInfo = data;
            }).catch(error=>{
                this.errorText = error;
            })    
        },
        next(){
            if(this.username==''){
                this.errorText = "请输入用户名"
            }else if(this.username!=this.userInfo.username){
                this.errorText = "用户名不正确"
            }else{
                this.step = 1;
            }
        },
      //修改
        save(){
            if(this.password==''){
                this.errorText = "请输入新密码"
            }else{
                this.errorText = "修改成功";
                saveUserInfo({username:this.userInfo.username,password:this.password});
                const that = this;
                setTimeout(function (){
                    that.$router.push("/login");
                },1000);
            }        
        },
    }

}
</script>

<style>
.user-btn{
  text-align: center;
  margin: 50px 10px 10px 10px;
  background-color:rgba(246,53,21,0.5);
  border-radius: 15px;
  line-height: 50px;

}
.user-btn input{
  font-size: 18px;
  line-height: 50px;
  background-color: transparent;
  color: #ffffff;
  width: 100%;
}

.login-top{
  height:40px;
  line-height: 40px;
  text-align: left;
  border-bottom: 0.1px solid #eeeeee;
}
.icon-back{
  font-size: 20px;
  display: inline-block;
  width: 10%;
  font-weight: bold;
  margin-left: 10px;
}
.login-title{
  margin: 0 auto;
  display: inline-block;
  width: 70%;
  text-align: center;
  font-size: 18px;
}
.up-p{
    border:0.1px solid #eeeeee;
    margin-right:10px;
    text-align: left;
}
.up-input{
    background-color:transparent;
    height:60px;
    line-height:60px;
    padding-left:10px; 
    font-size: 16px;   
}
.up-ptext{
    text-align:left;
    line-height:40px;
    font-size: 14px;
}
</style>