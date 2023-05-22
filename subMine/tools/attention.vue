<template>
	<view class="attention">
		<c-shop-card :list="list" :is-attention="true"></c-shop-card>
		<view class="text-color-grey text-size-24 center" v-if="list.length!=0" @click="loadMore">
			{{load_more_text}}
		</view>
	</view>
</template>

<script>
	import {
		getGoodsOrStore
	} from '@/api/goods.js'
	export default {
		data() {
			return {
				list: [],
				load_more_text: '加载更多',
				pageNumber: 1,
				pageSize: 1
			}
		},
		onLoad() {
			this.getAttentionList()
		},
		methods: {
			loadMore() {
				this.pageNumber = this.pageNumber + 1
				this.getAttentionList()
			},
			getAttentionList() {
				var params = {
					pageNumber: this.pageNumber,
					pageSize: this.pageSize,
					type: 'STORE'
				}
				getGoodsOrStore(params).then(res => {
					if (res.records.length == 0) {
						this.load_more_text = '到底了'
					} else {
						this.list.push(...res.records)
					}
				})
			}
		}
	}
</script>

<style>

</style>
