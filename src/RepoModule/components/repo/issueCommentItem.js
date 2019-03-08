import Taro, { Component } from '@tarojs/taro'
import PropTypes from 'prop-types';
import { View, Text, Navigator } from '@tarojs/components'
import { AtAvatar } from 'taro-ui'
import { timeago } from '../../../utils/common'
import Markdown from '../repo/markdown'

import './issueCommentItem.scss'

export default class IssueCommentItem extends Component {
  config = {
  }

  static propTypes = {
    item: PropTypes.object
  }

  static defaultProps = {
    item: null
  }

  render() {
    const { item } = this.props
    if (!item) return <View />
    return (
      <View className='content'>
        <View className='info_view'>
          <View className='avatar'>
            <AtAvatar image={item.user.avatar_url}/>
          </View>
          <View className='text_view'>
            <Text className='username'>{item.user.name}</Text>
            <Text className='time'>{'发表于 ' + timeago(Date.parse(new Date(item.created_at)))}</Text>
          </View>
        </View>
        <View className='markdown'>
          <View className='md'>
            <Markdown md={item.body} />
          </View>
        </View>
      </View>
    )
  }

}
