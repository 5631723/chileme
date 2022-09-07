## 吃了么API

##### BaseURL：https://8c0ca265-f640-4eda-a886-92bd742a95fa.bspapp.com/http

### 登录：

| 接口地址    | 方式 | 参数               |
| ----------- | ---- | ------------------ |
| /user/login | post | username，password |

传参：

```js
{
	username:"admin"
	password:"111"
}
```

> 登录后返回TokenId，前端需要保存，否则无法获取商品列表接口中的数据。

### 注册：

| 接口地址  | 方式 | 参数               |
| --------- | ---- | ------------------ |
| /user/reg | post | username，password |

传参：

```js
{
	username:"？？？"
	password:"？？？"
}
```

------

### 商品列表：

| 接口地址         | 方式 | 参数                |
| ---------------- | ---- | ------------------- |
| /goods/goodsList | get  | 请求头中携带“token” |

传参：

```js
{
    headers:{
        token:"xxxxxxxxxxxasa-xsasasd--asdasdas12121"
    }
}
```

