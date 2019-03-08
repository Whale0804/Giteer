import Taro, { Component } from '@tarojs/taro'
import PropTypes from 'prop-types';
import { View, Text, Navigator } from '@tarojs/components'
import { AtIcon } from 'taro-ui'
import { timeago } from '../../../utils/common'

import './issueItem.scss'

export default class IssueItem extends Component {
  static propTypes = {
    item: PropTypes.object
  }

  static defaultProps = {
    item: null
  }

  onClickRepo(e) {
    e.stopPropagation()
    const { item } = this.props
    const url = '/RepoModule/pages/repo/repo?url=' + encodeURI(item.repository.full_name)
    Taro.navigateTo({
      url: url
    })
  }

  render() {
    const { item } = this.props
    if (!item) return <View />
    let desc = '#' + item.number
    desc = desc + ' opend ' + timeago(Date.parse(new Date(item.created_at))) + ' by ' + item.user.login
    return (
      <View className='content'>
        <AtIcon value={item.state === 'open' ? 'alert-circle' : 'blocked'}
                size='20'
                color='#ff4949' />
        <View className='detail'>
          <Text className='issue_title'>
            {item.title}
          </Text>
          {/*{*/}
            {/*item.labels.length > 0 &&*/}
              {/*<IssueLabels items={item.labels} />*/}
          {/*}*/}
          {
            item.comments > 0 &&
            <Text className='issue_desc'>
              {item.comments + ' comments'}
            </Text>
          }
          <Text className='issue_desc'>
            {desc}
          </Text>
          {
            item.repository &&
            <Text className='issue_repo' onClick={this.onClickRepo.bind(this)}>
              {item.repository.full_name}
            </Text>
          }
        </View>
      </View>
    )
  }

}
