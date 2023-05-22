<template>
	<view class="login" style="padding: 60rpx;">
		<u-navbar title=" " :border-bottom='false'></u-navbar>
		<view class="">
			<view class="top bold row align-center">
				<image src="@/static/logo.png" mode="" style="width: 66rpx;height: 66rpx;margin-right: 32rpx;"
					class="round"></image>
				欢迎来到绿有购全球~
			</view>
			<view class="" v-if='code_login'>
				<view class="">
					<view class="bold text-size-28" style="margin-bottom: 20rpx;">
						手机号
					</view>
					<u-field v-model="code_form.mobile" label="" placeholder="请填写手机号" :error-message="errorMessage"
						icon='phone' label-width='0'>
					</u-field>
					<view class="bold text-size-28" style="margin-top: 80rpx;">
						验证码
					</view>
					<u-field v-model="code_form.code" label="" placeholder="请填写验证码" icon='lock-open' label-width='0'
						:field-style='{width:"390rpx"}'>
						<u-button size="mini" slot="right" type="success" @tap="getCode">{{codeText}}</u-button>
					</u-field>
					<u-verification-code ref="uCode" @change="codeChange"></u-verification-code>
				</view>
			</view>

			<view class="" v-else>
				<view class="bold text-size-28" style="margin-bottom: 20rpx;">
					手机号
				</view>
				<u-field v-model="user_form.username" label="" placeholder="请填写手机号" :error-message="errorMessage"
					icon='phone' label-width='0'>
				</u-field>
				<view class="bold text-size-28" style="margin-top: 80rpx;">
					密码
				</view>
				<u-field v-model="user_form.password" label="" placeholder="请填写密码" icon='lock-open' label-width='0'
					password>
				</u-field>
			</view>
			<view class="">

				<u-checkbox-group size='24'>
					<u-checkbox v-model="is_agreen" class="agree" shape="circle" label-size='22'>
						已阅读并同意<text>服务协议</text>和<text @click="toUser">用户协议</text>
					</u-checkbox>
				</u-checkbox-group>
			</view>
			<view class="button" style="border-radius: 16rpx;margin-top: 82rpx;" @click="loginHandle">
				登录
			</view>
		</view>


		<view class="row-around align-center text-size-28 bold bottom">
			<text @click="registerHandle">注册账号</text>|<text
				@click="code_login=!code_login">{{code_login?'密码登录':'验证码登录'}}</text>
		</view>
	</view>
</template>
<script>
	import {
		smsLogin,
		userLogin,
		sendCode
	} from '@/api/login.js'
	import storage from "@/utils/storage.js"; //缓存
	import {
		getUserInfo
	} from "@/api/members";
	export default {
		data() {
			return {
				code_login: true,
				code_form: {
					code: '',
					mobile: ''
				},
				user_form: {
					password: '',
					username: ''
				},
				codeText: '',
				errorMessage: '',
				is_agreen: false
			}
		},
		onLoad(o) {
			if (o.type == 1) {
				this.code_login = false
				if (o.mobilePhone) {
					this.user_form.username = o.mobilePhone
				}
			}

		},
		methods: {
			registerHandle() {
				uni.navigateTo({
					url: './register'
				})
			},
			toUser(){
				uni.navigateTo({
					url: '/subMine/setting/service'
				})
			},
			codeChange(text) {
				this.codeText = text;
			},
			getCode() {
				if (this.$refs.uCode.canGetCode) {
					// 模拟向后端请求验证码
					console.log(this.code_form.mobile)
					uni.showLoading({
						title: '正在获取验证码'
					})
					sendCode('LOGIN', this.code_form.mobile).then(res => {
						console.log(res)
						uni.hideLoading();
						// 通知验证码组件内部开始倒计时
						this.$refs.uCode.start();
					})
				} else {
					this.$u.toast('倒计时结束后再发送');
				}
			},
			radioChange(e) {
				console.log(e);
			},
			loginHandle() {
				if (this.is_agreen) {
					if (this.code_login) {
						// console.log(this.code_form)
						smsLogin(this.code_form).then(res => {
							console.log(res)
							if (res.success == false) {
								uni.showToast({
									title: res.message,
									icon: "error"
								});

							} else {
								
								storage.setAccessToken(res.accessToken)
								storage.setRefreshToken(res.refreshToken)
								// 登录成功
								uni.showToast({
									title: "登录成功!",
									icon: "success"
								});
								getUserInfo().then((user) => {
									// storage.setUserInfo(user.data.result);
									storage.setHasLogin(true)
									uni.switchTab({
										url: '/pages/tabbar/home/index'
									})
								});
							}


						})
					} else {
						userLogin(this.user_form).then(res => {
							console.log(res)
							if (res.success == false) {
								uni.showToast({
									title: res.message,
									icon: "error"
								});
								return
							}
						   console.log(res)
							storage.setAccessToken(res.accessToken)
							storage.setRefreshToken(res.refreshToken)
							
							// 登录成功
							uni.showToast({
								title: "登录成功!",
								icon: "success"
							});
							getUserInfo().then((user) => {
								console.log(user)
								// storage.setUserInfo(user.data.result);
								storage.setHasLogin(true)
								uni.switchTab({
									url: '/pages/tabbar/home/index'
								})
							});

						})
					}
				} else {
					uni.showToast({
						title: '请先勾选同意服务协议和用户协议',
						icon: "none"
					})
				}

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

	.agree text {
		color: #038E3D;
	}

	.agree {
		font-size: 22rpx;
		color: #303030;
	}

	/* .u-field__input-wrap[data-v-1c764f86] {
		width: 200rpx;
	} */
</style>