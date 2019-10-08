// 处理一些需要全局改变的数据
/* 
userInfo： 用户信息对象，
    isLogin: 登录状态
shoppingCarlist: 购物车列表对象
    carList - 购物车数据
    pushCar 增加到购物车
    deleteCar 删除购物车中某一个
    deleteAllCar 清空购物车
*/
export default {
    // chooseMenuPos: 0, //0主页 1分类 2购物车 3我的
    userInfo: {
        //当前登录成功的用户名和密码
        isLogin: localStorage.getItem("isLogin") == "true" ? true : false,
        saveUserInfo(_obj) {
            this.isLogin = true;
            localStorage.setItem("isLogin", "" + this.isLogin);
            localStorage.setItem("loginUserInfo", "" + JSON.stringify(_obj));
        },
        getUserInfo() {
            let user = localStorage.getItem("loginUserInfo");
            if (user) {
                return JSON.parse(user);
            }
        }
    },
    shoppingCarList: {
        pushCar(_obj, _num) {
            let list = this.getCarList();
            var hasDouble = false;
            for (var i = 0; i < list.length; i++) {
                //如果有重名的 直接改变数量
                if (list[i].info.id == _obj.id) {
                    list[i].num += _num;
                    hasDouble = true;
                    break;
                }
            }
            // 没有重名的 直接添加进购物车
            if (hasDouble == false) {
                if (list.length <= 0) list = [{ num: _num, info: _obj }]
                else list.push({ num: _num, info: _obj });
            }
            console.log("setCar:" + JSON.stringify(list));
            localStorage.setItem("cardList", "" + JSON.stringify(list));
        },
        //获取购物车数据
        getCarList() {
            let list = [];
            if (localStorage.getItem("cardList")) {
                list = JSON.parse(localStorage.getItem("cardList"));
            }
            console.log("carList:" + JSON.stringify(list));
            return list;
        },
        deleteCar(_pos, _flag) {
            let carList = this.getCarList();
            var hasDouble = false;
            if (carList.length > 0) {
                //傳參數——flag=1  是在購物車中刪除該商品，不需要減數量
                if (!_flag) {
                    for (var i = 0; i < carList.length; i++) {
                        if (i == _pos && carList[i].num > 1) {
                            carList[i].num--;
                            hasDouble = true;
                            break;
                        }
                    }
                }
                if (hasDouble == false) {
                    carList.splice(_pos, 1);
                }
                //删除之后要重新存
                localStorage.setItem("cardList", "" + JSON.stringify(carList));
            }
        },
        //创建订单之后 结算的这些 需要从购物车删除
        deleteCarList(_list) {
            let carList = this.getCarList();
            for (let j = 0; j < _list.length; j++) {
                carList = carList.filter(item => !(item.info.id == _list[j].info.id && item.num == _list[j].num));
            }
            console.log(carList);
            localStorage.setItem("cardList", "" + JSON.stringify(carList));

        },
        deleteAllCar() {
            localStorage.removeItem("cardList");
        }
    },
    //订单
    orderList: {
        //将orderId对应的某一个订单的状态改变
        setStatus(_stu, _orderId) {
            let list = localStorage.getItem("orderList");
            if (list) {
                list = JSON.parse(list);
                for (var i = 0; i < list.length; i++) {
                    if (list[i].orderId == _orderId) {
                        list[i].status = _stu;
                    }
                }
            }
            localStorage.setItem("orderList", JSON.stringify(list));
        },
        /* setAddress(addr, _orderId) {
            let list = localStorage.getItem("orderList");
            if (list) {
                list = JSON.parse(list);
                for (var i = 0; i < list.length; i++) {
                    if (list[i].orderId == _orderId) {
                        list[i].address = addr;
                    }
                }
            }
        }, */
        //创建订单
        /*  status 0 提交订单 未付款
            status 1 已付款 未发货
            status 2 已发货 正在配送中
            status 3 已完成状态
            不包括配送状态 只有已付款和未付款两种状态
            */
        createOrder(_prodInfo, _addr, _totalPrice) {
            let list = localStorage.getItem("orderList");
            console.log("createOrder:" + list);
            //id存起来--本地生成订单时候使用--仅供测试
            let id = localStorage.getItem("orderIdRandom") ? parseInt(localStorage.getItem("orderIdRandom")) : 0;
            id++;
            localStorage.setItem("orderIdRandom", "" + id);
            var orderInfo = { orderId: formatDate(new Date(), 'YYYYMMDDhhmmss') + id, status: 0, totalPrice: _totalPrice, proList: _prodInfo, address: _addr, time: formatDate(new Date(), 'YYYY/MM/DD hh:mm:ss') };
            console.log(orderInfo);
            var result = [];
            if (list == null || list.length <= 0) {
                result = [orderInfo];
            } else {
                result = JSON.parse(list);
                result.push(orderInfo);
            }
            console.log(result);
            localStorage.setItem("orderList", JSON.stringify(result));
            return orderInfo.orderId;
        },
        // 删除订单
        deleteOrder(_orderId) {
            let list = localStorage.getItem("orderList");
            if (list) {
                list = JSON.parse(list);
                for (var i = 0; i < list.length; i++) {
                    if (list[i].orderId == _orderId) {
                        list.splice(i, 1);
                    }
                }
            }
            localStorage.setItem("orderList", JSON.stringify(list));
        },
        //根据状态获取订单列表 不传参数 则是获取所有的订单
        getOrderList(_status) {
            let list = localStorage.getItem("orderList");
            if (!list) return []; //没有就返回空数组
            if (typeof _status == 'undefined' || _status == null || _status == undefined) { //获取所有状态订单的时候 过滤掉-1状态的订单
                list = JSON.parse(list);
                var result = [];
                for (var i = 0; i < list.length; i++) {
                    // if (list[i].status != -1) {
                    result.push(list[i]);
                    // }
                }
                return result;
            } else {
                list = JSON.parse(list);
                var result = [];
                for (var i = 0; i < list.length; i++) {
                    if (list[i].status == _status) {
                        result.push(list[i]);
                    }
                }
                return result;
            }
        },
        getOrderInfo(_id) {
            var result = {};
            let list = localStorage.getItem("orderList");
            list = JSON.parse(list);
            for (var i = 0; i < list.length; i++) {
                if (list[i].orderId == _id) {
                    result = list[i];
                    break;
                }
            }
            return result;
        }
    },
    addressList: {
        getAddressList() {
            let list = localStorage.getItem("addressList");
            if (!list) return []; //没有就返回空数组
            list = JSON.parse(list);
            return list;
        },
        getAddressById(_id) {

        },
        //新增地址
        addAddr(_addObj) {
            //配置个id  测试用
            if (!_addObj.id) {
                _addObj.id = 'addId_' + formatDate(new Date(), 'YYYYMMDDhhmmss');
            }
            let list = localStorage.getItem("addressList");
            if (!list || JSON.parse(list).length <= 0) {
                if (_addObj.isDefault == 0) _addObj.isDefault = 1; //如果只有一条 直接设置为默认地址
                list = [_addObj];
            } else {
                list = JSON.parse(list);
                //如果当前加进来的地址设置为默认的了 之前的默认地址会直接被取消
                if (_addObj.isDefault == 1) {
                    for (var i = 0; i < list.length; i++) {
                        if (list[i].isDefault == 1) {
                            list[i].isDefault = 0;
                        }
                    }
                }
                list.push(_addObj);
            }
            localStorage.setItem("addressList", JSON.stringify(list));
        },
        //修改地址
        updateAddress(_addrId, _addObj) {
            // 修改的话 肯定就有地址存在，不需要考虑为空的情况
            let list = localStorage.getItem("addressList");
            list = JSON.parse(list);
            for (var i = 0; i < list.length; i++) {
                if (_addObj.isDefault == 1 && list[i].isDefault == 1 && list[i].id != _addrId) {
                    list[i].isDefault = 0;
                }
                if (list[i].id == _addrId) {
                    list[i] = _addObj;
                }
            }
            localStorage.setItem("addressList", JSON.stringify(list));
        },
        deleteAddress(_addrId) {
            let list = localStorage.getItem("addressList");
            list = JSON.parse(list);
            var isDefault = false;
            for (let i = 0; i < list.length; i++) {
                if (list[i].id == _addrId) {
                    isDefault = list[i].isDefault;
                    list.splice(i, 1); //删除
                    break;
                }
            }
            //如果把默认的删掉了 就设置第一个为默认的
            if (isDefault == 1 && list.length > 0) {
                list[0].isDefault = 1;
            }
            localStorage.setItem("addressList", JSON.stringify(list));
        }

    }
}

function formatDate(date, fmt) {
    var o = {
        'M+': date.getMonth() + 1, //月份
        'D+': date.getDate(), //日
        'h+': date.getHours(), //小时
        'm+': date.getMinutes(), //分  
        's+': date.getSeconds(), //秒
        "q+": Math.floor((date.getMonth() + 3) / 3), //季度   
        "S": date.getMilliseconds() //毫秒   

    };
    if (/(Y+)/.test(fmt)) { //年份
        　　
        fmt = fmt.replace(RegExp.$1, (date.getFullYear() + '').substr(4 - RegExp.$1.length));
    }
    for (let k in o) {
        if (new RegExp("(" + k + ")").test(fmt)) {
            var str = o[k] + '';
            fmt = fmt.replace(RegExp.$1, (RegExp.$1.length === 1) ? str : (('00' + str).substr(str.length)));　　
        }
    }
    return fmt;
}