import Taro, { Component } from '@tarojs/taro'
import PropTypes from 'prop-types';

import './login.scss'
import {Image, Text, View} from "@tarojs/components";

export default class Index extends Component {
  static propTypes = {
    content: PropTypes.string,
  }

  static defaultProps = {
    content: ''
  }

  componentWillMount() {
  }

  login() {
    Taro.navigateTo({
      url: '/pages/login/login'
    })
  }

  render() {
    const { content } = this.props
    return (
      <View className='content'>
        <Image mode='aspectFit'
               className='logo'
               src={require('../../asset/images/octocat.png')} />
        <View className='login_button'
              onClick={this.login.bind(this)}>
          登录
        </View>
      </View>
    )
  }
}
