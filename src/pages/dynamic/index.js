import Taro, { Component } from '@tarojs/taro'
import { View, Text } from '@tarojs/components'
import { connect } from '@tarojs/redux';
import {PER_PAGE} from "../../constants/common";
import Empty from '../../components/empty'
import dynamicItem from "../../components/dynamic/dynamicItem";

import './index.scss'



@connect(({ dynamic }) => ({
  ...dynamic,
}))
export default class Index extends Component {

  config = {
    navigationBarTitleText: '动态',
    enablePullDownRefresh: true
  }

  constructor(props) {
    super(props)
    this.state = {
      page: 1,
      user: Taro.getStorageSync('user_info')
    }
  }

  componentWillMount () { }

  componentDidMount () {
    const {user,page} = this.state;
    this.props.dispatch({
      type: 'dynamic/getDynamicList',
      payload: {
        username: user.login,
        page: page,
        per_page:PER_PAGE
      },
    });
  }

  componentWillUnmount () { }

  componentDidShow () { }

  componentDidHide () { }

  render () {
    const { dynamic_list } = this.props;
    return (
      <View className='content'>
        {
          -1 > 0 ? (
            <View className='list_view'>

            </View>
          ) : <Empty/>
        }
      </View>
    )
  }
}

