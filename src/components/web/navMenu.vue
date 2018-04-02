<template>
	<div>
		<ul class="nav-list">
			<li class="nav-main" v-for="(item, index) in firstList">
				<p>
				<router-link 
				:to="{ name:'category',
					   query:{categoryId:firstListIDs[index][h]}
					}" 
				v-for="(i,h) in item" 
				:key="item.id">
					{{i}}
				</router-link>
				</p>
				<ul>
					<li class="nav-sub clearfix" v-for="(j,k) in secondList[index]">
						<router-link :to="{name:'category',query:{categoryId:secondListIDs[index][k]}}" >{{j}}</router-link>
						<i>&gt;</i>
						<ul>
							<li class="nav-item" v-for="(m,n) in thirdList[index][k]">
								<router-link :to="{name:'category',query:{categoryId:thirdListIDs[index][k][n]}}" >{{m}}</router-link>
							</li>
						</ul>
					</li>
				</ul>
			</li>
		</ul>
	</div>
</template>
<script>
import axios from 'axios'
import { setStore, getStore } from '../../store/storage.js'
export default {
	data(){
		return{
			firstList:[],
			firstListIDs:[],
			secondList:[],
			secondListIDs:[],
			thirdList:[],
			thirdListIDs:[]
		}
	},
	computed:{
		getNavList:function(){
			if( !getStore('menuCateList') ){
				this.$store.commit('GET_MENU_CATE_LIST')
			}

			let menuCateList = JSON.parse( getStore('menuCateList') ) 
			// console.log(menuCateList)

	        this.firstList = menuCateList.firstList
	        this.firstListIDs = menuCateList.firstListIDs

	        this.secondList = menuCateList.secondList
	        this.secondListIDs = menuCateList.secondListIDs

	        this.thirdList = menuCateList.thirdList
	        this.thirdListIDs = menuCateList.thirdListIDs
		}
	},
	created(){
		this.getNavList;
	}
}
</script>
<style>
.nav-list{
	position: absolute;
	left:0;
	top:0;
	z-index: 1;
	height:320px;
	padding:20px 0;
	background:rgba(0,0,0,0.55);
}
.nav-main{
	width:200px;
}
.nav-main:hover {
	background-color: rgba(255,255,255,0.2);
}
.nav-main>p{
	height:40px;
	line-height: 40px;
	padding-left: 30px;
}

.nav-main>p a:not(:last-child):after{
	content:"/";
	margin:0 4px;
	font-size:16px;
	font-weight: lighter;
	color:#fff;
}


.nav-main>p a{
	font-size:14px;
	color: #fff;
}
.nav-main>p a:hover{
	color: #f7b200;
}
.nav-main >ul{
	position: absolute;
	left:200px;
	top:0;
	display: none;
	min-height: 331px;
	width:700px;
	padding:15px 0;
	background-color: #fff;
	box-shadow: 1px 0px 15px 5px rgba(0,0,0,0.08);
}
.nav-main:hover > ul {
	display: block;
}
.nav-sub{

}
.nav-sub>a{
	display: inline-block;
	vertical-align: middle;
	width:62px;
	margin: -2px 10px 0 20px;
	line-height: 20px;
	text-align: right;
	font-size: 14px;
	color: #333;
}
.nav-sub >i{
	display: inline-block;
	margin-top: 15px;
	line-height: 20px;
	font-size: 14px;
	color: #333;
}
.nav-sub ul{
	float: right;
	width:547px;
	margin:0 30px 0 16px;
	padding-top:15px;
	border-bottom:1px solid #f2f2f2;
}
.nav-lastSub ul {
	border: none;
}
.nav-item{
	float: left;
	margin: 0 20px 15px 0;
	line-height: 20px;
}
.nav-item a {
	text-align: center;
	color:  #808080;
}

.nav-item a:hover {
	color: #523669;
}

</style>