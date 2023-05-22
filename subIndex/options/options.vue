<template>
	<view class="options">
		<u-navbar :title="page==0?'舒适酒店':page==1?'休闲茶楼':page==2?'美味餐厅':'线下商家'" :placeholder='true' :autoBack="true">
		</u-navbar>
		   <h2 style="display: flex;justify-content: center;height: 100vh;align-items: center;color: #f40;">即将开放,尽请期待</h2>
<!-- 		<view class="page-padding">
			<u-search placeholder="请输入你要的商品" v-model="keyword" :showAction="false" height="66" searchIconSize='44'
				@search="searchHandle" @custom='searchHandle'>
			</u-search>
			<view class="top-30" style="height: 320rpx;">
				<image src="@/static/index/shop_adv.png" mode=""></image>
			</view>
			<view class="page-padding">
				<c-index-option-card :btn-text="page"></c-index-option-card>
				<view class="center text-size-32 text-color-grey" @click="loadMore">
					{{loadText}}
				</view>
			</view>
		</view> -->

	</view>
</template>

<script>
	import {
		getStoreList
	} from '@/api/store.js'
	export default {
		data() {
			return {
				page: 0,
				keyword: '',
				shop_list: [],
				pageNumber: 1,
				pageSize: 10,
				loadText: '加载更多'
			}
		},
		onLoad(o) {
			this.page = o.type
			this.getShopListHandle()
		},
		methods: {
			loadMore() {
				this.pageNumber = this.pageNumber + 1
				this.getShopListHandle()
			},
			searchHandle() {
				let params = {
					pageNumber: 1,
					pageSize: 10,
					storeName: this.keyword
				}
				getStoreList(params).then((res) => {
					// this.goods_list.push(...res.content);
					console.log(res)
				})
			},
			getShopListHandle() {
				let params = {
					pageNumber: this.pageNumber,
					pageSize: this.pageSize,
					storeName: this.page == 0 ? '舒适酒店' : this.page == 1 ? '休闲茶楼' : this.page == 2 ? '美味餐厅' : '线下商家'
				}
				getStoreList(params).then((res) => {
					if (res.records.length == 0) {
						this.loadText = '到底了'
					} else {
						this.goods_list.push(...res.records);
					}
				})
			},
		}
	}
</script>

<style>

</style>