import Taro, { Component } from '@tarojs/taro'
import {Text, View} from '@tarojs/components'
import { AtAvatar } from 'taro-ui'
import {connect} from "@tarojs/redux";
import { timeago } from '../../../utils/common'
import Markdown from '../../components/repo/markdown'
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
    const {chat} = this.props;
    return (
      <View className='content'>
        <View className='info_view'>
          <View className='avatar'>
            <AtAvatar image={chat.sender.avatar_url}/>
          </View>
          <View className='text_view'>
            <Text className='username'>{chat.sender.name}</Text>
            <Text className='time'>{'发表于 ' + timeago(Date.parse(new Date(chat.updated_at)))}</Text>
          </View>
        </View>
        <View className='markdown'>
          <View className='md'>
            {chat.content}
          </View>
        </View>
      </View>
    )
  }
}

