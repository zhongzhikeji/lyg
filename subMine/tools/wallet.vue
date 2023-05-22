<style scoped>
	.top-bg {
		height: 500rpx;
		background: #038E3D;
	}

	/* 请根据实际需求修改父元素尺寸，组件自动识别宽高 */
	.charts-box {
		width: 100%;
		height: 500rpx;
		margin-top: -40vh;
	}

	.title-box {
		border-bottom: 1px solid #A5A8B6;
		padding-bottom: 20rpx;
	}

	.top-content {
		color: #fff;
	}

	.top-bottom {
		width: 80%;
		margin-top: 62rpx;
	}

	.options {
		margin-top: -60rpx;
		padding: 32rpx 0;
	}
</style>
<template>
	<view class="wallet">
		<u-navbar title="我的钱包" :background="nav_bg" :border-bottom='false' title-color='#fff' back-icon-color='#fff' :custom-back="back">
			<view class="" slot='right' style="color: #fff;padding-right: 26rpx;" @click="toGive">
				转赠
			</view>
		</u-navbar>
		<view class="top-bg">
			<view class="top-content center">
				<view class=" text-size-24" style="margin-top: 90rpx;">
					总余额（元）
				</view>
				<view class="bold" style="font-size: 52rpx;">
					{{balance.memberWallet+balance.memberFrozenWallet}}
				</view>
				<view class="row-around align-center top-bottom">
					<view class="center">
						<view class="bold">
							{{balance.memberWallet}}
						</view>
						<view class="text-size-24">
							可用余额
						</view>
					</view>
					|
					<view class="center">
						<view class="bold">
							{{nonWithdrawable}}
						</view>
						<view class="text-size-24">
							锁定余额
						</view>
					</view>
					|
					<view class="center">
						<view class="bold">
							{{residualLimit}}
						</view>
						<view class="text-size-24">
							剩余额度
						</view>
					</view>
				</view>
			</view>
		</view>



		<view class="page-padding">
			<view class="box options row-around align-center">
				<view class="center" @click="toPage('../wallet/recharge')">
					<view class="" style="width: 50rpx;height: 50rpx;">
						<image src="../../static/mine/recharge.png" mode=""></image>
					</view>
					<view class="text-size-24">
						充值
					</view>
				</view>
				<view class="center" @click="toPage('../wallet/withdraw')">
					<view class="" style="width: 50rpx;height: 50rpx;">
						<image src="../../static/mine/withdraw.png" mode=""></image>
					</view>
					<view class="text-size-24">
						提现
					</view>
				</view>
			</view>

			<view class="box top-30">
				<view class="page-padding">
					<view class="bold">
						钱包明细
					</view>
					<view class="record top-30">
						<view class="record-item row-between align-center top-24" v-for="(item,index) in records_list"
							:key="index" v-if="item.money!=0">
							<view class="">
								<view class="">
									{{item.serviceType}}
								</view>
								<view class="text-color-grey text-size-24">
									{{item.createTime}}
								</view>
							</view>
							<view class="bold text-color-theme text-size-32"
								:style="{color:item.money>0?'green':'red'}">
								{{item.money}}
							</view>
						</view>
						<view class="center text-size-24 text-color-grey" @click="loadMore">
							{{loadtext}}
						</view>
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import {
		getBalance,
		getRecords,
		getUserInfo
	} from '../../api/members'
	import {
		getWalletRecords
	} from '../../api/trade.js'

	import {
		timeHandle
	} from '@/utils/tools.js'
	export default {
		data() {
			return {
				chartData: {},
				nav_bg: {
					backgroundColor: "#048D3D"
				},
				balance: {},
				pageNumber: 1,
				pageSize: 10,
				records_list: [],
				loadtext: '加载更多',
				residualLimit: 0,
				nonWithdrawable: 0
			}
		},
		onReady() {
			this.records_list = []
			this.getBalance()
			this.getRecordsHandle()
			this.getUserInfo()
		},
		onLoad() {},
		methods: {
			back(){
			uni.switchTab({
				url: '/pages/tabbar/user/mine'
			})
			},
			getUserInfo() {
				getUserInfo().then(res => {
					console.log(res)
					this.residualLimit = res.residualLimit
					this.nonWithdrawable = res.nonWithdrawable
				})
			},
			loadMore() {
				this.pageNumber = this.pageNumber + 1
				this.getRecordsHandle()
			},
			toPage(link) {
				uni.navigateTo({
					url: link
				})
			},
			toGive() {
				uni.navigateTo({
					url: '../wallet/giveOthers'
				})
			},
			getBalance() {
				getBalance().then(balance => {
					console.log(balance)
					this.balance = balance

				})
			},
			getRecordsHandle() {
				var params = {
					pageNumber: this.pageNumber,
					pageSize: this.pageSize
				}
				getWalletRecords(params).then(res => {
					if (res.records.length == 0) {
						this.loadtext = '到底了'
					} else {
						this.records_list.push(...res.records)
					}
					// console.log(res)
				})
			}
		}
	}
</script>