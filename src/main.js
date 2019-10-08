// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
//ajax请求的
import { http } from './assets/js/config'

import Swiper from 'swiper';
import 'swiper/dist/css/swiper.min.css';
import { TabPane } from 'element-ui';

Vue.config.productionTip = false
    //Vue.use(ElementUI)
Vue.prototype.$http = http


/* eslint-disable no-new */
new Vue({
    el: '#app',
    router,
    Swiper,
    components: { App },
    template: '<App/>'
});
//路由守卫  可以用来处理全局的判断 比如没有登录就无法访问的页面
router.beforeEach((to, from, next) => {
    if (localStorage.getItem("isLogin") == "true") {
        next();
    } else {
        var noLoginLink = ['/login', '/register', '/home', '/catList', '/productList', '/productDetail'];
        //不需要登录也能访问的页面
        if (to.path == '/login' || to.path == '/register' || to.path == "/home" || to.path == "/catList" || to.path == "/productList" || to.path == "/productDetail") {
            next();
        } else {
            alert('您还没有登录，请先登录');
            next({ path: '/login', query: { toPath: to.path } });
        }
    }
})