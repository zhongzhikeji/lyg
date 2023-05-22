<style scoped>
	.box u-cell {
		margin-bottom: 20rpx;
	}
</style>
<template>
	<view class="setting page-padding">
		<view class="box">
			<!-- <u-cell :title="item.title" :isLink="true" arrow-direction="right" v-for="(item,index) in cells_list"
				:key="index" :url='item.link' :titleStyle='titleStyle'></u-cell> -->


			<u-cell-group :border='false'>
				<u-cell-item :title="item.title" :isLink="true" arrow-direction="right" :border='false'
					v-for="(item,index) in cells_list" :key="index" :border-bottom='false'
					:value='item.value?item.value:""' @click='toPage(index)' :index='index'>
					<!-- @click='toPage(item.link)' -->
					<!-- <view class="icon" slot='icon'>
						<image :src="'../../../static/mine/'+item.img" mode=""></image>
					</view> -->
				</u-cell-item>
			</u-cell-group>
		</view>

	</view>
</template>

<script>
	export default {
		data() {
			return {
				titleStyle: {
					fontSize: '24rpx'
				},
				cells_list: [{
						img: '',
						title: '用户协议',
						link: '/subMine/setting/service'
					},
					{
						img: '',
						title: '隐私政策',
						link: '/subMine/setting/privacy'
					},
					{
						img: '',
						title: '意见反馈',
						link: ''
					},
					{
						img: '',
						title: '注销账户',
						link: ''
					},
					{
						img: '',
						title: '检查更新',
						value: '最新版本',
						link: ''
					}
				]
			}
		},
		methods: {
			toPage(index) {
				console.log(index)
				uni.navigateTo({
					url: this.cells_list[index].link
				})
			}
		}
	}
</script>
