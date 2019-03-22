import Taro, { Component } from '@tarojs/taro'
import {Text, View} from '@tarojs/components'
import {AtAvatar, AtIcon, AtInput, AtTextarea,AtMessage} from 'taro-ui'
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
      chat: {},
      commentBody: ''
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
  };
  handleSubmit(){
    const {commentBody,chat} = this.state;
    if(commentBody == ''){
      Taro.showToast({
        title: '请输入私信内容...',
        icon: 'none',
        mask: true,
      });
      return false;
    }

    this.props.dispatch({
      type: 'chat/putChat',
      payload: {
        username: chat.sender.login,
        content: commentBody
      },
      callback: (res) => {
        if(res.id){
          Taro.atMessage({
            'message': '私信成功',
            'type': 'error',
          })
          this.setState({
            commentBody: ''
          })
        }
      }
    })
  }
  handleTextareaChange =(event)=>{
    this.setState({
      commentBody: event.target.value
    })
  };
  render () {
    const {chat} = this.props;
    const {commentBody} = this.state;
    return (
      <View className='content'>
        <AtMessage/>
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
        <View className='add_chat'>
          <View className='comment-content'>
            <View className='chat_comment'>
              <AtTextarea
                className='input_comment'
                height={200}
                count={false}
                maxlength={10000}
                value={commentBody}
                onChange={this.handleTextareaChange.bind(this)}
                placeholder='请输入内容...'
              />
            </View>
            <View className='submit' onClick={this.handleSubmit.bind(this)}>
              回复
            </View>
          </View>
        </View>
      </View>
    )
  }
}

