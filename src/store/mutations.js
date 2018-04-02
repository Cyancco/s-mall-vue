const INIT_USER = 'INIT_USER'
const REGIST_USER = 'REGIST_USER'
const LOGIN_CHECK_PSW = 'LOGIN_CHECK_PSW'
const LOGIN_CHECK_SMS = 'LOGIN_CHECK_SMS'
const LOGIN_OUT = 'LOGIN_OUT' //登陆后，初始化用户数据
const GET_PRODUCTSLIST = 'GET_PRODUCTSLIST' //获取全部商品列表
const GET_RECOMMEND_DATA = 'GET_RECOMMEND_DATA' //获取首页推荐模块列表--类
const GET_RECOMMEND_LIST = 'GET_RECOMMEND_LIST' //获取首页推荐模块列表--商品
const GET_MENU_CATE_LIST = 'GET_MENU_CATE_LIST'  //获取菜单分类列表
const GET_PAGE_CATE_LIST = 'GET_PAGE_CATE_LIST'  //获取菜单分类列表
const ADD_TO_SHOPCART = 'ADD_TO_SHOPCART'  //加入购物车


import { setStore, getStore } from './storage.js'
import axios from 'axios'

/*因为在新的浏览器打开页面总是要刷新2遍才能得到完整数据*/
/*需再斟酌 mutation 注册 在哪里 才能在一开始打开页面就能获得该有的数据*/


    /*
    如果用vuex，可以把全局的数据放在vuex里，
    或者将数据放在根组件app.vue中，
    子页面通过this.$root.data获取
    */

export default {
    [INIT_USER] ( state ){   //初始化账户列表
        let users = [{userName:"18812345678",password:"12345678",smsCode:"1234"}];
        setStore('users',JSON.stringify(users) )
        state.users = JSON.parse( getStore('users') )
        setStore('isLogin',false )
        state.isLogin = false;
    },
    [REGIST_USER] (state,{name, pass, sms}){  //注册账户
        let newUser = {
            userName:name,
            password:pass,
            smsCode:sms
        }
        state.users = JSON.parse( getStore('users') )
        state.users.push( newUser )
        setStore('users',JSON.stringify(state.users) )
    },
    [LOGIN_CHECK_PSW]( state,{name, pass}){  //验证帐号和登录密码
        let loginUser = { userName:name,password:pass}
        
        state.users = JSON.parse( getStore('users') )

        let len = state.users.length;
        for( let i=0; i<len ; i++ ){
            if( state.users[i].userName == loginUser.userName &&
                state.users[i].password == loginUser.password ){
                console.log('帐号密码均通过验证')
                setStore('loginUser', JSON.stringify(state.users[i]) )
                state.loginUser = state.users[i]
                setStore('isLogin',true)
                state.isLogin = true
                return
            }
        }
        console.log('帐号密码验证不通过')
        setStore('loginUser', "null" )
        state.loginUser = null
        setStore('isLogin',false)
        state.isLogin = false
    },
    [LOGIN_CHECK_SMS]( state,{name, sms}){  //验证账户和短信验证码
        let loginUser = { userName:name,smsCode:sms}
        
        state.users = JSON.parse( getStore('users') )

        state.users.forEach( item=>{
            if( item.userName == loginUser.userName &&
                item.smsCode == loginUser.smsCode )
            {
                console.log( "smsCode is true " )
                setStore('loginUser', JSON.stringify(item) )
                state.loginUser = item
                setStore('isLogin',true)
                state.isLogin = true
            }else{
                setStore('loginUser', "null" )
                state.loginUser = null
                setStore('isLogin',false)
                state.isLogin = false
            }
            
        })
    },
    [LOGIN_OUT] (state){
        setStore('isLogin',false)
        state.isLogin = false

    },
    [GET_PRODUCTSLIST] (state){
        axios.get("../../static/json/products.json")
        .then( res => {
            let resData = res.data.products;
            setStore('productsList',resData);
            state.productsList = resData;
        })
        .catch( err => {
            console.log(err)
        })
    },
    [GET_RECOMMEND_DATA] (state){
        axios.get("../../static/json/recommend.json")
        .then( res => {
            let resData = res.data;
            setStore('recommendData',resData);
            state.recommendData = resData;
        })
        .catch( err => {
            console.log(err)
        })
    },
    [GET_RECOMMEND_LIST] (state){
        let recommendList = [];
        let recommendData = JSON.parse( getStore('recommendData') );
        let productsList = JSON.parse( getStore('productsList') );
        
        let len = recommendData.categoryID.length;

        for( let i=0; i<len ; i++ ){
            recommendList[i] = [];
            for( let j=0; j<productsList.length ; j++ ){
                for(let k=0; k < productsList[j].categoryID.length ; k++ ){
                    if( productsList[j].categoryID[k] ==  recommendData.categoryID[i] ){
                        recommendList[i].push( productsList[j] );
                    }
                }
            }
        }
        setStore('recommendList',JSON.stringify(recommendList) )
        state.recommendList = recommendList;
    },
    [GET_MENU_CATE_LIST] (state){
        axios.get("../../static/json/classData2.json")
        .then( res => {
            let resData = res.data;
            setStore('menuCateList',JSON.stringify(resData) );
            state.menuCateList = resData;
        })
        .catch( err => {
            console.log(err)
        })
    },
    [GET_PAGE_CATE_LIST] (state){
        axios.get("../../static/json/classData3.json")
        .then( res => {
            let resData = res.data;
            setStore('pageCateList',JSON.stringify(resData) );
            state.pageCateList = resData;
        })
        .catch( err => {
            console.log(err)
        })
    },
    [ADD_TO_SHOPCART] (state,{isSelected,ID,img,title,color,size,price,quantity,subTotal,stock}){
        let addToShopCartProduct = {
            "isSelected":isSelected,
            "ID":ID,
            "img":img,
            "title":title,
            "color":color,
            "size":size,
            "price":price,
            "quantity":quantity,
            "subTotal":subTotal,
            "stock":stock
        };
        
        let loginUser = JSON.parse( getStore('loginUser') );
        // console.log(loginUser)
        let list = loginUser.shopcarsList;
        // console.log(list)
        //定义变量 判断该商品是否已在购物车
        let hasBeenInCart = false;
        //当商品已在购物车，只要修改数量
        for( let i=0; i<list.length ; i++ ){
            if( addToShopCartProduct.ID == list[i].ID && 
                addToShopCartProduct.color == list[i].color &&
                addToShopCartProduct.size == list[i].size ){
                hasBeenInCart = true;
                list[i].quantity += addToShopCartProduct.quantity;
                list[i].subTotal += addToShopCartProduct.subTotal;
            }
        }
        //当商品未在购物车，加整条信息
        if( hasBeenInCart == false ){
            list.push(addToShopCartProduct);
          //   if (!this.showCart) {
          //   this.SHOW_CART({showCart: true})
          // }
        }
        setStore('loginUser',JSON.stringify(loginUser))
        state.loginUser = loginUser;
        // console.log( JSON.parse( getStore('loginUser') ).shopcarsList )
    },










}
