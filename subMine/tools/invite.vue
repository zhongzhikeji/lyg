<style scoped>
	.pic {
		width: 95%;
		height: 970rpx;
		position: relative;
	}

	.invite-code {
		padding: 4rpx 16rpx;
		border-radius: 100px;
		border: 1px solid #fff;
		font-size: 24rpx;
		margin-top: 40rpx;
		color: #fff;
		white-space: nowrap
	}

	.outer {
		/* width: 220px;
		height: 220px;
		border-radius: 16rpx;
		border: 1px solid #000; */
		position: absolute;
		bottom: 50rpx;
		left: 50%;
		transform: translateX(-50%);
	}

	.mask {
		position: fixed;
		width: 100%;
		height: 100%;
		left: 0;
		top: 0;
		background: rgba(0, 0, 0, 0.5);
	}

	.cancel {
		color: #fff;
		border: 1px solid #fff;
		margin-top: 50rpx;
		width: 50rpx;
		height: 50rpx;
	}
</style>
<template>
	<view class="invite center page-padding">
		<view class="pic">
			<image src="../../static/mine/invite.png" mode="" id='bg'></image>
			<view class="outer center">
				<canvas id="qrcode" canvas-id="qrcode" style="width: 70px;height: 70px;"></canvas>
				<view class="text-size-24" style="color: #fff;font-size: 18rpx;">
					长按识别二维码即可参与
				</view>
				<view class="invite-code">
					邀请码 {{invite_code}}
					<u-icon name="file-text" color="#fff" size="28" @click="copyHandle"></u-icon>
				</view>
			</view>
		</view>


		<view class="button top-30" @click="savePic">
			保存图片
		</view>
		<view class="text-size-24 top-24" @click="toInviteInfos">
			您已成功邀请{{num}}位好友注册 》
		</view>
		<view class="mask center" v-if="is_save">
			<canvas class="canvas" canvas-id="saveQr" style="width: 300px;height: 500px;"></canvas>
			<view class="cancel round center" @click="cancel">
				×
			</view>
		</view>
	</view>
</template>

<script>
	import {
		inviteCode
	} from '@/api/login.js'
	import UQRCode from 'uqrcodejs';
	export default {
		data() {
			return {
				is_save: false,
				invite_code: "csdavfbgdsntunhfmdmstmsmsthm",
				link: '',
				num: 0,
				bgPath: '../../static/mine/invite.png',
				codePath: ''
			}
		},
		onLoad(o) {
			uni.showLoading()
		},
		onReady() {
			var obj = {
				userId: uni.getStorageSync('userId')
			}
			this.getInviteCode(obj)
		},
		methods: {
			cancel() {
				this.is_save = false
			},
			toInviteInfos() {
				console.log('111')
				uni.navigateTo({
					url: '/subMine/tools/inviteInfos'
				})
			},
			getInviteCode(params) {
				var vm = this
				inviteCode(params).then(res => {
					console.log(res)
					vm.invite_code = res.inviteUrl.toString().split('?')[1].split('=')[1]
					vm.num = res.invitedCount
					// 获取uQRCode实例
					var qr = new UQRCode();
					// 设置二维码内容
					qr.data = res.inviteUrl;
					// 设置二维码大小，必须与canvas设置的宽高一致
					qr.size = 70;
					// 调用制作二维码方法
					qr.make();
					// 获取canvas上下文
					var canvasContext = uni.createCanvasContext('qrcode', vm); // 如果是组件，this必须传入
					// 设置uQRCode实例的canvas上下文
					qr.canvasContext = canvasContext;
					// 调用绘制方法将二维码图案绘制到canvas上
					qr.drawCanvas();
					uni.hideLoading()
				})
			},
			copyHandle() {
				uni.setClipboardData({
					data: this.invite_code,
					showToast: true
				})
			},
			drawImg() {
				var vm = this
				const ctx = uni.createCanvasContext('saveQr')
				uni.canvasToTempFilePath({
						canvasId: 'qrcode',
						fileType: 'png',
						width: 200,
						height: 200,
						success: res => {
							vm.codePath = res.tempFilePath
							uni.getImageInfo({
								src: vm.bgPath,
								success: (img) => {
									ctx.drawImage(vm.bgPath, 0, 0, 300, 500)
									uni.getImageInfo({
										src: vm.codePath,
										success() {
											ctx.drawImage(vm.codePath, 115, 330, 70, 70)
											ctx.textAlign = 'center'
											ctx.setTextBaseline('top')
											ctx.fillStyle = "#fff"
											ctx.font = 'bold 14px sans-serif';

											ctx.fillText('邀请码：' + vm.invite_code, 150, 410)
											ctx.draw(true, () => {
												setTimeout(() => {
													uni.canvasToTempFilePath({
														canvasId: 'saveQr',
														fileType: 'png',
														success(res) {
															uni.saveImageToPhotosAlbum({
																filePath: res
																	.tempFilePath,
																success: res => {
																	uni.showToast({
																		title: '已保存'
																	})
																	uni.hideLoading()
																	// vm.is_save =
																	// 	false
																},
																fail: err => {
																	console
																		.log(
																			err
																		);
																}
															})
														}
													})
												}, 1000)
											})
										}
									})
								}
							})
						},
						fail: err => {
							console.log(err);
						}
					},
					// this // 组件内使用必传当前实例
				);
			},
			savePic() {
				// 通过uni.createCanvasContext方式创建绘制上下文的，对应导出API为uni.canvasToTempFilePath
				// 调用完ctx.draw()方法后不能第一时间导出，否则会异常，需要有一定的延时
				this.is_save = true
				uni.showLoading()
				this.drawImg()
			}
		}
	}
</script>