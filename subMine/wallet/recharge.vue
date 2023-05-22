<template>
	<view class="recharge">
		<view class="bg-fff page-padding" style="margin-top: 18rpx;">
			<view class="">
				<view class="title text-size-28">
					请选择充值金额：
				</view>
				<view class="row-between flex-wrap">
					<view :class="item.is_selected==true?'money-item activity center':'money-item center'"
						v-for="(item,index) in money_list" :key="index" @click="moneySelect(index)">
						{{item.num}}
					</view>
				</view>
				<view class="title text-size-28" style="padding-bottom: 8rpx;">
					可自定义充值金额：
				</view>
				<view class="row-between align-center input-item">
					<view class="label">
						其他金额
					</view>
					<view class="">
						<input type="number" name="" id="" placeholder="请输入您要充值的金额" v-model="count">
					</view>
				</view>

				<!-- <view class="row-between align-center input-item">
					<view class="label">
						折扣码
					</view>
					<view class="">
						<input type="text" name="" id="" placeholder="请输入折扣码">
					</view>
				</view> -->


				<radio-group @change="payWayChange">
					<label class="pay-item row-between align-center" v-for="(item, index) in pay_list" :key="index">
						<view class="row align-center">
							<view class="pay-icon">
								<image src="../../static/mine/recharge_alipay.png" mode=""></image>
							</view>
							<view>{{item.name}}</view>
						</view>

						<view>
							<radio :value="index" :checked="index === current_pay" style="transform:scale(0.85)"
								color="green" />
						</view>
					</label>
				</radio-group>

				<view class="title text-size-28 top-68" style="padding-bottom: 8rpx;">
					充值说明：
				</view>
				<view class="text-size-28 top-24" style="color: #979797;">
					a)账户充值仅用于在线消费，请勿违规刷单<br>
					b) 账户充值仅限在线方式支付，充值金额实时到账<br>
					<!-- c)使用创元宇宙折扣码享受8折优惠<br>
					d)有问题请联系客服 -->
				</view>

				<view class="button top-110" style="border-radius: 12rpx;" @click="rechargeHandle">
					确认支付
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	const module = uni.requireNativePlugin('SandPayTypeModule')
	import {
		openCounter,
		initiatePay,
		createRechargeTrade
	} from '@/api/trade.js'
	export default {
		data() {
			return {
				money_list: [{
						num: 10,
						is_selected: true
					},
					{
						num: 50,
						is_selected: false
					},
					{
						num: 100,
						is_selected: false
					},
					{
						num: 200,
						is_selected: false
					},
					{
						num: 500,
						is_selected: false
					},
					{
						num: 1000,
						is_selected: false
					}
				],
				count: 10,
				IP: '',
				current_pay: 0,
				pay_list: [{
					name: '支付宝支付',
					payerType: 'ALIPAY'
				}]
			}
		},
		onLoad() {
			uni.request({
				url: 'http://pv.sohu.com/cityjson?ie=utf-8',
				method: 'POST',
				success: (res) => {
					const reg = /\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}/;
					let ip = reg.exec(res.data);
					this.IP = ip
					console.log(ip[0]);
				}
			})
		},
		methods: {
			payWayChange(e) {
				this.current_pay = e.detail.value
			},
			moneySelect(i) {
				this.money_list.forEach((item, index) => {
					if (index == i) {
						item.is_selected = true
						this.count = item.num
					} else {
						item.is_selected = false
					}
				})
			},
			rechargeHandle() {
				createRechargeTrade({
					price: this.count
				}).then(res => {
					if (res.success == false) {
						uni.showToast({
							title: res.message,
							icon: 'none'
						})
					} else {
						console.log()
						var obj = {
							clientType: 'APP',
							orderType: 'RECHARGE',
							sn: res.rechargeSn,
							payerType: this.pay_list[this.current_pay].payerType
						}
						initiatePay('SANDPAY', 'H5', obj).then(orderArg => {
							console.log(orderArg)
							// var params = {
							// 	charset: 'utf-8',
							// 	data: orderArg.data.result.data,
							// 	signType: '01',
							// 	sign: orderArg.data.result.sign
							// }
							// openCounter(params).then(counter_res => {
							// 	console.log(counter_res)
							// 	uni.navigateTo({
							// 		url: '/pages/payAfter?content=' + counter_res.data
							// 	})
							// })
							// var result = {
							// 	"create_ip": "47_108_53_23",
							// 	"store_id": "余额充值",
							// 	"pay_extra": "{\"userId\":\"1640760566100922368\"}",
							// 	"goods_name": "余额充值",
							// 	"mer_no": "6888802119929",
							// 	"create_time": "2023-04-05T20:08:10.332+08:00",
							// 	"meta_option": "[{\"s\":\"Android\",\"n\":\"\",\"id\":\"\",\"sc\":\"\"},{\"s\":\"IOS\",\"n\":\"\",\"id\":\"\",\"sc\":\"\"}]",
							// 	"sign": "FP3zFjI7%2BxN6d6O1Qt9OsQY2GJhu7vesyMJXDCbz%2BWwmO8m7dYpLIngdQe%2Bkz0Ttsy%2BnyX2f%2Bnrp7gKx3YSZCFMQ4BjVITvKi6LDXeSld9py%2FEO9yEMOSCe7hO6dtsi7UMoi05scANIWt3E82UXuGhas4tO%2F0d5FpT8I%2BIaHtK2DJCGJQIyRKhMoZaWQ6juX0U%2FX%2FeYma8uW7YpVQo4OwpTt%2FQE4ckZ4HqlCkptW9Wu1PyPcuWxa7NxD0bj3RatYOn7dGp5BKOl31VFgMqHvK%2BDppdPbyEbfNKMytuQFQ1rsduWGVmxfJPlyxSvQEaqdNEDMGQH24XWePtSKmA0BMw%3D%3D",
							// 	"expire_time": "20230405210810",
							// 	"notify_url": "http://dev-api-buyer.lvyanhui.com/buyer/payment/cashier/notify/SANDPAY",
							// 	"jump_scheme": "sandcash://scpay",
							// 	"product_code": "02020004",
							// 	"version": "1.0",
							// 	"accsplit_flag": "NO",
							// 	"extend": "{\"payment\":{\"clientType\":\"APP\",\"orderType\":\"RECHARGE\",\"payerType\":\"ALIPAY\",\"sn\":\"Y1643586322633826304\"}}",
							// 	"return_url": "http://商户前台跳转地址",
							// 	"clear_cycle": "3",
							// 	"order_amt": 1,
							// 	"sign_type": "RSA",
							// 	"mer_order_no": "Y1643586322633826304"
							// }
							// console.log(module)
							module.cashierPaySingle(orderArg.data.result, ret => {
								console.log(ret)
							})
						})
					}
				})
				// var obj = {
				// 	clientType: 'APP',
				// 	orderType: 'RECHARGE',
				// 	sn: 'LYGQQ-' + Date.now()
				// }
				// initiatePay('SANDPAY', 'H5', obj).then(res => {
				// 	console.log(res)
				// })
				// getOrderArg().then(res => {
				// 	uni.navigateTo({
				// 		url: '/pages/payAfter?content=' + res.data
				// 	})
				// 	console.log(res)
				// }).catch(err => {
				// 	console.log(err)
				// })
				// var obj = {
				// 	version: '10', //版本号
				// 	mer_no: '6888802119929', //商户号
				// 	mer_order_no: 'LYGQQ_' + new Date().getTime(), //商户订单号
				// 	create_time: new Date().getTime(), //订单创建时间
				// 	order_amt: this.count, //订单金额
				// 	notify_url: 'https://uniapp.dcloud.net.cn/api/plugins/payment.html#%E7%A4%BA%E4%BE%8B', //异步通知地址
				// 	return_url: 'https://uniapp.dcloud.net.cn/api/plugins/payment.html#%E7%A4%BA%E4%BE%8B', //前台跳转地址
				// 	create_ip: this.IP, //客户端IP
				// 	pay_extra: '{}', //支付扩展域
				// 	accsplit_flag: 'NO', //分账标识
				// 	sign_type: 'RSA', //签名类型，默认RSA
				// 	store_id: '000000', //门店号，没有就填默认值000000
				// 	expire_time: new Date().getTime() +
				// 		180000, //expire_time订单失效时间 yyyyMMddHHmmss例20180813142415，建议设置0.5～1小时
				// 	goods_name: '余额充值', //商品名称
				// 	product_code: '04010003', //产品编码例02020004
				// 	clear_cycle: '3', //清算模式例 :  "clear_cycle"="3";3-D1;0-T1;1-T0;2-D0
				// 	sign: 'vdfntyehnrhmnneutymnety', //签名结果安全起见，建议商户私钥存放在服务端，整个加签过程在服务端完成
				// 	jump_scheme: 'sandcash://scpay', //跳转scheme 没有就填默认值sandcash://scpay
				// 	meta_option: '[{"s":"Android","n":"","id":"","sc":""},{"s":"IOS","n":"","id":"","sc":""}]' //终端/网站参数本参数填文档示例值就可以
				// }

				// const module = uni.requireNativePlugin('SandPayTypeModule')
				// module.CashierPaySingle(obj, ret => {
				// 	console.log(ret)
				// })
			}
		}
	}
</script>

<style scoped>
	.pay-item {
		margin-top: 20rpx;
	}

	.pay-icon {
		width: 50rpx;
		height: 50rpx;
		margin-right: 30rpx;
	}

	input {
		font-size: 28rpx;
	}

	.input-item {
		padding: 24rpx 0;
		border-bottom: 1px solid #ececec;
	}

	.label {
		font-size: 28rpx;
		font-weight: 400;
		color: #979797;
	}

	.title {
		color: #1F1F1F;
		padding: 36rpx 0 32rpx 0;
	}

	.money-item {
		width: 210rpx;
		height: 130rpx;
		border-radius: 16rpx;
		border: 1rpx solid #828282;
		font-size: 32rpx;
		margin-bottom: 20rpx;
	}

	.activity {
		border: 1rpx solid #9B0000;
		background: #FFE6E2;
	}
</style>