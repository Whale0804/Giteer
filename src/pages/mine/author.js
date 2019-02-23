import Taro, { Component } from '@tarojs/taro'
import { View, WebView } from '@tarojs/components'


export default class Author extends Component {

  config = {
    navigationBarTitleText: '作者'
  }

  componentWillMount () { }

  componentDidMount () { }

  componentWillUnmount () { }

  componentDidShow () { }

  componentDidHide () { }

  render () {
    return (
      <View className='index'>
        <WebView src='https://jl.githink.cn/'/>
      </View>
    )
  }
}

