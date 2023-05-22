<style scoped>
	.name {
		width: 15%;
	}

	.tag {
		width: 58rpx;
		height: 32rpx;
		background-color: #7F7F8C;
		color: #fff;
		border-radius: 0;
		font-size: 22rpx;
	}

	.tag-outer {
		width: 15%;
	}

	.bottom {
		border-top: 1px solid #d6d6d6;
		padding-top: 20rpx;
		font-size: 22rpx;
		color: #9FA0A4;
	}

	.bottom .u-icon {
		margin-right: 20rpx;
	}

	.info-center {
		width: 70%;
	}

	.info-right {
		width: 10%;
	}

	.item {
		background-color: #fff;
	}

	.c-address-card {
		padding-bottom: 200rpx;
	}
</style>
<template>
	<view class="c-address-card">
		<view class="item page-padding top-30" v-for="(item,index) in list" :key="index" @click="selectHandle(index)">
			<view class="row-between align-center">
				<view class="name">
					{{item.name}}
				</view>
				<view class="phone left-20 info-center">
					{{item.mobile}}
				</view>
				<view class="info-right row-end" @click="editAddr(item.id)">
					<u-icon name="edit-pen"></u-icon>
				</view>
			</view>
			<view class="row-between" style="margin-top: 14rpx;">
				<view class="tag-outer">
					<view class="tag center">
						公司
					</view>
				</view>

				<view class="adr left-20 info-center">
					{{item.detail}}
				</view>
				<view class="info-right"></view>
			</view>

			<view class="bottom row-between align-center top-24 ">
				<view class="row align-center">
					<u-icon name="checkmark-circle" size='26' v-if="!item.isDefault"></u-icon>
					<u-icon name="checkmark-circle-fill" size='26' v-else color='#038E3D'></u-icon>
					默认
				</view>
				<view class="" @click="deleteAddr(item.id,index)">
					删除
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import {
		deleteAddress
	} from '@/api/address.js'
	export default {
		props: {
			list: {
				type: Array
			}
		},
		data() {
			return {

			}
		},
		methods: {
			selectHandle(i) {
				this.$emit('select', i)
			},
			deleteAddr(id, index) {
				deleteAddress(id).then(res => {
					console.log(res)
					if (res && res.success == false) {
						uni.showToast({
							title: res.message,
							icon: 'error'
						})
						return
					}
					uni.showToast({
						title: '',
						icon: 'success'
					})
					this.list.splice(index, 1);

				})
			},
			editAddr(id) {
				uni.navigateTo({
					url: '/subMine/tools/addAddress?id=' + id
				})
			}
		}
	}
</script>
