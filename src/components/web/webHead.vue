<template>
	<div class="header" :class="{'header-index':isHome}">
		<div class="wrap">
			<ul class="header-nav">
				<li>
					<router-link to="/home">首页</router-link>
					<b></b>
				</li>
				<li>
					<router-link to="/home">平台政策</router-link>
				</li>
			</ul>
			<ul class="header-user">
				<li class="user-out" v-if="!isLogin">
					<router-link to="/login" class="user-login">登录</router-link>
					<router-link to="/regist">注册</router-link>
					<b></b>
				</li>
				<li class="user-center" v-if="isLogin">
					<router-link to="/home">
						<input type="text" v-model="nickName" class="nickName" disabled>
						<span></span>
					</router-link>
					<div>
						<i></i>
						<ul>
							<li><router-link to="/home">我的订单</router-link></li>
							<li><router-link to="/home">个人中心</router-link></li>
							<li><a @click="logOut">退出登录</a></li>
						</ul>
					</div>
					<b></b>
				</li>
				<li class="user-app">
					<a href="javascript:void(0)">下载什麼APP</a>
					<div>
						<i></i>
						<dl>
							<dt></dt>
							<dd>
								<span>买大牌制造商产品</span>
								<h6 style="font-weight:normal">上什麼</h6>
								<p></p>
							</dd>
						</dl>
					</div>
					<b></b>
				</li>
				<li class="user-msg">
					<a href="javascript:void(0)" class="msg-center">
						<i id="hasMsg" v-show="hasUnRead"></i>
						<span class="msg-title">消息中心</span>
						<input type="text" v-model="msgNum" class="input-disabled" disabled>
					</a>
				</li>
				<li class="user-shopCar">
					<router-link to="/shopCars">
						购物车
						<input type="text" v-model="cartNum" class="input-disabled" disabled>
					</router-link>
				</li>
			</ul>
		</div>
	</div>
</template>
<script>
import { setStore, getStore } from '../../store/storage.js'

	export default{
		props:{
			cartNum:Number,
		},
		data(){
			return{
				isLogin:null,
				nickName:"",
				hasUnRead:null,
				msgNum:null,
				// cartNum:0,
				isHome:true,
			}
		},
		methods:{
			initData:function(){
				if( !getStore('users') ){
					this.$store.commit('INIT_USER')
				}
				let _this = this;
				if(getStore('isLogin') == "false"){
					_this.isLogin = false;
					_this.msgNum = 0;
					_this.cartNum = 0;
				}else if( getStore('isLogin') == "true" ){
					_this.isLogin = true;
					let loginUser = JSON.parse( getStore('loginUser'))
					//显示帐号昵称
					if( loginUser.nickName == undefined ){
						loginUser.nickName = "请尽快修改昵称";
						/*同步到localStorage*/
						setStore('loginUser',JSON.stringify(loginUser) )
						/*是否要设置到 this.$store.state*/
					}
					_this.nickName = JSON.parse( getStore('loginUser')).nickName;
					//显示消息数量
					if( loginUser.message == undefined ){
						loginUser.message = [];
						/*同步到localStorage*/
						setStore('loginUser',JSON.stringify(loginUser) )
						/*是否要设置到 this.$store.state*/
					}
					_this.msgNum = JSON.parse( getStore('loginUser')).message.length;
					//显示购物车数量
					if( loginUser.shopcarsList == undefined ){
						loginUser.shopcarsList=[];
						/*同步到localStorage*/
						setStore('loginUser',JSON.stringify(loginUser) )
						/*是否要设置到 this.$store.state*/
					}
					// _this.cartNum = loginUser.shopcarsList.length;
					// console.log( this.$store.getters.cartNum )
					// _this.cartNum = this.$store.state.loginUser.shopcarsList.length;
					/*把商品加入购物车，不能实时更新，必须刷新后才更新*/
					// _this.cartNum = JSON.parse( getStore('loginUser')).shopcarsList.length;
				}
			},
			logOut:function(){
				this.isLogin = false;
				this.$store.commit('LOGIN_OUT');
				this.msgNum = 0;
				// this.cartNum = 0;
			},
		},
		watcher:{
			// cartNumAdd:function(val,oldVal){
			// 	console.log('watch the cartNumAdd new value : '+val);
			// 	this.cartNum = this.cartNumAdd;
			// }
			
		},
		mounted(){
			this.initData();
			// this.addCartNumber;
			if ( this.$route.name == "home" ){
		    	this.isHome = true
		    }else{
		    	this.isHome = false
		    }

		}
	}
</script>
<style>
	/*顶部栏*/
	.header{
		width:100%;
		height:30px;
		padding-bottom: 98px;
		background-color: #333;
		font-size:12px;
	}
	.header-index {
		padding-bottom: 145px;
	}

	.header a{
	color: #ccc;
	}
	.header a:hover{
		color: #fff;
	}
	.header b{
		display: inline-block;
		vertical-align: middle;
		width:1px;
		height:11px;
		margin: 0 18px;
		background-color: #cbcbcb;
	}
	.header>div>ul>li {
		float: left;
		height: 30px;
	    line-height: 30px;
	}
	.header-nav{
		float: left;
	}
	/*个人中心*/
	.header-user{
		float: right;
	}
	/*登录*/
	.header-user .user-login{
		margin-right: 20px;
	}
	/*未登录状态*/
	/*个人中心*/
	.header-user .user-center{
		position: relative;
		/*display: none;*/
	}
	.input-disabled{  /* input[type:text]:disabled 样式 */
		color:#ccc;
		width:30px;
		text-align: center;
		border:none;
		background:none;
	}
	.nickName{  /* input[type:text]:disabled 样式 */
		color:#ccc;
		width:100px;
		text-align: right;
		border:none;
		background:none;
	}
	.nickName:hover{
		color:#fff;
	}
	/*下拉箭头*/
	.header-user .user-center span{
		display: inline-block;
		vertical-align: middle;
		width:9px;
		height:5px;
		margin-left:10px;
		background: url(../../images/sprite.png);
		background-position: 0 0;
	}
	.header-user .user-center:hover span{
		background: url(../../images/sprite.png);
		background-position: -9px 0;
	}
	/*下拉弹框*/
	.header-user .user-center div{
		position: absolute;
		top:40px;
		left:0px;
		z-index:115;
		display: none;
	}
	.header-user .user-center:hover div{
		display: block;
	}
	/*向上三角箭头*/
	.user-center i{
		position: absolute;
		top:-15px;
		left:53px;
		z-index: ;
		display: block;
		width:30px;
		height:15px;
		background: url(../../images/sprite.png);
		background-position: -18px 0;
	}
	/*下拉菜单*/
	.header-user .user-center div ul{
		width: 136px;
		padding:10px 0;
		border-radius: 4px;
		background: #fff;
		box-shadow: 0 1px 10px 4px rgba(0,0,0,0.08);
	}
	.header-user .user-center div ul li{
		text-align: center;
	}
	.header-user .user-center div ul li a{
		display: block;
		height: 40px;
		line-height: 40px;
		font-size:16px;
		color: #333;
	}
	.header-user .user-center div ul li a:hover{
		background-color: #f0f0f0;
	}
	/*下载APP*/
	.user-app{
		position: relative;
	}
	.user-app div{
		position: absolute;
		z-index:115;
		top:25px;
		left:-36px;
		display: none;
	}
	.user-app:hover div{
		display: block;
	}
	.user-app i{
		position: relative;
		z-index: 1;
		display: block;
		width:30px;
		height:15px;
		margin: 0 auto;
		background: url(../../images/sprite.png);
		background-position: -18px 0;
	}
	.user-app dl{
		padding:15px 10px 10px;
		border-radius: 4px;
		background-color: #fff;
		box-shadow:0 1px 10px 4px rgba(0,0,0,0.08);
	}
	.user-app dt{
		width: 40px;
		height: 40px;
		margin: 0 auto;
		background: url(../../images/sprite.png);
		background-position: -48px 0;
	}
	.user-app dd{
		margin-top:10px;
		line-height: 24px;
		font-size: 12px;
		color: #523669;
		text-align: center;
	}
	.user-app p{
		width:130px;
		height:130px;
		margin: 10px auto 0;
		background: url(../../images/sprite.png);
		background-position:-88px 0;
	}
	/*消息中心*/
	.user-msg{
		display: inline-block;
	}

	.msg-center{
		display: inline-block;	
		height:30px;
		padding-left: 30px;
		line-height: 30px;
		text-align: center;
		background: url(../../images/sprite.png) no-repeat;
		background-position: -219px 0;
		position: relative;
	}
	#hasMsg{
		display: block;
		width:6px;
		height:6px;
		border-radius: 50%;
		background-color: #f33;
		position: absolute;
		top:6px;
		left:14px;
	}
	.msg-title{
		display: inline-block;
	    width: 52px;
	}
	.msg-center-box{
		position:relative;
		display:none;
	}
	/*购物车*/
	.user-shopCar{
		background-color: #523669;
	}
	.user-shopCar a{
		display: inline-block;
		width:90px;
		padding-left:30px;
		text-align: center;
		background: url(../../images/sprite.png) no-repeat;
		background-position: -221px -30px;

	}
	/*顶部栏结束*/


</style>