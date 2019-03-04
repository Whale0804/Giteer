import Taro, { Component } from '@tarojs/taro'
import { View } from '@tarojs/components'
import {PER_PAGE, LOADING_TEXT, REFRESH_STATUS} from "../../constants/common";
import {connect} from "@tarojs/redux";
import DynamicItem from '../../components/dynamic/dynamicItem'
import Empty from '../../components/empty'
import LoadMore from '../../components/loadMore/loadMore'


import './repoEvents.scss'

@connect(({ repo }) => ({
  ...repo,
}))
class RepoEvents extends Component {

  config = {
    navigationBarTitleText: '动态',
    enablePullDownRefresh: true
  }

  constructor(props) {
    super(props)
    this.state = {
      url: null,
      page: 1,
      dataList: [],
      refresh_status: REFRESH_STATUS.NORMAL
    }
  }

  componentWillReceiveProps (nextProps) {
    console.log(this.props, nextProps)
  }

  componentWillMount() {
    let params = this.$router.params
    this.setState({
      url: params.url,
    })
  }

  componentDidMount() {
    Taro.showLoading({title: LOADING_TEXT})
    this.getEvents()
  }

  componentWillUnmount () { }

  componentDidShow () { }

  componentDidHide () { }

  onPullDownRefresh() {
    let that = this
    this.setState({
      page: 1
    }, ()=>{
      that.getEvents()
    })
  }

  onReachBottom() {
    const { page, refresh_status } = this.state
    if (refresh_status !== REFRESH_STATUS.NO_MORE_DATA) {
      let that = this
      this.setState({
        page: page + 1
      }, ()=>{
        that.getEvents()
      })
    }
  }

  getEvents() {
    let that = this
    const { url, page, dataList } = this.state

    if (page !== 1) {
      that.setState({
        refresh_status: REFRESH_STATUS.REFRESHING
      })
    }

    let params = {
      page: page,
      per_page: PER_PAGE,
      url: url
    }

    this.props.dispatch({
      type: 'repo/getRepoEvents',
      payload: params,
      callback: (res) => {
        Taro.stopPullDownRefresh();
        Taro.hideLoading();
        let status = res.length < PER_PAGE ? REFRESH_STATUS.NO_MORE_DATA : REFRESH_STATUS.NORMAL;
        that.setState({
          refresh_status: status
        })
      }
    })

  }

  render () {
    const {refresh_status } = this.state;
    const {events} = this.props
    return (
      <View className='content'>
        {
          events.length > 0 ? (
            events.map((item, index)=>{
              return (
                <View key={index} className='list_view'>
                  <DynamicItem item={item} />
                </View>
              )
            })
          ) : <Empty />
        }
        <LoadMore status={refresh_status} />
      </View>
    )
  }
}

export default RepoEvents
