<template>
	<div>
		<web-head :cart-num="cartNum"></web-head>
		<web-nav></web-nav>
		<web-right-bar></web-right-bar>
		<div class="main">
			<web-banner></web-banner>
			<div class="category wrap">
				<category-recommend-2></category-recommend-2>
				<category-recommend-1></category-recommend-1>
				<category-recommend-3></category-recommend-3>
			</div>
			
		</div>
		<web-foot></web-foot>
	</div>
</template>
<script>
import axios from 'axios'
import webHead from './../components/web/webHead.vue'
import webNav from './../components/web/webNav.vue'
import webRightBar from './../components/web/webRightBar.vue'
import webBanner from './../components/web/webBanner.vue'
import categoryRecommend1 from './../components/web/categoryRecommend1.vue'
import categoryRecommend2 from './../components/web/categoryRecommend2.vue'
import categoryRecommend3 from './../components/web/categoryRecommend3.vue'
import webFoot from './../components/web/webFoot.vue'
import { setStore, getStore } from '../store/storage.js'
export default {
	components:{
        webHead:webHead,
        webNav:webNav,
        webRightBar:webRightBar,
        webBanner:webBanner,
        categoryRecommend1:categoryRecommend1,
        categoryRecommend2:categoryRecommend2,
        categoryRecommend3:categoryRecommend3,
        webFoot:webFoot
    },
    data(){
    	return{
    		cartNum:0,
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
    },
    mounted(){
    	this.initHeaderData();
    }
}
</script>
<style>
	@import './../style/commom.css'
	
</style>