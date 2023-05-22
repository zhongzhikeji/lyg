<style scoped>
	.title {
		margin-top: 4rpx;
		font-size: 24rpx;
	}

	.img {
		width: 120rpx;
		height: 120rpx;
		border-radius: 24rpx;
		overflow: hidden;
	}
</style>
<template>
	<view class="c-option row-between align-center">
		<view class="c-option-item center" v-for="(item,index) in list" :key="index" @click="selectedHandle(index)">
			<view class="img" :style="{width:iconSize+'rpx',height:iconSize+'rpx'}">
				<image :src="getPic(item.icon)" mode=""></image>
			</view>
			<view class="title" :style="{marginTop:top+'rpx'}">
				{{item.title}}
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		props: {
			list: {
				type: Array
			},
			iconSize: {
				type: Number,
				default: 120
			},
			top: {
				type: Number,
				default: 4
			}
		},
		data() {
			return {

			}
		},
		methods: {
			selectedHandle(index) {
				this.$emit('current', index)
			},
			getPic(icon) {
				return '../../../static/' + icon
			}
		}
	}
</script>
