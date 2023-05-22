<style scoped>
	.head {
		width: 88rpx;
		height: 88rpx;
	}

	.pics {
		width: 180rpx;
		height: 180rpx;
		margin-right: 36rpx;
		overflow: hidden;
		border-radius: 16rpx;
	}

	.attention-btn {
		padding: 2rpx 30rpx;
		border: 1px solid #16A06C;
		color: #16A06C;
		border-radius: 100px;
		font-size: 24rpx;
	}

	.datas {
		font-size: 20rpx;
		color: #A5A8B6;
	}

	.datas text {
		margin-right: 10rpx;
		display: block;
	}

	.data-val {
		color: #267653;
		width: 40rpx;
		text-align: center;
	}

	.card {
		background-color: #fff;
		border-radius: 20rpx;
	}
</style>
<template>
	<view class="c-shop-card">
		<view class="card page-padding top-24" v-for="(item,index) in list" :key="index">
			<view class="row-between align-center">
				<view class="top-left row align-center">
					<view class="round head">
						<image :src="item.storeLogo" mode=""></image>
					</view>
					<view class="top-left-right left-20">
						<view class="name bold">
							{{item.storeName}}
						</view>
						<view class="datas row align-center">
							<text>宝贝数</text>
							<text class='data-val text-ellipsis-1'>{{item.goodsNum}}</text><text>|</text>
							<text>关注度</text>
							<text class='data-val text-ellipsis-1'>{{item.serviceScore}}</text><text>|</text>
							<text>绿色指数</text>
							<text class='data-val text-ellipsis-1'>0</text>
						</view>
					</view>
				</view>
				<view class="attention-btn" @click="attentionHandle(item.id,index)">
					{{isAttention?'取消关注':item.isLike==true?'已关注':'关注'}}
				</view>
			</view>
			<view class=" row align-center top-30">
				<view class="pics">
					<image src="@/static/index/adv.png" mode="heightFix"></image>
				</view>
				<view class="pics">
					<image src="@/static/index/adv.png" mode="heightFix"></image>
				</view>
				<view class="pics">
					<image src="@/static/index/adv.png" mode="heightFix"></image>
				</view>
			</view>

		</view>

	</view>
</template>

<script>
	import {
		addGoodsOrStore,
		isAddGoodsOrStore,
		deleteGoodsOrStore
	} from '@/api/goods.js'
	export default {
		props: {
			list: {
				type: Array,
				default: () => {
					return []
				}
			},
			isAttention: {
				type: Boolean,
				default: false
			}
		},
		data() {
			return {

			}
		},
		methods: {
			attentionHandle(id, index) {
				if (this.isAttention == false) {
					isAddGoodsOrStore('STORE', id).then(res => {
						if (res == true) {
							deleteGoodsOrStore('STORE', id).then(res => {
								uni.showToast({
									title: '已取消',
									icon: 'none'
								})
							})
						} else {
							addGoodsOrStore('STORE', id).then(res => {
								uni.showToast({
									title: '已关注',
									icon: 'none'
								})
							})
						}
						this.list[index].isLike = !this.list[index].isLike
					})
				} else {
					deleteGoodsOrStore('STORE', id).then(res => {
						uni.showToast({
							title: '已取消',
							icon: 'none'
						})
						this.list.splice(index, 1);
					})
				}
			}
		}
	}
</script>
