<template>
	<ul>
		<li class="category-recommend-3"  v-for="(id,index) in categoryIDs">
			<div class="category-title">
				<p>{{ categoryTitles[index] }}</p>
				<router-link 
						:to="{ name:'category',
						   query:{categoryId:categoryIDs[index]}
						}" >
						查看全部 &gt;
				</router-link>
			</div>
			<ul class="category-list clearfix">
				<li class="category-brand">
					<router-link 
						:to="{ name:'category',
						   query:{categoryId:categoryIDs[index]}
						}" >
						<i><img :src="imgs[index]" alt=""></i>
						<span>{{infos[index]}}</span>
					</router-link>
				</li>
				<li v-for="(j,k) in recommendList[index]" :key="j.id" >
					
					<router-link :to="{
						name:'products',
						params:{id:j.ID}
					}" >
						<i><img :src="j.mainImage[0]"></i>
						<dl>
							<dt>{{j.title}}</dt>
							<dd>￥{{j.price}}</dd>
						</dl>
					</router-link>
				</li>
			</ul>
		</li>
	</ul>
</template>

<script>
	import axios from 'axios'
	import { setStore, getStore } from '../../store/storage.js'

	export default{
		data(){
			return{
				categoryIDs:[],
				categoryTitles:[],
				infos:[],
				imgs:[],
				recommendList:[]
			}
		},
		computed:{
			getRecommendData:function(){
	    		// this.$store.commit('GET_RECOMMEND_DATA')
	    		let recommendData = JSON.parse( getStore('recommendData') )

	    		this.categoryIDs = recommendData.categoryID
				this.categoryTitles = recommendData.categoryTitle
				this.infos = recommendData.info
				this.imgs = recommendData.img
	    	},
	    	getRecommendList:function(){
	    		// this.$store.commit('GET_PRODUCTSLIST')
	    		// this.$store.commit('GET_RECOMMEND_LIST');
	    		this.recommendList = JSON.parse( getStore("recommendList") )
	    	}
		},  
		created(){
			if( !getStore('recommendData') ){
				this.$store.commit('GET_RECOMMEND_DATA')
			}
			if( !getStore('productsList') ){
				this.$store.commit('GET_PRODUCTSLIST')
			}
			if( !getStore('recommendList') ){
				this.$store.commit('GET_RECOMMEND_LIST')
			}
	    	this.getRecommendData;
	    	this.getRecommendList;
	    }
	}
</script>

<style type="text/css">

	/*模块三样式*/
.category-recommend-3 {
	max-height: 627px;
	margin-top:40px;
}
.category-title {
    margin-bottom: 20px;
    overflow: hidden;
}

.category-title p {
	line-height: 24px;
    color: #333;
    font-size: 24px;
}

.category-title a {
   float: right;
    color: #333;
    font-size: 16px;
}
.category-title p{
	float: left;
}
.category-title a{
	float: right;
	color:#333;
}

.category-list {
	width: 1095px;
}

.category-list li {
    float: left;
    margin: 0 15px 15px 0;
}
.category-list a {
    display: block;
    width: 204px;
    text-align: center;
    height: 284px;
    background: #fff;
    transition: box-shadow 0.5s ease-in-out 0s;
}

.category-list a:hover {
	box-shadow: 0 1px 10px 4px rgba(0,0,0,.05);
}

.category-list i {
	display: inline-block;
    width:204px;
    height:204px;
    overflow: hidden;

}

.category-list img {
    width: 100%;
    transition: transform 0.5s ease-in-out 0s;
}

.category-list a:hover img{
    transform: scale3d(1.03,1.03,1);
}

.category-brand span {
    display: block;
    line-height: 76px;
    font-size: 20px;
    font-weight: normal;
    color: #333;
}
.category-brand a {
    width: 423px;
}

.category-brand i {
    width: 423px;
    height: 204px;
    overflow: hidden;
    position: relative;
}
.category-brand img {
	width:600px;
	height:208px;
	position: absolute;
	left:50%;
	margin-left:-300px;
	
	
}
.category-list dl {
    height: 74px;

}

.category-list dt {
    color: #333;
    font-size: 16px;
    text-align: center;
	padding-top:14px;
}
.category-list dd {
    color: #ff3333;
    font-size: 16px;
    text-align: center;
	padding-top:6px;

}

</style>