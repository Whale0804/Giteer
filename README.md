![](https://raw.githubusercontent.com/githinkcn/Giteer/Giteer/screenshot/128.png)
### Giteer For 码云

基于小程序快速开发框架[Taro-Kit](https://github.com/githinkcn/Taro-Kit)开发的线上产品。分享自己在使用[Taro](https://taro.aotu.io/)和[Dva.js](https://dvajs.com/)开发小程序的经验，
也让大家能够随时随地上码云。后台使用码云开放[Api](https://gitee.com/api/v5/swagger#/)进行开发，可在线测试。UI 参照[huangjianke/Gitter](https://github.com/huangjianke/Gitter)
的小程序做了微改，非常感谢大佬支持！！！

### 说明

- 由于小程序的限制，无法使用OAuth跳转认证，推荐使用Token认证方式；
- 用户名密码仅用于Gitee Api权限校验，不会被上传服务器；
- **此源码仅供交流学习，严禁以任何形式独立发布或用于商业用途；**

### 使用
```
1. 安装Taro cli
npm install -g @tarojs/cli
2. 获取源码
git clone https://github.com/githinkcn/Giteer.git
cd Giteer
3.安装依赖
npm install
4.编译预览
npm run dev:weapp
```
### 扫码体验

![](https://raw.githubusercontent.com/githinkcn/Giteer/Giteer/screenshot/Giteer.png)

### Giteer预览图

|            |    |
|:-------------:|:------:|
|  ![](https://raw.githubusercontent.com/githinkcn/Giteer/Giteer/screenshot/Screenshot_20190305_185653_com.tencent.mm.jpg) |  ![](https://raw.githubusercontent.com/githinkcn/Giteer/Giteer/screenshot/Screenshot_20190305_185700_com.tencent.mm.jpg)  | 
|  ![](https://raw.githubusercontent.com/githinkcn/Giteer/Giteer/screenshot/Screenshot_20190305_185705_com.tencent.mm.jpg) |  ![](https://raw.githubusercontent.com/githinkcn/Giteer/Giteer/screenshot/Screenshot_20190305_185718_com.tencent.mm.jpg)  |
|  ![](https://raw.githubusercontent.com/githinkcn/Giteer/Giteer/screenshot/Screenshot_20190305_185922_com.tencent.mm.jpg) |  ![](https://raw.githubusercontent.com/githinkcn/Giteer/Giteer/screenshot/Screenshot_20190305_190021_com.tencent.mm.jpg)  |
|  ![](https://raw.githubusercontent.com/githinkcn/Giteer/Giteer/screenshot/Screenshot_20190305_190031_com.tencent.mm.jpg) |  ![](https://raw.githubusercontent.com/githinkcn/Giteer/Giteer/screenshot/Screenshot_20190305_190326_com.tencent.mm.jpg)  |


### 开发计划
- [ ] 代码重构，分包开发，由于使用Dva.js会增加代码体积
- [ ] 完善接入云开发
- [ ] 优化接口，细化功能
- [ ] 增加消息管理功能
- [x] 优化登录，和Token失效机制
- [ ] 错误日志管理
- [x] 仓库分享至朋友圈

### 更新日志

- v1.0.1 优化UI

- v1.0.0 Giteer 第一个上线版本
