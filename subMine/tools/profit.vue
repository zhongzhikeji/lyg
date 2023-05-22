<style scoped>
	.top {
		height: 450rpx;
		background-image: url(../../static/mine/profit_bg.png);
		background-size: 100% 100%;
		background-repeat: no-repeat;
	}

	.num {
		font-size: 26rpx;
	}

	.box-item {
		width: 49%;
		padding: 0 30rpx;
		margin: 20rpx 0;
	}

	.box-item:first-child {
		border-right: 1px solid #CFCFCF;
	}
</style>
<template>
	<view class="profit">
		<u-navbar title="收益" bgColor='transparent' leftIconColor='#fff' :titleStyle='titleStyle ' leftIconSize='36	'
			:autoBack='true'></u-navbar>
		<view class="top">
			<!-- <image src="" mode=""></image> -->
		</view>

		<view class="page-padding" style="margin-top: -200rpx;">
			<!-- <view class="box row-between align-center">
				<view class="box-item">
					<view class="row-between align-center">
						<view class="bold">
							今日收益
						</view>
						<view class="">
							<u-icon name='search' color="#06C17C"></u-icon>
						</view>
					</view>
					<view class="bold top-24 num">
						数据接入中
					</view>
				</view>
				<view class="box-item">
					<view class="row-between align-center">
						<view class="bold">
							昨日收益
						</view>
						<view class="">
							<u-icon name='search' color="#06C17C"></u-icon>
						</view>
					</view>
					<view class="bold top-24 num">
						数据接入中
					</view>
				</view>
			</view> -->

			<view class="box top-30" style="overflow: hidden;">
				<!-- <u-cell size="large" title="累计收益" value="1535.96" label="点击查看，累计收益" :isLink='true' icon='search'
					:iconStyle='iconStyle'></u-cell>
				<u-cell size="large" title="流失收益" value="0" label="点击查看，流失收益" :isLink='true' icon='search'
					:iconStyle='iconStyle'></u-cell> -->

				<u-cell-group :border='false'>
					<u-cell-item title="累计收益" label="点击查看，累计收益" :isLink="true" :arrow='false' :border='false'
						:border-bottom='false'>
						<!-- @click='toPage(item.link)' -->
						<view class="icon text-color-grey" slot='icon'>
							<image src="@/static/mine/profit_sum.png" mode=""
								style="width: 40rpx;height: 40rpx;margin-right: 20rpx;">
							</image>
						</view>
						<view class="" slot='right-icon'>
							{{infos.allIncome}}
							<image src="@/static/mine/icon_right.png" mode=""
								style="width: 15rpx;height: 20rpx;margin-left: 20rpx;">
							</image>
						</view>
					</u-cell-item>
					<u-cell-item title="流失收益" label="点击查看，累计收益" :isLink="true" :arrow='false' :border='false'
						:border-bottom='false'>
						<!-- @click='toPage(item.link)' -->
						<view class="icon text-color-grey" slot='icon'>
							<image src="@/static/mine/profit_lost.png" mode=""
								style="width: 40rpx;height: 40rpx;margin-right: 20rpx;"></image>
						</view>
						<view class="" slot='right-icon'>
							{{infos.lossMoneyToAll}}
							<image src="@/static/mine/icon_right.png" mode=""
								style="width: 15rpx;height: 20rpx;margin-left: 20rpx;">
							</image>
						</view>
					</u-cell-item>
				</u-cell-group>
			</view>
		</view>

	</view>
</template>

<script>
	import {
		getUserInfo
	} from '@/api/members.js'
	export default {
		data() {
			return {
				iconStyle: {
					fontSize: '50rpx',
					marginRight: '20rpx'
				},
				titleStyle: {
					color: '#fff'
				},
				infos: {}
			}
		},
		onLoad() {
			this.getProfitsHandle()
		},
		methods: {
			getProfitsHandle() {
				getUserInfo().then(res => {
					console.log(res)
					this.infos = res
				})
			}
		}
	}
</script>