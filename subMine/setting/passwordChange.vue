<template>
	<view class="password-change page-padding">
		<view class="title bold">
			设置新密码
		</view>
		<view class="">
			<u-field v-model="form.mobile" label="手机号" placeholder="" disabled></u-field>
			<u-field v-model="form.password" label="新密码" placeholder="请设置新密码"></u-field>
			<u-field v-model="password_confirm" label="确认密码" placeholder="请再次输入密码"></u-field>
			<u-field v-model="form.code" label="验证码" placeholder="请填写验证码" :field-style='{width:"390rpx"}'>
				<u-button size="mini" slot="right" type="success" @tap="getCode">{{codeText}}</u-button>
			</u-field>
			<u-verification-code ref="uCode" @change="codeChange"></u-verification-code>
		</view>
		<u-checkbox-group class="top-30" size="20" :wrap='true'>
			<u-checkbox v-model="item.checked" v-for="(item, index) in list" :key="index" :name="item.name"
				:disabled='true' shape="circle" label-size='20'>
				{{item.name}}
			</u-checkbox>
		</u-checkbox-group>
		<view class="button top-30" @click="changePwd">
			确定
		</view>
		<view class="tip top-24">
			安全提示：新密码请勿与旧密码过于相似。
		</view>
	</view>
</template>

<script>
	import * as API_login from '@/api/login.js'
	import {
		getUserInfo
	} from '@/api/members.js'
	import storage from "@/utils/storage.js";
	export default {
		data() {
			return {
				codeText: '',
				list: [

					{
						name: '密码由8-16位数字，字母或符号组成',
						checked: true
					},
					{
						name: '至少含2种以上字符',
						checked: true
					}
				],
				password_confirm: '',
				form: {
					password: '',
					mobile: '',
					code: ''
				}
			}
		},
		onLoad() {
			this.getUserInfo()
		},
		methods: {
			changePwd() {
				if (this.password_confirm != this.form.password) {
					uni.showToast({
						title: '两次密码不一致',
						icon: 'none'
					})
					return
				}
				for (var i = 0; i < Object.values(this.form).length; i++) {
					var item = Object.values(this.form)[i]
					if (item == '') {
						uni.showToast({
							title: '内容不能为空',
							icon: 'none'
						})
						return
					}
				}

				API_login.resetByMobile(this.form).then(res => {
					console.log(res)
					if (!res) {
						uni.showToast({
							title: '',
							icon: 'success'
						})
						storage.removeAccessToken()
						uni.reLaunch({
							url: '/pages/passport/login'
						})
						return
					}
					if (res && res.success == false) {
						uni.showToast({
							title: res.message,
							icon: 'none'
						})
						return
					}

				})
			},
			getUserInfo() {
				getUserInfo().then(res => {
					console.log(res)
					if (res.success == false) {
						uni.showToast({
							title: '请先登录',
							icon: 'error'
						})
						uni.navigateTo({
							url: '/pages/passport/login'
						})
					} else {
						uni.setStorageSync('userId', res.id)
						this.form.mobile = res.mobile
					}
				})
			},
			codeChange(text) {
				this.codeText = text;
			},
			getCode() {
				if (this.$refs.uCode.canGetCode) {
					// 模拟向后端请求验证码
					// console.log(this.code_form.mobile)
					uni.showLoading({
						title: '正在获取验证码'
					})
					API_login.sendCode('UPDATE_PASSWORD', this.form.mobile).then(res => {
						uni.hideLoading();
						if (!res) {
							uni.showToast({
								title: '已发送！',
								icon: 'none'
							})
							// 通知验证码组件内部开始倒计时
							this.$refs.uCode.start();
						}


					})
				} else {
					this.$u.toast('倒计时结束后再发送');
				}
			},
		}
	}
</script>

<style scoped>
	.tip {
		font-size: 20rpx;
		color: #A5A8B6;
	}

	.title {
		font-size: 48rpx;
		margin: 48rpx 0 76rpx 0;
	}
</style>
