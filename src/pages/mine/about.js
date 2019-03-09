import Taro, { Component } from '@tarojs/taro'
import { View, Navigator, Image, Text, } from '@tarojs/components'

import './about.scss'

class About extends Component {

  config = {
    navigationBarTitleText: '关于'
  }

  constructor(props) {
    super(props)
    this.state = {
      loadAd: true
    }
  }

  componentWillReceiveProps (nextProps) {
    console.log(this.props, nextProps)
  }

  componentWillMount() {
  }

  componentDidMount() {
  }

  componentWillUnmount () { }

  componentDidShow () { }

  componentDidHide () { }

  logout() {

    Taro.showModal({
      content: '确定要退出吗?',
      showCancel: true,
      cancelText: '取消',
      cancelColor: '#7f7f7f',
      confirmText: '确定',
      confirmColor: '#D64337',
      success(res) {
        if (res.confirm) {
          Taro.setStorageSync('access_token', '')
          Taro.setStorageSync('user_info', '');
          Taro.clearStorage();
          setTimeout(()=>{
            Taro.navigateBack();
          },1000)
        } else if (res.cancel) {
          console.log('用户点击取消')
        }
      }
    })

  }

  handleClick(){
    Taro.navigateTo({
      url: '/RepoModule/pages/repo/repo?url=327926/Giteer'
    })
  }

  previewImage =()=>{
    Taro.previewImage({
      urls:[
        'https://6769-giteer-36a385-1254197862.tcb.qcloud.la/nice.jpeg?sign=b90b56eae6d6bdab660ec361263f6e8a&t=1552142531'
      ],
      current: 'https://6769-giteer-36a385-1254197862.tcb.qcloud.la/nice.jpeg?sign=b90b56eae6d6bdab660ec361263f6e8a&t=1552142531',
      complete(res){
        console.log(res)
      }
    })
  }

  loadError(event) {
    this.setState({
      loadAd: false
    })
    console.log(event.detail)
  }

  render () {
    const { loadAd } = this.state

    return (
      <View className='content'>
        <Image mode='aspectFit'
               className='logo'
               src={require('../../asset/images/octocat.png')}/>
        <Text className='text'>
          小程序版码云 ❤ 此源码仅供交流学习，严禁以任何形式独立发布或用于商业用途；
        </Text>
        <Text className='version'>
          Giteer v1.0.3
        </Text>
        <View onClick={this.handleClick}>
          <Text className='link'>
            https://github.com/githinkcn/Giteer
          </Text>
        </View>
        <View className='logout' onClick={this.logout.bind(this)}>
          退出
        </View>
        <View className='ad'>
          <Text className='support'>Support Gitter ❤</Text>
          <Image onClick={this.previewImage}
            mode='aspectFit'
            className='ad-image'
            src={require('../../asset/images/nice.jpeg')}/>
          <Text className='support'>点击长按识别</Text>
        </View>
      </View>
    )
  }
}

export default About
