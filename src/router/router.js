import App from '../App'

const home = r => require.ensure([], () => r(require('../page/home.vue')), 'home')
const login = r => require.ensure([], () => r(require('../page/login.vue')), 'login')
const regist = r => require.ensure([], () => r(require('../page/regist.vue')), 'regist')
const category = r => require.ensure([], () => r(require('../page/category.vue')), 'category')
const products = r => require.ensure([], () => r(require('../page/products.vue')), 'products')
const shopcars = r => require.ensure([], () => r(require('../page/shopcars.vue')), 'shopcars')
const orderConfirm = r => require.ensure([], () => r(require('../page/orderConfirm.vue')), 'orderConfirm')
const orderCharge = r => require.ensure([], () => r(require('../page/orderCharge.vue')), 'orderCharge')


export default [{
    path: '/',
    component: App, //顶层路由，对应index.html
    children: [ //二级路由。对应App.vue
        //地址为空时跳转home页面
        {
            path: '',
            redirect: '/home'
        },
        //首页
        {
            path: '/home',
            name:'home',
            component: home
        },
         //登录页
        {
            path: '/login',
            component: login
        },
         //注册页
        {
            path: '/regist',
            component: regist
        },
        //分类页
        {
            path:'/category',
            name:'category',
            component:category
        },
        //商品页
        {
            path:'/products/:id',
            name:'products',
            component:products
        },
        //购物车
        {
            path:'/shopcars',
            name:'shopcars',
            component:shopcars
        },
        //确认订单页
        {
            path:'/order/confirm',
            name:'orderConfirm',
            component:orderConfirm
        }
        //支付页
        {
            path:'/order/charge',
            name:'orderCharge',
            component:orderCharge
        }

    ]
}]