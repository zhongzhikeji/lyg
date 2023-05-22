<template>
	<view class="invite-infos page-padding">
		<view class="search radius-all">
			<u-search searchIconSize='50' height='58' shape="round" placeholder='请输入好友手机号' :bgColor='"#fff"'
				:actionStyle='actionStyle' :input-style='inputStyle' placeholder-color='#A5A8B6'
				search-icon-color='#8E92A4' v-model="search_keyword" @custom='searchHandle' @clear="is_search=false"
				@change='searchChangeHandle'>
			</u-search>
		</view>
		<view class="box" style="padding: 28rpx 48rpx;margin-top: 17rpx;">
			<view class="text-size-28 bold">
				我的信息
			</view>
			<view class="top-24">
				<view class="infos-item row align-center">
					<view class="infos-item-left">
						<text class="infos-item-left-label">我的推荐人：</text><text
							class="infos-item-left-val">{{infos.leaderMobile?phoneHideHandle(infos.leaderMobile):'无'}}</text>
					</view>
					<view class="">
						<text class="infos-item-left-label">我的点位数：</text><text
							class="infos-item-left-val">{{infos.nodesCount}}</text>
					</view>
				</view>

				<view class="infos-item row align-center">
					<view class="infos-item-left">
						<text class="infos-item-left-label">直推人数/有效：</text><text
							class="infos-item-left-val">{{infos.invitedCount}}/{{infos.achievedInvite}}</text>
					</view>
					<view class="">
						<text class="infos-item-left-label">团队人数/有效：</text><text
							class="infos-item-left-val">{{infos.groupCount}}/{{infos.groupAchieveInvite}}</text>
					</view>
				</view>

				<view class="infos-item row align-center">
					<view class="infos-item-left">
						<text class="infos-item-left-label">个人消费：</text><text
							class="infos-item-left-val">{{infos.allInvestment}}</text>
					</view>
					<view class="">
						<text class="infos-item-left-label">团队消费：</text><text
							class="infos-item-left-val">{{infos.achievememt}}</text>
					</view>
				</view>
			</view>

		</view>

		<view class="box top-30" style="padding: 28rpx 48rpx;"
			v-if="!infos.inviteInfoList||infos.inviteInfoList.length!=0">
			<view class="text-size-28 bold">
				直推好友信息
			</view>
			<view class="" v-if="is_search==true">
				<view class="center text-color-grey text-size-24" v-if="search_user.length==0">
					好友不存在
				</view>
				<view class="item-outer" v-for="(item,index) in search_user" :key="index">
					<view class="infos-item row align-center">
						<view class="infos-item-left" style="width: 100%;">
							<text class="infos-item-left-label">直推用户名：</text><text
								class="infos-item-left-val">{{phoneHideHandle(item.mobile)}}</text>
							<text class="infos-tag">{{item.enabled?'已激活':'未激活'}}
								{{levelHandle(item.regionLevel)}}</text>
						</view>
					</view>

					<view class="infos-item row align-center">
						<view class="infos-item-left">
							<text class="infos-item-left-label">团队最高级：</text><text
								class="infos-item-left-val">{{item.groupMaxLevel}}</text>
						</view>
						<view class="">
							<text class="infos-item-left-label">他的点位数：</text><text
								class="infos-item-left-val">{{item.nodesCount}}</text>
						</view>
					</view>

					<view class="infos-item row align-center">
						<view class="infos-item-left">
							<text class="infos-item-left-label">直推人数/有效：</text><text
								class="infos-item-left-val">{{item.invitedCount}}/{{item.achievedInvite}}</text>
						</view>
						<view class="">
							<text class="infos-item-left-label">团队人数/有效：</text><text
								class="infos-item-left-val">{{item.groupCount}}/{{item.groupAchieveInvite}}</text>
						</view>
					</view>

					<view class="infos-item row align-center">
						<view class="infos-item-left">
							<text class="infos-item-left-label">个人消费：</text><text
								class="infos-item-left-val">{{item.allInvestment}}</text>
						</view>
						<view class="">
							<text class="infos-item-left-label">团队消费：</text><text
								class="infos-item-left-val">{{item.achievememt}}</text>
						</view>
					</view>

					<view class="infos-item row align-center">
						<view class="infos-item-left">
							<text class="infos-item-left-label">手机号：</text><text
								class="infos-item-left-val">{{phoneHideHandle(item.mobile)}}</text>
						</view>
						<view class="">
							<text class="infos-item-left-label">注册时间：</text><br>
							<text class="infos-item-left-val"
								style="font-size: 22rpx;">{{timeHandle(item.createTime)}}</text>
						</view>
					</view>
				</view>
			</view>
			<view class="top-24" v-if="is_search==false">
				<view class="item-outer" v-for="(item,index) in infos.inviteInfoList" :key="index">
					<view class="infos-item row align-center">
						<view class="infos-item-left" style="width: 100%;">
							<text class="infos-item-left-label">直推用户名：</text><text
								class="infos-item-left-val">{{phoneHideHandle(item.mobile)}}</text><text
								class="infos-tag">{{item.enabled?'已激活':'未激活'}} {{levelHandle(item.regionLevel)}}</text>
						</view>
					</view>

					<view class="infos-item row align-center">
						<view class="infos-item-left">
							<text class="infos-item-left-label">团队最高级：</text><text
								class="infos-item-left-val">{{item.groupMaxLevel}}</text>
						</view>
						<view class="">
							<text class="infos-item-left-label">他的点位数：</text><text
								class="infos-item-left-val">{{item.nodesCount}}</text>
						</view>
					</view>

					<view class="infos-item row align-center">
						<view class="infos-item-left">
							<text class="infos-item-left-label">直推人数/有效：</text><text
								class="infos-item-left-val">{{item.invitedCount}}/{{item.achievedInvite}}</text>
						</view>
						<view class="">
							<text class="infos-item-left-label">团队人数/有效：</text><text
								class="infos-item-left-val">{{item.groupCount}}/{{item.groupAchieveInvite}}</text>
						</view>
					</view>

					<view class="infos-item row align-center">
						<view class="infos-item-left">
							<text class="infos-item-left-label">个人消费：</text><text
								class="infos-item-left-val">{{item.allInvestment}}</text>
						</view>
						<view class="">
							<text class="infos-item-left-label">团队消费：</text><text
								class="infos-item-left-val">{{item.achievememt}}</text>
						</view>
					</view>

					<view class="infos-item row align-center">
						<view class="infos-item-left">
							<text class="infos-item-left-label">手机号：</text><text
								class="infos-item-left-val">{{phoneHideHandle(item.mobile)}}</text>
						</view>
						<view class="">
							<text class="infos-item-left-label">注册时间：</text><br>
							<text class="infos-item-left-val"
								style="font-size: 22rpx;">{{timeHandle(item.createTime)}}</text>
						</view>
					</view>
				</view>

			</view>

		</view>
	</view>
</template>

<script>
	import {
		inviteInfos
	} from '@/api/login.js'
	export default {
		data() {
			return {
				search_keyword: '',
				inputStyle: {
					fontSize: '24rpx'
				},
				inputStyle: {
					fontSize: '24rpx'
				},
				actionStyle: {
					borderRadius: '100px',
					backgroundColor: '#DAF1E7',
					color: '#16A06C',
					fontSize: '24rpx',
					padding: '4rpx 13rpx'
				},
				infos: {
					inviteInfoList: []
				},
				search_user: [],
				is_search: false,
				inviteInfoList: []
			}
		},
		onReady() {
			var obj = {
				userId: uni.getStorageSync('userId')
			}
			this.getInviteInfos(obj)
		},
		methods: {
			levelHandle(level) {
				return level.split('_')[1] == 0 ? '游客' : level.split('_')[1] == 1 ? '消费商' : level.split('_')[1] == 2 ?
					'代理商' : level.split('_')[1] == 3 ?
					'县代理' :
					level.split('_')[1] == 4 ? '区代理' : level.split('_')[1] == 5 ? '市代理' : '分公司'
			},
			searchChangeHandle() {
				if (this.search_keyword == '') {
					this.is_search = false
				}
			},
			searchHandle() {
				this.is_search = true
				this.inviteInfoList.forEach((item, inddex) => {
					if (item.mobile == this.search_keyword) {
						this.search_user[0] = item
					}
				})
			},
			timeHandle(time) {
				var year = new Date(time).getFullYear()
				var month = new Date(time).getMonth() + 1
				var day = new Date(time).getDay()
				var hours = new Date(time).getHours()
				var minutes = new Date(time).getMinutes()
				var seconds = new Date(time).getSeconds()

				month = month > 10 ? month : '0' + month
				day = day > 10 ? day : '0' + day
				hours = hours > 10 ? hours : '0' + hours
				minutes = minutes > 10 ? minutes : '0' + minutes
				seconds = seconds > 10 ? seconds : '0' + seconds

				return year + '-' + month + '-' + day + ' ' + hours + ':' + minutes + ':' + seconds


			},
			phoneHideHandle(num) {
				return num.toString()[0] + num.toString()[1] + num.toString()[2] + '****' + num.toString()[7] + num
					.toString()[8] + num.toString()[9] + num.toString()[10]
			},
			getInviteInfos(params) {
				var vm = this
				inviteInfos(params).then(res => {
					console.log(res)
					this.infos = res
					this.inviteInfoList = res.inviteInfoList
				})
			},
		}
	}
</script>

<style scoped>
	.infos-tag {
		margin-left: 20rpx;
		font-size: 22rpx;
		color: #ffaa00;
		white-space: nowrap;
	}

	.search {
		border: 1px solid #1CAF44;
		background-color: #fff;
		padding: 0 12rpx;
	}

	.infos-item {
		padding: 14rpx 0;
		border-bottom: 1rpx solid #eeeeee;
		font-size: 22rpx;
	}

	.infos-item view {
		width: 50%;
	}

	.infos-item-left-label {
		font-weight: bold;
		color: #979797;
	}

	.infos-item-left-val {
		color: #16A06C;
		font-weight: bold;
	}

	.item-outer {
		border-bottom: 12rpx solid #F3F5F8;
		padding-bottom: 32rpx;
	}
</style>