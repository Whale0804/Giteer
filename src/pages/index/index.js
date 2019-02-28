import Taro, { Component } from '@tarojs/taro'
import { View, Text } from '@tarojs/components'
import Segment from '../../components/index/segment'
import {PER_PAGE, LOADING_TEXT, REFRESH_STATUS} from "../../constants/common";
import Empty from '../../components/empty'
import {hasLogin} from "../../utils/common";
import Login from '../../components/login/login';
import LoadMore from "../../components/loadMore/loadMore"

import './index.scss'

export default class Index extends Component {

  config = {
    navigationBarTitleText: 'Giteer',
    enablePullDownRefresh: true,
  }

  constructor (props) {
    super(props)
    this.state = {
      current: 0,
      animation: null,
      isHidden: false,
      fixed: false
    }
  }

  componentWillMount () {

  }

  componentDidMount () {

    let that = this
    Taro.getSystemInfo({
      success(res) {
        that.setState({
          windowHeight: res.windowHeight - (res.windowWidth / 750) * 80
        })
      }
    })
  }

  componentWillUnmount () { }

  componentDidShow () { }

  componentDidHide () { }

  onPullDownRefresh() {
    console.log('调用下拉刷新')
    this.loadItemList()
  }

  loadItemList () {
    console.log("开始延迟调用")
    var timeOut = setTimeout(() => {
      console.log("延迟调用完毕")
      Taro.stopPullDownRefresh()
      clearTimeout(timeOut)
    },2000)

  }

  onPageScroll(obj) {
    const { fixed } = this.state
    if (obj.scrollTop > 0) {
      if (!fixed) {
        this.setState({
          fixed: true
        })
      }
    } else {
      this.setState({
        fixed: false
      })
    }
  }

  onScroll(e) {
    if (e.detail.scrollTop < 0) return;
    if (e.detail.deltaY > 0) {
      let animation = Taro.createAnimation({
        duration: 400,
        timingFunction: 'ease',
      }).bottom(25).step().export()
      this.setState({
        isHidden: false,
        animation: animation
      })
    } else {
      //向下滚动
      if (!this.state.isHidden) {
        let animation = Taro.createAnimation({
          duration: 400,
          timingFunction: 'ease',
        }).bottom(-95).step().export()
        this.setState({
          isHidden: true,
          animation: animation
        })
      }
    }
  }

  onTabChange(index) {
    this.setState({
      current: index
    })
  }


  render () {
    const { current, fixed } = this.state;
    return (
      <View className='content'>
        <View className={fixed ? 'segment-fixed' : ''}>
          <Segment tabList={['仓库', '用户']}
                   current={current}
                   onTabChange={this.onTabChange}
          />
        </View>
      </View>
    )
  }
}

