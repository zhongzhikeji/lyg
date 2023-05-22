<style scoped>
	.button {
		border-radius: 12rpx;
	}

	.button-outer {
		position: fixed;
		bottom: 70rpx;
		width: 90%;
		left: 50%;
		transform: translateX(-50%);
	}

	.address {
		position: relative;
		height: 100vh;
	}
</style>
<template>
	<view class="address">
		<c-address-card :list='list' @select='getSelectedHandle'></c-address-card>
		<view class="page-padding button-outer">
			<view class="button" @click="toAddPage">
				添加新地址
			</view>
		</view>

	</view>
</template>

<script>
	import {
		getAddressList
	} from '@/api/address.js'
	import {
		setAddressId
	} from '@/api/trade.js'
	export default {
		data() {
			return {
				list: [],
				routerVal: {},
				selectedId: 0
			}
		},
		onLoad(o) {
			this.routerVal = o
			console.log(o)
		},
		onShow() {
			this.getAddr()
		},
		methods: {
			getSelectedHandle(val) {
				if (this.routerVal.way) {
					setAddressId(this.list[val].id, this.routerVal.way).then(res => {
						console.log(res)
						uni.navigateBack({
							delta: 1,
						});
					})
				}

			},
			selectHandle() {

			},
			getAddr() {
				getAddressList(1, 10).then(res => {
					console.log(res)
					this.list.push(...res.records)
				})
			},
			toAddPage() {
				uni.navigateTo({
					url: '/subMine/tools/addAddress'
				})
			}
		}
	}
</script>
