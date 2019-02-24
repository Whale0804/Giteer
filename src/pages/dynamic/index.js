import Taro, { Component } from '@tarojs/taro'
import { View, Text } from '@tarojs/components'
import { connect } from '@tarojs/redux';
import {PER_PAGE} from "../../constants/common";
import Empty from '../../components/empty'
import {hasLogin} from "../../utils/common";
import Login from '../../components/login/login';
import DynamicItem from "../../components/dynamic/dynamicItem";

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
      isLogin: false,
      page: 1,
      user: Taro.getStorageSync('user_info')
    }
  }

  componentWillMount () { }

  componentDidMount () {
    const {user,page,isLogin} = this.state;
    if(isLogin){
      this.props.dispatch({
        type: 'dynamic/getDynamicList',
        payload: {
          username: user.login,
          page: page,
          per_page:PER_PAGE
        },
      });
    }
  }

  componentWillUnmount () { }

  componentDidShow () {
    this.setState({
      isLogin: hasLogin()
    })
  }

  componentDidHide () { }

  render () {
    const { dynamic_list,isLogin } = this.props;
    return (
      <View>
        {
          isLogin ? (
            <View className='content'>
              {
                dynamic_list.length > 0 ? (
                  dynamic_list.map((item, index)=>{
                    return (
                      <View key={index} className='list_view'>
                        <DynamicItem item={item} />
                      </View>
                    )
                  })
                ) : <Empty />
              }
            </View>
          ) : <Login/>
        }
      </View>
    )
  }
}

