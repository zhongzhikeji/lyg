<template>
	<view class="goods-infos">
		<view class="bg-fff">
			<view class="pic">
				<image :src="infos.original" mode=""></image>
			</view>
			<view class="page-padding">
				<view class="row align-center">
					<view class="text-color-red bold">
						<text class="text-size-24">￥</text><text
							style="font-size: 40rpx;margin-right: 20rpx;">{{infos.price}}</text>
					</view>
				<!-- 	<view class="text-size-24 text-color-grey">
						已售{{infos.buyCount}}件
					</view> -->
				</view>
				<view class="top-12 row align-center">
					<!-- <view class="delete text-size-24 text-color-grey">
						1234
					</view> -->
					<!-- <view class="text-size-24 text-color-red">
						绿值0
					</view> -->
				</view>
				<view class="bold top-30">
					{{infos.goodsName}}
				</view>
				<view class="text-size-24 text-color-grey top-12">
					{{infos.sellingPoint}}
				</view>
			</view>
		</view>

		<view class="page-padding bg-fff top-24 row align-center">
			<view class="round head">
				<image :src="store_infos.storeLogo" mode=""></image>
				<!--  -->
			</view>
			<view class="">
				<view class="bold">
					{{store_infos.storeName}}
					<!--  -->
				</view>
				<view class="text-size-24 text-color-grey dec">
					<text>主营品牌</text>
					<text class="val text-color-theme">{{categoryName}}</text>
					<!--  -->
					<!-- <text>店铺评分</text>
					<text class="val text-color-theme">{{store_infos.serviceScore}}</text> -->
					<!--  -->
				<!-- 	<text>店铺销量</text>
					<text class="val text-color-theme">{{store_infos.goodsNum}}</text> -->
					<!--  -->
				</view>
			</view>
		</view>

	<!-- 	<view class="top-24 bg-fff row-between align-center page-padding" style="height: 95rpx;">
			<view class="bold">
				用户评论（{{infos.commentNum}}）
			</view>
			<view class="text-size-24 text-color-grey">
				查看更多 >
			</view>
		</view> -->

		<view class="intro" v-html="infos.mobileIntro">
			<!-- <view class="pic-item" v-for="(item,index) in img_list" :key="index">
				<image :src="item" mode=""></image>
			</view> -->
		</view>

		<view class="bottom row-around align-center">
			<view class="icon center" @click="collectGoods">
				<view class="">
					<u-icon name="star" size="40" v-if='is_collect==false'></u-icon>
					<u-icon name="star-fill" size="40" v-else color='#ffaa00'></u-icon>
				</view>
				<view class="">
					收藏
				</view>
			</view>
			<view class="icon center">
				<view class="">
					<u-icon name="bag" size="40"></u-icon>
				</view>
				<view class="">
					店铺
				</view>
			</view>
			<view class="icon center">
				<view class="">
					<u-icon name="kefu-ermai" size="40"></u-icon>
				</view>
				<view class="">
					客服
				</view>
			</view>
			<view class="buy-button radius-all text-size-24 row align-center">
				<view class="add-btn center" @click="addToCartOrBuy('cart')">
					加入购物车
				</view>
				<view class="buy-btn center" @click="addToCartOrBuy('buy')">
					立即购买
				</view>
			</view>
		</view>
		<u-popup v-model="pop_show" mode='bottom' height='1150rpx'>
			<view class="page-padding">
				<view class=" row-between pop-top">
					<view class="row align-center" v-for="(item,index) in sku_list">
						<view class="pop-pic">
							<image :src="item.original"  mode=""></image>
						</view>
						<view class="" >
							<view class="text-size-24 text-color-red bold">
								￥<text class="text-size-28">{{infos.price}}</text>
							</view>
							<!-- <view class="text-size-24 text-color-grey delete">
								￥888
							</view> -->
						</view>
					</view>
					<view class="" @click="pop_show=!pop_show">
						×
					</view>
				</view>
				<view class="pop-top">
					<view class="pop-title text-size-28 bold" style="margin-top: 28rpx;margin-bottom: 24rpx;">
						规格
					</view>
					<view class=" row align-center" style="flex-wrap: wrap;">
						<view class="choose-item" v-for="(item,index) in sku_list" :key="index"
							:style="{border: item.id==current_skuId?'2rpx solid #038E3D':'0'}"
							@click="selectGoodsHandle(index)">
							<view class="" style="height: 192rpx;">
								<image :src="item.original" mode=""></image>
							</view>
							<view class="text center">
								{{item.simpleSpecs}}
							</view>
						</view>
					</view>
				</view>

				<view class="row-between align-center" style="margin-top: 50rpx;">
					<view class="">
						<text class="text-size-28 bold" style="margin-right: 24rpx;">购买数量</text><text
							class="text-size-24 text-color-grey">有货</text>
					</view>
					<view class="">
						<view class="text-color-grey text-size-24 bold" v-if="isTeHui">
							× 1
						</view>
						<u-number-box v-model="goods_num" :disabled-input='true' :min='1' v-else></u-number-box>
					</view>
				</view>
			</view>
		</u-popup>
	</view>
</template>

<script>
	import {
		getGoodsInfos,
		addGoodsOrStore,
		isAddGoodsOrStore,
		deleteGoodsOrStore
	} from '@/api/goods.js'
	import {
		getStoreBaseInfo,
		getStoreInfo
	} from '@/api/store.js'
	import * as API_trade from '@/api/trade.js';
	import storage from '@/utils/storage';
	export default {
		data() {
			return {
				pop_show: false,
				id: '',
				num: 1,
				infos: {},
				store_infos: {},
				categoryName: '',
				img_list: [],
				addr: {},
				parentOrder: '',
				goods_num: 1,
				sku_list: [],
				current_skuId: 0,
				is_collect: false,
				isTeHui: false
			}
		},
		onLoad(o) {
			this.id = o.id
			if (o.type && o.type == 'TeHui') {
				this.isTeHui = true
			}
			this.getGoodsInfos()
		},
		methods: {
			getGoodsIsCollect() {
				// console.log(this.id)
				isAddGoodsOrStore('GOODS', this.id).then(res => {
					this.is_collect = res
				})
			},
			collectGoods() {
				// console.log()
				if (this.is_collect == false) {
					addGoodsOrStore('GOODS', this.id).then(res => {
						this.is_collect = true
					})
				} else {
					deleteGoodsOrStore('GOODS', this.id).then(res => {
						this.is_collect = false
					})
				}

			},
			selectGoodsHandle(i) {
				this.sku_list.forEach((item, index) => {
					if (index == i) {
						this.current_skuId = item.id
					}
				})
			},
			getShopInfos() {
				getStoreInfo(this.infos.storeId).then(res => {
					// console.log(res)
					this.store_infos = res
					this.getGoodsIsCollect()
				})
			},
			/**
			 * 添加到购物车或购买
			 */
			addToCartOrBuy(val) {
				// if (!this.selectSkuList) {
				// 	uni.showToast({
				// 		title: '请选择规格商品',
				// 		icon: 'none'
				// 	});
				// 	return;
				// }
				// console.log(this.id)
				if (this.pop_show == true) {
					let data = {
						skuId: this.current_skuId,
						num: this.goods_num
					};
					console.log(data)
					console.log(this.infos)
					if (val == 'cart') {
						API_trade.addToCart(data).then(res => {
							console.log(res)
							if (res && res.success == false) {
								uni.showToast({
									title: res.message,
									icon: "error"
								})
							}
							if (res == null) {
								uni.showToast({
									title: '已添加',
									icon: 'none'
								});
								this.pop_show = false
							}

						});
					} else {
						console.log('buy')
						// 判断是否拼团商品
						// if (this.buyType) {
						// 	data.cartType = 'PINTUAN';
						// } else if (this.goodsDetail.goodsType == 'VIRTUAL_GOODS') {
						// 	data.cartType = 'VIRTUAL';
						// } else {
						// 	data.cartType = 'BUY_NOW';
						// }

						data.cartType = 'BUY_NOW'
						API_trade.addToCart(data).then(res => {
							console.log(res)
							if (res && res.success == false) {
								uni.showToast({
									title: res.message,
									icon: "error"
								})
							}
							if (!res) {
								console.log('buybuybuy')
								console.log(this.addr.id)
								uni.navigateTo({
									url: `/pages/order/fillorder?way=${data.cartType}&addr=${this.addr.id || ''}&parentOrder=${encodeURIComponent(JSON.stringify(this.parentOrder))}`
								});
							}
							// if (res.data.code == 200) {

							// }
						});
					}
				} else {
					this.pop_show = true
				}

			},
			getGoodsInfos() {
				var vm = this
				getGoodsInfos(this.id).then((res) => {
					// console.log(res)

					vm.infos = res

					vm.sku_list = res.skuList
					vm.current_skuId = vm.sku_list[0].id
					vm.categoryName = res.categoryName[0]
					vm.img_list = res.goodsGalleryList
					vm.getShopInfos()
				})
			}
		}
	}
</script>

<style scoped>
	/deep/ .intro img {
		width: 750rpx;
		/* height: 375rpx; */
	}

	>>>.intro img {
		width: 750rpx;
		/* height: 375rpx; */
	}

	.choose-item {
		width: 190rpx;
		height: 260rpx;
		border-radius: 24rpx;
		overflow: hidden;
		margin-right: 24rpx;
		margin-top: 24RPX;
	}

	.choose-item .text {
		background-color: #F6F6F6;
		font-size: 20rpx;
		height: 70rpx;
	}

	.pop-top {
		padding-bottom: 30rpx;
		border-bottom: 1rpx solid #DFDFDF;
	}

	.pop-pic {
		width: 140rpx;
		height: 140rpx;
		margin-right: 24rpx;
	}

	.goods-infos {
		padding-bottom: 140rpx;
	}

	.buy-button view {
		width: 50%;
		height: 100%;
	}

	.buy-button view:first-child {
		background-color: #FDD207;
		color: #763C00;
	}

	.buy-button view:last-child {
		background-color: #048D3D;
		color: #fff;
	}

	.buy-button {
		width: 400rpx;
		height: 90rpx;

	}

	.icon {
		width: 100rpx;
	}

	.bottom {
		position: fixed;
		bottom: 0;
		width: 100%;
		left: 0;
		height: 140rpx;
		background-color: #fff;
		z-index: 99999999999;
	}

	.pic {
		width: 100%;
		height: 700rpx;
	}

	.head {
		width: 88rpx;
		height: 88rpx;
		margin-right: 20rpx;
	}

	.val {
		margin-left: 20rpx;
	}

	.pic-item {
		height: 800rpx;
	}
</style>