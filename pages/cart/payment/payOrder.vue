<template>
	<div class="wrapper">
	<!-- 	<view class="row-between nav">
			<view class="" @click="backHandle">
				< </view>
					<view class="">支付订单</view>
					<view class=""></view>
			</view> -->
			<u-navbar back-text="返回" title="支付订单" :custom-back='backHandle'></u-navbar>
			<div class="box">
				<div class="block block-1">
					<image class="img" src="@/pages/cart/static/pay.png" />
					<p class="ptips">收银台</p>

					<!-- <p class="ptips">剩余支付时间：
					<u-count-down :show-days="false" :show-border="true" font-size="28" color="#008ffa"
						border-color="#008ffa" ref="uCountDown" :timestamp="autoCancel"></u-count-down>
				</p> -->
					<p class="ptips">
						支付金额
						<span>¥{{ routerVal.price }}</span>
					</p>
				</div>
			</div>
			<div class="__pay_form__">
			</div>
			<view class="page-padding">
				<div class="payItem">支付方式</div>
				<radio-group @change="payWayChange">
					<label class="pay-item row-between align-center" v-for="(item, index) in pay_list" :key="index">
						<view class="row align-center">
							<view class="pay-icon">
								<image :src="item.icon" mode=""></image>
							</view>
							<view>{{item.name}}</view>
						</view>

						<view>
							<radio :value="index" :checked="index === current_pay" style="transform:scale(0.85)"
								color="green" />
						</view>
					</label>
				</radio-group>

				<view class="button top-110" @click="payHandle()">
					去支付
				</view>
			</view>

			<div class="block-4" v-if="cashierParams.price > 0">
				<!-- <div class="payItem">支付方式</div> -->
				<!-- <div class="payItem" v-for="(item, index) in payList" :key="index">
				<u-row class="row">
					<div class="col1" @click="awaitPay(item, index)" size="100" style="text-align:left;">
						<div v-if="item == 'ALIPAY'">
							<u-icon class="method_icon" name="zhifubao-circle-fill" color="#008ffa" size="80"></u-icon>
							<span class="method_name">支付宝</span>
						</div>
						<div v-if="item == 'WECHAT'">
							<u-icon class="method_icon" name="weixin-circle-fill" color="#00c98b" size="80"></u-icon>
							<span class="method_name">微信</span>
						</div>
						<div v-if="item == 'WALLET'">
							<u-icon class="method_icon" name="red-packet-fill" color="#dd6161" size="80"></u-icon>
							<span class="method_name">余额支付(当前余额：¥{{ walletValue | unitPrice }})</span>
						</div>
					</div>
					<div class="col3" @click="awaitPay(item)" textAlign="right">
						<u-icon size="26" color="#b1b1b1" name="arrow-right"></u-icon>
					</div>
				</u-row>
			</div> -->
			</div>
			<u-toast ref="uToast" />
	</div>
</template>
<script>
	// import * as API_Trade from "@/api/trade";
	import {
		payCallback
	} from '@/api/members'
	const module = uni.requireNativePlugin('SandPayTypeModule')
	import {
		openCounter,
		initiatePay,
		createRechargeTrade
	} from '@/api/trade.js'
	export default {
		data() {
			return {
				//路径传参
				routerVal: "",
				//收银台参数
				cashierParams: "",
				//支付方式集合
				payList: "",
				//支付sn
				sn: "",
				//订单类型
				orderType: "",
				//支付异常
				exception: {},
				//支付表单
				payForm: {},
				//支付类型 APP/WECHAT_MP/H5/NATIVE app/微信小程序/h5/二维码
				paymentType: "",
				// 支付客户端 APP/NATIVE/JSAPI/H5
				paymentClient: "",
				//余额
				walletValue: 0.0,
				// 支付倒计时
				autoCancel: 0,
				current_pay: 0,
				pay_list: [{
						name: '支付宝支付',
						payerType: 'ALIPAY',
						icon: '../../../static/mine/recharge_alipay.png'
					},
					{
						name: '余额支付',
						payerType: 'WALLET',
						icon: '../../../static/mine/recharge_balance.png'
					}
				]

			};
		},
		onLoad(val) {
			this.routerVal = val;
			console.log(this.routerVal.price)

			//初始化参数
			// #ifdef APP-PLUS
			this.paymentType = "APP";
			this.paymentClient = "APP";
			//#endif
			// #ifdef MP-WEIXIN
			this.paymentType = "WECHAT_MP";
			this.paymentClient = "MP";
			//#endif
			// #ifdef H5
			this.paymentType = "H5";
			//如果是微信浏览器，则使用公众号支付，否则使用h5，
			// 区别是：h5是通过浏览器外部调用微信app进行支付，而JSAPI则是 在微信浏览器内部，或者小程序 调用微信支付
			this.paymentClient = this.isWeiXin() ? "JSAPI" : "H5";
			//#endif



			// 
		},
		mounted() {
			// this.cashierData();
		},
		methods: {
			backHandle() {
				if (this.routerVal.recharge_sn) {
					uni.switchTab({
						url: '/pages/tabbar/user/mine'
					});
				} else {
					uni.navigateTo({
						url: "/subMine/tools/orders?type=pay",
					});
					// /pages/order/myOrder?status=0
				}
			},
		payHandle() {
			var obj = {
				clientType: '',
				orderType: 'TRADE',
				sn: this.routerVal.trade_sn,
				payerType: this.pay_list[this.current_pay].payerType
			}
			 
			console.log(this.pay_list[this.current_pay].payerType)
			if(this.pay_list[this.current_pay].payerType === 'ALIPAY'){
				initiatePay('SANDPAY', 'H5', obj).then(orderArg => {
					console.log(orderArg,444)
					module.cashierPaySingle(orderArg, ret => {
						console.log(ret)
					})
				})
			}else if(this.pay_list[this.current_pay].payerType === 'WALLET'){
		
				obj.clientType = 'PC'
				initiatePay('WALLET', 'NATIVE', obj).then(orderArg => {
				     console.log(orderArg,345)
					 
					 if(orderArg.data.code == 32001){
						 this.$refs.uToast.show({
						 		title: orderArg.data.message,
						 	    type: 'success',
						 						
						 })
				
					 	setTimeout(()=>{
							uni.navigateTo({
								url: "/subMine/tools/orders?type=pay",
							});
						},500)
				
					 }else{
						 
						 this.$refs.uToast.show({
						 		title: orderArg.data.message,
						 	    type: 'error',
						 						
						 })
					 }
				
					// module.cashierPaySingle(orderArg.data.result, ret => {
					
					// 	console.log(ret)
					// })
				
					
				}
				)
			}
		
		
		},



			payWayChange(e) {
				console.log(e)
				this.current_pay = e.detail.value
			},
			/**
			 * 支付成功后跳转
			 */
			callback(paymentMethod) {
				uni.navigateTo({
					url: "/pages/cart/payment/success?paymentMethod=" +
						paymentMethod +
						"&payPrice=" +
						this.cashierParams.price +
						"&orderType=" + this.orderType
				});
			},

			/**
			 * 获取收银详情
			 */
			cashierData() {
				let parms = {};

				if (this.routerVal.recharge_sn) {
					// 判断当前是否是充值
					this.sn = this.routerVal.recharge_sn;
					this.orderType = "RECHARGE";

				} else if (this.routerVal.trade_sn) {
					this.sn = this.routerVal.trade_sn;
					this.orderType = "TRADE";
				} else {
					this.sn = this.routerVal.order_sn;
					this.orderType = "ORDER";
				}
				parms.sn = this.sn;
				parms.orderType = this.orderType;
				parms.clientType = this.paymentType;

				API_Trade.getCashierData(parms).then((res) => {
					console.log(res)
					if (res.message) {
						uni.showToast({
							title: res.message,
							icon: 'none'
						})
						return
					}
					if (res.autoCancel) {
						this.cashierParams = res;

						// #ifdef MP-WEIXIN
						this.payList = res.support.filter((item) => {
							return item != "ALIPAY";
						});
						// #endif


						if (this.routerVal.recharge_sn) {
							this.payList = res.support.filter((item) => {
								return item != "WALLET";
							})
						} else {
							this.payList = res.support;
						}
						// #ifdef H5
						//判断是否微信浏览器
						var ua = window.navigator.userAgent.toLowerCase();
						if (ua.match(/MicroMessenger/i) == 'micromessenger') {

							this.payList = res.support.filter((item) => {
								return item != "ALIPAY";
							});
							// 充值的话仅保留微信支付
							if (this.orderType == "RECHARGE") {
								this.payList = res.support.filter((item) => {
									return item == "WECHAT";
								});
							}

						}
						// #endif




						this.walletValue = res.walletValue;
						this.autoCancel =
							(res.autoCancel - new Date().getTime()) / 1000;
					} else if (res.code == 32000) {
						setTimeout(() => {
							uni.redirectTo({
								url: `/pages/order/myOrder?status=0`
							});
						}, 500)

					}
				});
			},


			awaitPay(payment) {
				this.$u.throttle(() => {
					this.pay(payment)
				}, 2000)
			},

			//订单支付
			async pay(payment) {

				// 支付编号
				const sn = this.sn;
				// 交易类型【交易号|订单号】
				const orderType = this.orderType;

				const clientType = this.paymentType;
				let params = {
					sn,
					orderType,
					clientType,
				};

				//支付方式 WECHAT/ALIPAY
				const paymentMethod = payment;
				// 客户端类型 APP/NATIVE/JSAPI/H5
				const paymentClient = this.paymentClient;

				uni.showLoading({
					title: "正在唤起支付...",
					mask: true
				});

				// #ifdef APP-PLUS
				//APP pay
				// 初始化支付签名
				await API_Trade.initiatePay(paymentMethod, paymentClient, params).then(
					(signXml) => {
						uni.hideLoading();
						//如果支付异常
						console.log(signXml)
						// if (signXml != undefined && !signXml.success) {

						// 	return;
						// }
						if (signXml !== undefined) {
							console.log('cccc')
							uni.showToast({
								title: signXml.message,
								icon: "none",
								duration: 2000
							});
						} else {
							console.log('222')
							let payForm = signXml;
							let paymentType = paymentMethod === "WECHAT" ? "wxpay" : "alipay";
							console.log(paymentMethod)
							uni.showToast({
								icon: "none",
								title: "支付成功!",
							});
							this.callback(paymentMethod)

							// if (paymentMethod === "WALLET") {
							// 	console.log('wallet')
							// 	uni.showToast({
							// 		icon: "none",
							// 		title: "支付成功!",
							// 	});
							// 	this.callback(paymentMethod)
							// } else {
							// 	uni.requestPayment({
							// 		provider: paymentType,
							// 		orderInfo: payForm || '',
							// 		success: (e) => {
							// 			uni.showToast({
							// 				icon: "none",
							// 				title: "支付成功!",
							// 			});
							// 			this.callback(paymentMethod)
							// 		},
							// 		fail: (e) => {
							// 			console.log(this);
							// 			this.exception = e;
							// 			uni.showModal({
							// 				content: "支付失败,如果您已支付，请勿反复支付",
							// 				showCancel: false,
							// 			});
							// 		},
							// 	});
							// }
						}
						// if (signXml === undefined) {

						// } else {

						// }

					}
				);
				//APP pay
				// #endif

				//#ifdef H5
				//H5 pay
				await API_Trade.initiatePay(paymentMethod, paymentClient, params).then(
					(res) => {
						console.log(res)
						let response = res;
						//如果非支付宝支付才需要进行判定，因为支付宝h5支付是直接输出的，没有返回所谓的消息状态
						if (paymentMethod !== "ALIPAY") {
							//如果支付异常
							if (response && !response.success) {
								uni.showToast({
									title: response.message,
									duration: 2000,
									icon: "none"
								});
								return;
							}
						}
						if (paymentMethod === "ALIPAY") {
							document.write(response);
						} else if (paymentMethod === "WECHAT") {
							if (this.isWeiXin()) {
								//微信公众号支付
								WeixinJSBridge.invoke(
									"getBrandWCPayRequest",
									response,
									(res) => {
										if (res.err_msg == "get_brand_wcpay_request:ok") {
											// 使用以上方式判断前端返回,微信团队郑重提示：
											//res.err_msg将在用户支付成功后返回ok，但并不保证它绝对可靠。
											uni.showToast({
												icon: "none",
												title: "支付成功!",
											});
											this.callback(paymentMethod)

										} else {
											uni.showModal({
												content: "支付失败,如果您已支付，请勿反复支付",
												showCancel: false,
											});
										}
									}
								);
							} else {
								window.location.href = JSON.parse(response).h5_url;
							}
						} else if (paymentMethod === "WALLET") {
							uni.showToast({
								title: response.message,
								icon: "none",
							});
							if (response.success) {
								this.callback(paymentMethod)
							}
						}
					}
				);
				//H5pay
				// #endif

				//#ifdef MP-WEIXIN
				//微信小程序
				await API_Trade.initiatePay(paymentMethod, paymentClient, params).then(
					(res) => {
						let response = res.data.result;
						//如果支付异常
						if (!res.data.success) {
							uni.showModal({
								content: res.data.message,
								showCancel: false,
							})
							return;
						}
						if (paymentMethod === "WECHAT") {
							uni.requestPayment({
								provider: "wxpay",
								appid: response.appid,
								timeStamp: response.timeStamp,
								nonceStr: response.nonceStr,
								package: response.package,
								signType: response.signType,
								paySign: response.paySign,
								success: (e) => {
									console.log(e);
									uni.showToast({
										icon: "none",
										title: "支付成功!",
									});
									this.callback(paymentMethod)

								},
								fail: (e) => {
									console.log(e);
									this.exception = e;
									uni.showModal({
										content: "支付失败,如果您已支付，请勿反复支付",
										showCancel: false,
									});
								},
							});
						} else {
							uni.showToast({
								icon: "none",
								title: "支付成功!",
							});
							this.callback(paymentMethod)

						}
					}
				);
				// #endif
			},
			isWeiXin() {
				var ua = window.navigator.userAgent.toLowerCase();
				if (ua.match(/MicroMessenger/i) == "micromessenger") {
					return true;
				} else {
					return false;
				}
			},
		},
	};
</script>
<style scoped lang="scss">
	.nav {
		height: 200rpx;
		background: #fff;
		font-size: 40rpx;
		padding: 50rpx 26rpx;
	}

	.pay-item {
		margin-top: 20rpx;
		// padding: 0 20rpx;
	}

	// .pay-item:nth-child(2) .pay-icon image {
	// 	width: 120%;
	// 	height: 120%;
	// }

	.pay-icon {
		width: 50rpx;
		height: 50rpx;
		margin-right: 30rpx;
	}

	.method_icon {
		vertical-align: middle;
	}

	.method_name {
		font-size: 28rpx;
		color: #999;
		padding-left: 24rpx;
	}

	.row {
		display: flex;
		width: 100%;
	}

	/deep/ .u-row {
		width: 100% !important;
		display: flex;
		justify-content: space-between !important;
	}

	.method_name,
	.col1 {
		overflow: hidden;
		text-overflow: ellipsis;
		white-space: nowrap;
	}

	.col1 {
		text-align: center;
		flex: 99;
	}

	.col3 {
		text-align: right;
		flex: 1;
	}

	.payItem {
		padding: 13px 0rpx;
		border-top: 1px solid #f9f9f9;

		line-height: 100rpx;
		font-size: 36rpx;
		color: #333;
	}

	.ptips {
		font-size: 32rpx;
		margin: 20rpx 0;
		color: #333;

		>span {
			font-size: 40rpx;
			color: #df5a52;
			margin-left: 10rpx;
		}
	}

	.img {
		width: 392rpx !important;
		height: 296rpx !important;
	}

	.wrapper {
		min-height: 100vh;
		height: auto;
		background: #f9f9f9;
	}

	.block-4 {
		background: #fff;
		color: $u-tips-color;

		>p {
			padding: 8rpx;
		}
	}

	.box {
		background: #fff;
		padding: 40rpx 0;
		//   justify-content: center; //这个是X轴居中
		//   align-items: center; //这个是 Y轴居中
	}

	.block {
		text-align: center;
		display: block;
		width: 100%;

		image {
			width: 200rpx;
			height: 200rpx;
		}
	}

	.block-1 {
		margin-top: 80rpx;
	}

	.btns {
		margin: 0 20rpx;
	}
</style>