// 导入axios框架
import axios from 'axios';
// 导入饿了么UI中的loading效果
import {
	Loading,
	Message
} from 'element-ui';
// instance.defaults.headers.common['Authorization'] = AUTH_TOKEN;
let ld; // 用于存储loading的实例

// 创建一个 axios实例，并进行统一配置
const instance = axios.create({
	// 后端API接口的基本地址：根据项目中的后端提供API文档进行修改。
	baseURL: 'https://8c0ca265-f640-4eda-a886-92bd742a95fa.bspapp.com/http',
	// 发送请求时，的超时时间， 0为不超时。 如果为：1000ms(毫秒)，则表示1000毫秒后请求中断
	timeout: 0,
	// 规定请求头中的数据格式为 x-www-form-urlencoded （表单）
	headers: {
		'content-type': 'application/x-www-form-urlencoded'
	}
})

// 创建axios实例的拦截器
// 1.请求拦截器
instance.interceptors.request.use(config => {
	// 添加loading效果
	ld = Loading.service({
		fullscreen: true,
		background: 'rgba(0,0,0,0.5)',
		spinner: 'el-icon-loading',
		text: '加载中……'
	})
	// 发起请求之前，要处理的逻辑
	// 为每个请求都设置token
	// 获取本地浏览器中保存的tokenID
	let token = sessionStorage.getItem('ELM_TOKEN')
	if (token) { // 判断token是否存在
		// 如果存在，则设置到请求头中，
		// 注意 【'token'】中的字符'token'，由后端提供的，一般情况下会使用authorization这个单词，它是"授权"的意思
		config.headers['token'] = token
	}

	return config
}, error => {
	// err表示请求时网络错误信息的处理
	// 如果需要处理，可以在此编写代码
	// ...
	return Promise.reject(error);
})

// 2.响应拦截器
instance.interceptors.response.use(response => {
	// 服务器响应请求后，要处理的逻辑， 状态码2XX以内的任何状态码都在这里处理
	ld.close() // 服务器有响应时，就关闭loading效果
	// .....
	console.log(response.data)
	// 状态码2XX以外的任何状态码都在这里处理
	// ...
	if(response.data.code === 2){
		Message({
			message: response.data.msg || '获取成功',
			type: 'success'
		});
	}
	else if(response.data.code === 0){
		Message({
			message: response.data.msg,
			type: 'warning'
		});
		return
	}
	else if (response.data.code === 4) {
		Message({
			message: response.data.msg,
			type: 'warning'
		});
		window.location.replace('/login')
	}
	return response.data
}, error => {
	if(error.response.status == 400){
		Message({
			message: "请求错误，请刷新后重试",
			type: 'warning'
		});
	}
	return Promise.reject(error);
})

// 导出instance 实例
export default instance
