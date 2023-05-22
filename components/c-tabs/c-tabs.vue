<style scoped>
	.c-tabs {
		width: 100%;
		overflow-x: scroll;
		position: relative;
	}

	.item {
		/* margin-right: 50rpx; */
		font-size: 30rpx;
	}

	.item:last-child {
		margin-right: 0;
	}

	.item-outer {
		margin-bottom: 14rpx;
		/* position: absolute;
		width: 100%;
		height: 200rpx; */
	}

	.slider {
		width: 38rpx;
		height: 8rpx;
		border-radius: 100px;
		background-color: #fff;
		margin-top: 10rpx;
		position: absolute;
		bottom: 0rpx;
		transition: left 0.5s;
		transform: translateX(-50%);
	}

	.activity {
		font-size: 30rpx;
		font-weight: bold;
	}
</style>
<template>
	<view class="c-tabs">
		<view class="row-around align-center item-outer">
			<view :class="item.is_select?'item activity row align-center item'+index:'item row align-center item'+index"
				v-for="(item,index) in list" :key="index" @click="selectTab(index)"
				:style="{color:item.is_select?selectedColor:color,fontWeight:item.is_select&&isBold?'bold':'normal'}">
				{{item.name}}
				<view class="icon center" v-if="item.is_icon" style="margin-left: 10rpx;">
					<u-icon name="arrow-up-fill" size="20"></u-icon>
					<u-icon name="arrow-down-fill" size="20" style="margin-top: -6rpx;"></u-icon>
				</view>
			</view>
		</view>
		<view class="slider" :style="{left:left_num,background:bgStyle}">

		</view>
	</view>

</template>

<script>
	export default {
		props: {
			list: {
				type: Array,
				default: []
			},
			bgStyle: {
				type: String,
				default: '#fff'
			},
			color: {
				type: String,
				default: "#000"
			},
			selectedColor: {
				type: String,
				default: "#000"
			},
			isBold: {
				type: Boolean,
				default: true
			}
		},
		data() {
			return {
				left_num: 0,
				base_left: 0
			}
		},
		mounted() {
			this.list.forEach((item, index) => {
				if (index == 0) {
					item.is_select = true
				} else {
					item.is_select = false
				}
			})
			const query = uni.createSelectorQuery().in(this);
			query.select('.c-tabs').boundingClientRect(data => {
				this.base_left = data.left
			})
			query.select('.item0').boundingClientRect(data => {
				this.left_num = data.left - this.base_left + data.width / 2 + 'px'
			})
			query.exec()
		},
		methods: {
			selectTab(index) {
				this.list.forEach((item, i) => {
					if (index == i) {
						item.is_select = true
					} else {
						item.is_select = false
					}
				})
				const query = uni.createSelectorQuery().in(this);
				query.select('.item' + index).boundingClientRect(data => {
					// console.log(data);
					this.left_num = data.left - this.base_left + data.width / 2 + 'px'
				}).exec();
				this.$emit('change', index)
			}
		}
	}
</script>
