<template>
	<view class="points page-padding">
		<view class="box top-24" style="padding: 28rpx 0;position: relative;" v-for="(item,index) in list" :key="index">
			<view class="infos-show" @click="lookInfos(index)">
				查看详情
			</view>
			<view class="text-size-28 bold title">
				<text>特惠订单{{index+1}}</text>
			</view>
			<view class="top-12" style="padding: 0 48rpx;">
				<view class="text-size-28 text-color-grey bold">
					<view class="">
						金额：<text class="text-color-red text-size-24">￥{{item.amount}}</text>
					</view>
					<view class="top-12">
						时间：{{item.updateTime?timeHandle(item.updateTime):timeHandle(item.createTime)}}
					</view>
				</view>
				<view class="top-24 table-area" style="background-color: #F3F5F8;" v-if="item.is_select==true">
					<view class="center text-size-22 text-color-grey" v-if="item.memberNodesVOS.length==0">
						无订单详情
					</view>
					<view class="row align-center item" v-for="(item2,index2) in item.memberNodesVOS" :key="index2">
						<view class="center">
							{{index2+1}}
						</view>
						<view class="center">
							{{item2.leftCount?item2.leftCount:0}}
						</view>
						<view class="center">
							{{item2.rightCount?item2.rightCount:0}}
						</view>
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import {
		getPointList
	} from '@/api/order.js'

	import {
		timeHandle
	} from '@/utils/tools.js'
	export default {
		data() {
			return {
				list: []
			}
		},
		// watch: {
		// 	list: (n, old) => {
		// 		console.log(n, old)
		// 	}
		// },
		onLoad() {
			this.getPointListHandle()
		},
		methods: {
			timeHandle(time) {
				// time.split('T')[0] + time.split('T')[1].split('.')[0]
				return timeHandle(time)
			},
			lookInfos(i) {
				this.list.forEach((item, index) => {
					if (index == i) {
						item.is_select = !item.is_select
					}
				})
				this.$forceUpdate();
			},
			getPointListHandle() {
				getPointList().then(res => {
					console.log(res)
					console.log(new Date())
					this.list.push(...res)
					this.list = this.list.reverse()
					this.list.forEach((item) => {
						item.is_select = false
					})
				})
			}
		}
	}
</script>

<style scoped>
	.infos-show {
		position: absolute;
		right: 0;
		top: 26rpx;
		background-color: #1CAF44;
		color: #fff;
		font-size: 22rpx;
		border-radius: 100px 0 0 100px;
		padding: 6rpx 22rpx;
	}

	.title {
		padding-bottom: 16rpx;
		border-bottom: 1px solid #efefef;
	}

	.title text {
		padding: 0 48rpx;
		border-left: 8rpx solid #1CAF44;
	}

	.item view {
		width: 33.3%;
		height: 50rpx;
		border-right: 1px solid #dddddd;
		border-bottom: 1px solid #dddddd;
		font-size: 22rpx;
		color: #979797;
	}

	.item view:nth-child(3n+1) {
		border-left: 1px solid #dddddd;
	}

	.item:first-child {
		border-top: 1px solid #dddddd;
	}
</style>