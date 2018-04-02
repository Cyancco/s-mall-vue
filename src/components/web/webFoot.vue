<template>
	<div class="footer">
		<div class="wrap">
			<ul class="footer-serve clearfix">
				<li>
					<dl>
						<dt class="serve-make"></dt>
						<dd>直连一线制造</dd>
					</dl>
				</li>
				<li>
					<dl>
						<dt class="serve-backage"></dt>
						<dd>全品类包邮</dd>
					</dl>
				</li>
				<li>
					<dl>
						<dt class="serve-pay"></dt>
						<dd>平台先行赔付</dd>
					</dl>
				</li>
				<li>
					<dl>
						<dt class="serve-refund"></dt>
						<dd>7天无忧退换货</dd>
					</dl>
				</li>
			</ul>
			<div class="footer-main clearfix">
				<ul class="footer-detail clearfix">
					<li>
						<h2>帮助中心</h2>
						<ul>
							<li><a>平台政策</a></li>
							<li><a>商家入驻</a></li>
						</ul>
					</li>
					<li>
						<h2>关注什麼</h2>
						<ul>
							<li><a>新浪微博</a></li>
							<li><a>官方微信</a></li>
						</ul>
					</li>
					<li>
						<h2>关于什麼</h2>
						<ul>
							<li><a>了解什麼</a></li>
							<li><a>加入什麼</a></li>
							<li><a>联系我们</a></li>
						</ul>
					</li>
					<li>
						<h2>下载什麼APP</h2>
						<p></p>
					</li>
				</ul>
				<dl class="footer-contact">
					<dt>服务监督邮箱</dt>
					<dd>cs@cyan.com</dd>
				</dl>
			</div>
			<div class="footer-info">
				Written By Cyan
				<p>本页仅限于非商业用途。</p>
			</div>
		</div>
	</div>
</template>

<script type="text/javascript">
	
</script>

<style type="text/css">
/* 页脚部分 */
.footer{
	width:100%;
	margin-top:60px;
	background: #fff;
}
.footer > div {
	width: 1080px;
	margin: 0 auto;
	text-align: center;
}
.footer-serve {
	border-bottom: 1px solid #ccc;
}
.footer-serve li {
	float: left;
	width: 270px;
	height: 120px;
}

.footer-serve dl {
	line-height: 120px;
	text-align: center;
}
.footer-serve dt {
	display: inline-block;
	width: 80px;
	height: 80px;
	vertical-align: middle;
}

.footer-serve dd {
	display: inline-block;
	font-size: 16px;
	color: #333;
	margin-left: 15px;
}
.serve-make{
	background: url("../../images/sprite.png");
	background-position: -220px -70px;
}
.serve-backage{
	background: url("../../images/sprite.png");
	background-position: -0px -480px;
}
.serve-pay{
	background: url("../../images/sprite.png");
	background-position: -100px -480px;
}
.serve-refund{
	background: url("../../images/sprite.png");
	background-position: -200px -480px;
}


.footer-main {
	margin-top: 30px;
}
.footer-detail {
	float: left;
	padding-left: 50px;
	text-align:left;
	border-right: 1px solid #ccc;
}
.footer-detail > li {
	float: left;
	margin-right: 120px;
}
.footer-detail h2 {
	font-size: 16px;
	color: #333;
	font-weight: normal;
}

.footer-detail ul {
	margin-top: 30px;
}

.footer-detail ul li {
	margin-bottom: 10px;
}
.footer-detail a {
	font-size: 12px;
	color: #808080;
}

.footer-detail a:hover {
	color: #523669;
}
.footer-detail p {
	width: 105px;
	height: 105px;
	margin-top: 15px;
	border-radius: 4px;
	background: url(../../images/sprite.png);/* 二维码 */
	background-position:0px -595px;

}
.footer-contact dt {
	font-size: 16px;
    color: #333;
}

.footer-contact dd {
	margin-top: 30px;
	font-size: 12px;
    color: #808080;
}
.footer-info {
	margin-top: 60px;
	padding-bottom: 60px;
	line-height: 30px;
	font-size: 12px;
	color: #808080;
}
.footer-info p{
	color:#ccc;
}

/* 页脚部分 结束 */

</style>