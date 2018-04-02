<template>
	<div>
		<web-head :cart-num="cartNum"></web-head>
		<web-nav></web-nav>
		<div class="wrap">
			<article class="pro-detail">
				<section class="bread">
					<router-link to='/home'>首页</router-link>
					<router-link :to="{name:'category',query:{categoryId:cateLink}}">
						<b>></b>
						{{firstBread}}
					</router-link>
					<span>
						<a href="javascript:void(0);">
							<b>></b>
							{{product.title}}
						</a>
					</span>
				</section>
				<section class="detail-editor clearfix">
					<div class="editor-main">
						<div class="editor-picture clearfix">
							<p><img :src="mainImageLink"></p>
							<ul>
								<li :class="{'active':isMainActive[index]}" v-for="(item,index) in mainImageList" :key="item.id" @click="chooseActive(mainImageList,index,isMainActive)">
									<img :src="item">
								</li>
							</ul>
						</div>
						<ul class="editor-policy">
							<li>
								<span>7天无忧退换货</span>
								<div><i></i>实物破损、不符、质量问题，退换货商家承担往返运费。</div>
							</li>
							<li>
								<span>先行赔付</span>
								<div><i></i>争议可申诉，申诉成功，立即退款。</div>
							</li>
							<li>
								<span>超时赔偿</span>
								<div><i></i>未按承诺时间发货，系统自动赔付（赔款金额为订单商品金额的30%，上限500元）。</div>
							</li>
							<li>
								<span>顺丰包邮</span>
								<div><i></i>运费由商家承担</div>
							</li>
						</ul>
					</div>
					<div class="editor-panel">
						<div class="panel-top">
							<h1>{{product.title}}</h1>
							<p>解构风格经典风衣，注重细节，致敬经典</p>
						</div>
						<ul class="panel-main">
							<li class="panel-price clearfix">
								<span>售价</span>
								<div>
									<p>￥<b id="price">{{product.price}}</b></p>
									<i>生产周期：<b id="duration">{{product.cycleTime}}</b>天</i>
								</div>
							</li>
							<li class="panel-color clearfix">
								<span>颜色</span>
								<div class="color-model">
									<ul>
										<li :class="{'active':isColorActive[j]}" 
												v-for="(i,j) in colorList" 
												:key="i.a" 
												@click="chooseActive( colorList, j, isColorActive)">
											<img :src="product.colorIcon[j]">
											<em></em>
											<div><i></i>{{i}}</div>
										</li>
									</ul>
								</div>
							</li>
							<li class="panel-size clearfix">
								<span>尺寸</span>
								<div class="size-model">
									<ul>
										<li :class="{'active':isSizeActive[n]}" 
												v-for="(m, n) in product.size"
												:key="m.b"
												@click="chooseActive(product.size, n, isSizeActive)">
											{{m}}
											<em></em>
										</li>
									</ul>
								</div>
							</li>
							<li class="panel-count clearfix">
								<span>数量</span>
								<div>
									<p>
										<i id="count-minus" @click="count(1)">-</i>
										<i id="count-num">{{quantity}}</i>
										<i id="count-add" @click="count(2)">+</i>
									</p>
									<span class="stock">( 库存 : {{product.stock}} )</span>
								</div>
							</li>
						</ul>
						<div class="panel-bottom">
							<a href="" id="buyNow" class="buyBtn">立即购买</a>
							<a class="buyBtn addShopCar" @click="addToShopCart">加入购物车</a>
						</div>
					</div>
				</section>
				<section class="detail-view">
					<div class="view-title" :class="{'view-title-fixed':isOnScroll}">
						<a href="" class="supplier-title">
							<i></i>
							<b>Ever Spring</b>
						</a>
						<ul>
							<li class="active-tab">商品信息</li>
							<li>
								评价详情
								<span>{{product.evaluations.length}}</span>
							</li>
						</ul>
						<a class="buyBtn addShopCar" @click="addToShopCart">加入购物车</a>
					</div>

					<div class="view-section clearfix">
						<section class="view-left">
							<div class="collection"></div>
							<ul class="supplier-recommend">
								<li v-for="item in 10">
									<a href="">
										<i><img></i>
										<dl>
											<dt>儿童飞行棉茄克</dt>
											<dd>￥359</dd>
										</dl>
									</a>
								</li>
							</ul>
						</section>
						<section class="view-main clearfix">
							<div class="view-content">
								<article class="pro-detail-img">
									<img :src="item" v-for="item in product.detailDiagram">
								</article>
							</div>
							<div class="view-evaluate hide"></div>
						</section>
					</div>
				</section>
			</article>
		</div>
		<web-right-bar></web-right-bar>
		<web-foot></web-foot>
	</div>
</template>

<script type="text/javascript">
	import webHead from './../components/web/webHead.vue'
	import webNav from './../components/web/webNav.vue'
	import webRightBar from './../components/web/webRightBar.vue'
	import webFoot from './../components/web/webFoot.vue'
	import { setStore, getStore } from '../store/storage.js'

	export default{
		components:{
			webHead:webHead,
			webNav:webNav,
			webRightBar:webRightBar,
			webFoot:webFoot
		},
		data(){
			return{
				cateLink:"",
				firstBread:"",
				isMainActive:[],
				firstList:[],
				firstListIDs:[],
				productsList:{},
				productId:'',
				product:{},
				quantity:1,
				isOnScroll:false,
				mainImageList:[],
				mainImageLink:"",
				isColorActive:[],
				colorList:[],
				isSizeActive:[],
				sizeList:[],
				hasFlyIcon:false,
				cartNum:0,
			}
		},
		methods:{
			initHeaderData:function(){
				console.log(document.body.scrollTop)
				if(getStore('isLogin') == "false"){
					this.cartNum = 0;
				}else if( getStore('isLogin') == "true" ){
					this.cartNum = JSON.parse( getStore('loginUser')).shopcarsList.length;
				}
			},
			getThisProductData:function(){
				var _this = this;
				if( !getStore('productsList') ){
					this.$store.commit('GET_PRODUCTSLIST')
				}
				if( !getStore('pageCateList') ){
					this.$store.commit('GET_PAGE_CATE_LIST')
				}
				this.productsList = JSON.parse( getStore('productsList'));
				this.firstList = JSON.parse( getStore('pageCateList')).firstList;
				this.firstListIDs = JSON.parse( getStore('pageCateList')).firstListIDs;
				this.productId = this.$route.params.id

				// console.log(this.productsList)
				// console.log(this.firstList)
				// console.log(this.firstListIDs)
				// console.log(this.productId)

				for(var i=0; i < _this.productsList.length; i++ ){
					if( _this.productsList[i].ID == _this.productId ){
						_this.product = _this.productsList[i];
						_this.mainImageLink = _this.product.mainImage[0];
						for(var j=0; j < _this.firstListIDs.length ; j++ ){
							if( _this.product.categoryID[1] == _this.firstListIDs[j] ){
								_this.cateLink = _this.firstListIDs[j];
								_this.firstBread = _this.firstList[j];
							}
							return;
						}
					}
				}
			},
			count:function(type){
				// console.log("加减数量");
				if( type == "1" ){ this.quantity-- }
				if( type == "2" ){ this.quantity++ }
				if( this.quantity <= 0){ this.quantity=0 }
				if( this.quantity >= this.product.stock ){ this.quantity >= this.product.stock }
			},
			onScroll:function(){
				let _this = this;
	    		let h = 670;
	    		let scrollTop = window.pageYOffset||document.body.scrollTop||document.documentElement.scrollTop;
	    		if( scrollTop < h ){
	    			_this.isOnScroll = false;
	    		}else if( scrollTop >= h ){
	    			_this.isOnScroll = true;
	    		}
			},
			chooseActive:function(list,index,isActive){
				var _this = this;
				for( var i=0; i<list.length; i++ ){
					// isActive[i] = false;
					// isActive[index] = true;
					isActive.splice(i , 1 , false )
					isActive.splice(index , 1 , true ) 
				}
				if(list == _this.mainImageList ){
					_this.mainImageLink = _this.mainImageList[index]
				}
				if(list == _this.colorList ){
					_this.mainImageLink = _this.product.colorIcon[index]
				}
			},
			addToShopCart:function(event){
				let _this = this;
				if( getStore('isLogin') == "true"){ //已登录
					if( _this.quantity>0 ){
						let sizeIndex=0,colorIndex=0;
						for( let i = 0; i<_this.colorList.length ; i++ ){
							if( _this.isColorActive[i] == true ){
								colorIndex= i;
							}
						}
						for( let i = 0; i<_this.sizeList.length ; i++ ){
							if( _this.isSizeActive[i] == true ){
								sizeIndex= i;
							}
						}
						this.$store.commit('ADD_TO_SHOPCART',{
							'isSelected':true,
							'ID':_this.productId,
							"img":_this.mainImageList[0],/*购物车显示的图片最好是改成所选颜色的图_this.product.colorIcon[colorIndex]*/
				            "title":_this.product.title,
				            "color":_this.colorList[colorIndex],
				            "size":_this.sizeList[sizeIndex],
				            "price":_this.product.price,
				            "quantity":_this.quantity,
				            "subTotal":_this.product.price*_this.quantity,
				            "stock":_this.product.stock,
						})
						_this.quantity = 0
						
						// 加入购物车动画
						let dom = event.target
						let addIcon = document.createElement('img');
						addIcon.setAttribute('src',_this.mainImageList[0])
						addIcon.setAttribute('class','flyIcon')
						//如何侦听   加入购物车按钮dom是否有子元素，有则删除
						
						if( _this.hasFlyIcon == false ){
							dom.appendChild(addIcon)
							_this.hasFlyIcon == true
						}
						// 获取点击的坐标
						let elTop = dom.getBoundingClientRect().top+40
						//动画
						addIcon.style.width = '30px';
						addIcon.style.height = '30px';
						addIcon.style.top=-elTop+'px';
						addIcon.style.left="110px";
						addIcon.style.opacity=0.2;


						//header的购物车商品数量更新
						this.cartNum = JSON.parse( getStore('loginUser')).shopcarsList.length;
						
					}
				}else{  //未登录
					this.$router.push({path:'/login'})
				}
			},
		},
		created(){

			this.initHeaderData();
			this.getThisProductData();
			/*主图默认选择*/
				this.isMainActive = [true,false,false,false,false]
				this.mainImageList = this.product.mainImage
				/*颜色默认选择*/
				this.isColorActive[0] = true;
				this.colorList = this.product.color;
				this.sizeList = this.product.size;
				this.isSizeActive[0]=true;

				
				
		},
		mounted(){
			window.addEventListener('scroll',this.onScroll)
			if(this.$route.name =='products'){
				document.querySelector('body').style.background="#fff";
			}
		},
     	destroyed(){
    	window.removeEventListener('scroll', this.onScroll )
    	}
	}
</script>

<style type="text/css">
	@import '../style/products.css'
</style>