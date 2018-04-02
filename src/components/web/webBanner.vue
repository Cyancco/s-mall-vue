<template>
	<div>
		<div class="banner">
			<div class="banner-slider"  @mouseover="stop()" @mouseout="move()">
				 <transition-group tag="ul" name="image">  
				    <li v-for="(img, index) in imgArray" v-show="index===cur" :key="index">
				    	<router-link to="/home">
				    		<img :src='img'>
				    	</router-link>
				    </li>
				</transition-group>  
				<span class="slider-left" @click="prev()"></span>
				<span class="slider-right" @click="next()"></span>
			</div>
			<nav-menu></nav-menu>
			<ol class="banner-item">
				<li v-for="(item,index) in imgArray" :class="{'item-active':index===cur }" @click="change(index)" :key='index'></li>
			</ol>
		</div>
		<!-- 专题文章部分 -->
		<div class="article">
			<a target="_blank" href="">
				<img src="../../images/shenmeshuo.png">
				<span>开工大吉！一句话形容过完年的你……</span>
				<i>2018-02-22</i>
				<i>老麽</i>
			</a>
		</div>
		<!-- 轮播图及下方图文说明部分 结束 -->
	</div>
</template>


<script>
import navMenu from './../web/navMenu.vue'
export default {
	components:{
        navMenu:navMenu
    },
    data(){
    	return{
    		timer:null,
    		cur:0,
    		imgArray:[
    			'../../../static/img/banner1.jpg',
    			'../../../static/img/banner2.jpg',
    			'../../../static/img/banner3.jpg',
    			'../../../static/img/banner4.jpg',
    			'../../../static/img/banner5.jpg',
    			'../../../static/img/banner6.jpg'
    		]
    	}
    },
    methods:{
    	autoPlay(){
    		this.cur++;
    		if(this.cur == 6 ){
    			this.cur = 0;
    		}
    	},
    	play(){
    		this.timer = setInterval(this.autoPlay,2500)
    	},
    	change(i){
    		this.cur = i;
    	},
    	stop(){
    		clearInterval( this.timer )
    	},
    	move(){
    		this.timer = setInterval(this.autoPlay,2500)
    	},
    	next(){
    		this.cur++;
    		if(this.cur == 6 ){
    			this.cur = 0;
    		}
    	},
    	prev(){
    		if(this.cur ==0 ){
    			this.cur = 6;
    		}
    		this.cur--;
    	}
    },
    created(){
    	this.play()
    }
}


</script>


<style>
/*轮播图样式*/
.banner {
	position: relative;
    width: 1080px;
    margin: 10px auto 0;
    background: #fff;
}
.banner-slider {
    position: relative;
}
.banner-slider > ul {
    height: 360px;
}

.banner-slider li {
    position: absolute;
    top: 0;
    left: 0;
 
}
.banner-slider a {
	display: block;
}
.banner-slider img {
    width: 1080px;
    height: 360px;
}
.banner-slider span {
	position: absolute;
	top: 50%;
	left: 220px;
	display: none;
	width: 48px;
	height: 48px;
	margin-top: -24px;
	border-radius: 2px;
	background: url(../../images/sprite.png);
	background-position: -250px -300px;
	cursor: pointer;
}
.banner-slider:hover span {
	display: block;
}

.banner-slider .slider-right {
	left: inherit;
	right: 20px;
	background: url(../../images/sprite.png);
	background-position: -200px -300px;
}
.banner-item {
	position: absolute;
	bottom: 20px;
	right: 0;
	width: 880px;
	text-align: center;
}

.banner-item li {
	position: relative;
	display: inline-block;
	height: 10px;
	width: 10px;
	margin: 0 6px;
	border-radius: 50%;
	border: 2px solid #523669;
	cursor: pointer;
	border-color: #ccc\9;
	background: #ccc\9;
}

.banner-item li.item-active {
	background: #f7b200;
	border: 2px solid #f7b200;
}
/*文章样式*/
.article {
    width: 1080px;
    margin: 0 auto;
}

.article a {
	display: block;
    line-height: 56px;
    font-size: 16px;
    color: #333;
    background: #fff;
}

.article img {
    width: 100px;
    margin: 0 48px;
    vertical-align: middle;
}

.article span {
	display: inline-block;
	height: 21px;
    padding-left: 20px;
    border-left: 1px solid #ccc;
    font-size: 16px;
    line-height: 21px;
    vertical-align: middle;
}

.article i {
    float: right;
    margin-right: 20px;
}

.image-enter-active {  
    opacity: 0;
    transition: all 1s ease;  
  }  
  .image-leave-active {  
    opacity: 1;
    transition: all 1s ease;  
  }  
  .image-enter-to {  
    opacity: 1; 
  }  
  .image-leave-to {  
    opacity: 0;
  }  


</style>