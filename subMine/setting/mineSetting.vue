<style scoped>
	.box u-cell {
		margin-bottom: 20rpx;
	}

	.right {
		width: 15rpx;
		height: 25rpx;
	}

	.head {
		width: 80rpx;
		height: 80rpx;
	}

	.item {
		padding: 18rpx 0;
		border-bottom: 1rpx solid #E2E2E2;
	}

	.item:last-child {
		border-bottom: 0;
	}

	.right-val {
		margin-right: 36rpx
	}
</style>
<template>
	<view class="mine-setting page-padding">
		<view class="box page-padding">
			<view class="item row-between align-center" v-for="(item,index) in cells_list" :key="index"
				@click="toPage(item.link)">
				<view class="text-size-24">
					{{item.title}}
				</view>
				<view class="row align-center">
					<view class="head radius-all right-val" v-if="item.img">
						<image :src="item.img" mode=""></image>
					</view>
					<text class="text-size-28 bold right-val" v-if="item.value">{{item.value}}</text>
					<text style="font-size: 20rpx;color: #A5A8B6;" v-if="item.dis_value"
						class="right-val">{{item.dis_value}}</text>
					<view class="right" v-if="!item.dis_value">
						<image src="../../static/mine/icon_right.png" mode=""></image>
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import {
		inviteCode
	} from '@/api/login.js'
	import {
		getUserInfo
	} from '@/api/members.js'
	export default {
		data() {
			return {
				titleStyle: {
					fontSize: '24rpx'
				},
				cells_list: [{
						img: '../../static/logo.png',
						title: '头像',
						link: ''
					},
					{
						title: '昵称',
						link: '',
						value: '绿量2628'
					},
					{
						title: '修改登录密码',
						link: './passwordChange'
					},
					{
						title: '手机号',
						dis_value: '158****9517'
					},
					{
						title: '推荐人',
						dis_value: '绿量4413'
					},
					{
						title: '邀请码',
						dis_value: 'N6CQVRCF'
					}
				],
			}
		},
		onLoad() {
			this.getInviteCode()
			this.getUserInfo()
		},
		methods: {
			phoneHideHandle(num) {
				return num.toString()[0] + num.toString()[1] + num.toString()[2] + '****' + num.toString()[7] + num
					.toString()[8] + num.toString()[9] + num.toString()[10]
			},
			toPage(link) {
				uni.navigateTo({
					url: link
				})
			},
			getInviteCode(params) {
				var vm = this
				inviteCode(params).then(res => {
					vm.cells_list[5].dis_value = res.inviteUrl.toString().split('?')[1].split('=')[1]
				})
			},
			getUserInfo() {
				getUserInfo().then(res => {
					if (res.success == false) {
						uni.showToast({
							title: '请先登录',
							icon: 'error'
						})
						uni.navigateTo({
							url: '/pages/passport/login'
						})
					} else {
						// uni.setStorageSync('userId', res.id)
						this.cells_list[3].dis_value = res.mobile
						this.cells_list[1].value = res.nickName
						this.cells_list[4].dis_value = this.phoneHideHandle(res.leaderMobile)
						// res.leaderName ? res.leaderName : '无'
					}
				})
			},
		}
	}
</script>