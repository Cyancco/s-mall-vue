<template>
	<ul class="rightBar">
		<li class="rightBar-serve">
			<a href="javascript:void(0);" target="_blank"></a>
		</li>
		<li class="rightBar-phone"></li>
		<li class="rightBar-share"></li>
		<li class="rightBar-code">
			<div>
				<span></span>
				<dl class="code-public">
					<dt></dt>
					<dd>关注什麼公众号</dd>
				</dl>
				<dl>
					<dt></dt>
					<dd>扫码下载APP</dd>
				</dl>
			</div>
		</li>
		<li class="rightBar-top"></li>
	</ul>
</template>

<script>
export default {
	components:{

        
    },
    methods:{
    	BackTop:function(){
    		let h = 30;
    		let scrollTop = window.pageYOffset||document.body.scrollTop||document.documentElement.scrollTop;
    		let TopBox=document.getElementsByClassName("rightBar-top")[0];

    		if( scrollTop < h ){
    			TopBox.style.display="none"
    		}else if( scrollTop >= h ){
    			TopBox.style.display="block"
    		}

    		TopBox.addEventListener("click",function(){
    			var timer = setInterval(function(){
					if(scrollTop<=0){ 
						clearInterval( timer );
						document.body.scrollTop = document.documentElement.scrollTop =0;
					}else{
						scrollTop -= 100;
						document.body.scrollTop = document.documentElement.scrollTop = scrollTop;
					}
				},1);
    		})
    	}
    },
    beforeRouteLeave(to, from, next){  
    	let shareBox=document.getElementsByClassName("rightBar-share")[0];
    	console.log(shareBox)
        if (to.name == 'new') {  
            shareBox.style.display="block"
        }else{  
            shareBox.style.display="none"
        }  
        next()  
    },  
    mounted(){
	    window.addEventListener('scroll', this.BackTop)
    },
    destroyed(){
    	window.removeEventListener('scroll', this.BackTop )
    }
}
</script>

<style>
/* 右边栏 */
.rightBar{
	position: fixed;
	left:50%;
	bottom:200px;
	display: block;
	z-index: 101;
	margin-left:560px;
	height:144px;
}
.rightBar li{
	width:48px;
	height:48px;
	cursor:pointer;
}
.rightBar-serve{
	display:none;
	background: url(../../images/sprite.png);
	background-position: -0px -240px;
}
.rightBar-serve a{
	display: block;
	height:100%;
}
.rightBar-serve:hover{
	background: url(../../images/sprite.png);
	background-position: -50px -240px;
}
.rightBar-phone{
	display: none;
	background: url(../../images/sprite.png);
	background-position: -100px -240px;
}
.rightBar-phone:hover{
	background: url(../../images/sprite.png);
	background-position: -150px -240px;
}
.rightBar-share{
	display: none;
	background: url(../../images/sprite.png);
	background-position: -200px -240px;
}
.rightBar-share:hover{
	background: url(../../images/sprite.png);
	background-position: -250px -240px;
}
.rightBar-code{
	position: relative;
	background: url(../../images/sprite.png);
	background-position: -0px -300px;
}
.rightBar-code:hover{
	background: url(../../images/sprite.png));
	background-position: -50px -300px;
}
.rightBar-code:hover div{
	display: block;
}
.rightBar-code div{
	position: absolute;
	top:-65px;
	left:-310px;
	display: none;
	width:292px;
	border-radius: 4px;
	box-shadow: 0 1px 10px 4px rgba(0,0,0,0.08);
	background: #fff;
}
.rightBar-code span{
	position: absolute;
	top:50%;
	right:-15px;
	z-index: 100;
	display: inline-block;
	width:15px;
	height:30px;
	margin-top:-14px;
	background: url(../../images/sprite.png);
	background-position: -60px -60px;
}
.rightBar-code dl{
	float: left;
	padding:10px;
}
.rightBar-code dt{
	width: 126px;
	height: 126px;
	background:url(../../images/sprite.png);/*APP二维码*/
	background-position: 0px -350px;
	border-radius: 4px;
}
.rightBar-code dd{
	margin-top: 10px;
	text-align: center;
	color:#523669;
	font-size:14px;
}
.rightBar-code .code-public dt{
	background: url(../../images/sprite.png);/*微信二维码*/
	background-position: -150px -350px;
}
.rightBar-top{
	display: none;
	background: url(../../images/sprite.png);
	background-position: -100px -300px;
}
.rightBar-top:hover{
	background: url(../../images/sprite.png);
	background-position: -150px -300px;
}
</style>