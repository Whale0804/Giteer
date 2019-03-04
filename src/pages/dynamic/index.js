import Taro, { Component } from '@tarojs/taro'
import { View, Text } from '@tarojs/components'
import { connect } from '@tarojs/redux';
import {PER_PAGE, LOADING_TEXT, REFRESH_STATUS} from "../../constants/common";
import Empty from '../../components/empty'
import {hasLogin,checkExpiresToken} from "../../utils/common";
import Login from '../../components/login/login';
import DynamicItem from "../../components/dynamic/dynamicItem";
import LoadMore from "../../components/loadMore/loadMore"
import './index.scss'
import {refreshToken} from "../../utils/refreshToken";



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
      refresh_status: REFRESH_STATUS.NORMAL,
      user: Taro.getStorageSync('user_info')
    }
  }

  componentWillMount () { }

  componentDidMount () {
    const {isLogin} = this.state;
    if(isLogin){
      if(!checkExpiresToken()){
        Taro.startPullDownRefresh();
        Taro.showLoading({title: LOADING_TEXT});
        this.getDynamicList();
      }else {
        this.setState({
          isLogin: false,
        },() => {
          refreshToken()
        })
      }
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
    const { page, refresh_status } = this.state
    if (refresh_status !== REFRESH_STATUS.NO_MORE_DATA) {
      let that = this
      this.setState({
        page: page + 1
      }, ()=>{
        that.getDynamicList()
      })
    }
  }
  getDynamicList(){
    const {user,page} = this.state;
    let that = this;

    if (page !== 1) {
      that.setState({
        refresh_status: REFRESH_STATUS.REFRESHING
      })
    }

    this.props.dispatch({
      type: 'dynamic/getDynamicList',
      payload: {
        username: user.login,
        page: page,
        per_page:PER_PAGE
      },
      callback: (res) => {
        Taro.stopPullDownRefresh()
        Taro.hideLoading()
        let status = res.length < PER_PAGE ? REFRESH_STATUS.NO_MORE_DATA : REFRESH_STATUS.NORMAL
        that.setState({
          refresh_status: status
        })
      }
    })
  }

  render () {
    const { dynamic_list} = this.props;
    const {isLogin, refresh_status } = this.state;
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
                ) : <Empty array={dynamic_list}/>
              }
              <LoadMore status={refresh_status} />
            </View>
          ) : <Login/>
        }
      </View>
    )
  }
}

