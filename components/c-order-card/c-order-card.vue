<template>
	<view class="c-order-card">
		<view class="item box page-padding" v-for="(item,index) in list" :key="index" @click="orderDetail(item.sn)">
			<view class="row-between align-center">
				<view class="row align-center">
					<view class="icon-shop">
						<image src="../../static/logo.png" mode=""></image>
					</view>
					<view class="bold">
						{{item.storeName}}
					</view>
					<u-icon name="arrow-right"></u-icon>
				</view>
				<view class="text-size-24 text-color-theme">
				
					{{item.orderStatus=='UNPAID'?'待付款':item.orderStatus =='PAID'?'已付款':item.orderStatus=='UNDELIVERED'?'已付款,待发货':
					item.orderStatus=='DELIVERED'?'已发货':item.orderStatus=='COMPLETER'?'已完成':'已取消'}}
				</view>
			</view>
			<view class="top-24">
				<!-- <view class="tag">
					特惠
				</view> -->
				<view class="text-size-24 text-color-grey left-20">
					订单号：{{item.orderItems[0].sn}}
				</view>
				<view class="text-size-24 text-color-grey left-20">
					时间：{{item.createTime}}
				</view>
			</view>
			<view class="row-between top-24">
				<view class="pic">
					<image :src="item.orderItems[0].image.split('?')[0]" mode=""></image>
				</view>
				<view class="column-between info">
					<view class="bold">
						{{item.orderItems[0].name}}
					</view>
					<view class="column-end align-end">
						<view class="text-color-grey text-size-24">
							×{{item.orderItems[0].num}}
						</view>
						<view class="">
							<text class="text-color-grey text-size-24">共{{item.orderItems[0].num}}件商品，实付：</text><text
								class="text-size-24 text-color-red">￥</text><text
								class="text-color-red">{{item.orderItems[0].goodsPrice}}</text>
						</view>
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		props: ['list'],
		data() {
			return {

			}
		},
		methods: {
          orderDetail(item){
			  this.$emit('details',item)
		  }
		}
	}
</script>

<style scoped>
	.tag {
		padding: 6rpx 20rpx;
		border-radius: 16rpx;
		background-color: #E02514;
		color: #fff;
		font-size: 24rpx;
	}

	.pic {
		width: 180rpx;
		height: 180rpx;
	}

	.info {
		width: 450rpx;
	}
</style>
