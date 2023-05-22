/**
 * 解析url参数
 * @example ?id=12345&a=b
 * @return Object {id:12345,a:b}
 */
function urlParse(url) {
	let obj = {};
	let reg = /[?&][^?&]+=[^?&]+/g;
	let arr = url.match(reg);
	if (arr) {
		arr.forEach(item => {
			let tempArr = item.substring(1).split("=");
			let key = decodeURIComponent(tempArr[0]);
			let val = decodeURIComponent(tempArr.splice(1).join("="));
			obj[key] = val;
		});
	}
	return obj;
}

function timeHandle(time) {
	var year = new Date(time).getFullYear()
	var month = new Date(time).getMonth() + 1
	var day = new Date(time).getDate()
	var hours = new Date(time).getHours()
	var minutes = new Date(time).getMinutes()
	var seconds = new Date(time).getSeconds()

	month = month > 10 ? month : '0' + month
	day = day > 10 ? day : '0' + day
	hours = hours > 10 ? hours : '0' + hours
	minutes = minutes > 10 ? minutes : '0' + minutes
	seconds = seconds > 10 ? seconds : '0' + seconds

	return year + '-' + month + '-' + day + ' ' + hours + ':' + minutes + ':' + seconds


}


/**
 * 数字显示处理
 */
function numShowHandle(num, count) {
	var size = num.toString().length
	console.log(num, size)
	if (size <= 4) {
		return num;
	}
	if (size > 4 && size <= 8) {
		return parseInt(num / 10000) + '+W';
	}
	if (size > 8) {
		return num.toString()[0] + num.toString()[1] + num.toString()[2] + num.toString()[3] + '+';
	}
	// switch (num.lenghth) {
	// 	case 5:
	// 		return parseInt(num / 10000) + '+W';
	// 	case 6:
	// 	return parseInt(num / 10000) + '+W';

	// }
}

const getNetworkType = () => {
	uni.getNetworkType({
		success: res => {
			if (res.networkType === "none") {
				uni.showToast({
					title: "网络好像有点问题,请检查后重试！",
					duration: 2000,
					icon: "none"
				});
				let pages = getCurrentPages();
				if (pages.length) {
					let route = pages[pages.length - 1].route;
					if (route !== "pages/empty/empty") {
						uni.navigateTo({
							url: `/pages/empty/empty?type=wifi`
						});
					}
				} else {
					uni.navigateTo({
						url: `/pages/empty/empty?type=wifi`
					});
				}
			}
		}
	});
};

const throttle = (fn, that, gapTime) => {
	// export function throttle(fn, gapTime) {
	if (gapTime == null || gapTime == undefined) {
		gapTime = 1800;
	}
	let _lastTime = that.lastTime;
	let _nowTime = +new Date();
	if (_nowTime - _lastTime > gapTime || !_lastTime) {
		fn.apply(that, arguments); //将this和参数传给原函数
		that.lastTime = _nowTime;
	}
};

/**
 * 计算传秒数的倒计时【天、时、分、秒】
 * @param seconds
 * @returns {{day : *, hours : *, minutes : *, seconds : *}}
 */
const countTimeDown = seconds => {
	const leftTime = time => {
		if (time < 10) time = "0" + time;
		return time + "";
	};
	return {
		day: leftTime(parseInt(seconds / 60 / 60 / 24, 10)),
		hours: leftTime(parseInt((seconds / 60 / 60) % 24, 10)),
		minutes: leftTime(parseInt((seconds / 60) % 60, 10)),
		seconds: leftTime(parseInt(seconds % 60, 10))
	};
};

/**
 * 计算当前时间到第二天0点的倒计时[秒]
 * @returns {number}
 */
const theNextDayTime = () => {
	const nowDate = new Date();
	const time =
		new Date(
			nowDate.getFullYear(),
			nowDate.getMonth(),
			nowDate.getDate() + 1,
			0,
			0,
			0
		).getTime() - nowDate.getTime();
	return parseInt(time / 1000);
};
// 防抖
const debounce = (fn, delay) => {
	// 时间期限
	var delays = delay || 200;
	var timer;
	// 闭包
	return function() {
		// 考虑作用域，上下文环境，apply需要用到this对象
		var th = this;
		// 接收的参数用 ES6 中的 rest 参数统一存储到变量 args 中。arguments就是传入的参数数组,而且个数可以不确定的传回给fn（不确定函数到底有多少个参数，用arguments来接收）
		var args = arguments;
		// 判断还在定时，说明当前正在一个计时过程中，并且又触发了相同事件。所以要取消当前的计时，重新开始计时
		if (timer) {
			clearTimeout(timer);
		}
		timer = setTimeout(function() {
			timer = null;
			// 执行方法
			fn.apply(th, args);
		}, delays);
	};
};
export {
	getNetworkType,
	throttle,
	countTimeDown,
	theNextDayTime,
	debounce,
	numShowHandle,
	timeHandle
};