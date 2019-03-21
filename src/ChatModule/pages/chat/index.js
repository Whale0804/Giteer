import Taro, { Component } from '@tarojs/taro'
import { View } from '@tarojs/components'
import {connect} from "@tarojs/redux";

import './index.scss'

@connect(({ chat }) => ({
  ...chat,
}))
export default class Index extends Component {

  config = {
    navigationBarTitleText: ' ',
    enablePullDownRefresh: true,
  }

  constructor(props){
    super(props)
    this.state = {
      id: '',
      chat: {}
    }
  }

  componentWillMount () {
    let params = this.$router.params
    this.setState({
      id: params.id,
    })
  }

  componentDidMount () {
    Taro.startPullDownRefresh();
    this.getChat();
  }

  componentWillUnmount () { }

  componentDidShow () { }

  componentDidHide () { }

  getChat = () => {
    let that = this;
    const {id} = that.state;
    this.props.dispatch({
      type: 'chat/getChat',
      payload: { id: id},
      callback: (res) => {
        Taro.stopPullDownRefresh();
        that.setState({
          chat: res
        },() =>{
          Taro.setNavigationBarTitle({
            title: res.sender.name
          })
        });
      }
    })
  }

  render () {
    return (
      <View className='index'>

      </View>
    )
  }
}

