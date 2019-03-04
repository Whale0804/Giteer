import Taro, { Component } from '@tarojs/taro'
import PropTypes from 'prop-types';
import { View } from '@tarojs/components'
import { AtAvatar } from 'taro-ui'

import './followItem.scss'

export default class FollowItem extends Component {
  static propTypes = {
    item: PropTypes.object,
    isContributors: PropTypes.bool
  }

  static defaultProps = {
    item: null,
    isContributors: false
  }

  render() {
    const { item, isContributors } = this.props
    if (!item) return <View />
    return (
      <View>
        {isContributors ? (<View className='content'><View className='user_name'>{item.name}</View></View>) : (
          <View className='content'>
            <AtAvatar circle image={item.avatar_url} />
            <View className='user_name'>{item.name}</View>
          </View>
          )
        }
      </View>
    )
  }
}
