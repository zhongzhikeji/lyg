<template>
	<view class="page-padding">
		<view class="record top-30 box page-padding">
			<view class="record-item row-between align-center top-24" v-for="(item,index) in records_list" :key="index">
				<view class="">
					<view class="">
						{{item.type}}
					</view>
					<view class="text-color-grey text-size-24">
						{{item.createTime}}
					</view>
				</view>
				<view class="bold text-color-theme text-size-32" :style="{color:item.operation=='增加'?'green':'red'}">
					{{item.amount==0?'':item.operation=='增加'?'+':'-'}} {{item.amount}}
				</view>
			</view>

			<view class="center text-size-24 text-color-grey" @click="loadMore">
				{{loadtext}}
			</view>
		</view>
	</view>
</template>

<script>
	import {
		getRecords
	} from '@/api/members.js'
	export default {
		data() {
			return {
				pageNumber: 1,
				pageSize: 10,
				records_list: [],
				loadtext: '加载更多'
			}
		},
		onLoad() {
			this.getRecordsHandle()
		},
		methods: {
			loadMore() {
				this.pageNumber = this.pageNumber + 1
				this.getRecordsHandle()
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
		}
	}
</script>

<style>

</style>