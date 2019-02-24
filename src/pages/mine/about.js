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
      content: 'Are you sure?',
      showCancel: true,
      cancelText: 'No',
      cancelColor: '#7f7f7f',
      confirmText: 'Yeah',
      confirmColor: '#D64337',
      success(res) {
        if (res.confirm) {
          Taro.setStorageSync('access_token', '')
          Taro.setStorageSync('user_info', '')
          Taro.navigateBack();
        } else if (res.cancel) {
          console.log('用户点击取消')
        }
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
        <Text className='version'>
          小程序版码云 ❤ 此源码仅供交流学习，严禁以任何形式独立发布或用于商业用途；
        </Text>
        <Text className='version'>
          Gitter v0.2.6
        </Text>
        <Navigator url='./author'>
          <Text className='link'>
            https://jl.githink.cn
          </Text>
        </Navigator>
        <View className='logout' onClick={this.logout.bind(this)}>
          退出
        </View>
        <View className='ad'>
          <Text className='support'>UI借鉴于Gitter，thx!</Text>
        </View>
      </View>
    )
  }
}

export default About
