import Taro, { Component } from '@tarojs/taro'
import { View, Text } from '@tarojs/components'
import { AtButton } from 'taro-ui'


import './index.scss'

export default class Index extends Component {

  config = {
    navigationBarTitleText: 'Giteer',
    enablePullDownRefresh: true
  }

  constructor (props) {
    super(props)
    this.state = {
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

  login(){
    Taro.navigateTo({
      url: '/pages/login/login'
    })
  }

  name(){
    console.log(Taro.getStorageSync('user_info').name)
    Taro.showToast({
      title: Taro.getStorageSync('user_info').name,
      icon: 'none',
      mask: true,
    });
  }


  render () {
    return (
      <View className='index'>
        <View style={{marginTop:'100px',textAlign:'center'}}>
          敬请期待~
        </View>
      </View>
    )
  }
}

