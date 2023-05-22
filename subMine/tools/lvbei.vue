<style scoped>
	.top-bg {
		height: 70vh;
		background-image: linear-gradient(#038E3D 80%, rgba(3, 142, 61, 0));
	}

	/* 请根据实际需求修改父元素尺寸，组件自动识别宽高 */
	.charts-box {
		width: 100%;
		height: 500rpx;
		margin-top: -40vh;
	}

	.title-box {
		border-bottom: 1px solid #A5A8B6;
		padding-bottom: 20rpx;
	}

	.top-content {
		color: #fff;
	}

	.top-bottom {
		width: 80%;
		margin-top: 62rpx;
	}
</style>
<template>
	<view class="points">
		<view class="top-bg">
			<view class="top-content center">
				<view class=" text-size-24" style="margin-top: 54rpx;">
					绿贝
				</view>
				<view class="bold" style="font-size: 52rpx;">
					191
				</view>
				<view class="row-around align-center top-bottom">
					<view class="center">
						<view class="bold">
							153.40
						</view>
						<view class="text-size-24">
							可用绿贝
						</view>
					</view>
					|
					<view class="center">
						<view class="bold">
							153.40
						</view>
						<view class="text-size-24">
							锁定绿贝
						</view>
					</view>
				</view>
			</view>
		</view>
		<view class="page-padding">

			<view class="box ">
				<!-- <c-charts></c-charts> -->
				<view class="charts-box">
					<qiun-data-charts type="area" :opts="opts" :chartData="chartData" />
				</view>
				<view class="page-padding">
					<view class="top-68 row-between align-center title-box">
						<view class="bold">
							绿贝变动明细
						</view>
						<view class="text-size-24 text-color-grey">
							全部 >
						</view>
					</view>

					<view class="record top-30">
						<view class="record-item row-between align-center top-24">
							<view class="">
								<view class="">
									平级奖
								</view>
								<view class="text-color-grey text-size-24">
									2023-03-03 12: 51: 26
								</view>
							</view>
							<view class="bold text-color-theme text-size-32">
								+0.3800
							</view>
						</view>
					</view>
				</view>

			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				chartData: {},
				//您可以通过修改 config-ucharts.js 文件中下标为 ['line'] 的节点来配置全局默认参数，如都是默认参数，此处可以不传 opts 。实际应用过程中 opts 只需传入与全局默认参数中不一致的【某一个属性】即可实现同类型的图表显示不同的样式，达到页面简洁的需求。
				opts: {
					color: ["#038E3D"],
					padding: [15, 10, 0, 15],
					enableScroll: false,
					legend: {},
					xAxis: {
						disableGrid: true
					},
					yAxis: {
						gridType: "dash",
						dashLength: 2
					},
					extra: {
						line: {
							type: "straight",
							width: 2,
							activeType: "hollow"
						}
					}
				}
			}
		},
		onReady() {
			this.getServerData();
		},
		methods: {
			getServerData() {
				let res = {
					categories: ["2018", "2019", "2020", "2021", "2022", "2023"],
					series: [{
						name: "成交量A",
						data: [35, 8, 25, 37, 4, 20]
					}]
				};
				this.chartData = JSON.parse(JSON.stringify(res));
			},
		}
	}
</script>
