import Taro, { Component } from '@tarojs/taro'
import PropTypes from 'prop-types';
import { View, Image, Text } from '@tarojs/components'


import './index.scss'

export default class Index extends Component {

  static propTypes = {
    content: PropTypes.string,
    status: PropTypes.boolean
  }

  static defaultProps = {
    content: 'Oops! 数据走丢了...',
    status:false
  }

  componentWillMount() {
  }

  render() {
    const { content,status } = this.props
    return (
      <View>
      {
        status ? (
          <View className='content'>
            <Image className='img' src={require('../../asset/images/oops.png')} />
            <Text className='text'>{content}</Text>
          </View>
        ): <View/>
      }
      </View>

    )
  }
}
