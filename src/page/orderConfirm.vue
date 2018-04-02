<template>
	<div>
		<web-head  :cart-num="cartNum"></web-head>
		<shop-nav></shop-nav>
		<div class="wrap">
			<article class="address-panel">
				<div class="panel-header">确认收货地址</div>
				<ul class="addressList clearfix">
					<li :class="{'selected':item.isSelectedAddr}" v-for="(item,index) in addressList" @click="selectedOrderAddr(item)">
						<p>
							<span class="receiverName">{{item.name}}</span>
							<span class="receiverTel">{{item.Tel}}</span>
						</p>
						<dl class="receiverAddr">
							<dt>{{item.city}}</dt>
							<dd>{{item.street}}</dd>
						</dl>
						<p>
							<span class="setDefaultAddr" @click="setDefaultAddr(item)">{{item.defaultText}}</span>
							<i @click.stop="deleteAddr(index)">删除</i>
							<i @click="modifyAddr(index)">修改</i>
						</p>
					</li>
					<li @click="addNewAddr()">
						<b class="addNew"></b>
						<span class="useNew">使用新地址</span>
					</li>
				</ul>
				<!-- 输入新地址时弹出遮罩 -->
				<section class="overlay" v-if="isEditAddr">
					<div>
						<header>{{overlayTitle}}
							<em @click="isEditAddr=false"></em>
						</header>
						<main>
							<label>
								<b>收货人姓名：</b>
								<input type="text" v-model.trim="editAddr.name" required/>
							</label>
							<label>
								<b>省市区（县）：</b>
								<input type="text" v-model.trim="editAddr.city" required/>
							</label>
							<label>
								<b>街道地址：</b>
								<input type="text" v-model.trim="editAddr.street" required/>
							</label>
							<label>
								<b>手机号码：</b>
								<input type="text" v-model.trim="editAddr.Tel" required/>
							</label>
							<label>
								<b></b>
								<i :class="{'checked':editAddr.isDefault}" @click="setDefaultAddr(editAddr)"></i><span  @click="setDefaultAddr(editAddr)">{{editAddr.defaultText}}</span>
							</label>
							<label>
								<b></b>
								<a @click="saveAddr()">保存该地址</a>
							</label>
						</main>
					</div>
				</section>
			</article>
			<article class="receipt-panel">
				<div class="panel-header">发票信息</div>
				<p>
					<i class="checked-btn select-btn" :class="{'checked':needInvoice}" @click="needInvoice=!needInvoice"></i>
					<span @click="needInvoice=!needInvoice">开具发票</span>
				</p>
				<div class="needInvoice" v-if="needInvoice">
					<dl>
						<dt>发票类型：</dt>
						<dd>
							<i class="radio-btn select-btn" :class="{'radio':eInvoice}" @click="eInvoice=!eInvoice"></i><span>电子</span>
						</dd>
					</dl>
					<dl>
						<dt>发票抬头：</dt>
						<dd>
							<i class="radio-btn select-btn" :class="{'radio':selectPer}" @click="selectInvoiceTitle(1)"></i><span>个人</span>
							<i class="radio-btn select-btn" :class="{'radio':selectCom}" @click="selectInvoiceTitle(2)"></i><span>公司</span>
						</dd>
					</dl>
					<dl>
						<dt>发票内容：</dt>
						<dd>
							<span style="color:#999;">商品明细</span>
							<em>发票内容暂不支持修改</em>
						</dd>
					</dl>
					<dl v-if="selectCom">
						<dt>单位名称：</dt>
						<dd>
							<input type="text" placeholder="请输入单位名称" v-model.trim="comName" @blur="checkComInvoice('name')" autofocus/>
							<small v-if="comNameErr">请输入单位名称</small>
						</dd>
					</dl>
					<dl v-if="selectCom">
						<dt>纳税人识别号：</dt>
						<dd>
							<input type="text" placeholder="请输入统一社会信用代码" v-model.trim="comCode" @blur="checkComInvoice('code')"/>
							<small v-if="comCodeErr">请输入纳税人识别号</small>
							<br/>
							<em>应国家税务总局要求，自2017年7月1日起，开具公司抬头的增值税普通发票，需提供纳税人识别号或统一社会信用代码</em>
						</dd>
					</dl>
				</div>			
			</article>
			<article class="confirm-panel">
				<div class="panel-header">确认订单</div>
				<table cellspacing="0">
					<tr>
						<td width="15%"></td>
						<td width="40%"></td>
						<td width="15%">单价</td>
						<td width="15%">数量</td>
						<td width="15%">小计</td>
					</tr>
					<tr v-for="item in confirmOrder.list">
						<td><img :src="item.img"></td>
						<td>
							<dl>
								<dt>{{item.title}}</dt>
								<dd>颜色:{{item.color}}</dd>
								<dd>尺寸:{{item.size}}</dd>
							</dl>
						</td>
						<td style="color:#666;">{{item.price|formatMoney}}</td>
						<td>{{item.quantity}}</td>
						<td>{{item.price*item.quantity|formatMoney}}</td>
					</tr>
					<tfoot>
						<td colspan="2">
							<span>给商家留言</span>
							<textarea placeholder="建议填写内容已提前和商家沟通一致" v-model="leaveMess"></textarea>
						</td>
						<td colspan="3">
							<dl>
								<dt>配送方式</dt>
								<dd>顺丰快递</dd>
							</dl>
							<dl>
								<dt>送货时间</dt>
								<dd>
									<select name="deliveryTime" v-model="selected" >
										<option :value="{deliveryTime:'allTime'}" selected>工作日、双休日、假日均可送货</option>
										<option :value="{deliveryTime:'weekDay'}">只工作日送货</option>
										<option :value="{deliveryTime:'weekend'}">只双休日、假日送货</option>
									</select>
								</dd>
							</dl>
						</td>
					</tfoot>
				</table>
				<div class="submit">
					<p>
						<span>商品总数 <b>1</b> 件</span>
						<span>商品总价：<i>299</i></span>
					</p>
					<p>
						<em><span>实际支付金额：<b>299</b></span></em>
					</p>
					<input type="text" id="submitTips" v-model="submitTips" disabled></input>
					<p>
						<a @click="returnCart()">返回购物车</a>
						<a @click="submitOrder()">提交订单</a>
					</p>
				</div>
			</article>
		</div>
		<web-foot></web-foot>
	</div>
</template>

<script type="text/javascript">
	import webHead from '../components/web/webHead.vue'
	import webFoot from '../components/web/webFoot.vue'
	import shopNav from '../components/web/shopNav.vue'
	import { setStore, getStore } from '../store/storage.js'
	export default {
		components:{
			webHead:webHead,
			webFoot:webFoot,
			shopNav:shopNav
		},
		data(){
			return{
				loginUser:{},				//用户信息
				confirmOrder:{},			//用户提交的订单信息
				addressList:[], 			//用户信息内的 地址列表
				isEditAddr:false, 			//是否打开编辑地址弹出框
				editAddr:{},  				//编辑地址暂存对象
				overlayTitle:"请输入新地址",
				lastAddrId:null, 			//地址列表中现有的最大id
				eInvoice:false,				//电子发票
				needInvoice:false, 			//是否需要开具发票
				selectPer:true, 			//是否发票抬头为个人
				selectCom:false,			//是否发票抬头为公司
				comName:"",   				//公司名称
				comCode:"",					//社会信用代码
				comCodeErr:false, 			//是否显示名称未输入提示框
				comNameErr:false,			//是否显示代码未输入提示框
				leaveMess:"",				//留言
				selected:{deliveryTime:'allTime'}, //选择送货时间
				submitTips:"",				//提交错误时出现的提示

				cartNum:0,
			}
		},
		filters:{
			formatMoney:function(value){
				return "￥"+value;
			}
		},
		methods:{
			initHeaderData:function(){
				this.cartNum = JSON.parse( getStore('loginUser')).shopcarsList.length;
			},
			initData:function(){
				this.confirmOrder = JSON.parse( getStore('confirmOrder'));

				this.loginUser = JSON.parse( getStore('loginUser'));
				// console.log( this.confirmOrder );
				// console.log( loginUser );
				if( this.loginUser.addressList ){ //已有地址
					this.addressList = this.loginUser.addressList;
					let len = this.addressList.length;
					this.lastAddrId = this.addressList[len-1].id; //最后一个地址的id
					//如果没有选择地址，那么就用默认地址作为选择地址
					if( !this.confirmOrder.address){
						this.addressList.filter( item=>{

							if(item.isDefault){
								item.isSelectedAddr = true;
								this.confirmOrder.address = item;
								//思考是否需要保存道localStorage，
								//应该不需要，可以等提交订单的时候再保存
							}else{
								item.isSelectedAddr = false;
							}
							// console.log(item)
						})
					}
					
				}else{ //没有地址
					this.addressList = [];
					this.lastAddrId = 0; //第一次添加地址时 id(++后)就等于0
					console.log("未有地址")
				}
			},
			deleteAddr:function(i){
				this.addressList.splice(i,1);
				this.loginUser.addressList = this.addressList;
				setStore( 'loginUser', JSON.stringify(this.loginUser) )
			},
			modifyAddr:function(i){
				this.isEditAddr = true;
				this.overlayTitle = "修改收货地址";
				this.editAddr = this.addressList[i];
			},
			addNewAddr:function(){
				this.isEditAddr = true;
				this.overlayTitle = "请输入新地址";
				this.editAddr = {
					name:"",
					Tel:"",
					city:"",
					street:"",
					isDefault:false,
					defaultText:"设为默认地址"
				}
			},
			saveAddr:function(){
				if( this.editAddr.name!="" && this.editAddr.Tel!="" && this.editAddr.city!="" && this.editAddr.street!="" ){
					let telReg=/^[1][3,4,5,7,8][0-9]{9}$/;
					if( telReg.test(this.editAddr.Tel) ){ //通过验证
						if( this.addressList.length == 0 ){ //未有地址
							this.editAddr.id= 0;
							this.addressList.push(this.editAddr);
						}else{ //已有地址
							if( this.editAddr.id ){ //已有id，判断是修改地址
								this.addressList.filter( item =>{ //过滤地址列表
									if( item.id = this.editAddr.id ){ //找到对应的id
										item = this.editAddr; //保存修改内容
									}
								})
							}else{//没有id 说明是在添加地址 还没设置id
								this.lastAddrId++;
								this.editAddr.id = this.lastAddrId;//把最后一个地址的id值+1，设为新地址的id
								this.addressList.push(this.editAddr);//加入列表
							}
						}
						this.loginUser.addressList = this.addressList;
						setStore( 'loginUser', JSON.stringify(this.loginUser) )
						this.isEditAddr = false;
						// console.log(JSON.parse( getStore('loginUser')))
						// console.log( this.addressList );
					}
				}			
			},
			setDefaultAddr:function(item){
				item.isDefault = !item.isDefault;
				if(item.isDefault = true){//如果当前项  变为默认，
					this.addressList.filter( list=>{//让其他项都变成 非默认
						if(list != item ){
							list.isDefault = false;
						}
					})
				}
				//文字响应改变
				this.addressList.filter( list=>{
					if(list.isDefault){
						list.defaultText = "默认地址"
					}else{
						list.defaultText = "设为默认地址"
					}
				})
				this.loginUser.addressList = this.addressList;
				setStore( 'loginUser', JSON.stringify(this.loginUser) )
			},
			selectedOrderAddr:function(item){
				this.addressList.filter( list =>{
					list.isSelectedAddr = false;
				});
				item.isSelectedAddr = true;
				this.confirmOrder.address = item;
				// console.log(this.addressList)
				// console.log(this.confirmOrder)
			},
			selectInvoiceTitle:function(type){
				if(type == 1){
					this.selectPer = true;
					this.selectCom = false;
				}else if( type == 2){
					this.selectPer = false;
					this.selectCom = true;
				}
			},
			checkComInvoice:function(type){
				if(type == "name"){
					if( this.comName == ""){
						this.comNameErr =true;
					}else{
						this.comNameErr =false;
					}
				}
				if(type == "code"){
					if( this.comCode == ""){
						this.comCodeErr =true;
					}else{
						this.comCodeErr =false;
					}
				}
			},
			returnCart:function(){
				this.confirmOrder={};
				setStore( 'confirmOrder', JSON.stringify(this.confirmOrder) )
				this.eInvoice=false;	//电子发票
				this.needInvoice=false; //是否需要开具发票
				this.selectPer=true; 	//是否发票抬头为个人
				this.selectCom=false;	//是否发票抬头为公司
				this.comName="";   		//公司名称
				this.comCode="";		//社会信用代码
				this.comCodeErr=false; 	//是否显示名称未输入提示框
				this.comNameErr=false;	//是否显示代码未输入提示框
				this.leaveMess="";		//留言
				this.selected={deliveryTime:'allTime'}; 		//选择送货时间
				this.$router.push({path:'/shopcars'} )
			},
			submitOrder:function(){
				if(this.needInvoice){
					this.confirmOrder.invoice={};
					this.confirmOrder.invoice.eInvoice =this.eInvoice;
					if(this.selectPer){
						this.confirmOrder.invoice.title = this.confirmOrder.address.name;
					}
					if(this.selectCom){
						if( this.comNameErr || this.comCodeErr ){

							this.submitTips="请您输入完整的开具发票信息!"
						}else{
							this.confirmOrder.invoice.title = this.comName;
							this.confirmOrder.invoice.comCode = this.comCode;
						}
					}
				}
				if(this.leaveMess.trim != "" ){
					this.confirmOrder.leaveMess = this.leaveMess;
				}
				this.confirmOrder.deliveryTime = this.selected.deliveryTime;
				// console.log(this.loginUser)
				console.log(this.confirmOrder)
				//购物车列表中删除确认订单商品
				this.loginUser.shopcarsList=this.loginUser.shopcarsList.filter( item=>{
					if( item.isSelected==true ){
						return false;
					}else{
						return true;
					}
				})
				// console.log(this.loginUser)
				setStore( 'confirmOrder', JSON.stringify(this.confirmOrder) )
				setStore( 'loginUser', JSON.stringify(this.loginUser) )

				this.$router.push({path:'/order/charge'} )
			},
		},
		mounted(){
			this.initHeaderData();
			this.initData();
		}
	}
</script>

<style type="text/css">
/******************* 确认订单 *******************/
table{
	width:100%;
}
tr:first-child{
	height:30px;
	line-height: 30px;
	color:#999;
}

tr:not(:first-child){
 	background-color: #fff;
	height: 130px;
}
tr>td:not(:nth-child(2) ){
	text-align: center;
}
td>img{
	display:inline-block;
	width:100px;
	height:100px;
	border:1px solid #eee;
}
td>dl>dt{
	line-height:30px;
}
td>dl>dd{
	color:#999;
}
tfoot{
}
tfoot>td{
	padding-left:40px;
	height:130px;
	border-top:1px solid #eee;
}
tfoot>td>span{
	display: inline-block;
	vertical-align: top;
	zoom: 1; /* Fix for IE7 */
	*display: inline; /* Fix for IE7 */
}
tfoot>td>textarea{
	width:360px;
	height:80px;
	overflow:hidden;
	resize: none;
	margin-left:10px;
	border:1px solid #ccc;
	padding:4px;
	box-sizing: border-box;
}
tfoot>td dt,tfoot>td dd{
	display: inline-block;
	vertical-align: middle;
	zoom: 1; /* Fix for IE7 */
	*display: inline; /* Fix for IE7 */
	margin-right:10px;
}
tfoot select{
	padding:6px 14px 6px 6px;
	border-color:#ccc;
}
/*****提交区*****/
.submit{
	height:200px;
	background-color: #fff;
	border:1px solid #eee;
	text-align: right;
	position: relative;
}
.submit p{
	margin:10px 20px;
	line-height: 30px;
}
.submit p:nth-child(2){
	line-height: 50px;
	margin-bottom:30px;
}
.submit span{
	font-size: 14px;
	margin-left:40px;
}
.submit i,.submit b{
	color:#f49f26;
}
.submit i{
	display: inline-block;
	vertical-align: top;
	zoom: 1; /* Fix for IE7 */
	*display: inline; /* Fix for IE7 */
	width:100px;
	text-align: center;
}
.submit b{
	font-weight: bold;
}
.submit em b{
	display: inline-block;
	vertical-align: top;
	zoom: 1; /* Fix for IE7 */
	*display: inline; /* Fix for IE7 */
	width:100px;
	text-align: center;
	font-size:18px;
}
.submit a{
	display: inline-block;
	vertical-align: top;
	zoom: 1; /* Fix for IE7 */
	*display: inline; /* Fix for IE7 */
	width:120px;
	height: 40px;
	margin-left:30px;
	line-height: 40px;
	text-align: center;
	font-size: 16px;
}
.submit a:first-child{
	border:1px solid #bbb;
	color:#bbb;
}
.submit a:last-child{
	background-color: #f49f26;
	color:#fff;
}
#submitTips{
	position: absolute;
	top:105px;
	right:20px;
	width:200px;
	height:20px;
	color:#f33;
	text-align: right;
}
/******************* 发票信息 *******************/
/*多选框  方形*/
.select-btn{
	display: inline-block;
	vertical-align: middle;
	zoom: 1; /* Fix for IE7 */
	*display: inline; /* Fix for IE7 */
	width:15px;
	height:15px;
	margin-right:6px;
	margin-top:-3px;
	background-image: url(../images/sprite.png);
	cursor: pointer;
}
.checked-btn{
	background-position: -130px -680px;
}
.checked{
	background-position: -110px -680px;
}
/*单选框  圆形*/
.radio-btn{
	background-position: -170px -680px;
}
.radio{
	background-position: -150px -680px;
}
.checked-btn~span{
	cursor: pointer;
}
/**/
.receipt-panel{
	font-size:14px;
}
.receipt-panel p{
	margin:20px;
	line-height: 15px;
	color: #666;
}
.needInvoice{

}
.needInvoice dt{
	width:120px;
	text-align: right;
}

.needInvoice dt,.needInvoice dd{
	display: inline-block;
	vertical-align: top;
	zoom: 1; /* Fix for IE7 */
	*display: inline; /* Fix for IE7 */
	margin-right:6px;
	line-height: 40px;
}
.needInvoice dd input{
	width:360px;
	height:32px;
	border:1px solid #ccc;
	padding-left:10px;
}
.needInvoice dd span{
	margin-right:30px;
}
.needInvoice dd em{
	font-size:12px;
	color:#f7b200;
}
.needInvoice dd small{
	font-size:12px;
	color:#f7b200;
}

/******************* 确认收货地址 *******************/
ul.addressList{
	width:1120px;
	margin-top:20px;
}
ul.addressList>li{
	float: left;
	width:255px;
	margin-right:20px;
	margin-bottom:20px;
	height:160px;
	border:1px solid #bcb8bf;
	box-sizing: border-box;
	padding: 12px;
	color:#666;
	font-size:14px;
	cursor: pointer;
}
ul.addressList p{
	height:32px;
	line-height: 32px;
	/*background-color: #ff9;*/
}
.receiverTel{
	margin-left:8px;
}
ul.addressList dl{
	display: block;
	line-height: 22px;
	margin:13px 0;
}
ul.addressList i{
	margin-left:12px;
}
ul.addressList dd{
	font-size:12px;
}
ul.addressList>li>p>i{
	float: right;
	color:#07a6df;
}
ul.addressList>li.selected{
	color:#523669;
	border-color: #523669;
	background-color: #fff;
}
ul.addressList>li:hover{
	border-color: #523669;
	background-color: #fff;
}
.setDefaultAddr{
	float: left;
	display:block;
	vertical-align: middle;
	width:100px;
	height:16px;
	line-height: 16px;
	text-indent:16px;
	margin-top:8px;
	background: url(../images/sprite.png) -130px -600px no-repeat;
}
ul.addressList>li:last-child{
	position: relative;
}
.addNew{
	position: absolute;
	top:40%;
	left:50%;
	display: block;
	width:50px;
	height:50px;
	margin-top:-25px;
	margin-left:-25px;
	background:url(../images/sprite.png) -160px -620px;
}
.useNew{
	position:absolute;
	top:65%;
	left:50%;
	width:100px;
	margin-left:-50px;
	display: block;
	text-align: center;
	font-size: 18px;
}
/*******输入新地址时弹出遮罩*******/
.overlay{
	position: fixed; top:0; left:0;z-index: 120;
	width: 100%;height:100%;
	background-color:rgba(0,0,0,0.3);
}
.overlay>div{
	position: fixed;top:50%; left:50%;
	width:700px;height:350px;
	margin:-175px 0 0 -350px;
	background-color: #fff;
	border-radius: 6px;
	box-sizing:border-box;
	padding:0 20px;
	font-size:18px;
}
.overlay header{
	position: relative;
	height:40px;
	line-height: 40px;
	border-bottom:1px solid #ddd;
}
.overlay em{
	position: absolute;
	right:0;
	top:14px;
	width:16px;
	height:16px;
	cursor: pointer;
	background: url(../images/sprite.png) -230px -600px;
}
.overlay main{
	margin-top:20px;
}
.overlay label{
	display: block;
	line-height: 32px;
	width: 100%;
	margin-top:10px;
}
.overlay b{
	display: inline-block;
	vertical-align: middle;
	zoom: 1; /* Fix for IE7 */
	*display: inline; /* Fix for IE7 */
	width:25%;
	text-align: right;
	margin-right: 10px;
}
.overlay input{
	width:60%;
	height:30px;
	border:none;
	border:1px solid #ccc;
	padding:0 6px;
	font-size: 14px;
	color: #523669;
}
.overlay i {
	display: inline-block;
	vertical-align: middle;
	zoom: 1; /* Fix for IE7 */
	*display: inline; /* Fix for IE7 */
	height:15px;
	width:15px;
	margin-top:-2px;
	background: url(../images/sprite.png) -260px -562px;
	cursor: pointer;
}
.overlay span{
	padding-left:6px;
	cursor: pointer;
}
.overlay i.checked{
	background-position: -280px -562px;
}
.overlay a {
	display: inline-block;
	vertical-align: middle;
	zoom: 1; /* Fix for IE7 */
	*display: inline; /* Fix for IE7 */
	width:120px;
	height:40px;
	border-radius: 4px;
	background-color: #724a88;
	color: #fff;
	text-align: center;
	line-height: 40px;
	margin-top: 10px;
}
/**********************************************/
article{
	margin:20px 0;
}
.panel-header{
	height:32px;
	border-bottom:1px solid #d5cdda;
	font-size:16px;
	color:#523669;
}
/******************** reset style ********************/
*{margin: 0;padding: 0;word-break: break-all;}
body{
	font: 12px 'Microsoft YaHei', '微软雅黑', '宋体', Arial,Helvetica, sans-serif;
	margin: 0;text-align: left;
	color: #333;background-color: #f9f9f9;}
h1,h2,h3,h4,h5,h6,p,img,label{
	font-size: 12px;margin: 0;padding: 0;border: 0;}
ul,ol,li,dl{
	font-size: 12px;display: block;
	margin: 0;padding: 0;
	list-style: none;border: 0;}
dt,dd{
    display: block;list-style: none;
    margin: 0;padding: 0;border: 0;}
form,input,textarea,button,select{
    margin: 0;padding: 0;outline: none;}
i,em{font-style: normal;}
b{font-weight: normal;}
a{cursor: pointer;text-decoration: none;outline: none;}
a:hover{text-decoration: none;}
.clearfix:after{
	display: block;visibility: hidden;
	clear: both;height: 0; content: '.';}
.wrap{width:1080px;margin:0 auto;}
img{width:100%;}
input[type="text"]:disabled{border:none;background: none ;}
/**********************/

</style>