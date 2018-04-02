<template>
	<div>
		<div class="account-header">
			<div class="wrap">
				<router-link to="/home"  class="nav-logo"></router-link>
				<p>欢迎来到什麼，请
					<router-link to="/login">登录</router-link>
					|
					<router-link to="/regist">注册</router-link>
				</p>
			</div>
		</div>
		<div class="account-wrap">
			<div class="account-head">
				<b></b>
				用户登录
				<i :class="{'actived':pswActived}"  @click="pswActived=!pswActived">密码登陆</i>
				<i :class="{'actived':!pswActived}" @click="pswActived=!pswActived">短信登录</i>
			</div>
			<div class="account-main">
				<label class="userName">
					<input type="text" v-model.trim="userName" placeholder="请输入手机号" :class="{'inputError':!checkedName}" @blur="checkName" autofocus>
					<i>{{nameTips}}</i>
				</label>
				<label class="psw" v-show="pswActived">
					<input type="password" v-model.trim="password" placeholder="请输入您的密码" 
							:class="{'inputError':!checkedPsw}" @blur="checkPsw">
					<i>{{pswTips}}</i>
				</label>
				<label class="auto" v-show="pswActived">
					<b :class="{'checked':autoLogin}" @click="autoLogin=!autoLogin"></b>
					<span @click="autoLogin=!autoLogin">下次自动登录</span>
					<a>忘记密码</a>
				</label>
				<label class="smsCode" v-show="!pswActived">
					<input type="text" v-model.trim="smsCode" placeholder="请输入短信验证码" :class="{'inputError':!checkedSms}" @blur="checkSms">
					<span :class="{'sent':isSent}" @click="sentCode">{{getSms}}</span>
					<i>{{smsTips}}</i>
				</label>
				<label v-show="!pswActived"></label>
				<div class="btn" @click="checkLogin">登录<div class="loginFalseTips" v-if="isLoginFalse">{{loginTips}}</div></div>
				
			</div>
			<div class="account-foot">
				<span>使用第三方账号登录：</span>
				<b class="wx-login"></b>
				<b class="qq-login"></b>
				<span class="caution">
					<b></b>
					什麼不会以任何理由要求您转账汇款，谨防诈骗
				</span>
			</div>
		</div>
		<web-foot></web-foot>
	</div>
</template>
<script>
	import webFoot from './../components/web/webFoot.vue'
	import { setStore, getStore } from '../store/storage.js'
	export default {
		components:{
			webFoot:webFoot
		},
		data(){
			return{
				userName:null,
				password:null,
				smsCode:null,
				checkedName:true,
				checkedPsw:true,
				checkedSms:true,
				nameTips:"",
				pswTips:"",
				smsTips:"",
				autoLogin:false,
				pswActived:true,
				getSms:"获取验证码",
				isSent:false,
				loginTips:"登录失败",
				isLoginFalse:null,
			}
		},
		methods:{
			checkName:function(){
				let phoneReg=/^[1][3,4,5,7,8][0-9]{9}$/;
				if( this.userName ==""){
					this.checkedName = false;
					this.nameTips = "请输入手机号"
				}else if( phoneReg.test(this.userName) ){
					this.checkedName = true;
				}else{
					this.checkedName = false;
					this.nameTips = "手机号码错误"
				}
			},
			checkPsw:function(){
				let _this = this;
				_this.checkedPsw = false;
				let pswReg = /^\w{6,16}$/;
				if( _this.password ==""){
					_this.checkedPsw = false;
					_this.pswTips = "请输入密码"
				}else if( pswReg.test(_this.password ) ){
					_this.checkedPsw = true;
				}else{
					_this.checkedPsw = false;
					_this.pswTips = "请输入6-16位登录密码，密码只能是字母、数字、下划线"
				}
			},
			sentCode:function(){
				if( this.pswActived == false && this.checkedName ){
					this.isSent=true;
					let timeCount = 60;
					let _this = this;
					let timer = setInterval(function(){
						if( timeCount<= 0 ){
							clearInterval(timer)
							_this.getSms = "获取验证码"
							_this.isSent=false;
						}else{
							timeCount--;
							_this.getSms = "重新验证("+timeCount+"s)";
						}
					},1000)
				}
			},
			checkSms:function(){
				let _this = this;
				_this.checkedSms = false;
				if( _this.smsCode ==""){
					_this.checkedSms = false;
					_this.smsTips = "请输入短信验证码"
				}else if( _this.smsCode == "1234" ){
					_this.checkedSms = true;
				}else{
					_this.checkedSms = false;
					_this.smsTips = "验证码有误，试试1234"
				}
			},
			checkLogin:function(){
				let _this = this;
				//如果是密码登录模式，且输入号码无误，且密码格式无误
				if(_this.pswActived && _this.checkedName && _this.checkedPsw ){
					//验证过程
					_this.$store.commit("LOGIN_CHECK_PSW",{name:_this.userName,pass:_this.password})
					if( getStore('isLogin' ) == "true" ){
						_this.$router.push({path:'/home'})
					}else{
						_this.isLoginFalse=true
					}
				}
				//如果是短信验证码登录模式，且输入号码无误，且验证码无误
				else if(!_this.pswActived && _this.checkedName && _this.checkedSms){
					_this.$store.commit("LOGIN_CHECK_SMS",{name:_this.userName,sms:_this.smsCode})
					if( getStore('isLogin' ) == "true" ){
						_this.$router.go(-1)
					}else{
						_this.isLoginFalse=true
					}
				}else{
					_this.checkName();
					_this.checkPsw();
					_this.checkSms();
				}
			}
		},
		mounted(){
			this.$store.commit("INIT_USER");
		}
	}
</script>
<style>
@import './../style/account.css'
</style>