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
    let dynamic = null
    if (item.type === 'ProjectCommentEvent') {
      dynamic = (
        <View className='activity'>
          <View className='activity_desc'>
            <Navigator url={'/pages/account/developerInfo?username=' + item.actor.login} >
              <Text className='username'>
                {item.actor.name}
              </Text>
            </Navigator>
            <Navigator url='' hoverClass='none' >
              <Text className='text'>发表了</Text>
            </Navigator>
            <Navigator url={'/pages/repo/repo?url=' + encodeURI(item.repo.url)} >
              <Text className='username'>
                {item.repo.full_name}
              </Text>
              <Text className='commentBody'>
                的评论 {item.payload.comment.body}
              </Text>
            </Navigator>
          </View>
          <Text className='time'>
            {created_at}
          </Text>
        </View>
      )
    } else if (item.type === 'WatchEvent') {
      dynamic = (
        <View className='activity'>
          <View className='activity_desc'>
            <Navigator url={'/pages/account/developerInfo?username=' + item.actor.login} >
              <Text className='username'>
                {item.actor.name}
              </Text>
            </Navigator>
            <Navigator url='' hoverClass='none' >
              <Text className='text'>starred</Text>
            </Navigator>
            <Navigator url={'/pages/repo/repo?url=' + encodeURI(item.repo.url)} >
              <Text className='username'>
                {item.repo.full_name}
              </Text>
            </Navigator>
          </View>
          <Text className='time'>
            {created_at}
          </Text>
        </View>
      )
    } else if (item.type === 'CreateEvent') {
      dynamic = (
        <View className='activity'>
          <View className='activity_desc'>
            <Navigator url={'/pages/account/developerInfo?username=' + item.actor.login} >
              <Text className='username'>
                {item.actor.name}
              </Text>
            </Navigator>
            <Navigator url='' hoverClass='none' >
              <Text className='text'>{'created a ' + item.payload.ref_type}</Text>
            </Navigator>
            <Navigator url={'/pages/repo/repo?url=' + encodeURI(item.repo.url)} >
              <Text className='username'>
                {item.repo.full_name}
              </Text>
            </Navigator>
          </View>
          <Text className='time'>
            {created_at}
          </Text>
        </View>
      )
    } else if (item.type === 'ForkEvent') {
      dynamic = (
        <View className='activity'>
          <View className='activity_desc'>
            <Navigator url={'/pages/account/developerInfo?username=' + item.actor.login} >
              <Text className='username'>
                {item.actor.name}
              </Text>
            </Navigator>
            <Navigator url='' hoverClass='none' >
              <Text className='text'>forked</Text>
            </Navigator>
            <Navigator url={'/pages/repo/repo?url=' + encodeURI(item.payload.forkee.url)} >
              <Text className='username'>
                {item.payload.forkee.full_name}
              </Text>
            </Navigator>
            <Navigator url='' hoverClass='none' >
              <Text className='text'>from</Text>
            </Navigator>
            <Navigator url={'/pages/repo/repo?url=' + encodeURI(item.repo.url)} >
              <Text className='username'>
                {item.repo.name}
              </Text>
            </Navigator>
          </View>
          <Text className='time'>
            {created_at}
          </Text>
        </View>
      )
    } else if (item.type === 'IssueEvent') {
      dynamic = (
        <View className='activity'>
          <View className='activity_desc'>
            <Navigator url={'/pages/account/developerInfo?username=' + item.actor.login} >
              <Text className='username'>
                {item.actor.name}
              </Text>
            </Navigator>
            <Navigator url='' hoverClass='none' >
              <Text className='text'>在</Text>
            </Navigator>
            <Navigator url={'/pages/repo/repo?url=' + encodeURI(item.repo.url)} >
              <Text className='username'>
                {item.repo.full_name}
              </Text>
            </Navigator>
            <Navigator url='' hoverClass='none' >
              <Text className='text'>建了 任务</Text>
            </Navigator>
            <Navigator url='' >
              <Text className='username'>
                {'#'+item.payload.number+' '+item.payload.title}
              </Text>
            </Navigator>
          </View>
          <Text className='time'>
            {created_at}
          </Text>
        </View>
      )
    } else if (item.type === 'IssueCommentEvent') {
      dynamic = (
        <View className='activity'>
          <View className='activity_desc'>
            <Navigator url={'/pages/account/developerInfo?username=' + item.actor.login} >
              <Text className='username'>
                {item.actor.name}
              </Text>
            </Navigator>
            <Navigator url='' hoverClass='none' >
              <Text className='text'>{item.payload.action + ' a issue comment in'}</Text>
            </Navigator>
            <Navigator url={'/pages/repo/repo?url=' + encodeURI(item.repo.url)} >
              <Text className='username'>
                {item.repo.full_name}
              </Text>
            </Navigator>
          </View>
          <Text className='time'>
            {created_at}
          </Text>
        </View>
      )
    } else if (item.type === 'FollowEvent') {
      dynamic = (
        <View className='activity'>
          <View className='activity_desc'>
            <Navigator url={'/pages/account/developerInfo?username=' + item.actor.login} >
              <Text className='username'>
                {item.actor.name}
              </Text>
            </Navigator>
            <Navigator url='' hoverClass='none' >
              <Text className='text'>starred following</Text>
            </Navigator>
            <Navigator url={'/pages/account/developerInfo?username=' + item.payload.target.login} >
              <Text className='username'>
                {item.payload.target.login}
              </Text>
            </Navigator>
          </View>
          <Text className='time'>
            {created_at}
          </Text>
        </View>
      )
    } else if (item.type === 'PushEvent') {
      dynamic = (
        <View className='activity'>
          <View className='activity_desc'>
            <Navigator url={'/pages/account/developerInfo?username=' + item.actor.login} >
              <Text className='username'>
                {item.actor.name}
              </Text>
            </Navigator>
            <Navigator url='' hoverClass='none' >
              <Text className='text'>pushed commits in</Text>
            </Navigator>
            <Navigator url={'/pages/repo/repo?url=' + encodeURI(item.repo.url)} >
              <Text className='username'>
                {item.repo.name}
              </Text>
            </Navigator>
          </View>
          <Text className='time'>
            {created_at}
          </Text>
        </View>
      )
    } else if (item.type === 'PullRequestEvent') {
      dynamic = (
        <View className='activity'>
          <View className='activity_desc'>
            <Navigator url={'/pages/account/developerInfo?username=' + item.actor.login} >
              <Text className='username'>
                {item.actor.name}
              </Text>
            </Navigator>
            <Navigator url='' hoverClass='none' >
              <Text className='text'>{item.payload.action + ' a PullRequest in'}</Text>
            </Navigator>
            <Navigator url={'/pages/repo/repo?url=' + encodeURI(item.repo.url)} >
              <Text className='username'>
                {item.repo.full_name}
              </Text>
            </Navigator>
          </View>
          <Text className='time'>
            {created_at}
          </Text>
        </View>
      )
    } else if (item.type === 'PullRequestReviewCommentEvent') {
      dynamic = (
        <View className='activity'>
          <View className='activity_desc'>
            <Navigator url={'/pages/account/developerInfo?username=' + item.actor.login} >
              <Text className='username'>
                {item.actor.name}
              </Text>
            </Navigator>
            <Navigator url='' hoverClass='none' >
              <Text className='text'>{item.payload.action + ' a pullRequest comment in'}</Text>
            </Navigator>
            <Navigator url={'/pages/repo/repo?url=' + encodeURI(item.repo.url)} >
              <Text className='username'>
                {item.repo.full_name}
              </Text>
            </Navigator>
          </View>
          <Text className='time'>
            {created_at}
          </Text>
        </View>
      )
    } else if (item.type === 'CommitCommentEvent') {
      dynamic = (
        <View className='activity'>
          <View className='activity_desc'>
            <Navigator url={'/pages/account/developerInfo?username=' + item.actor.login} >
              <Text className='username'>
                {item.actor.name}
              </Text>
            </Navigator>
            <Navigator url='' hoverClass='none' >
              <Text className='text'>creates a commit comment in </Text>
            </Navigator>
            <Navigator url={'/pages/repo/repo?url=' + encodeURI(item.repo.url)} >
              <Text className='username'>
                {item.repo.full_name}
              </Text>
            </Navigator>
          </View>
          <Text className='time'>
            {created_at}
          </Text>
        </View>
      )
    } else if (item.type === 'DeleteEvent') {
      dynamic = (
        <View className='activity'>
          <View className='activity_desc'>
            <Navigator url={'/pages/account/developerInfo?username=' + item.actor.login} >
              <Text className='username'>
                {item.actor.name}
              </Text>
            </Navigator>
            <Navigator url='' hoverClass='none' >
              <Text className='text'>{'deleted a ' + item.payload.ref_type + ' in'}</Text>
            </Navigator>
            <Navigator url={'/pages/repo/repo?url=' + encodeURI(item.repo.url)} >
              <Text className='username'>
                {item.repo.full_name}
              </Text>
            </Navigator>
          </View>
          <Text className='time'>
            {created_at}
          </Text>
        </View>
      )
    } else if (item.type === 'MemberEvent') {
      dynamic = (
        <View className='activity'>
          <View className='activity_desc'>
            <Navigator url={'/pages/account/developerInfo?username=' + item.actor.login} >
              <Text className='username'>
                {item.actor.name}
              </Text>
            </Navigator>
            <Navigator url='' hoverClass='none' >
              <Text className='text'>{item.payload.action + ' a member in'}</Text>
            </Navigator>
            <Navigator url={'/pages/repo/repo?url=' + encodeURI(item.repo.url)} >
              <Text className='username'>
                {item.repo.full_name}
              </Text>
            </Navigator>
          </View>
          <Text className='time'>
            {created_at}
          </Text>
        </View>
      )
    } else if (item.type === 'PublicEvent') {
      dynamic = (
        <View className='activity'>
          <View className='activity_desc'>
            <Navigator url={'/pages/account/developerInfo?username=' + item.actor.login} >
              <Text className='username'>
                {item.actor.name}
              </Text>
            </Navigator>
            <Navigator url='' hoverClass='none' >
              <Text className='text'>make</Text>
            </Navigator>
            <Navigator url={'/pages/repo/repo?url=' + encodeURI(item.repo.url)} >
              <Text className='username'>
                {item.repo.full_name}
              </Text>
            </Navigator>
            <Navigator url='' hoverClass='none' >
              <Text className='text'>public</Text>
            </Navigator>
          </View>
          <Text className='time'>
            {created_at}
          </Text>
        </View>
      )
    }

    return (
      <View className='content'>
        <AtAvatar circle size='large' image={item.actor.avatar_url} />
        <View className='user_info'>
          {dynamic}
        </View>
      </View>
    )
  }
}
