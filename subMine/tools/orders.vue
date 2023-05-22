<style scoped>
	.top {
		background-color: #fff;
	}

	.nav {
		height: 130rpx;
		background: #fff;
		font-size: 40rpx;
		padding: 40rpx 26rpx;
	}
</style>
<template>
	<view class="orders">
		<view class="row-between nav">
			<view class="" @click="backHandle"> < </view>
					<view class="">订单</view>
					<view class=""></view>
			</view>
			<view class="page-padding top">
				<u-search placeholder="请输入你要的商品" v-model="keyword" :showAction="false" height="66" searchIconSize='44'>
				</u-search>
				<view class="top-30">
					<c-tabs :list="tabs_list" bgStyle="#048D3D" @change='getCurrentTab'></c-tabs>
				</view>
			</view>
			<view class="page-padding">
				<c-order-card :list='order_list' @details='details'></c-order-card>
			</view>
		</view>
</template>

<script>
	import {
		getOrderList
	} from '@/api/order.js'
import { getComplainReason } from '../../api/after-sale'
	export default {
		data() {
			return {
				keyword: '',
				order_list: [],
				tabs_list: [{
						name: '全部'
					},
					{
						name: '待付款'
					},
					// {
					// 	name: '待发货'
					// },
					{
						name: '待收货'
					},
					// {
					// 	name: '待评价'
					// }
				],
				send_list: [],
				comment_list: [],
				pageNumber: 1,
				pageSize: 10,
				list: {
					ALL_list: [],
					WAIT_PAY_list: [],
					WAIT_ROG_list: []
				}
			}
		},
		onLoad() {
			this.getOrderList('ALL')
		},
		onBackPress() {
			console.log('back')
			uni.switchTab({
				url: '/pages/tabbar/home/index'
			})
		},
		methods: {
			details(item){
				uni.navigateTo({
				  url: '/pages/order/orderDetail?sn=' + item,
				});
			console.log(item)
			},
			getCurrentTab(e) {
				this.list = {
					ALL_list: [],
					WAIT_PAY_list: [],
					WAIT_ROG_list: []
				}
				if (e == 0) {
					this.getOrderList('ALL')
				}
				if (e == 1) {
					this.getOrderList('WAIT_PAY')
				}
				if (e == 2) {
					this.getOrderList('WAIT_ROG')
				}
				// if(e==3){
				// 	this.getOrderList('ALL')
				// }
				// if(e==4){
				// 	this.getOrderList('ALL')
				// }
			},
			backHandle() {
				console.log('111')
				uni.switchTab({
					url: '/pages/tabbar/home/index'
				});
			},
			getOrderList(status) {
				var params = {
					pageNumber: this.pageNumber,
					pageSize: this.pageSize,
					tag: status
				}
				console.log(params)
				getOrderList(params).then(res => {
					console.log(res)
					this.list[status + '_list'].push(...res.records)
					console.log(this.list)
					this.order_list = this.list[status + '_list']
					console.log(this.order_list)
				})

			}
		}
	}
</script>