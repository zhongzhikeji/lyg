<template>
	<view class="register bg-fff" style="padding: 60rpx;">
		<u-navbar title=" " :border-bottom='false'></u-navbar>
		<view class="">
			<view class="top bold row align-center">
				<image src="@/static/logo.png" mode="" style="width: 66rpx;height: 66rpx;margin-right: 32rpx;"
					class="round"></image>
				欢迎来到绿有购~
			</view>
			<view class="" style="">
				<view class="bold text-size-28" style="">
					推荐码
				</view>
				<u-field v-model="form.invite" label="" placeholder="请填写推荐码" :error-message="errorMessage"
					icon='thumb-up' label-width='0'>
				</u-field>
				<view class="bold text-size-28" style="margin-top: 48rpx;">
					手机号
				</view>
				<u-field v-model="form.mobilePhone" label="" placeholder="请填写手机号" :error-message="errorMessage"
					icon='phone' label-width='0'>
				</u-field>
				<!-- <view class="bold text-size-28" style="margin-top: 48rpx;">
					用户名
				</view>
				<u-field v-model="form.username" label="" placeholder="请填写用户名" icon='account' label-width='0'>
				</u-field> -->
				<view class="bold text-size-28" style="margin-top: 48rpx;">
					密码
				</view>
				<u-field v-model="form.password" label="" placeholder="请填写密码" icon='lock-open' label-width='0' password>
				</u-field>
				<view class="bold text-size-28" style="margin-top: 48rpx;">
					确认密码
				</view>
				<u-field v-model="confirm_pwd" label="" placeholder="确认密码" icon='lock-open' label-width='0' password>
				</u-field>
				<view class="bold text-size-28" style="margin-top: 48rpx;">
					验证码
				</view>
				<u-field v-model="form.code" label="" placeholder="请填写验证码" icon='lock' label-width='0'
					:field-style='{width:"390rpx"}'>
					<u-button size="mini" slot="right" type="success" @tap="getCode">{{codeText}}</u-button>
				</u-field>
				<u-verification-code ref="uCode" @change="codeChange"></u-verification-code>
			</view>
			<view class="button" style="border-radius: 16rpx;margin-bottom: 200rpx;margin-top: 60rpx;"
				@click="registerHandle">
				注册
			</view>
		</view>


		<view class="row-around align-center text-size-28 bold ">
			<text @click="toLogin(0)">验证码登录</text>|<text @click="toLogin(1)">密码登录</text>
		</view>
	</view>
</template>

<script>
	import {
		regHandle,
		sendCode
	} from '@/api/login.js'
	export default {
		data() {
			return {
				form: {
					invite: '',
					mobilePhone: '',
					password: '',
					// username: '',
					code: ''
				},
				confirm_pwd: '',
				codeText: '',
				errorMessage: ''
			}
		},
		methods: {
			toLogin(type) {
				uni.navigateTo({
					url: './login?type=' + type
				})
			},
			codeChange(text) {
				this.codeText = text;
				// console.log(text)
			},
			getCode() {
				console.log(this.form.mobilePhone)
				if (this.$refs.uCode.canGetCode) {
					// 模拟向后端请求验证码
					uni.showLoading({
						title: '正在获取验证码'
					})
					sendCode('REGISTER', this.form.mobilePhone).then(res => {
						console.log(res)
						if (res == undefined) {
							uni.showLoading({
								title: '验证码已发送'
							})
						}
						uni.hideLoading();
						this.$refs.uCode.start();
					})
				} else {
					this.$u.toast('倒计时结束后再发送');
				}
			},
			registerHandle() {
				if (this.form.invite == '') {
					uni.showToast({
						title: '请填写邀请码',
						icon: 'none'
					})
					return
				}
				if (this.form.password != this.confirm_pwd) {
					uni.showToast({
						title: '两次密码不一致',
						icon: 'none'
					})
					return
				}
				var list = Object.values(this.form)
				for (var i = 0; i < list.length; i++) {
					var item = list[i]
					if (item == '') {
						uni.showToast({
							title: '内容不能为空',
							icon: 'none'
						})
						return
					}
				}

				regHandle(this.form).then(res => {
					console.log(res)
					if (res && res.success == false) {
						uni.showToast({
							title: res.message,
							icon: 'none'
						})
						return
					}
					uni.showToast({
						title: ''
					})
					uni.navigateTo({
						url: '/pages/passport/login?type=1&&mobilePhone=' + this.form.mobilePhone
					})
				})
			}
		}
	}
</script>

<style scoped>
	.bottom {
		position: fixed;
		bottom: 120rpx;
		width: 90%;
		left: 50%;
		transform: translateX(-50%);
	}

	.top {
		height: 300rpx;
		font-size: 36rpx;
	}
</style>