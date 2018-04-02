<template>
	<div>
		<web-head :cart-num="cartNum"></web-head>
		<shop-nav></shop-nav>
		<article class="shopcar-logout"  v-if="!isLogin">
			<i><img src="../../static/img/shoppingcart.png"></i>
			您的购物车还是空的，<router-link to="/login">登录</router-link>后，将显示您之前加入的商品。<br/>
			<router-link to="/home"><b>马上购物</b></router-link>
		</article>
		<article class="shopcar-box wrap" v-if="isLogin">
			<div class="shopcar-box-header">购物车</div>
			<div class="shopcar-box-main">
				<p class="select-top">
					<span class="goods-select">
						<i :class="{
							'select-btn':isSelectAll,
							'checked-btn':!isSelectAll
						}" @click="allCheckedFun()"></i>
						<b>全选</b>
					</span>
					<span class="goods-info">商品信息</span>
					<span class="goods-unitPrice">单价</span>
					<span class="goods-count">数量</span>
					<span class="goods-subTotal">小计</span>
					<span class="goods-ctrl">操作</span>
				</p>
				<ul class="all-list">
					<li class="goods-table" v-for="(goods,index) in goodsList">
						<span class="goods-select">
							<i :class="{
							'select-btn':goods.isSelected,
							'checked-btn':!goods.isSelected
							}" @click="unitCheckedFun(goods)"></i>
							<b>
								<router-link :to="{name:'products',params:{id:goods.ID}}">
									<img :src="goods.img">
								</router-link>
							</b>
						</span>
						<span class="goods-info">
							<dl>
								<router-link :to="{name:'products',params:{id:goods.ID}}">
									<dt>{{goods.title}}</dt>
								</router-link>
								<dd>{{goods.color}}</dd>
								<dd>{{goods.size}}</dd>
							</dl>
						</span>
						<span class="goods-unitPrice">{{goods.price|formatMoney}}</span>
						<span class="goods-count">
							<dl>
								<input type="text" v-model="goods.quantity" disabled/>
								<!-- <dt v-model=""></dt> -->
								<dd class="count-minus" @click="count(goods,-1)">-</dd>
								<dd class="count-add" @click="count(goods,+1)">+</dd>
							</dl>
						</span>
						<input class="goods-subTotal" type="text" v-bind:value="goods.subTotal|formatMoney" disabled />
						<span class="goods-ctrl" @click="deleteGoods(index)"></span>
					</li>
				</ul>
				<p class="select-bottom">
					<span class="goods-select">
						<i :class="{
							'select-btn':isSelectAll,
							'checked-btn':!isSelectAll
						}" @click="allCheckedFun()"></i>
						<b>全选</b>
						<a @click="deleteSelected()">删除</a>
					</span>
					<span class="price-total">
						商品总价：
						<input type="text" class="fitWidth" v-bind:value="total|formatMoney" disabled/>
					</span>
					<span class="all-count">
						商品总数
						<input type="text" class="fitWidth" v-model="totalCount" disabled/>
						件
					</span>
				</p>
			</div>
			<div class="shopcar-box-footer">
				<router-link to="/home" id="goOnShop">继续购物</router-link>
				<a id="checkOut" @click="checkOut()">结算</a>
				<span class="price-total">
					合计：
					<input type="text" class="fitWidth" v-bind:value="total|formatMoney" disabled/>
				</span>
			</div>
		</article>
		<web-foot></web-foot>
	</div>
</template>

<script type="text/javascript">
	import webHead from '../components/web/webHead.vue'
	import webFoot from '../components/web/webFoot.vue'
	import shopNav from '../components/web/shopNav.vue'

	import { setStore, getStore } from '../store/storage.js'

	export default {
		components:{
			webHead:webHead,
			webFoot:webFoot,
			shopNav:shopNav
		},
		data(){
			return{
				isLogin:null,
				loginUser:{},
				isSelectAll:true,
				goodsList:[],
				total:0,
				totalCount:0,

				cartNum:0,
			}
		},
		filters:{
			formatMoney:function(value){
				return "￥"+value;
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
				this.isLogin = JSON.parse( getStore('isLogin'));
				if( this.isLogin ){
					this.loginUser = JSON.parse(getStore('loginUser'));
					this.goodsList = this.loginUser.shopcarsList;
					
					if( this.isSelectAll == true ){
						for(let i=0; i<this.goodsList.length ; i++ ){
							this.goodsList[i].isSelected = true;
						}
					}else if( this.isSelectAll == false ){
						for(let i=0; i<this.goodsList.length ; i++ ){
							this.goodsList[i].isSelected = false;
						}
					}
					this.allCount();
					this.inputWidthfitContent();
				}
			},
			/*input 宽度自适应内容*/
			inputWidthfitContent:function(){
				let input = document.getElementsByClassName("fitWidth");
				for( let i=0; i<input.length; i++ ){
					input[i].style.width=input[i].scrollWidth+"px";
				}
			},
			allCount:function(){
				let _this = this;
				this.totalCount = 0;
				this.total = 0;
				for(let i=0; i<this.goodsList.length ; i++ ){
					if(_this.goodsList[i].isSelected == true ){
						_this.totalCount += parseInt( _this.goodsList[i].quantity );
						_this.total += parseInt( _this.goodsList[i].subTotal );
					}
				}
			},
			count:function(goods,type){
				if( type == "-1" ){ //减数量
					goods.quantity--;
					if(goods.quantity<=1){
						goods.quantity=1;
					}
					goods.subTotal = goods.price*goods.quantity;
					this.allCount();
					this.inputWidthfitContent();
				}else if( type == "+1" ){//加数量
					goods.quantity++;
					if(goods.quantity>=goods.stock){
						goods.quantity=goods.stock;
					}
					goods.subTotal = goods.price*goods.quantity;
					this.allCount();
					this.inputWidthfitContent();
				}
				setStore('loginUser',JSON.stringify(this.loginUser));
			},
			unitCheckedFun:function(goods){
				goods.isSelected=!goods.isSelected;
				for(let i=0; i<this.goodsList.length ; i++ ){
					if( this.goodsList[i].isSelected != true){
						// console.log("有一个不为真")
						this.isSelectAll = false;
						this.allCount();
						return
					}
				}
				// console.log("全部为真")
				this.isSelectAll = true;
				this.allCount();
			},
			allCheckedFun:function(){
				this.isSelectAll= !this.isSelectAll;
				if( this.isSelectAll == true ){
					for(let i=0; i<this.goodsList.length ; i++ ){
						this.goodsList[i].isSelected = true;
					}
				}else if( this.isSelectAll == false ){
					for(let i=0; i<this.goodsList.length ; i++ ){
						this.goodsList[i].isSelected = false;
					}
				}
				this.allCount();
			},
			deleteGoods:function(index){
				this.goodsList.splice(index,1)
				this.allCount();
				setStore('loginUser',JSON.stringify(this.loginUser));
			},
			deleteSelected:function(){
				this.goodsList = this.goodsList.filter( item =>{
					if( item.isSelected==true ){
						return false;
					}else{
						return true;
					}
				})
				this.loginUser.shopcarsList = this.goodsList;
				this.allCount();
				setStore('loginUser',JSON.stringify(this.loginUser));
			},
			checkOut:function(){
				//把选中的商品 加入确认订单列表
				let confirmOrderList = this.goodsList.filter( item =>{
					if( item.isSelected==false ){
						return false;
					}else{
						return true;
					}
				})
				//把选中的商品移除出购物车列表 
				//this.deleteSelected();//等确认订单后再删除
				//把确认订单列表 存入localStorage
				let confirmOrder={};
				confirmOrder.list = confirmOrderList;
				setStore('confirmOrder', JSON.stringify(confirmOrder) )
				this.loginUser.shopcarsList = this.goodsList;
				setStore('loginUser',JSON.stringify(this.loginUser));
				//路由跳转
				this.$router.push({path:'/order/confirm'} )
			}
		},
		mounted(){
			this.initHeaderData();
			this.initData();
		}
	}
</script>

<style type="text/css">
	@import '../style/shopcars.css'
</style>

