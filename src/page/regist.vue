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
				新用户注册
			</div>
			<div class="account-main">
				<label class="userName">
					<input type="text" v-model.trim="userName" placeholder="请输入手机号" :class="{'inputError':!checkedName}" @blur="checkName">
					<i>{{nameTips}}</i>
				</label>
				<label class="smsCode">
					<input type="text" v-model.trim="smsCode" placeholder="请输入短信验证码" :class="{'inputError':!checkedSms}" @blur="checkSms">
					<span :class="{'sent':isSent}" @click="sentCode">{{getSms}}</span>
					<i>{{smsTips}}</i>
				</label>
				<label class="psw" >
					<input type="password" v-model.trim="inputPassword" placeholder="请输入6-16位登录密码，密码只能是字母、数字、下划线" 
							:class="{'inputError':!checkedInputPsw}" @blur="checkInputPsw">
					<i>{{inputPswTips}}</i>
				</label>
				<label class="psw" >
					<input type="password" v-model.trim="reInputPassword" placeholder="请再次输入登录密码" 
							:class="{'inputError':!reCheckedPsw}" @blur="reCheckPsw">
					<i>{{reInputPswTips}}</i>
				</label>
				<label class="auto">
					<b :class="{'checked':agree}" @click="agree=!agree"></b>
					<span @click="agree=!agree">我已阅读并同意</span>
					<a>《什麼服务协议》</a>
				</label>
				<div class="btn" @click="regist">注册</div>
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
				userName:"",
				smsCode:"",
				inputPassword:"",
				reInputPassword:"",
				checkedName:true,
				checkedSms:true,
				checkedInputPsw:true,
				reCheckedPsw:true,
				nameTips:"",
				smsTips:"",
				inputPswTips:"",
				reInputPswTips:"",
				agree:false,
				getSms:"获取验证码",
				isSent:false,
			}
		},
		methods:{
			checkName:function(){
				let _this=this;
				let phoneReg=/^[1][3,4,5,7,8][0-9]{9}$/;

				let isRegisted;
				let users = getStore('users');
				users.forEach( item =>{
					if(_this.userName == item.userName ){
						isRegisted = true;
					}
				})
				
				if( this.userName ==""){
					this.checkedName = false;
					this.nameTips = "请输入手机号"
					return
				}else if( phoneReg.test(this.userName) && isRegisted ){
					this.checkedName = false;
					this.nameTips = "该号码已被注册";
					return
				}else if( phoneReg.test(this.userName) && !isRegisted ){
					console.log('11111')
					this.checkedName = true;
					return
				}else{
					console.log('22222')
					this.checkedName = false;
					this.nameTips = "您输入的手机号码有误"
					return
				}
			},
			sentCode:function(){
				if( this.checkedName){
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
				if( this.smsCode ==""){
					this.checkedSms = false;
					this.smsTips = "请输入短信验证码"
				}else if( this.smsCode == "1234" ){
					this.checkedSms = true;
				}else{
					this.checkedSms = false;
					this.smsTips = "验证码有误，试试1234"
				}
			},
			checkInputPsw:function(){
				let pswReg = /^\w{6,16}$/;
				if( this.inputPassword == "" ){
					this.checkedInputPsw = false;
					this.inputPswTips = "请输入6-16位登录密码"
				}else if( pswReg.test(this.inputPassword) ){
					this.checkedInputPsw = true;
				}else{
					this.checkedInputPsw = false;
					this.inputPswTips = "密码格式有误";
					this.inputPassword = "";
				}
			},
			reCheckPsw:function(){
				if( this.reInputPassword =="" ){
					this.reCheckedPsw = false;
					this.reInputPswTips = "请再次输入密码";
				}else if( this.reInputPassword == this.inputPassword ){
					this.reCheckedPsw = true;
				}else{
					this.reCheckedPsw = false;
					this.reInputPswTips = "两次密码不一致，请重新输入";
				}
			},
			regist:function(){
				let _this = this;
				if( this.checkedName &&
					this.checkedSms &&
					this.checkedInputPsw &&
					this.reCheckedPsw 
					){
					this.$store.commit('REGIST_USER',{name:_this.userName,pass:_this.reInputPassword,sms:_this.smsCode})
					this.$router.push({path:'/login'})
				}
			}
		},
		mounted(){
			this.$store.commit('INIT_USER')
		}
	}
</script>
<style>
@import './../style/account.css'
</style>