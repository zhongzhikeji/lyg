<template>
	<view class="c-index-option-card">
		<view class="item box page-padding row-between" v-for="(item,index) in list" :key="index">
			<view class="row">
				<view class="pic">
					<image src="../../static/logo.png" mode=""></image>
				</view>
				<view class="column-between">
					<view class="bold">
						明宇酒店
					</view>
					<view class="row align-center">
						<u-rate :count="count" v-model="value" size='30'></u-rate> <text
							class="text-color-red left-20">5.0</text>
					</view>
					<view class="btn center">
						{{btnText==0?'舒适酒店':btnText==1?'休闲茶楼':btnText==2?'美味餐厅':'线下商家'}}
					</view>
				</view>
			</view>
			<view class="text-color-grey text-size-24 column-end align-end">
				<view class="">
					￥50/人
				</view>
				<view class="top-24">
					91.55KM
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		props: {
			btnText: {
				type: String
			},
			list: {
				type: Array,
				default: () => {
					return []
				}
			}
		},
		data() {
			return {
				count: 4,
				value: 2
			}
		},
		methods: {

		}
	}
</script>

<style scoped>
	.pic {
		width: 185rpx;
		height: 185rpx;
		margin-right: 30rpx;
	}

	.btn {
		padding: 4rpx 20rpx;
		background: #F9BB6E;
		border-radius: 12rpx;
	}
</style>
