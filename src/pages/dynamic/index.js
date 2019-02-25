import Taro, { Component } from '@tarojs/taro'
import { View, Text } from '@tarojs/components'
import { connect } from '@tarojs/redux';
import {PER_PAGE,LOADING_TEXT} from "../../constants/common";
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
    Taro.startPullDownRefresh();
    Taro.showLoading({title: LOADING_TEXT});
    const {isLogin} = this.state;
    if(isLogin){
      this.getDynamicList();
    }
  }

  componentWillUnmount () { }

  componentDidShow () {
    this.setState({
      isLogin: hasLogin()
    })
  }

  componentDidHide () { }

  //下拉刷新
  onPullDownRefresh() {
    let that = this;
    this.setState({
      page: 1
    }, ()=>{
      that.getDynamicList();
    })
  }
  //上拉加载
  onReachBottom(){

  }
  getDynamicList(){
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

  render () {
    const { dynamic_list,isLogin } = this.props;
    dynamic_list.sort = (a,b) =>{
      return Date.parse(new Date(a.created_at)) < Date.parse(new Date(b.created_at)) ? 1 : -1;
    }
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

