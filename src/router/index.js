import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
    routes: [{
            path: '/',
            redirect: '/home',
        }, {
            path: '/login', //登录页面
            name: 'login',
            component: (resolve) => require(['@/components/user/login'], resolve)
        },
        {
            path: '/home', //主页
            name: 'home',
            component: (resolve) => require(['@/components/home/home'], resolve)
        },
        {
            path: '/search', //搜索
            name: 'search',
            //component: (resolve) => require(['@/components/product/search'], resolve)
        },
        {
            path: '/catList', //分类列表
            name: 'catList',
            component: (resolve) => require(['@/components/product/catList'], resolve)
        },
        {
            path: '/productList', //商品列表
            name: 'productList',
            component: (resolve) => require(['@/components/product/productList'], resolve)
        },
        {
            path: '/productDetail', //商品详情
            name: 'productDetail',
            component: (resolve) => require(['@/components/product/productDetail'], resolve)
        },
        {
            path: '/shoppingCar', //购物车
            name: 'shoppingCar',
            component: (resolve) => require(['@/components/shoppingCar/shoppingCar'], resolve)
        },
        {
            path: '/carDetail', //购物车详情
            name: 'carDetail',
            component: (resolve) => require(['@/components/shoppingCar/carDetail'], resolve)
        },
        {
            path: '/myHome', //我的
            name: 'myHome',
            component: (resolve) => require(['@/components/user/myHome'], resolve)
        },
        {
            path: '/orderList', //订单列表
            name: 'orderList',
            component: (resolve) => require(['@/components/order/orderList'], resolve)
        },
        {
            path: "/orderDetail",
            name: "orderDetail",
            component: (resolve) => require(['@/components/order/orderDetail'], resolve)
        },
        {
            path: '/userInfo', //用户信息
            name: 'userInfo',
            component: (resolve) => require(['@/components/user/userInfo'], resolve)
        },
        {
            path: '/updatePassword', //修改用户密码
            name: 'updatePassword',
            component: (resolve) => require(['@/components/user/updatePassword'], resolve)
        },
        {
            path: '/forgetPass', //忘记密码
            name: 'forgetPass',
            component: (resolve) => require(['@/components/user/forgetPass'], resolve)
        },
        {
            path: '/register', //注册
            name: 'register',
            component: (resolve) => require(['@/components/user/register'], resolve)
        },
        {
            path: '/updateUserInfo', //更新用户信息
            name: 'updateUserInfo',
            component: (resolve) => require(['@/components/user/updateUserInfo'], resolve)
        },
        {
            path: '/addressList', //地址管理页面
            name: 'addressList',
            component: (resolve) => require(['@/components/address/addressList'], resolve)
        },
        {
            path: '/addAddress', //新增地址
            name: 'addAddress',
            component: (resolve) => require(['@/components/address/addAddress'], resolve)
        },
        {
            path: '/updateAddress', //修改管理
            name: 'updateAddress',
            component: (resolve) => require(['@/components/address/updateAddress'], resolve)
        },
    ]
})