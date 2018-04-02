<template>
	<div class="shopcar-nav">
		<div class="wrap">
			<a href="../index.html">
				<img src="../../../static/img/logo.png" alt="什麼商城">
			</a>
			<ul :class="{'step-one':isStepOne,'step-two':isStepTwo,'step-three':isStepThree,'step-four':isStepFour}" v-if="isLogin">
				<li>1<i>查看购物车</i></li>
				<li>2<i>确认订单信息</i></li>
				<li>3<i>在线付款</i></li>
				<li>4<i>收货并评价</i></li>
				<b></b>
				<em></em>
			</ul>
		</div>
	</div>
</template>

<script type="text/javascript">
	import { setStore, getStore } from '../../store/storage.js'
	export default {
		data(){
			return{
				isStepOne:false,
				isStepTwo:false,
				isStepThree:false,
				isStepFour:false,
				isLogin:true
			}
		},
		methods:{
			init:function(){
				let _this = this;
				this.isLogin = JSON.parse( getStore("isLogin") == "true" );
				// console.log( this.$route )
				if( this.$route.path=="/shopCars"){
					_this.isStepOne = true;
					_this.isStepTwo = false;
					_this.isStepThree = false;
					_this.isStepFour = false;
				}
				if( this.$route.path=="/order/confirm"){
					_this.isStepOne = false;
					_this.isStepTwo = true;
					_this.isStepThree = false;
					_this.isStepFour = false;
				} 
				if( this.$route.path=="/order/charge"){
					_this.isStepOne = false;
					_this.isStepTwo = false;
					_this.isStepThree = true;
					_this.isStepFour = false;
				} 
				if( this.$route.path=="/order/receipt"){
					_this.isStepOne = false;
					_this.isStepTwo = false;
					_this.isStepThree = false;
					_this.isStepFour = true;
				} 
			}
		},
		mounted(){
			this.init();
		}
	}
</script>

<style type="text/css">
	.shopcar-nav
	{   
	    position: absolute;
	    top:30px;
	    width:100%;
	    height: 98px;
	    background-color: #f9f9f9;
	    border-bottom: 1px solid #ccc;
	}
	.shopcar-nav a
	{
	    line-height: 98px;

	    display: block;
	    float: left;
	}
	.shopcar-nav ul
	{
	    position: relative;

	    float: right;

	    width: 480px;
	    height: 40px;
	    margin-top: 30px;
	}
	.shopcar-nav ul li
	{
	    line-height: 20px;

	    position: relative;
	    z-index: 3;

	    float: left;

	    width: 20px;
	    height: 20px;
	    margin: 0 50px;
	    
	    text-align: center;

	    color:#fff;
	    border-radius: 50%;
	    background-color: #d4ccd9;
	}

	.shopcar-nav ul li i
	{
	    position: absolute;
	    top: 24px;
	    left: 50%;

	    width: 100px;
	    margin-left: -50px;
	    
	    color: #d4ccd9;
	    text-align: center;
	}

	.shopcar-nav ul b
	{
	    position: absolute;
	    z-index:1;
	    top: 7px;
	    left: 0;

	    display: block;

	    width: 480px;
	    height: 6px;

	    border-radius: 3px;
	    background-color: #d4ccd9;
	}
	.shopcar-nav ul em{
	    position: absolute;
	    z-index:2;
	    top: 7px;
	    left: 0;

	    display: block;

	    height: 6px;

	    border-radius: 3px;
	    background-color: #724a87;
	}
	.step-one li:nth-child(1){
	    background-color: #724a87;
	}
	.step-one li:nth-child(1) i{
	    color:  #724a87;
	}
	.step-one em{
	    width: 60px;
	}

	.step-two li:nth-child(1),
	.step-two li:nth-child(2){
	    background-color: #724a87;
	}
	.step-two li:nth-child(1) i,
	.step-two li:nth-child(2) i{
	    color:  #724a87;
	}
	.step-two em{
	    width: 190px;
	}

	.step-three li:nth-child(1),
	.step-three li:nth-child(2),
	.step-three li:nth-child(3){
	    background-color: #724a87;
	}
	.step-three li:nth-child(1) i,
	.step-three li:nth-child(2) i,
	.step-three li:nth-child(3) i,
	{
	    color:  #724a87;
	}
	.step-three em{
	    width: 310px;
	}

	.step-four li
	{
	    background-color: #724a87 !important;
	}
	.step-four li i,
	{
	    color:  #724a87 !important;
	}
	.step-four em{
	    width: 430px;
	}
</style>