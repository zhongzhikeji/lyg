<style scoped>
	.search {
		border: 1px solid #1CAF44;
		background-color: #fff;
		padding: 0 12rpx;
	}

	.pic {
		height: 200rpx;
	}

	.top {
		background-color: #fff;

	}
</style>
<template>
	<view class="shop">
		<u-navbar title=" " :background="nav_bg" :is-back='false' height="0" :border-bottom='false'></u-navbar>
		<view class="top page-padding">
			<view class="search radius-all">
				<u-search searchIconSize='50' height='58' shape="round" placeholder='请输入商品名搜索商品' :bgColor='"#fff"'
					:actionStyle='actionStyle' :input-style='inputStyle' placeholder-color='#A5A8B6'
					search-icon-color='#8E92A4'>
				</u-search>
			</view>
			<view class="radius-24 pic top-24">
				<image src="@/static/index/adv.png" mode=""></image>
			</view>
			<view class="top-24">
				<c-tabs :list="nav_list" :bg-style="'#048D3D'" color="#A5A8B6" :is-bold="false"></c-tabs>
			</view>
		</view>
		<view class="padding-content">
			<c-shop-card :list="shop_list"></c-shop-card>
			<view class="text-color-grey text-size-24 center" v-if="shop_list.length!=0" @click="loadMore">
				{{load_more_text}}
			</view>
		</view>
	</view>
</template>

<script>
	import {
		getStoreList
	} from '@/api/store.js'
	export default {
		data() {
			return {
				load_more_text: '加载更多',
				nav_bg: {
					backgroundColor: "transparent"
				},
				nav_list: [{
					name: '综合',
				}, {
					name: '销量',
				}, {
					name: '评分'
				}],
				actionStyle: {
					borderRadius: '100px',
					backgroundColor: '#DAF1E7',
					color: '#16A06C',
					fontSize: '24rpx',
					padding: '4rpx 13rpx'
				},
				shop_list: [],
				inputStyle: {
					fontSize: '24rpx'
				},
				pageNumber: 1,
				pageSize: 1
			}
		},
		onLoad() {
			this.getShopsList()
		},
		methods: {
			loadMore() {
				this.pageNumber = this.pageNumber + 1
				this.getShopsList()
			},
			getShopsList() {
				var params = {
					pageNumber: this.pageNumber,
					pageSize: this.pageSize
				}
				getStoreList(params).then(res => {
					console.log(res)
					if (res.records.length == 0) {
						this.load_more_text = '到底了'
					} else {
						this.shop_list.push(...res.records)
					}
				})
			}
		}
	}
</script>
