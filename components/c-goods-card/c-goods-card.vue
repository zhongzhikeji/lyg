<style scoped>
	.item {
		width: 47.5%;
		background-color: #fff;
		border-radius: 16rpx;
		overflow: hidden;
		margin-top: 32rpx;
	}

	.pic {
		width: 100%;
		height: 290rpx;
	}

	.before-price {
		text-decoration: line-through;
		color: #9A9C99;
		font-size: 20rpx;
	}

	.price {
		color: #EC1B0E;
		font-size: 28rpx;
	}

	.price text {
		font-size: 20rpx;
	}

	.btn {
		width: 50rpx;
		height: 50rpx;
	}

	.name {
		font-size: 24rpx;
		font-weight: bold;
	}

	.u-icon__icon {
		font-size: 32rpx;
	}
</style>
<template>
	<view class="c-goods-card row-between flex-wrap">
		<view class="item" v-for="(item,index) in list" :key="index" @click="currentGoodsHandle(index)">
			<view class="pic">
				<image :src="picHandle(item.small)" mode=""></image>
			</view>
			<view class="page-padding">
				<view class="name text-ellipsis-2">
					{{item.goodsName}}
				</view>
				<view class="row-between align-end">
					<view class="">
						<view class="price bold top-8">
							<text>￥</text> {{item.price}}
						</view>
						<!-- <view class="before-price top-8">
						
							<text>￥</text>99999
						</view> -->
					</view>
				<!-- 	<view class="btn round bg-theme center" @click.stop="addCartHandle(index)">
						<image src="@/static/index/icon_cart.png" mode=""></image>
					</view> -->
				</view>
			</view>
		</view>
	</view>
</template>

<script>
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
			picHandle(path) {
				return path.split('?')[0]
			},
			currentGoodsHandle(index) {
				this.$emit('current', index)
			},
			addCartHandle(index) {
				this.$emit('addCard', index)
			}
		}
	}
</script>