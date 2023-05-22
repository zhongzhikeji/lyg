<template>
	<view class="collection">

	</view>
</template>

<script>
	import {
		getGoodsOrStore
	} from '@/api/goods.js'
	export default {
		data() {
			return {
				list: []
			}
		},
		onLoad() {
			this.getCollectionList()
		},
		methods: {
			getCollectionList() {
				var obj = {
					pageNumber: 1,
					pageSize: 10,
					type: 'GOODS'
				}
				getGoodsOrStore(obj).then(res => {
					console.log(res)
				})
			}
		}
	}
</script>

<style>

</style>
