import Taro, { Component } from '@tarojs/taro'
import { View, Text } from '@tarojs/components'
import { AtButton } from 'taro-ui'


import './index.scss'

export default class Index extends Component {

  config = {
    navigationBarTitleText: 'Giteer'
  }

  componentWillMount () {

  }

  componentDidMount () { }

  componentWillUnmount () { }

  componentDidShow () { }

  componentDidHide () { }

  login(){
    Taro.navigateTo({
      url: '/pages/login/login'
    })
  }

  name(){
    console.log(Taro.getStorageSync('user_info').name)
    Taro.showToast({
      title: Taro.getStorageSync('user_info').name,
      icon: 'none',
      mask: true,
    });
  }


  render () {
    return (
      <View className='index'>
        <AtButton type='primary' onClick={this.login}>按钮文案</AtButton>
        <AtButton type='primary' onClick={this.name}>用户名</AtButton>
      </View>
    )
  }
}

