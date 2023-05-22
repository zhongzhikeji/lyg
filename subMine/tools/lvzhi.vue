<style scoped>
	.top-bg {
		height: 400rpx;
		background: #038E3D;
	}

	/* 请根据实际需求修改父元素尺寸，组件自动识别宽高 */
	.charts-box {
		width: 100%;
		height: 500rpx;
		margin-top: -40vh;
	}

	.title-box {
		border-bottom: 1px solid #A5A8B6;
		padding-bottom: 20rpx;
	}

	.top-content {
		color: #fff;
	}

	.top-bottom {
		width: 80%;
		margin-top: 62rpx;
	}
</style>
<template>
	<view class="points">
		<view class="top-bg">
			<view class="top-content center">
				<view class=" text-size-24" style="margin-top: 54rpx;">
					绿值
				</view>
				<view class="bold" style="font-size: 52rpx;">
					{{greenValue}}
				</view>
				<view class="row-around align-center top-bottom">
					<view class="center">
						<view class="bold">
							{{greenValue}}
						</view>
						<view class="text-size-24">
							可用绿值
						</view>
					</view>
					|
					<view class="center">
						<view class="bold">
							0
						</view>
						<view class="text-size-24">
							锁定绿值
						</view>
					</view>
				</view>
			</view>
		</view>
		<view class="page-padding">

			<view class="box ">
				<view class="page-padding">
					<view class=" row-between align-center title-box">
						<view class="bold">
							绿值变动明细
						</view>
						<view class="text-size-24 text-color-grey" @click="toInfos">
							全部 >
						</view>
					</view>

					<view class="record top-30">
						<view class="record-item row-between align-center top-24" v-for="(item,index) in records_list"
							:key="index">
							<view class="">
								<view class="">
									{{item.type}}
								</view>
								<view class="text-color-grey text-size-24">
									{{item.createTime}}
								</view>
							</view>
							<view class="bold text-color-theme text-size-32"
								:style="{color:item.operation=='增加'?'green':'red'}">
								{{item.amount==0?'':item.operation=='增加'?'+':'-'}} {{item.amount}}
							</view>
						</view>
						<view class="center text-size-24 text-color-grey" @click="loadMore">
							{{loadtext}}
						</view>
					</view>
				</view>

			</view>
		</view>
	</view>
</template>

<script>
	import {
		getUserInfo,
		getRecords
	} from '@/api/members.js'
	export default {
		data() {
			return {
				greenValue: 0,
				pageNumber: 1,
				pageSize: 10,
				records_list: [],
				loadtext: '加载更多'
			}
		},
		onReady() {},
		onLoad() {
			this.getUserInfo()
			this.getRecordsHandle()
		},
		methods: {
			loadMore() {
				this.pageNumber = this.pageNumber + 1
				this.getRecordsHandle()
			},
			toInfos() {
				uni.navigateTo({
					url: '/subMine/lvzhi/lvzhiInfos'
				})
			},
			getRecordsHandle() {
				var params = {
					position: 'LV_ZHI',
					pageNumber: this.pageNumber,
					pageSize: this.pageSize
				}
				getRecords(params).then(res => {
					console.log(res)
					// this.records_list.push(...res.records)
					if (res.records.length == 0) {
						this.loadtext = '到底了'
					} else {
						this.records_list.push(...res.records)
					}
				})
			},
			getUserInfo() {
				getUserInfo().then(res => {
					this.greenValue = res.greenValue
				})
			},
		}
	}
</script>