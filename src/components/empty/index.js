import Taro, { Component } from '@tarojs/taro'
import PropTypes from 'prop-types';
import { View, Image, Text } from '@tarojs/components'


import './index.scss'

export default class Index extends Component {

  static propTypes = {
    content: PropTypes.string,
    array: PropTypes.array
  }

  static defaultProps = {
    content: 'Oops! 数据走丢了...',
    array: []
  }

  componentWillMount() {
  }

  render() {
    const { content,array } = this.props
    return (
      <View>
        {
          array.length == 0 ? (
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
