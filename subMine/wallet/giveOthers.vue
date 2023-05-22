<template>
	<view class="give-others page-padding">
		<view class="box">
			<!-- <u-field v-model="form.username" label="发送账户" placeholder="请输入对方用户名"></u-field> -->
			<u-field v-model="form.mobile" label="对方账户" placeholder="请输入对方手机号"></u-field>
			<u-field v-model="form.price" label="赠送数量" placeholder="请输入赠送余额的数量"></u-field>
			<view class="page-padding">
				<view class="text-color-theme give-others-tag text-size-24 center">
					可用余额：{{balance}}
				</view>
			</view>

			<view class="page-padding">
				<view class="button top-68" @click="giveHandle">
					赠送
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import {
		getBalance
	} from '../../api/members'
	import {
		numShowHandle
	} from '@/utils/tools.js'
	import {
		giveOthers
	} from '../../api/trade.js'
	export default {
		data() {
			return {
				form: {
					mobile: '',
					price: ''
				},
				balance: {}
			}
		},
		onReady() {
			this.getBalance()
		},
		methods: {
			getBalance() {
				getBalance().then(balance => {
					console.log(balance)
					this.balance = balance.memberWallet
				})
			},
			giveHandle() {
				giveOthers(this.form).then(res => {
					console.log(res)
					if (res && res.success == false) {
						uni.showToast({
							title: res.message,
							icon: "none"
						})
						return
					}
					uni.showToast({
						title: '',
						icon: "success"
					})
					this.getBalance()
				})
			}
		}
	}
</script>

<style scoped>
	.give-others-tag {
		background-color: #F4F6F8;
		width: 230rpx;
		height: 65rpx;
	}
</style>