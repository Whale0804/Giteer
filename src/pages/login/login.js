import Taro, { Component } from '@tarojs/taro'
import { View } from '@tarojs/components';
import { AtButton } from 'taro-ui';


import './index.scss';

export default class Login extends Component {

  config = {
    navigationBarTitleText: '登录'
  };

  componentWillMount() {
    console.log('3');
  }

  componentDidMount() {}

  componentWillUnmount() {}

  componentDidShow() {}

  componentDidHide() {}

  render() {
    return <View className="index">
        <AtButton type="primary">按钮文案</AtButton>
      </View>;
  }
}
