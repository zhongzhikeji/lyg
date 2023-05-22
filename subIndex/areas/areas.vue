<template>
	<view class="areas">
		<u-navbar :title="page==0?'特惠专区':page==1?'普通专区':'爆款专区'" :placeholder='true' :autoBack="true">
		</u-navbar>
		<view class="page-padding">
			<view class="pic">
				<image src="@/static/index/adv.png" mode=""></image>
			</view>
			<view class="bold text-size-32 top-30 center">
				精品推荐
			</view>
			<view class="">
				<c-goods-card :list="goods_list" @current='getCurrentGoods' @addCard='getAddCard'></c-goods-card>
			</view>
		</view>
	</view>
</template>

<script>
	import {
		getGoodsByClass
	} from "@/api/goods.js"
	import * as API_trade from '@/api/trade.js';
	export default {
		data() {
			return {
				page: 0,
				goods_list: []
			}
		},
		onLoad(o) {
			this.page = o.type
			this.getGoodsList()
		},
		methods: {
			getAddCard(i) {
				let data = {
					skuId: this.goods_list[i].id,
					num: 1
				};
				API_trade.addToCart(data).then(res => {
					// console.log(res)
					if (!res.success) {
						uni.showToast({
							title: res.message,
							icon: "error"
						})
						return
					}
					uni.showToast({
						title: '商品已添加到购物车',
						icon: 'none'
					});
				});
			},
			getCurrentGoods(index) {
				this.current_goods = index
				if (this.page == 0) {
					uni.navigateTo({
						url: '/subGoods/goodsInfos/goodsInfos?type=TeHui&&id=' + this.goods_list[index].id
					})
				} else {
					uni.navigateTo({
						url: '/subGoods/goodsInfos/goodsInfos?id=' + this.goods_list[index].id
					})
				}

			},
			getGoodsList() {
				var params = {
					// keyword: this.page == 0 ? '特惠' : this.page == 1 ? '分销' : '爆款',
					pageNumber: 1,
					pageSize: 10,
					categoryName: this.page == 0 ? '特惠专区' : this.page == 1 ? '普通专区' : '爆款专区'
				}
				getGoodsByClass(params).then(res => {
					this.goods_list.push(...res.records)
				})
			}
		}
	}
</script>

<style scoped>
	.pic {
		width: 100%;
		height: 300rpx;
		border-radius: 16rpx;
	}
</style>