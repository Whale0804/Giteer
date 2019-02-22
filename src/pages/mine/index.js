import Taro, { Component } from '@tarojs/taro'
import { View, WebView } from '@tarojs/components'

import './index.scss'

export default class Index extends Component {

  config = {
    navigationBarTitleText: '我的'
  }

  componentWillMount () { }

  componentDidMount () { }

  componentWillUnmount () { }

  componentDidShow () { }

  componentDidHide () { }

  render () {
    return (
      <WebView src=''  />
    )
  }
}

