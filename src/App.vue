<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<style lang="scss">
	// css reset 
	*{
		padding: 0;
		margin: 0;
	}
	html,body,#app {
		height: 100%;
	}
	body{
		background-color: #efefef;
		cursor: default;
	}
	.el-container{
		height: 100%;
	}
	.el-tabs__nav-scroll{
		padding-left: 20px;
	}
	// 修改loading的样式
	.el-loading-text{
		color: #fff !important;
	}
	.el-icon-loading{
		color: #fff !important;
		font-size: 30px !important;
	}
</style>
