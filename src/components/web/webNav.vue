<!--  -->
<template>
	<div class="nav" :class="{'nav-index':isHome,'retract':isRetract}"> <!-- nav-index or retract -->
		<div class="wrap clearfix">
			<router-link to="/home" class="nav-logo"></router-link>
			<div class="nav-category">
				<p><span>全部分类</span><i></i></p>
				<nav-menu class="nave-menu"></nav-menu>
			</div>
			<div class="nav-search">
				<p>
					<input type="text" id="searchInput" placeholder="请输入要搜索的商品"/>
					<span id="searchBtn"></span>
					<ul><li>羽绒服</li><li>雪地靴</li><li>护肤</li><li>羊绒衫</li><li>口罩</li><li>空气净化器</li><li>围巾手套</li><li>茶具</li><li>清洁</li><li>羽绒被</li></ul>
				</p>
				
			</div>
			<div class="nav-tab">
				<div class="wrap">
					<span>
						<i></i>
						<router-link :to="{ name:'category',
						   query:{categoryId:1}
						}">全部分类</router-link>
					</span>
					<ul>
						<li>
							<router-link to="/home">精选专题</router-link>
						</li>
						<li class="nav-tab-last">
							<router-link to="/home">每日上新</router-link>
						</li>
					</ul>
				</div>
			</div>
		</div>
	</div>
</template>
<!--  -->
<script>
import navMenu from './../web/navMenu.vue'
export default {
	data(){
		return{
			isHome:true,
			isRetract:false,
		}
	},
	components:{
        navMenu:navMenu,
    },
    methods:{
    	onScroll:function(){
    		let _this = this;
    		let h = 600;
    		let scrollTop = window.pageYOffset||document.body.scrollTop||document.documentElement.scrollTop;
    		let Nav = document.getElementsByClassName("nav")[0];

    		if( scrollTop < h ){
    			_this.isRetract = false;
    		}else if( scrollTop >= h ){
    			_this.isRetract = true;
    			Nav.style.top =""
    		}
    	}
    },
    mounted(){
    	if( this.$route.name != "products"){
    		window.addEventListener('scroll', this.onScroll)
    	}
	    if ( this.$route.name == "home" ){
	    	this.isHome = true
	    }else{
	    	this.isHome = false
	    }
    },
     destroyed(){
    	window.removeEventListener('scroll', this.onScroll )
    }
}
</script>
<style> 
.nav {
	position: absolute;
	left:0;
	top:30px;
	z-index: 110;
	background-color: #fff;
	width:100%;
	height:fit-content;
	box-shadow: 0 2px 4px rgba(0,0,0,0.08);
}

.nav-logo{
	width:240px;
	height:98px;
	float: left;
	background: url(../../images/sprite.png) no-repeat;
	background-position:0px -131px;
}
.nav-category{
	position: relative;
	float: left;
	display: none;
}
.nav-search{
	position: relative;
	float: right;
	line-height: 98px;	
}

.nav-tab{
	display: none;
}

.nav-search>p{
	display: inline-block;
	vertical-align: middle;
	zoom: 1; /* Fix for IE7 */
	*display: inline; /* Fix for IE7 */
	z-index:5;
	width:308px;
	height:38px;
	border:1px solid #ccc;
	border-radius: 3px;
	line-height:38px; 
}
.nav-search input{
	display: inline-block;
	vertical-align: middle;
	zoom: 1; /* Fix for IE7 */
	*display: inline; /* Fix for IE7 */
	width:248px;
	height:38px;
	padding:0 10px;
	color:#333;
	font-size: 16px;
	border:none;
	outline: none;
	float: left;
	background-color: #fff;
}
.nav-search span{
	display: inline-block;
	vertical-align: middle;
	width:39px;
	height:38px;
	border-left: 1px solid #ccc;
	background: url(../../images/sprite.png);
	background-position: 0px -40px;
	cursor: pointer;
	float: right;
}
#searchInput:focus~ul{
	display: block;
}
.nav-search ul{
	display:none;
	position: absolute;
	z-index:1;
	top:50%;
	margin-top:22px;
	padding:10px 0px;
	width:268px;
	background-color: #fff;
	border-radius: 3px;
	box-shadow: 0px 1px 10px 4px rgba(0,0,0,0.08);
}
.nav-search li{
	z-index:1;
	line-height: 32px;
	padding-left:10px;
	font-size: 12px;
	color: #333;
	cursor: pointer;
}
.nav-search li:hover{
	background: #f0f0f0;
}
.nav-index .nav-search p{
	width:540px;
}
.nav-index .nav-search ul{
	display: block;
	width:100%;
	box-shadow: none;
}
.nav-index .nav-search ul li{
	float: left;
}
.nav-index .nav-search ul li:hover{
	background-color: #fff;
	color:#f7b200;
}
div.retract {
	position: fixed;
	top:0px;
	-webkit-animation: toTop 0.3s ease;
	animation: toTop 0.3s ease;
}
@-webkit-keyframes toTop {
	0%{ top:-98px }
	100%{ top:0px; }
}
@keyframes toTop {
	0%{ top:-98px }
	100%{ top:0px; }
}
.retract .nav-logo {
	display: none;
}
.retract .nav-category {
	display: block;
}
.retract .nav-search {
	line-height: 60px;
}
.retract .nav-tab {
	display: none !important;
}
.retract .nav-search p{
	width:308px !important;
}
.retract .nav-search ul{
	display: none ;
	width: 268px ;
	box-shadow: 0px 1px 10px 4px rgba(0,0,0,0.08) ！important;
}
.retract .nav-search ul li{
	float: none;
}
.retract .nav-search ul li:hover{
	background-color: #f0f0f0;
	color:#333;
}
.nav-category>p{
	height:60px;
	line-height:60px;
	cursor: pointer;
}
.nav-category>p span{
	color: #808080;
	font-size:16px;
}
.nav-category:hover > p span {
	color: #333;
}
.nav-category>p i{
	display: inline-block;
	width:15px;
	height:8px;
	margin-left: 10px;
	background: url(../../images/sprite.png);
	background-position: -0px -120px;
}
.nav-category:hover > p i{
	background: url(../../images/sprite.png);
	background-position: -30px -120px;
}
.nav-category>div{
	display: none;
}
.nav-category:hover > div {
	position: absolute;
	left:0;
	top:60px;
	display: block;
}
.nav-index .nav-tab{
	display: block;
	position: absolute;
	top:98px;
	left:0;
	width:100%;
	height:47px;
	background-color: #fff;
	box-shadow: 0 2px 4px rgba(0,0,0,0.08);

}
.nav-tab span{
	float: left;
	width:180px;
	height:47px;
	padding-left:20px;
	line-height: 47px;
	background-color: #f2f2f2;
	color:#333;
	font-size:16px;
}
.nav-tab i{
	display: inline-block;
	width:15px;
	height:12px;
	margin-right: 10px;
	background: url(../../images/sprite.png);
	background-position: 0px -90px;
}
.nav-tab ul{
	float: left;
	height:40px;
	line-height: 47px;
}
.nav-tab li{
	display: inline-block;
	height:16px;
	padding:0 30px;
	border-right:1px solid #ccc;
	line-height: 16px;
	font-size:16px;	
	cursor: pointer;	
}
.nav-tab .nav-tab-last{
	border:0;
}
.nav-tab a{
	color: #333;
}
.nav-tab span a:hover{
	color:#333;
}
.nav-tab a:hover{
	color:#f7b200;
}
.retract .nav-logo{
	display: none;
}



</style>
