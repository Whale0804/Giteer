import Taro, { Component } from '@tarojs/taro'
import PropTypes from 'prop-types'
import { View, Text } from '@tarojs/components'
import { AtAvatar, AtBadge } from 'taro-ui'

import './chatItem.scss'
import {connect} from "@tarojs/redux";

@connect(({ chat }) => ({
  ...chat,
}))
export default class  ChatItem extends Component {
  static propTypes = {
    item: PropTypes.object,
  }

  static defaultProps = {
    item: null,
  }

  handleClickItem(name){

  }

  subContent = content =>{
    return content.length > 15 ? content.substring(0,15) + '...' : content;
  };

  render() {
    const { item } = this.props
    if (!item) return <View />

    return (
      <View className='content' onClick={this.handleClickItem.bind(this,item.sender.login)}>
        <View className='avatar'>
          {
            item.unread ? (
              <AtBadge dot>
                <AtAvatar image={item.sender.avatar_url}/>
              </AtBadge>
            ):(
              <AtAvatar image={item.sender.avatar_url}/>
            )
          }
        </View>
        <View className='chat-item'>
          <View className='chat_desc'>
            <View className='info_view'>
              <Text className='username'>
                {item.sender.name}
              </Text>
              <Text className='item-content'>
                {this.subContent(item.content)}
              </Text>
            </View>
          </View>
        </View>
      </View>
    )
  }
}
