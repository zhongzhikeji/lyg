<style scoped>
	.top {
		color: #fff;
	}

	.data-item {
		color: #fff;
		font-size: 24rpx;
	}

	.data-item-name {
		margin-top: 12rpx;
	}

	.head {
		width: 120rpx;
		height: 120rpx;
	}

	.vip {
		/* width: 66rpx; */
		padding: 0 16rpx;
		height: 30rpx;
		background: linear-gradient(180deg, #F3BD79 0%, #F19B46 100%);
		border: 2rpx solid #FFFFFF;
		border-radius: 12rpx;
		font-size: 20rpx;
	}

	.name {
		font-weight: 500;
	}

	.box {
		background: #FFFFFF;
		border-radius: 16rpx;
	}

	.check-more {
		font-size: 24rpx;
		color: #A5A8B6;
	}

	.adv {
		height: 190rpx;
	}

	.icon {
		width: 48rpx;
		height: 48rpx;
	}
</style>
<template>
	<view class="mine">
		<u-navbar title=" " :background="nav_bg" :is-back='false' height="0" :border-bottom='false'></u-navbar>
		<view class="bg-theme page-padding top">
			<view class="row align-center" @click="toPage('/subMine/setting/mineSetting')">
				<view class="round head">
					<image src="@/static/logo.png" mode=""></image>
				</view>
				<view class="left-20">
					<view class="name">
						{{user_infos.nickName}}
					</view>
					<view class="vip center top-8 bold">
						{{user_infos.active=='禁用'?'未激活':user_infos.active}}
						{{user_infos.regionLevel?levelHandle(user_infos.regionLevel):''}}
					</view>
				</view>
			</view>
			<view class="row-around align-center top-68">
				<view class="data-item center" v-for='(item,index) in datas_list' :key="index"
					@click="toPage(item.link)">
					<view class="data-item-val bold text-size-32">
						{{item.val}}
					</view>
					<view class="data-item-name">
						{{item.name}}
					</view>
				</view>
			</view>
		</view>
		<view class="page-padding">
			<view class="order page-padding box">
				<view class="order-top row-between align-center">
					<view class="bold">
						我的订单
					</view>
					<view class="check-more" @click="toOrders('all')">
						查看全部 &nbsp; >
					</view>
				</view>
				<view class="order-bottom" style="padding: 0 42rpx;margin-top: 48rpx;">
					<c-option :list="option_list" @current='getCurrentOption' :icon-size="54" :top="22"></c-option>
				</view>
			</view>

			<view class="adv top-24">
				<image src="@/static/mine/adv.png" mode=""></image>
			</view>

			<view class="box  top-24" style="padding:16rpx;">
				<view class="bold" style="margin: 10rpx 0 28rpx 16rpx;">
					我的工具
				</view>
				<view class="">
					<!-- <u-cell-group :border='false'>
						<u-cell-item :title="item.title" :isLink="true" arrow-direction="right" :border='false'
							v-for="(item,index) in cells_list" :key="index" :border-bottom='false'
							@click='toPage(item.link)' :title-style='titleStyle'>
							<view class="icon" slot='icon' style="margin-right: 16rpx;">
								<image :src="'../../../static/mine/'+item.img" mode=""></image>
							</view>
						</u-cell-item>
					</u-cell-group> -->
					<view class="row-between align-center" style="height: 80rpx;" v-for="(item,index) in cells_list"
						:key="index" @click='toPage(item.link)'>
						<view class="row align-center">
							<view class="icon" style="margin-right: 16rpx;">
								<image :src="'../../../static/mine/'+item.img" mode=""></image>
							</view>
							<view class="" :style="titleStyle">
								{{item.title}}
							</view>
						</view>
						<view class="" style="width: 15rpx;height: 25rpx;">
							<image src="@/static/mine/icon_right.png" mode=""></image>
						</view>
					</view>
					<!-- <u-cell :title="item.title" :isLink="true" arrow-direction="right" :border='false'
						v-for="(item,index) in cells_list" :key="index" :url='item.link'>
						<view class="icon" slot='icon'>
							<image src="@/static/logo.png" mode=""></image>
						</view>
					</u-cell> -->
				</view>
			</view>
		</view>
		<view class="page-padding top-68">
			<view class="button" style="background-color: #d00000;" @click="logout()">
				退出登录
			</view>
		</view>

	</view>
</template>

<script>
	import {
		getUserInfo,
		getBalance
	} from '@/api/members.js'
	import storage from "@/utils/storage.js";
	import {
		numShowHandle
	} from '@/utils/tools.js'
	export default {
		data() {
			return {
				titleStyle: {
					fontSize: '28rpx',
					color: '#000'
				},
				nav_bg: {
					backgroundColor: "#048D3D"
				},
				cells_list: [{
						img: 'tool_1.png',
						title: '邀请好友',
						link: '/subMine/tools/invite'
					},
					{
						img: 'tool_2.png',
						title: '收货地址',
						link: '/subMine/tools/address'
					},
					{
						img: 'tool_3.png',
						title: '我的收益',
						link: '/subMine/tools/profit'
					},
					// {
					// 	img: 'tool_4.png',
					// 	title: '我的挖矿',
					// 	link: ''
					// },
					{
						img: 'tool_5.png',
						title: '特惠订单',
						link: '/subGoods/points',
						// 
					},
					// {
					// 	img: 'tool_6.png',
					// 	title: '店铺入驻',
					// 	link: '/subMine/tools/createShop'
					// },
					{
						img: 'tool_7.png',
						title: '我的收藏',
						link: '/subMine/tools/collection'
					},
					{
						img: 'tool_8.png',
						title: '我的关注',
						link: '/subMine/tools/attention'
					},
					{
						img: 'tool_9.png',
						title: '设置',
						link: '/subMine/tools/setting'
					}
				],
				option_list: [{
						title: '待付款',
						icon: 'mine/option_1.png'
					},
					{
						title: '待收货',
						icon: 'mine/option_2.png'
					},
					{
						title: '待发货',
						icon: 'mine/option_3.png'
					},
					{
						title: '待评价',
						icon: 'mine/option_4.png'
					},
					{
						title: '售后',
						icon: 'mine/option_5.png'
					}
				],
				datas_list: [{
						name: '余额',
						val: '123',
						link: '/subMine/tools/wallet',
						// 
					},
					{
						name: '绿值',
						val: '123',
						link: '/subMine/tools/lvzhi',
						// 
					},
					{
						name: '购物积分',
						val: '123',
						link: ''
					},
					{
						name: '绿贝',
						val: '0',
						link: '',
						// /subMine/tools/lvbei
					}
				],
				user_infos: {}
			}
		},
		onShow() {
			this.getUserInfo()
		},
		methods: {
			levelHandle(level) {
				return level.split('_')[1] == 0 ? '游客':level.split('_')[1] == 1 ? '消费商' : level.split('_')[1] == 2 ? '代理商' : level.split('_')[1] == 3 ?
					'县代理' :
					level.split('_')[1] == 4 ? '区代理' : level.split('_')[1] == 5 ? '市代理' : '分公司'
			},
			logout() {
				storage.removeAccessToken()
				uni.navigateTo({
					url: '/pages/passport/login'
				})
			},
			// login() {
			// 	uni.navigateTo({
			// 		url: '/pages/passport/login'
			// 	})
			// },
			getUserInfo() {
				getUserInfo().then(res => {
					console.log(res)
					if (res.success == false) {
						uni.showToast({
							title: '请先登录',
							icon: 'error'
						})
						uni.navigateTo({
							url: '/pages/passport/login'
						})
					} else {
						uni.setStorageSync('userId', res.id)
						this.user_infos = res
						this.datas_list[2].val = res.shopIntegral
						this.datas_list[1].val = res.greenValue
						getBalance().then(balance => {
							// console.log(balance)
							// this.datas_list[0].val = numShowHandle(balance.memberWallet)
							this.datas_list[0].val = balance.memberWallet

						})
					}
				})
			},
			toPage(link) {
				uni.navigateTo({
					url: link
				})
			},
			toOrders(type) {
				uni.navigateTo({
					url: '/subMine/tools/orders?type=all'
				})
			},
			getCurrentOption(val) {
				uni.navigateTo({
					url: '/subMine/tools/orders?type=' + val
				})
			}
		}
	}
</script>