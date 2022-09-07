<template>
	<el-container>
		<el-header>
			<h1>
				<i class="el-icon-eleme"></i>
				吃了么点餐管理系统
			</h1>
			<div class="status">
				<span>{{ times }}</span>
				<span>{{ user }}老板，欢迎您！</span>
			</div>
		</el-header>
		<el-container>
			<el-aside class="nav-bg" width="80px">
				<ul>
					<li class="active">
						<i class="el-icon-s-platform"></i>
						<span>收银</span>
					</li>
					<li>
						<i class="el-icon-s-custom"></i>
						<span>会员</span>
					</li>
					<li>
						<i class="el-icon-s-goods"></i>
						<span>库存</span>
					</li>
					<li>
						<i class="el-icon-s-grid"></i>
						<span>换班</span>
					</li>
					<li>
						<i class="el-icon-s-data"></i>
						<span>报表</span>
					</li>
					<li @click="loginOut">
						<i class="el-icon-error"></i>
						<span>退出</span>
					</li>
				</ul>
			</el-aside>
			<el-aside class="order-bg" width="500px">
				<el-tabs v-model="activeName">
					<el-tab-pane label="点餐" name="1">
						<el-table :data="tableData" style="width: 100%" :border="true" :stripe="true">
							<el-table-column label="商品名称" width="220">
								<template slot-scope="scope">
									{{ scope.row.goodsName }}
									<!-- <span>{{ scope.row.date }}</span> -->
								</template>
							</el-table-column>
							<el-table-column label="数量" width="65">
								<template slot-scope="scope">
									{{ scope.row.count }}
								</template>
							</el-table-column>
							<el-table-column label="价格" width="65">
								<template slot-scope="scope">
									{{ scope.row.price }}.00
								</template>
							</el-table-column>
							<el-table-column label="操作">
								<template slot-scope="scope">
									<el-button size="mini" @click="handleReduce(scope.$index, scope.row)">减少</el-button>
									<el-button size="mini" type="danger" @click="handleDelete(scope.$index, scope.row)">删除</el-button>
								</template>
							</el-table-column>
						</el-table>
						<div class="total">
							<span>数量：{{ totalCount }} 件</span>
							<span>总价：{{ totalPrice }}元</span>
						</div>
						<div class="btns">
							<el-button size="medium" type="danger" @click="clearAll">清空</el-button>
							<el-button size="medium" type="success">结账</el-button>
						</div>
					</el-tab-pane>
					<el-tab-pane label="订单列表" name="2">订单列表</el-tab-pane>
				</el-tabs>
			</el-aside>
			<el-main>
				<div class="top-hd">热卖商品</div>
				<div class="goods-list" v-if="goodsList && goodsList.length > 0">
					<div class="goods" @click="addGoods(item)" v-for="item in goodsList" :key="item.id">
						<el-image style="width: 100px; height: 100px" :src="item.goodsImg" fit="cover"></el-image>
						<div class="info">
							<h4>{{ item.goodsName }}</h4>
							<span>{{ item.price }}.00元</span>
						</div>
					</div>
				</div>
				<el-empty :image-size="200" v-else></el-empty>
			</el-main>
		</el-container>
	</el-container>
</template>

<script>
export default {
	data() {
		return {
			times: '',
			user: sessionStorage.getItem('USER'),
			activeName: '1',
			tableData: [],
			// 真实项目开发时，这些数据直接从后端接口中发请求获取，
			// 开发时，没有后端接口可以临时写一些模拟数据
			goodsList: []
		};
	},
	computed: {
		totalCount() {
			let total = 0;
			this.tableData.forEach(v => {
				total += v.count;
			});
			return total;
		},
		totalPrice() {
			let total = 0;
			this.tableData.forEach(v => {
				total += v.count * v.price;
			});
			return total;
		}
	},
	created() {
		this.getGoodsData();
		setInterval(() => {
			this.times = this.formatTime();
		}, 1000);
	},
	methods: {
		//获取热卖商品数据
		getGoodsData() {
			this.$http.get('/goods/goodsList').then(res => {
				console.log(res);
				// 判断用户身份是否失效（token过期、被伪造）
				/* if (res.data.code === 4) {
					this.$message({
						message: res.data.msg,
						type: 'warning'
					});
					this.$router.push('/login')
				} */
				this.goodsList = res.data;
			});
		},
		// 添加商品
		addGoods(item) {
			// console.log(item);
			// 接受传递过来的item（当前被点击的商品数据）
			// 将item 追加到 tableData数组中
			/* 
				1. 在追加数据之前，应该先判断 tableData中是否存在相同的商品
				2. 如果不存在 就执行 this.tableData.push(item)
				3. 如果存在，tableData中的存在的商品数量 +1
			 */
			let res = this.tableData.find(v => {
				return v.goodsName == item.goodsName;
			});
			if (res) {
				item.count++;
			} else {
				item.count = 1;
				this.tableData.push(item);
			}
		},
		handleReduce(index, row) {
			// console.log(index, row);
			// 先判断 row.count 是否小于等于1
			row.count <= 1 ? 1 : row.count--;
		},
		handleDelete(index, row) {
			this.$confirm('此操作将永久删除当前商品, 是否继续?', '提示', {
				confirmButtonText: '确定',
				cancelButtonText: '取消',
				type: 'warning'
			})
				.then(() => {
					this.tableData.splice(index, 1);
					this.$message({
						type: 'success',
						message: '删除成功!'
					});
				})
				.catch(() => {
					this.$message({
						type: 'info',
						message: '已取消'
					});
				});
		},
		clearAll() {
			this.$confirm('此操作将永久清空所有商品, 是否继续?', '提示', {
				confirmButtonText: '确定',
				cancelButtonText: '取消',
				type: 'warning'
			})
				.then(() => {
					this.tableData = [];
					this.$message({
						type: 'success',
						message: '清除成功!'
					});
				})
				.catch(() => {
					this.$message({
						type: 'info',
						message: '已取消清空'
					});
				});
		},
		// 退出事件
		loginOut() {
			this.$confirm('是否要退出系统?', '提示', {
				confirmButtonText: '确定',
				cancelButtonText: '取消',
				type: 'warning'
			})
				.then(() => {
					//	清除token
					sessionStorage.clear('ELM_TOKEN');
					sessionStorage.clear('USER');
					// 页面跳转
					this.$router.replace('/login');
				})
				.catch(() => {
					this.$message({
						type: 'info',
						message: '已取消'
					});
				});
		},
		// 时间格式化
		formatTime() {
			let t = new Date();
			let year = t.getFullYear();
			let month = t.getMonth() + 1;
			let date = t.getDate();
			let hours = t.getHours();
			let minus = t.getMinutes();
			let second = t.getSeconds();
			/* hours = hours < 10? '0' + hours : hours
			minus = minus < 10? '0' + minus : minus
			second = second < 10? '0' + second : second */
			// 2021年9月30日 14时52分14秒
			// return `${year}年${month}月${date}日 ${hours}时${minus}分${second}秒`;
			
			// 下面这种方式可以不用判断是否小于10
			return `${year}年${month}月${date}日 ${hours.toString().padStart(2,'0')}时${minus.toString().padStart(2,'0')}分${second.toString().padStart(2,'0')}秒`;
		}
	}
};
</script>
<style lang="scss" scoped="scoped">
.nav-bg {
	background-color: #006ea1;
	overflow: hidden;
	color: #fff;
	text-align: center;
	font-size: 14px;
	i {
		display: block;
		font-size: 28px;
	}
	li {
		padding: 10px 0;
		&:hover {
			background-color: #f90;
		}
	}
	.active {
		background-color: #f90;
	}
}
.order-bg {
	background-color: #fff;
}
.total {
	text-align: right;
	padding: 20px 10px;
	span {
		margin-left: 40px;
	}
}
.btns {
	margin-top: 20px;
	text-align: center;
	.el-button {
		margin: 0 20px;
	}
}
.el-main {
	padding: 0 !important;
}
.top-hd {
	background-color: #fff;
	padding: 9px 10px;
	font-weight: bold;
}
.goods-list {
	width: 830px;
	display: flex;
	flex-wrap: wrap;
	justify-content: flex-start;
}
.goods {
	width: 30%;
	background-color: #fff;
	display: flex;
	padding: 10px;
	margin: 10px;
	box-sizing: border-box;
	align-items: center;
	.info {
		margin-left: 10px;
		line-height: 2;
	}
}
.el-header {
	background-color: #006ea1;
	height: 50px !important;
	line-height: 50px;
	color: #fff;
	display: flex;
	justify-content: space-between;
	h1 {
		font-size: 18px;
		i {
			font-size: 40px;
			vertical-align: middle;
		}
	}
	.status {
		span {
			margin-left: 100px;
		}
	}
}
</style>
