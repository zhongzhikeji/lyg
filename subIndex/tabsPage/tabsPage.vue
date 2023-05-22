<template>
	<view class="tabs-page">
		<u-navbar :title="page==1?'食品酒饮':page==2?'鲜美果蔬':'粮油系列'" :placeholder='true' :autoBack="true">
		</u-navbar>
		<view class="page-padding bg-fff">
			<u-search placeholder="请输入你要的商品" v-model="keyword" :showAction="false" height="66" searchIconSize='44'>
			</u-search>
			<view class="row-between align-center top-24 ">
				<view class="row align-center tabs ">
					<c-tabs :list="nav_list" :bg-style="'#048D3D'" color="#A5A8B6" :is-bold="false"></c-tabs>
				</view>
				<view class="">
					<u-icon name="grid-fill"></u-icon>
				</view>
			</view>
		</view>
		<view class="page-padding">
			<c-goods-card :list="goods_list" @current='getCurrentGoods' @addCard='getAddCard'></c-goods-card>
		</view>
	</view>
</template>

<script>
	import {
		getGoodsByClass
	} from '@/api/goods.js'
	import * as API_trade from '@/api/trade.js';
	export default {
		data() {
			return {
				nav_list: [{
					name: '综合',
				}, {
					name: '销量',
				}, {
					name: '价格',
					is_icon: true
				}],
				page: 0,
				keyword: '',
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

				uni.navigateTo({
					url: '/subGoods/goodsInfos/goodsInfos?id=' + this.goods_list[index].id
				})
			},
			getGoodsList() {
				var params = {
					// keyword: this.page == 0 ? '食品酒饮' : this.page == 1 ? '鲜美果蔬' : '粮油系列',
					pageNumber: 1,
					pageSize: 10,
					categoryName: this.page == 1 ? '食品酒饮' : this.page == 2 ? '鲜美果蔬' : '粮油系列'
				}
				getGoodsByClass(params).then((res) => {
					this.goods_list.push(...res.records);
				})
			}
		}
	}
</script>

<style scoped>
	.tabs {
		width: 70%;
	}

	.tab-com {
		width: 80%;
	}
</style>
