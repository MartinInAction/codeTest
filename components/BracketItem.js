// @flow
import React, {PureComponent} from 'react'
import {Text, View, StyleSheet, TextInput} from 'react-native'
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
  // eslint-disable-next-line
  componentWillReceiveProps (nextProps: Props, nextState: State) {
    this.setState({name: nextProps.item.name})
  }

  render (): React$Node {
    let {item, index} = this.props
    let {name} = this.state
    return <>
      {item.id === 100 ? <Text style={styles.winnerText}>WINNER</Text> : <View />}
      <View style={item.id === 100 ? styles.winner : {}}>
        <TextInput editable={this.canEdit()} style={[styles.item, item.didWin === true ? styles.winner : {}, item.didWin === false ? styles.loser : {}]} value={name} onBlur={this.savePlayer} onChangeText={this.editName} key={0} />
        {index === 0 && item.id !== 100 ? <View style={styles.groupLine} key={201} /> : <View key={200} />}
      </View>
    </>
  }

  canEdit = () => {
    let {item} = this.props
    switch (true) {
      case item.row > 1: return false
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
    height: 3,
    width: 25,
    backgroundColor: colors.white,
    left: 110
  },
  item: {
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 2,
    color: colors.white,
    fontWeight: '600',
    borderColor: colors.white,
    margin: commonStyles.smallSpace,
    width: 90,
    height: 30,
    paddingLeft: 5,
    borderRadius: 3
  },
  winnerText: {
    alignSelf: 'center',
    fontSize: 20,
    fontWeight: '800',
    color: colors.white
  },
  winner: {
    backgroundColor: colors.green
  },
  loser: {
    backgroundColor: colors.red
  }
})
