<template>
	<view v-html="content">

	</view>
</template>

<script>
	export default {
		data() {
			return {
				content: ''
			}
		},
		onLoad(o) {
			this.content = o.content
			// console.log(this.content)
		},
		methods: {

		}
	}
</script>

<style>

</style>