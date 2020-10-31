// @flow
import React, {PureComponent} from 'react'
import {View, StyleSheet, TextInput} from 'react-native'
import commonStyles from '../libs/CommonStyles'
import colors from '../libs/Colors'

type Props = {
    item: Object,
    index: number,
    updatePlayer: (player: Player) => Promise<*>,
    numberOfPlayers: number

}
type State = {
    name: string
}
export default class BracketItem extends PureComponent<Props, State> {
  constructor (props: Props) {
    super(props)
    this.state = {
      name: props.item.name
    }
  }

  render (): React$Node {
    let {item, index} = this.props
    let {name} = this.state
    return [
      <TextInput editable={this.canEdit()} style={[styles.item, item.didWin === true ? styles.winner : {}, item.didWin === false ? styles.loser : {}]} value={name} onBlur={this.savePlayer} onChangeText={this.editName} key={0} />,
      index === 0 && item.id !== 100 ? <View style={styles.groupLine} key={201} /> : <View key={200} />
    ]
  }

  canEdit = () => {
    let {item} = this.props
    switch (true) {
      case !item.firstRow: return false
      case item.didWin === true || item.didWin === false : return false
      default: return true
    }
  }

    editName = (name: string) => {
      this.setState({name})
    }

    savePlayer = () => {
      let {item, updatePlayer} = this.props
      let {name} = this.state
      return updatePlayer({...item, name})
    }
}

const styles = StyleSheet.create({
  groupLine: {
    height: 2,
    width: 20,
    backgroundColor: colors.white,
    left: 55
  },
  item: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.white,
    margin: commonStyles.smallSpace,
    width: 80,
    height: 20,
    paddingLeft: 5,
    borderRadius: 5
  },
  winner: {
    backgroundColor: colors.green
  },
  loser: {
    backgroundColor: colors.red
  }
})
