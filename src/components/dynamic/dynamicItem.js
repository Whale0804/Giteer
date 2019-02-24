import Taro, { Component } from '@tarojs/taro'
import PropTypes from 'prop-types'
import { View, Navigator, Text } from '@tarojs/components'
import { AtAvatar } from 'taro-ui'
import { timeago } from '../../utils/common'

import './dynamicItem.scss'

export default class DynamicItem extends Component {
  static propTypes = {
    item: PropTypes.object,
  }

  static defaultProps = {
    item: null,
  }

  render() {
    const { item } = this.props
    if (!item) return <View />
    let created_at = timeago(Date.parse(new Date(item.created_at)));
    return (
      <View className='content'>
        {created_at}
      </View>
    )
  }
}
