<template>
	<div class="category-recommend-1">
		<div class="category-title">
			<p>精选</p>
		</div>
		<!-- <transition-group tag="ul" name="accordion" class="clearfix"> -->
		<ul name="accordion" class="clearfix">
			<li v-for="(item,index) in accordionImgs" 
				v-on:mouseover="accordionOver(index)"
				class="accordionLi press">
				<a :href="accordionLinks[index]" target="_blank">
					<i></i>
					<img :src="item">
				</a>
			</li>
		</ul>
	</div>
</template>

<script type="text/javascript">
import axios from 'axios'
export default{
	data(){
		return{
			accordionImgs:[],
			accordionLinks:[],
			accordionLis:document.getElementsByClassName("accordionLi"),
		}
	},
	computed:{
		getAccordionData:function(){
			let _this = this
			axios.get("../../../static/json/accordionData.json")
			.then( res => {
				let accordionData = res.data;
				_this.accordionImgs = accordionData.src
				_this.accordionLinks = accordionData.link
			})
			.catch( err => {
				console.log(err)
			})
		}
	},
	methods:{
		accordionOver:function(i){
			var _this=this
			var len =  _this.accordionLis.length;
			for(var j=0; j< len ; j++ ){
				_this.accordionLis[j].className="accordionLi press";
			}
			_this.accordionLis[i].className="accordionLi";
			for(var m=0; m<=i ; m++ ){
				_this.accordionMove( _this.accordionLis[m], 92*m )
			}
			for(var n=i+1; n<len ; n++){
				_this.accordionMove( _this.accordionLis[n], 82*(n-1)+620 )
			}
		},
		getStyle:function(obj,name){
			if(obj.currentStyle){
		        return obj.currentStyle[name];
		    }else{
		        return getComputedStyle(obj,false)[name];
		    }
		},
		accordionMove:function(obj,target){
			var _this=this
			clearInterval( obj.timer );
			obj.timer = setInterval(function(){
				var cur = parseInt( _this.getStyle( obj, "left" ) );
				var speed = ( target - cur )/6;
        		speed=speed>0?Math.ceil(speed):Math.floor(speed);
				if( cur == target){
					clearInterval(obj.timer);
				}else{
					obj.style["left"]=cur+speed+'px';
				}
			},30)
		}
		
	},
	mounted(){
		this.getAccordionData;
	}

}
</script>

<style type="text/css">

	.category-recommend-1{
		margin-top:40px;
	}
	.category-title {
		position: relative;
	    margin-bottom: 20px;
	}

	.category-title p {
		line-height: 24px;
	    color: #333;
	    font-size: 24px;
	}
	.category-recommend-1 ul {
	    position: relative;
	    width: 100%;
	    height: 280px;
	    background: #fff;
	    overflow: hidden;
	}

	.category-recommend-1 li {
	    position: absolute;
	    top: 0;
	    left: 0;
	    list-style: none;
	    width: 620px;
	    height: 280px;
	    background: #fff;
	}

	.category-recommend-1 a {
		position: relative;
	    display: block;
	    width: 100%;
	    height: 100%;
	}

	.category-recommend-1 i {
		position: absolute;
		top: 0;
		left: 0;
		display: block;
		width: 100%;
		height: 100%;
	    transition: background 0.5s ease-in-out 0s;
	}

	.category-recommend-1 li.press i {
		background: rgba(0,0,0,.3);
	}

	.category-recommend-1 img {
	    width: 100%;
	    height: 100%;
	}
	
	.accordionLi:nth-child(1){
		left:0px;
	}
	.accordionLi:nth-child(2){
		left:92px;
	}
	.accordionLi:nth-child(3){
		left:184px;
	}
	.accordionLi:nth-child(4){
		left:276px;
	}
	.accordionLi:nth-child(5){
		left:906px;
	}
	.accordionLi:nth-child(6){
		left:998px;
	}

	.accordionLi:not(:first-child){
		padding-left:10px;
	}



</style>