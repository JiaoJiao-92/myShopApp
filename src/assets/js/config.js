import axios from 'axios';
import globalObj from './globalObj';

//http方法封装
export const http = (url = '', data = {}, type = 'GET') => {
    return new Promise((resolve, reject) => {
        console.log('http requestUrl: ' + url)
        console.log('http requestData: ' + JSON.stringify(data))
        let Promise;
        if (type === "GET") {
            Promise = axios({
                method: "get",
                url: url,
                data: data,
                withCredentials: true //get请求 带cookie
            })
        } else {
            Promise = axios({
                method: "post",
                url: url,
                data: data,
                withCredentials: false //post请求 不带cookie
            })
        }
        Promise.then(response => {
                if (response) {
                    resolve(response.data); //返回数据
                }
            })
            .catch(error => {
                reject(error)
            })
    })
}

//登录
export const login = (username, password) => http('/api/data/login.js', {
    username,
    password
});
//保存用户信息-登录之后
export const saveUserInfo = (_obj) => globalObj.userInfo.saveUserInfo(_obj);
// 获取用户信息--我的主页 需要
export const getUserInfo = () => globalObj.userInfo.getUserInfo();
//获取主页数据
export const getHomeData = () => http('/api/data/home.js');
//获取所有分类数据
export const getCatList = () => http('/api/data/catList.js');

//获取分类下的商品数据
export const getProductList = (catId) => http('/api/data/productList.js', {
    catId
});

export const getRecommProduct = () => http('/api/data/recommProduct.js');
//排序后的 --测试排序--获取分类下的商品数据
export const getProductList1 = (catId) => http('/api/data/productList1.js', {
    catId
});
//获取产品详情
export const getProductDetail = (prodId) => http('/api/data/productDetail.js', {
    prodId
});

//购物车
export const getCarList = () => globalObj.shoppingCarList.getCarList();
//添加到購物車
export const pushCar = (_obj, _num) => globalObj.shoppingCarList.pushCar(_obj, _num);
//購物車
export const deleteCar = (_pos, _flag) => globalObj.shoppingCarList.deleteCar(_pos, _flag);
//購物車
export const deleteAllCar = () => globalObj.shoppingCarList.deleteAllCar();
//删除地址
export const deleteCarList = (_list) => globalObj.shoppingCarList.deleteCarList(_list);

// 订单相关
// 设置订单状态
export const setOrderStatus = (_stu, _orderId) => globalObj.orderList.setStatus(_stu, _orderId);
//创建订单
export const createOrder = (_prodInfo, _addr, _totalPrice) => globalObj.orderList.createOrder(_prodInfo, _addr, _totalPrice);
//获取订单
export const getOrderList = (_stu) => globalObj.orderList.getOrderList(_stu);
// 设置订单地址
export const setOrderAddress = (addr, _orderId) => globalObj.orderList.setAddress(addr, _orderId);
// 删除订单
export const deleteOrder = (_orderId) => globalObj.orderList.deleteOrder(_orderId);
//获取订单详情
export const getOrderInfo = (_orderId) => globalObj.orderList.getOrderInfo(_orderId);

// 地址相关
export const getAddressList = () => globalObj.addressList.getAddressList();
// 添加地址
export const addAddr = (_addObj) => globalObj.addressList.addAddr(_addObj);
//删除地址
export const deleteAddress = (_addId) => globalObj.addressList.deleteAddress(_addId);
//修改地址
export const updateAddress = (_addrId, _addObj) => globalObj.addressList.updateAddress(_addrId, _addObj);