<style scoped>
	.create-shop {
		height: 100vh;
	}

	.title {
		color: #fff;
		font-weight: bold;
		font-size: 60rpx;
		font-style: italic;
	}

	.text {
		width: 146rpx;
		height: 42rpx;
		background: #FF9900;
		border-radius: 18rpx;
		color: #fff;
		font-size: 24rpx;
	}

	.u-input {
		background-color: #EBEEF5;
	}

	.top-24:first-child {
		margin-top: 0;
	}

	.upload {
		width: 100%;
		height: 250rpx;
	}

	.item {
		background-color: #EBEEF5;
		height: 86rpx;
		border-radius: 100px;
		padding: 0 40rpx;
	}

	/deep/.input-placeholder {
		font-size: 24rpx;
		color: #84878E;
	}

	.item-icon {
		width: 34rpx;
		height: 34rpx;
		margin-right: 10rpx;
	}

	.item-right {
		color: #84878E;
		font-size: 20rpx;
	}
</style>
<template>
	<view class="create-shop bg-theme page-padding">
		<view class="">
			<view class="title">
				店铺入驻
			</view>
			<view class="text center top-24">
				就等你来
			</view>
		</view>
		<view class="box page-padding top-30">
			<!-- <u-input :placeholder="item.placeholder" prefixIcon="search"
				prefixIconStyle="font-size: 22px;color: #909399" shape="circle" :placeholderStyle='placeholderStyle'
				class="top-24" v-for="(item,index) in input_list" :key="index" v-if="!item.is_after">
			</u-input>
			<u-input :placeholder="item.placeholder" prefixIcon="search"
				prefixIconStyle="font-size: 22px;color: #909399" shape="circle" :placeholderStyle='placeholderStyle'
				class="top-24" v-for="(item,index) in input_list" :key="index" v-if="item.is_after" suffixIcon="search"
				suffixIconStyle="font-size: 22px;color: #909399">
			</u-input> -->
			<view class="">
				<view class="top-24 item row-between align-center" v-for="(item,index) in input_list" :key="index">
					<!-- <u-search :placeholder="item.placeholder" :showAction="false" height="66" searchIconSize='44'
						v-for="(item,index) in input_list" :key="index" v-if="!item.is_after" style="">
					</u-search> -->
					<view class="row align-center">
						<view class="item-icon">
							<image :src="'../../static/mine/'+item.icon+'.png'" mode=""></image>
						</view>
						<view class="text-size-24">
							<input type="text" :placeholder="item.placeholder" placeholder-class='input-placeholder'
								:disabled="item.is_after?true:false">
						</view>
					</view>

					<view class="item-right" v-if="item.is_after">
						▼
					</view>
				</view>
			</view>



			<!-- <view class="">
				<view class="">
					<image src="../../icon.png" mode=""></image>
				</view>
				<u-input :placeholder="item.placeholder" prefixIcon="search"
					prefixIconStyle="font-size: 22px;color: #909399" shape="circle" :placeholderStyle='placeholderStyle'
					class="top-24" v-for="(item,index) in input_list" :key="index" v-if="!item.is_after">
				</u-input>
			</view> -->


			<view class="bold text-size-32 top-30">
				<text>*</text>请上传营业执照
			</view>
			<view class="top-24 upload">
				<c-upload></c-upload>
			</view>
			<view class="button top-30" style="border-radius: 12rpx;">
				提交审核
			</view>
		</view>

	</view>
</template>

<script>
	export default {
		data() {
			return {
				placeholderStyle: {
					fontSize: '24rpx'
				},
				input_list: [{
						placeholder: '请输入店铺名称',
						icon: 'shop'
					},
					{
						placeholder: '请输入真实姓名',
						icon: 'name'
					},
					{
						placeholder: '请输入店铺手机号',
						icon: 'phone'
					},
					{
						placeholder: '请输入登录密码',
						icon: 'password'
					},
					{
						placeholder: '请输入验证码',
						icon: 'code'
					},
					{
						placeholder: '请选择省，市，区',
						icon: 'group',
						is_after: true
					},
					{
						placeholder: '请选择店铺主营项目',
						icon: 'group',
						is_after: true
					},
					{
						placeholder: '请选择店铺类型',
						icon: 'group',
						is_after: true
					}
				]
			}
		},
		methods: {

		}
	}
</script>
