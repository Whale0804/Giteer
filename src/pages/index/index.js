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



  render () {
    return (
      <View className='index'>
        <AtButton type='primary'>按钮文案</AtButton>
      </View>
    )
  }
}

