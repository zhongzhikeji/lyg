<template>
	<view class="withdraw">
		<u-navbar title="提现申请" :background="nav_bg" :border-bottom='false' title-color='#fff' back-icon-color='#fff'>
		</u-navbar>
		<view class="top-bg" style="height: 455rpx;"></view>
		<view class="page-padding">
			<view class="box page-padding " style="margin-top: -400rpx;">
				<view class="row align-center">
					<view class="bold">
						提现金额
					</view>
					<view class="" style="color: #A5A8B6;font-size: 20rpx;">
						最低提现金额100元
					</view>
				</view>

				<view class="top-68">
					<u-field v-model="form.price" label="￥" placeholder="请填写提现金额" :field-style='{width:"390rpx"}'>
						<view class="text-size-24 text-color-theme" slot="right" style="" label-width='100' @click="allPrice">
							全部提现
						</view>
					</u-field>
					<view class="text-color-grey" style="font-size: 22rpx;">
						可提现余额：{{balance.memberWallet}}元 提现手续费：10%
					</view>
				</view>
			</view>
			<view class="box top-30 page-padding">
				<view class="bold">
					提现账户
				</view>
				<view class="top-30">
					银行卡
				</view>
				<view class="top-30 page-padding" style="background-color: #F2FDED;">
					<u-field v-model="form.realName" label="开户行姓名" placeholder="" label-width='200'></u-field>
					<u-field v-model="form.bankCardName" label="开户行名称" placeholder="" label-width='200'></u-field>
					<u-field v-model="form.bankBranchName" label="银行支行" placeholder="" label-width='200'></u-field>
					<u-field v-model="form.bankCard" label="银行卡号" placeholder="" label-width='200'></u-field>
				</view>

			</view>
			<view class="text-size-24 text-color-red">
				*请仔细核对姓名、开户行、银行支行、卡号等信息与实名认
				证的身份是否符合，否则导致打款失败
			</view>

			<view class="button top-110" @click="applyFor">
				申请提现
			</view>
		</view>
		<u-toast ref="uToast" />
	</view>
</template>

<script>
	import {
		withdrawalApply,
		getBalance
	} from '@/api/members.js'
	export default {
		data() {
			return {
				nav_bg: {
					backgroundColor: "#048D3D"
				},
				form: {
					price: '',
					realName: '',
					bankCardName: '',
					bankBranchName: '',
					bankCard: ''
				},
			    balance: {},
			}
		},
		methods: {
			addWithdrawal() {

				withdrawalApply(this.form).then(res => {
					if(res == '提现申请成功！'){
						 this.$refs.uToast.show({
						 	title: res,
						 	type: 'success'
						 
						 })
						setTimeout(()=>{
								uni.navigateTo({
									url: '/subMine/tools/wallet'
								})
						},800) 
					}else if(res.code != 200){
						 this.$refs.uToast.show({
						 	title: res.message,
						 	type: 'error'
						 
						 }) 
					}
					
           
				})

			},
			applyFor() {
				this.addWithdrawal()
			},
			getBalance() {
				getBalance().then(balance => {
					console.log(balance)
					this.balance = balance
			
				})
			},
			allPrice(){
			this.form.price	 = this.balance.memberWallet
			}
		},
		mounted() {
         this.getBalance()
		}
	}
</script>

<style>

</style>