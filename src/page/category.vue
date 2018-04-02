<template>
	<div>
		<web-head :cart-num="cartNum"></web-head>
		<web-nav></web-nav>
		<div class="wrap">
			<div class="bread">
				<router-link to='/home'>首页</router-link>
				<router-link :to="{name:'category',query:{categoryId:firstBreadLink}}" v-if="isInThirdCate">
					<b>></b>
					{{firstBread}}
				</router-link>
				<span>
					<router-link :to="{name:'category',query:{categoryId:lastBreadLink}}">
						<b>></b>
						{{lastBread}}
					</router-link>
				</span>
			</div>
			<div class="cateBread">
				<span>{{firstCateBread}} :</span>
				<ul>
					<li>
						<router-link v-for="(item,index) in cateBreadList" :key="item.id" :to="{name:'category',query:{categoryId:cateBreadListLink[index]}}">{{item}}</router-link>
					</li>
				</ul>
			</div>
			<ul class="cateContainer">
				<li>
					<div class="list-head" id="">{{curCateName}}</div>
					<ul class="list-main clearfix">
						<li v-for="(item,index) in pageCateList">
							<router-link :to="{
								name:'products',
								params:{id:item.ID}}" 
							>
								<i><img :src="item.mainImage[0]"></i>
								<dl>
									<dt>{{item.title}}</dt>
									<dd>￥{{item.price}}</dd>
								</dl>
							</router-link>
						</li>
					</ul>
				</li>
			</ul>
		</div>
		<web-foot></web-foot>
	</div>
</template>
<script type="text/javascript">
	import webHead from '../components/web/webHead.vue'
	import webNav from '../components/web/webNav.vue'
	import webFoot from '../components/web/webFoot.vue'
	import axios from 'axios'
	import { setStore, getStore } from '../store/storage.js'

	export default{
		components:{
			webHead: webHead,
			webNav: webNav,
			webFoot: webFoot,
		},
		data(){
			return{
				isInThirdCate:true,  //面包屑是否显示三个链接 如：首页>女装>女士上装
				cateID:1,			//route.query请求的分类
				lastBread:"",		//面包屑第三个链接名称
				lastBreadLink:"",   //面包屑第三个链接地址
				firstBread:"",		//面包屑第二个链接名称
				firstBreadLink:"",	//面包屑第二个链接地址
				firstCateBread:"",	//第二行面包屑导航 头
				cateBreadList:[],	//第二行面包屑导航 list
				cateBreadListLink:[],//第二行面包屑导航 链接地址
				curCateName:"",		//当前页面类目的标题  居中
				firstList:[],		// 二级商品分类 类名
				firstListIDs:[],	// 二级商品分类 类ID
				secondList:[],		// 三级商品分类 类名
				secondListIDs:[],	// 三级商品分类 类ID
				thirdList:[],		// 四级商品分类 类名
				thirdListIDs:[],	// 四级商品分类 类ID
				productsList:[],	// 所有商品列表
				pageCateList:[],	// 页面请求的类目下 的商品列表
				cartNum:0,
			}
		},
		methods:{
			initHeaderData:function(){
				if(getStore('isLogin') == "false"){
					this.cartNum = 0;
				}else if( getStore('isLogin') == "true" ){
					this.cartNum = JSON.parse( getStore('loginUser')).shopcarsList.length;
				}
			},
			initData:function(){
				if( !getStore('productsList') ){
					this.$store.commit('GET_PRODUCTSLIST')
				}
				if( !getStore('pageCateList') ){
					this.$store.commit('GET_PAGE_CATE_LIST')
				}
				this.productsList = JSON.parse( getStore('productsList') );
				this.pageCateList = JSON.parse( getStore('pageCateList') );
				
		        this.firstList = this.pageCateList.firstList;
		        this.firstListIDs = this.pageCateList.firstListIDs;
		        this.secondList = this.pageCateList.secondList;
		        this.secondListIDs = this.pageCateList.secondListIDs;
		        this.thirdList = this.pageCateList.thirdList;
		        this.thirdListIDs = this.pageCateList.thirdListIDs;
				// console.log(this.pageCateList)
				this.cateID = this.$route.query.categoryId;
			},
			getCateListData:function(){
				let _this = this;		
				//获取相应categoryID的分类，			//一级：全部
				if(   _this.cateID == 1 ){
					_this.pageCateList = _this.productsList
					_this.isInThirdCate = false;
					_this.lastBread = "全部分类";
					_this.lastBreadLink = "1"
					_this.firstCateBread = "全部分类";
					_this.cateBreadList = _this.firstList;
					_this.cateBreadListLink = _this.firstListIDs;
					return
				}else{
					for(let i=0; i<_this.thirdListIDs.length; i++ ){
						for(let j=0; j<_this.thirdListIDs[i].length; j++ ){
							for(let k=0; k<_this.thirdListIDs[i][j].length; k++ ){
								if( _this.cateID == _this.firstListIDs[i] ){
									_this.isInThirdCate = false;
									_this.lastBread = _this.firstList[i];
									_this.lastBreadLink = _this.firstListIDs[i];
									_this.firstCateBread = _this.firstList[i];
									_this.cateBreadList = _this.secondList[i];
									_this.cateBreadListLink = _this.secondListIDs[i];
									return
								}
								if(  _this.cateID == _this.secondListIDs[i][j] || _this.cateID == _this.thirdListIDs[i][j][k] ){
									_this.isInThirdCate = true;
									_this.firstBread = _this.firstList[i];
									_this.firstBreadLink = _this.firstListIDs[i];
									_this.lastBread = _this.secondList[i][j];
									_this.lastBreadLink = _this.secondListIDs[i][j];
									_this.firstCateBread = _this.secondList[i][j];
									_this.cateBreadList = _this.thirdList[i][j];
									_this.cateBreadListLink = _this.thirdListIDs[i][j];
									return
								}
							}
						}
					}
				}
			},
			getpageCateListData:function(){
				this.pageCateList=[];
				//过滤数据
				let _this = this;
				if(   _this.cateID == 1 ){
					_this.pageCateList = _this.productsList
					return
				}else{
					for(var i=0; i<_this.productsList.length ; i++){
						for(var j=0; j<_this.productsList[i].categoryID.length; j++ ){
							if( _this.productsList[i].categoryID[j] == _this.cateID){
								_this.pageCateList.push(_this.productsList[i])
							}
						}
					}
					return
				}
			}
		},
		watch:{
			$route:function(newRoute,oldRoute){
				this.cateID = newRoute.query.categoryId;
				this.getCateListData();
				this.getpageCateListData();
			}
		},
		created(){


		},
		mounted(){
			this.initHeaderData();
			this.initData();
			this.getCateListData();
			this.getpageCateListData();
		}
	}

</script>
<style type="text/css">
	@import '../style/category.css'
</style>