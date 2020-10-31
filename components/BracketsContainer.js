// @flow
import React, {PureComponent} from 'react'
import {Text, View, StyleSheet, ScrollView, TouchableOpacity} from 'react-native'
import commonStyles from '../libs/CommonStyles'
import colors from '../libs/Colors'
import BracketItem from './BracketItem'

type Props = {
    bracket: Array<Object>,
    tournamentName: string,
    updatePlayer: (player: Player) => Promise<*>
}
type State = {
  showPopover: boolean,
  selectedItem?: Object
}
export default class BracketsContainer extends PureComponent<Props, State> {
    state = {
      showPopover: false,
      selectedItem: undefined
    }

    render (): React$Node {
      let {bracket, tournamentName} = this.props
      let {showPopover} = this.state
      return <>
        <View style={styles.header}>
          <Text style={styles.headerText}>{tournamentName}</Text>
        </View>
        <ScrollView contentContainerStyle={styles.contentContainer} style={styles.scroll}>
          <ScrollView horizontal contentContainerStyle={styles.contentContainer} style={styles.scroll}>
            {bracket.map(this.renderBracket)}
          </ScrollView>
        </ScrollView>
        {showPopover ? this.renderPopover() : <View />}
      </>
    }

  renderBracket = (item: Array<Object>, index: number) => {
    return <View key={index} style={styles.bracket}>
      {item.map(this.renderBracketGroup)}
    </View>
  }

  renderBracketGroup = (item: Array<Object>, index: number) => {
    /* eslint-disable react/jsx-no-bind */
    return <TouchableOpacity disabled={item.find((player) => player.didWin) || item.find((player) => !player.name)} key={index} style={styles.group} onPress={() => this.openPopover(item)} hitSlop={{right: 100}}>
      {item.map(this.renderItem)}
    </TouchableOpacity>
  /* eslint-enable react/jsx-no-bind */
  }

  renderItem = (item: Array<Object>, index: number) => {
    let {updatePlayer, numberOfPlayers} = this.props
    return <BracketItem numberOfPlayers={numberOfPlayers} updatePlayer={updatePlayer} item={item} index={index} key={index} />
  }

  renderPopover = () => {
  /* eslint-disable react/jsx-no-bind */
    let {selectedItem} = this.state
    if (!selectedItem) selectedItem = []
    return <View style={styles.popoverContainer}>
      <TouchableOpacity style={styles.popoverCloseArea} onPress={this.closePopover} />
      <View style={styles.popover}>
        <Text style={styles.popoverHeader}>Who won?</Text>
        {selectedItem.map((item, index) => <View key={index}>
          <TouchableOpacity onPress={() => this.makeWinner(item)} style={styles.popoverItem}>
            <Text>{item.name}</Text>
            <Text>{this.getWinStatus(item)}</Text>
          </TouchableOpacity>
        </View>)}
        <TouchableOpacity style={styles.closeButton} onPress={this.closePopover}>
          <Text style={styles.closeText}>X</Text>
        </TouchableOpacity>
      </View>
    </View>
  }
  /* eslint-enable react/jsx-no-bind */

  getWinStatus = (item: Objecrt) => {
    switch (item.didWin) {
      case true: return 'WINNER'
      case false: return 'LOOSER'
      default: return ''
    }
  }

  makeWinner = (item: Object) => {
    let {updatePlayer} = this.props
    updatePlayer({...item, didWin: true})
    this.setState({showPopover: false, selectedItem: undefined})
  }

  closePopover = () => {
    this.setState({showPopover: false, selectedItem: undefined})
  }

  openPopover = (selectedItem: Object) => {
    this.setState({showPopover: true, selectedItem})
  }
}

const styles = StyleSheet.create({
  header: {
  },
  headerText: {
    color: colors.white,
    fontWeight: '800',
    fontSize: 30,
    marginLeft: commonStyles.space,
    maxWidth: '80%'
  },
  scroll: {
    flex: 1
  },
  contentContainer: {
    alignItems: 'center',
    padding: commonStyles.space,
    justifyContent: 'center'
  },
  bracket: {
    alignItems: 'center',
    justifyContent: 'center'
  },
  group: {
    margin: 10,
    marginLeft: commonStyles.space * 2,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'column'
  },
  popoverContainer: {
    flex: 1,
    backgroundColor: colors.blackOpacity5,
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    position: 'absolute',
    alignItems: 'center',
    justifyContent: 'center'
  },
  popoverCloseArea: {
  },
  popover: {
    alignSelf: 'center',
    justifyContent: 'center',
    width: '80%',
    height: 250,
    borderRadius: 20,
    backgroundColor: colors.white,
    shadowColor: colors.black,
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5
  },
  popoverHeader: {
    top: commonStyles.space,
    alignSelf: 'center',
    fontSize: 20,
    position: 'absolute'
  },
  closeButton: {
    position: 'absolute',
    top: 5,
    right: 5,
    alignSelf: 'flex-end',
    height: 20,
    width: 20
  },
  closeText: {
    fontSize: 20,
    color: colors.black
  },
  popoverItem: {
    flexDirection: 'row',
    height: 30,
    justifyContent: 'space-between',
    paddingLeft: commonStyles.smallSpace,
    paddingRight: commonStyles.smallSpace,
    alignItems: 'center',
    margin: commonStyles.space,
    width: '80%',
    borderWidth: 2
  }
})
