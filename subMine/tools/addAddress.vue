<template>
	<view class="add-address bg-fff page-padding">
		<view class="">
			<view class="" style="width: 100%;">
				<view class="item row align-center">
					<view class="bold title">
						收货人
					</view>
					<view class="">
						<input type="text" placeholder="请填写收货人姓名" :placeholder-style='placeholderStyle'
							v-model='form.name'>
					</view>
				</view>
				<view class="item row align-center">
					<view class="bold title">
						联系电话
					</view>
					<view class="">
						<input type="text" placeholder="请填写收货人手机号码" :placeholder-style='placeholderStyle'
							v-model='form.mobile'>
					</view>
				</view>
				<view class="item row align-center">
					<view class="bold title">
						选择地区
					</view>
					<view class="text-size-24 text-color-grey" @click="region_show=!region_show">
						{{form.consigneeAddressPath==''?'请选择收件地址（省、市、区）':form.consigneeAddressPath}}
					</view>
				</view>
				<view class="item row align-center">
					<view class="bold title">
						详细地址
					</view>
					<view class="">
						<input type="text" placeholder="例如街道、门牌号、小区、楼栋号、单元室等" :placeholder-style='placeholderStyle'
							v-model='form.detail'>
					</view>
				</view>
				<view class="item row align-center">
					<view class="bold title">
						地址标签
					</view>
					<view class="addr-tags row align-center">
						<view class="addr-tags-item text-color-grey text-size-24" v-for="(item,index) in tags_list"
							:key="index">
							{{item.name}}
						</view>
					</view>
				</view>
				<view class="item row-between align-center">
					<view class="bold ">
						设为默认地址
					</view>
					<view class="">
						<u-switch v-model="form.isDefault"></u-switch>
					</view>
				</view>
			</view>
			<view class="btn">
				<view class="button center" @click="addAddressHandle" style="border-radius: 12rpx;">
					{{id==0?'保存':'确认修改'}}
				</view>
			</view>

		</view>

		<u-picker mode="region" v-model="region_show" :area-code='["13", "1303", "130304"]' @confirm='getRegion'>
		</u-picker>
	</view>
</template>

<script>
	import {
		addAddress,
		getAddressDetail,
		editAddress
	} from '@/api/address.js'
	export default {
		data() {
			return {
				region_show: false,
				form: {
					name: '',
					mobile: '',
					isDefault: false,
					detail: '',
					consigneeAddressPath: '',
					consigneeAddressIdPath: ''
				},
				tags_list: [{
						name: '家'
					},
					{
						name: '公司'
					},
					{
						name: '学校'
					},
					{
						name: '+'
					}
				],
				placeholderStyle: {
					fontSize: '24rpx',
					color: '#AAAAB9'
				},
				id: 0,
				way: ""
			}
		},
		onLoad(o) {
			if (o.id) {
				this.id = o.id
				this.getEditGoods()
			}
			if (o.way) {
				this.way = o.way
			}
		},
		methods: {
			getEditGoods() {
				getAddressDetail(this.id).then(res => {
					// console.log(res)
					Object.keys(this.form).forEach(item => {
						this.form[item] = res[item]
					})
					console.log(this.form)
				})
			},
			getRegion(v) {
				// console.log(v)
				this.form.consigneeAddressPath = v.province.label + ',' + v.city.label + ',' + v.area.label
				this.form.consigneeAddressIdPath = v.province.value + ',' + v.city.value + ',' + v.area.value
			},
			addAddressHandle() {
				if (this.id == 0) {
					addAddress(this.form).then(res => {
						console.log(res.success)
						if (res.success == false) {
							uni.showToast({
								title: res.message,
								icon: "error"
							})
						}
						if (res.success == undefined) {
							uni.showToast({
								title: '地址已保存',
								icon: "success"
							})
							uni.navigateBack()
							// if (this.way != '') {
							// 	uni.navigateTo({
							// 		url: './address?isWay=true'
							// 	})
							// } else {
							// 	uni.navigateTo({
							// 		url: './address?back=true'
							// 	})
							// }

						}

					})
				} else {
					this.form.id = this.id
					editAddress(this.form).then(res => {
						console.log(res)
						if (!res.success) {
							uni.showToast({
								title: '修改成功',
								icon: "success"
							})
							uni.navigateTo({
								url: './address?back=true'
							})
						} else {
							uni.showToast({
								title: res.message,
								icon: "error"
							})
						}

					})
				}

			}
		}
	}
</script>

<style scoped>
	.btn {
		position: fixed;
		bottom: 70rpx;
		width: 90%;
		left: 50%;
		transform: translateX(-50%);
	}

	.item {
		padding: 20rpx 0;
		border-bottom: 1px solid #e5e5e5;
	}

	.addr-tags-item {
		padding: 6rpx 12rpx;
		border: 1rpx solid #DCDCE5;
		margin-right: 24rpx;
	}

	.title {
		margin-right: 20rpx;
		width: 20%;
		font-size: 26rpx;
	}
</style>
