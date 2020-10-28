## 小程序暂时登录不了了，因为码云限制了这个应用的秘钥，请到[Fitee: Flutter版的码云](https://github.com/githinkcn/Fitee)

![](https://raw.githubusercontent.com/githinkcn/Giteer/Giteer/screenshot/128.png)
### Giteer For 码云

基于小程序快速开发框架[Taro-Kit](https://github.com/whale4cloud/Taro-Kit)开发的线上产品。分享自己在使用[Taro](https://taro.aotu.io/)和[Dva.js](https://dvajs.com/)开发小程序的经验，
也让大家能够随时随地上码云。后台使用码云开放[Api](https://gitee.com/api/v5/swagger#/)进行开发，可在线测试。UI 参照[huangjianke/Gitter](https://github.com/huangjianke/Gitter)
的小程序做了微改，非常感谢大佬支持！！！

### 推荐
[Fitee: Flutter版的码云](https://github.com/githinkcn/Fitee)

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

#### 已完成
- [x] 分包开发，由于使用Dva.js会增加代码体积
- [x] 仓库分享至朋友圈
- [X] 优化分包结构
- [x] 优化登录，和Token失效机制
- [x] 细化接口放开首页搜索

#### Doing
- [x] 增加私信功能
- [ ] 增加通知管理功能

#### 计划

- [ ] 增加代码片段功能
- [ ] 优化接口，细化功能
- [ ] 错误日志管理
- [ ] 对接企业接口
- [ ] 仓库里程碑
- [ ] 用户组织管理
- [ ] PR操作


### 更新日志

- v1.0.5 放开首页搜索，无需登录

- v1.0.4 优化分享至朋友圈功能

- v1.0.3 引入分包开发

- v1.0.2 添加分享至朋友圈功能

- v1.0.1 优化UI

- v1.0.0 Giteer 第一个上线版本
