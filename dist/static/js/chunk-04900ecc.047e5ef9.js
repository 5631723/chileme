(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-04900ecc"],{"2d52":function(e,s,t){},a55b:function(e,s,t){"use strict";t.r(s);var a=function(){var e=this,s=e.$createElement,t=e._self._c||s;return t("div",{staticClass:"login"},[t("el-form",{staticClass:"demo-ruleForm",attrs:{"label-width":"60px"}},[t("h1",[t("i",{staticClass:"el-icon-eleme"}),e._v(" 吃了么点餐管理系统 ")]),t("el-form-item",{attrs:{label:"账号"}},[t("el-input",{attrs:{type:"text",autocomplete:"off"},model:{value:e.username,callback:function(s){e.username=s},expression:"username"}})],1),t("el-form-item",{attrs:{label:"密码"}},[t("el-input",{attrs:{type:"password",autocomplete:"off"},model:{value:e.password,callback:function(s){e.password=s},expression:"password"}})],1),t("el-form-item",[t("el-button",{attrs:{type:"primary"},on:{click:e.submitForm}},[e._v("登录")]),t("el-button",{on:{click:e.resetForm}},[e._v("重置")])],1)],1)],1)},o=[],n=(t("ac1f"),t("5319"),{data:function(){return{username:"",password:""}},methods:{submitForm:function(){var e=this;""!=this.username?""!=this.password?this.$http.post("/user/login",{username:this.username,password:this.password}).then((function(s){s&&(console.log(s),sessionStorage.setItem("ELM_TOKEN",s.tokenId),sessionStorage.setItem("USER",s.username),e.$router.replace("/"))})).catch((function(e){console.log(e)})):this.$message({message:"密码不能为空",type:"warning"}):this.$message({message:"账号不能为空",type:"warning"})},resetForm:function(){this.username="",this.password=""}}}),r=n,i=(t("dbaf"),t("2877")),l=Object(i["a"])(r,a,o,!1,null,"6e30b2b4",null);s["default"]=l.exports},dbaf:function(e,s,t){"use strict";t("2d52")}}]);
//# sourceMappingURL=chunk-04900ecc.047e5ef9.js.map