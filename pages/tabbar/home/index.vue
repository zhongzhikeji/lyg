<style scoped>
	.u-icon {
		margin-left: 10rpx;
		color: #fff !important;
	}

	.nav-left {
		width: 90%;
	}

	.nav-left-left {
		/* font-size: 22rpx; */
	}

	.nav-left-right {
		width: 76%;
		margin-left: 20rpx;
		border-radius: 20rpx;
		overflow: hidden;
	}

	.top {
		background-color: #048D3D;
		color: #fff;
		padding: 26rpx;
	}

	.tabs {
		margin-top: 40rpx;
	}

	.tags {
		/* padding: 8rpx 30rpx;
		width: 100%;
		background-color: #EFEFEF;
		border-radius: 100rpx;
		color: #090C0A;
		font-size: 20rpx; */
		width: 100%;
		height: 42rpx;
		margin-top: 16rpx;
	}

	.notice {
		padding: 16rpx 20rpx;
	/* 	background-color: #fdf6ec */
		border-radius: 12rpx;
		margin-top: 26rpx;
	}

	.notice-title {
		font-weight: bold;
		padding: 4rpx 6rpx;
		background-image: url('../../../static/index/notice_bg.png');
		background-size: 28rpx 28rpx;
		background-repeat: no-repeat;
		background-position-x: left;
		background-position-y: top;
	}

	.notice-text {
		font-size: 20rpx;
		color: #8B8B8B;
	}

	.options {
		padding: 26rpx 42rpx;
	}

	.areas {
		padding: 16rpx 34rpx;
		border-radius: 24rpx;
		background-color: #ffcaca;
		background-image: url('../../../static/index/areas_bg.png');
		background-size: 100% 100%;
	}

	.areas-title {
		font-weight: bold;
		margin-bottom: 26rpx;
	}

	.areas-title text {
		color: #FF0000;
	}

	.areas-item {
		padding: 20rpx 26rpx;
		background-color: aliceblue;
		border-radius: 20rpx;
		margin-right: 24rpx;
		width: 260rpx;
		height: 190rpx;

	}

	.areas-item:nth-child(1) {
		background-image: url('../../../static/index/areas_itembg_1.png');
		background-size: 100% 100%;
	}

	.areas-item:nth-child(2) {
		background-image: url('../../../static/index/areas_itembg_2.png');
		background-size: 100% 100%;
	}

	.areas-item:nth-child(3) {
		background-image: url('../../../static/index/areas_itembg_3.png');
		background-size: 100% 100%;
	}

	.areas-item-see {
		color: #C6101F;
		font-size: 20rpx;
		margin-top: 8rpx;
	}

	.areas-item-btn {
		padding: 5rpx 16rpx;
		border-radius: 100px;
		background-color: #FD3A5C;
		color: #fff;
		font-size: 20rpx;
		margin-top: 20rpx;
	}

	.areas-item-img {
		width: 70rpx;
		height: 70rpx;
		margin-left: 30rpx;
	}

	.areas-item-title {
		font-weight: bold;
		font-size: 28rpx;
	}

	.areas-item-outer {
		overflow-x: scroll;

	}
</style>
<template>
	<view class="">
		<mescroll-body @init="mescrollInit" @down="downCallback" @up="upCallback" :down="downOption" :up="upOption">

			<u-navbar title=" " :background="nav_bg" :is-back='false' height="0" :border-bottom='false'></u-navbar>
			<view class="top page-padding">
				<view class="row-between align-center">
					<view class="row align-center nav-left">
						<view class="row align-center nav-left-left text-size-24">
						<!-- 	{{current_position}}
							<u-icon name="arrow-down" color='#fff'></u-icon> -->
						</view>
						<view class="nav-left-right">
							<u-search searchIconSize='40' height='58' shape="square" :showAction='false'
								placeholder='请输入商品名搜索商品' :bgColor='"#F3F5F8"' v-model="keyword" @search='searchHandle'>
							</u-search>
						</view>
					</view>
					<view class="nav-right" @click="scanHandle">
						<u-icon name="scan" size='60' color='#fff'></u-icon>
					</view>
				</view>
				<view class="tabs">
					<c-tabs :list="nav_list" @change='getCurrentTab' selected-color="#fff" color="#fff"></c-tabs>
				</view>
			</view>
			<!-- <view class="top page-padding">
			<view class="">
				11111
			</view>
		</view> -->

			<view class="" style="padding: 0 26rpx;">
				<image src="@/static/index/adv.png" mode=""
					style="width: 100%;height: 200rpx;border-radius: 20rpx;margin-top: 16rpx;"></image>
				<!-- <view class="tags row-between align-center">
				<view class="tag-item" v-for="(item,index) in tags_list" :key="index">
					{{item.text}}
				</view>
			</view> -->
				<view class="tags">
					<image src="@/static/index/dec_2.png" mode=""></image>
				</view>
				<view class="row-between align-center notice">
					<u-notice-bar mode="horizontal" :list="list"></u-notice-bar>
					<!-- 	<view class="row align-center">
				
					<view class="notice-title" style="position: relative;">
						新闻通告
					</view>
					<view class="left-20 notice-text">
						这是一条新闻。。。
					</view>
				</view>
				<view class="">
					<u-icon name='arrow-right' :bold='true'></u-icon>
				</view> -->
				</view>

				<view class="options">
					<c-option :list="option_list" @current='getCurrentOption'></c-option>
				</view>

				<view class="areas">
					<view class="areas-title row align-center">
						<text>精选</text>专区
						<image src="@/static/index/areas_fire.png" mode=""
							style="width: 24rpx;height: 30rpx;margin-left: 10rpx;"></image>
					</view>
					<view class="row align-center areas-item-outer">
						<view class="areas-item" v-for="(item,index) in areas_list" :key="index"
							@click="toAreas(index)">
							<view class="areas-item-title">
								{{item.title}}
							</view>
							<view class="row-between align-end">
								<view class="">
									<view class="areas-item-see">
										进去看看
									</view>
									<view class="row align-center areas-item-btn">
										GO <u-icon name="arrow-right-double" size='20' color='#fff'></u-icon>
									</view>
								</view>
								<view class="">
									<view class="areas-item-img">
										<!-- <image src="@/static/logo.png" mode=""></image> -->
									</view>
								</view>
							</view>
						</view>
					</view>
				</view>

				<view class="recommand top-24">
					<view class="recommand-title bold center">
						<view class="row align-center">
							<image src="@/static/index/title_bg.png" mode="" style="width: 84rpx;height: 84rpx;">
							</image>
							精品推荐
							<view class="" style="width: 84rpx;height: 84rpx;">

							</view>
						</view>
					</view>
					<c-goods-card :list="goods_list" @current='getCurrentGoods'></c-goods-card>
				</view>
			</view>


		</mescroll-body>

		<u-toast ref="uToast" />
	</view>
</template>

<script>
	import {
		getGoodsList,
		getGoodsByClass,
		getMpTypee
	} from '@/api/goods.js'
	import * as API_trade from '@/api/trade.js';
	import MescrollMixin from "@/uni_modules/mescroll-uni/components/mescroll-uni/mescroll-mixins.js";
	export default {
		mixins: [MescrollMixin], // 使用mixin
		data() {
			return {

				downOption:{},
				upOption:{},
				keyword: '',
				nav_bg: {
					backgroundColor: "#048D3D"
				},
				list: [
					'寒雨连江夜入吴',
					'平明送客楚山孤',
					'洛阳亲友如相问',
					'一片冰心在玉壶'
				],
				goods_list: [],
				option_list: [{
						title: '舒适酒店',
						icon: 'index/option_1.png'
					},
					{
						title: '休闲茶楼',
						icon: 'index/option_2.png'
					},
					{
						title: '美味餐厅',
						icon: 'index/option_3.png'
					},
					{
						title: '线下商家',
						icon: 'index/option_4.png'
					}
				],
				nav_list: [{
					name: '首页精选',
				}, {
					name: '食品酒饮',
				}, {
					name: '鲜美果蔬'
				}, {
					name: '粮油系列'
				}],
				tags_list: [{
						text: '绿色认证',
						icon: ''
					},
					{
						text: '平价销售',
						icon: ''
					},
					{
						text: '质量保证',
						icon: ''
					},
					{
						text: '有机环保',
						icon: ''
					}
				],
				areas_list: [{
						title: '特惠专区'
					},
					{
						title: '普通专区'
					},
					{
						title: '爆款专区'
					}
				],
				current_goods: 0,
				current_position: '定位中',
				pageNumber: 1,
				pageSize: 10
			}
		},
		onLoad() {
			

		},
		mounted() {
			this.getMpTypees()
			// this.getPosition()
			// this.$nextTick(() => {

			// })

		},
		// computed: {
		// 	current_position() {
		// 		uni.getLocation({
		// 			geocode: true,
		// 			type: 'gcj02',
		// 			success(res) {
		// 				return res.address.city
		// 			}
		// 		})
		// 	}
		// },

		methods: {
			 async getMpTypees(){
				 let parmas = {
					 categoryId:1390968079827075072
				 }
				const res =await getMpTypee(parmas)
				console.log(res)
			},
			upCallback(page) {
				let pageNum = page.num; // 页码, 默认从1开始
				let pageSize = page.size; // 页长, 默认每页10条
				let params = {
					pageNumber: pageNum,
					pageSize: pageSize,
					recommend: true,
					marketEnable: 'UPPER',
					categoryName: '精品推荐'
				}
				getGoodsList(params).then((res) => {
					let curPageData = res.records
					// 接口返回的当前页数据长度 (如列表有26个数据,当前页返回8个,则curPageLen=8)
					let curPageLen = curPageData.length;
					// 接口返回的总页数 (如列表有26个数据,每页10条,共3页; 则totalPage=3)
					let totalPage = res.pages
					// 接口返回的总数据量(如列表有26个数据,每页10条,共3页; 则totalSize=26)
					let totalSize = res.total
					if(page.num == 1) this.goods_list = [];
					this.goods_list = this.goods_list.concat(curPageData)
					this.mescroll.endByPage(curPageLen, totalPage); 

				})
			},
		
			scanHandle() {
				uni.scanCode({
					success(res) {
						console.log(res)
					}
				})
			},
			getPosition() {
				var vm = this

				uni.getLocation({
					geocode: true,
					type: 'gcj02',
					success(res) {
						console.log(res)
						vm.current_position = res.address.city
					}
				})
			},
			// getAddCard(i) {
			// console.log(this.goods_list[i])
			// 	let data = {
			// 		skuId: this.goods_list[i].id,
			// 		num: 1
			// 	};
			// 	API_trade.addToCart(data).then(res => {
			// 		// console.log(res)
			// 		if (!res.success) {
			// 			uni.showToast({
			// 				title: res.message,
			// 				icon: "error"
			// 			})
			// 			return
			// 		}
			// 		uni.showToast({
			// 			title: '商品已添加到购物车',
			// 			icon: 'none'
			// 		});
			// 	});
			// },
			getCurrentGoods(index) {
				this.current_goods = index
        
				uni.navigateTo({
					url: '/subGoods/goodsInfos/goodsInfos?id=' + this.goods_list[index].id
				})
			},
			searchHandle() {
				let params = {
					pageNumber: 1,
					pageSize: 10,
					keyword: this.keyword
				}
				getGoodsList(params).then((res) => {
					// this.goods_list.push(...res.content);
					console.log(res)
				})
			},
		
			getCurrentTab(i) {
				if (i != 0) {
					uni.navigateTo({
						url: '/subIndex/tabsPage/tabsPage?type=' + i
					})
				}

			},
			getCurrentOption(i) {
				this.$refs.uToast.show({
					title: '正在接入中',
					type: 'warning',
					// url: '/pages/user/index'
				})
				// uni.navigateTo({
				// 	url: '/subIndex/options/options?type=' + i
				// })
			},
			toAreas(index) {
				uni.navigateTo({
					url: '/subIndex/areas/areas?type=' + index
				})
			}
		}
	}
</script>