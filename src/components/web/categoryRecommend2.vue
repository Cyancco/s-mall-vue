<template>
	<div class="category-recommend-2">
		<ul class="clearfix">
			<li v-for="(item,index) in adImgs">
				<a :href="adLinks[index]" target="_blank">
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
			adImgs:[],
			adLinks:[]
		}
	},
	computed:{
		getAdsData:function(){
			let _this = this
			axios.get("../..//static/json/3AdsData.json")
			.then( res => {
				let adsData = res.data;
				_this.adImgs = adsData.src
				_this.adLinks = adsData.link
			})
			.catch( err => {
				console.log(err)
			})
		}
	},
	mounted(){
		this.getAdsData
	}

}
</script>

<style type="text/css">
	.category-recommend-2{
		margin-top:40px;
	}
	.category-recommend-2 ul {
		width: 1095px;
	}

	.category-recommend-2 li {
		float: left;
		margin-right: 15px;
	}

	.category-recommend-2 a {
		display: block;
		width: 350px;
	    height: 220px;
	    transition: box-shadow 0.5s ease;
	}

	.category-recommend-2 a:hover {
		box-shadow: 0 1px 10px 4px rgba(0,0,0,0.08);
	}
	.category-recommend-2 img {
	    width: 350px;
	    height: 220px;
	}
</style>