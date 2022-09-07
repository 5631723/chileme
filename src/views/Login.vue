<template>
	<div class="login">
		<el-form label-width="60px" class="demo-ruleForm">
			<h1>
				<i class="el-icon-eleme"></i>
				吃了么点餐管理系统
			</h1>
			<el-form-item label="账号"><el-input type="text" v-model="username" autocomplete="off"></el-input></el-form-item>
			<el-form-item label="密码"><el-input type="password" v-model="password" autocomplete="off"></el-input></el-form-item>
			<el-form-item>
				<el-button type="primary" @click="submitForm">登录</el-button>
				<el-button @click="resetForm">重置</el-button>
			</el-form-item>
		</el-form>
	</div>
</template>
<script>
export default {
	data() {
		return {
			username: '',
			password: ''
		};
	},
	methods: {
		// 登录事件
		submitForm() {
			// 判断用户名是否为空
			if (this.username == '') {
				this.$message({
					message: '账号不能为空',
					type: 'warning'
				});
				return;
			}
			// 判断密码是否为空
			if (this.password == '') {
				this.$message({
					message: '密码不能为空',
					type: 'warning'
				});
				return;
			}

			this.$http.post('/user/login', {
					username: this.username,
					password: this.password
				})
				.then(res => {
					if (res) {
						console.log(res);
						// 保存 用户的身份信息token(令牌)，
						sessionStorage.setItem('ELM_TOKEN', res.tokenId);
						// 保存用户名
						sessionStorage.setItem('USER', res.username)
						/* 路由跳转到首页 */
						this.$router.replace('/');
					}
				})
				.catch(err => {
					console.log(err);
				});
		},
		// 重置按钮事件
		resetForm() {
			this.username = '';
			this.password = '';
		}
	}
};
</script>
<style lang="scss" scoped="scoped">
.login {
	padding-top: 15%;
}
.demo-ruleForm {
	background-color: #fff;
	width: 650px;
	margin: 0 auto;
	box-sizing: border-box;
	padding: 30px;
	border-radius: 10px;
	h1 {
		font-size: 18px;
		text-align: center;
		color: #006ea1;
		margin-bottom: 20px;
		i {
			font-size: 40px;
			vertical-align: middle;
		}
	}
}
</style>


<!-- 
   1. 登录成功后，从后台返回的数据中，取出 username
   
   2. 通过sessionStorage将username保存到本地存储中
   
   3. 在首页中，获取sessionStorage中的username，显示到右上角
 
 -->