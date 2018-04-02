import Vue from 'vue'
import Vuex from 'vuex'
import getters from './getters'
import mutations from './mutations'

Vue.use(Vuex)



const state = {
	isLogin: false,   // 是否登录
	users:null,
	loginUser: null, // 用户信息
	productsList:null, //全部商品列表
	recommendData:null, //首页推荐模块列表--类
	recommendList:null, //首页推荐模块列表--商品
	menuCateList:null,		//菜单分类列表
	pageCateList:null,   //分类页的分类列表
	shopCartList:null,   //购物车列表


}

const store = new Vuex.Store({
  state,
  getters,
  mutations,
})

  		// store.commit('INIT_USER')
		// store.commit('GET_PRODUCTSLIST')
		// store.commit('GET_RECOMMEND_DATA')
		// store.commit('GET_RECOMMEND_LIST')
		// store.commit('GET_MENU_CATE_LIST')
		// store.commit('GET_PAGE_CATE_LIST')

export default store