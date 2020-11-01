// @flow
import React, {PureComponent} from 'react'
import {Text, View, StyleSheet, ScrollView, TouchableOpacity} from 'react-native'
import commonStyles from '../libs/CommonStyles'
import colors from '../libs/Colors'
import BracketItem from './BracketItem'
import {connect} from 'react-redux'
import Store from '../libs/Store'
import * as PlayerHelper from '../libs/PlayerHelper'

type Props = {}
type State = {
  showPopover: boolean,
  selectedItem?: Object
}
class BracketsContainer extends PureComponent<Props, State> {
    state = {
      showPopover: false,
      selectedItem: undefined
    }

    render (): React$Node {
      let {appState} = Store.getState()
      let {tournamentName, bracketsArray} = appState
      let {showPopover} = this.state
      return <>
        <View style={styles.header}>
          <Text style={styles.headerText}>{tournamentName || 'Tournament'}</Text>
        </View>
        <ScrollView contentContainerStyle={styles.contentContainer} style={styles.scroll}>
          <ScrollView horizontal contentContainerStyle={styles.contentContainer} style={styles.scroll}>
            {bracketsArray.map(this.renderBracket)}
          </ScrollView>
        </ScrollView>
        {showPopover ? this.renderPopover() : <View />}
        {this.renderCloseButton()}
      </>
    }

  renderBracket = (item: Array<Object>, index: number) => {
    return <View key={index} style={styles.bracket}>
      {item.map(this.renderBracketGroup)}
    </View>
  }

  renderBracketGroup = (item: Array<Object>, index: number) => {
    /* eslint-disable react/jsx-no-bind */
    return <TouchableOpacity activeOpacity={0.8} disabled={item.find((player) => player.didWin) || item.find((player) => !player.name)} key={index} style={styles.group} onPress={() => this.openPopover(item)} hitSlop={{right: 100}}>
      {item.map(this.renderItem)}
    </TouchableOpacity>
  /* eslint-enable react/jsx-no-bind */
  }

  renderItem = (item: Array<Object>, index: number) => {
    return <BracketItem updatePlayer={PlayerHelper.updatePlayer} item={item} index={index} key={index} />
  }

  renderCloseButton = () => {
    return <TouchableOpacity onPress={PlayerHelper.resetBracket} style={styles.closeButton}>
      <Text style={styles.closeButtonText}>x</Text>
    </TouchableOpacity>
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
          <TouchableOpacity activeOpacity={0.8} onPress={() => this.makeWinner(item)} style={styles.popoverItem}>
            <Text style={styles.popoverItemText}>{item.name}</Text>
            <Text style={styles.popoverItemText}>{this.getWinStatus(item)}</Text>
          </TouchableOpacity>
        </View>)}
        <TouchableOpacity style={styles.popoverCloseButton} onPress={this.closePopover}>
          <Text style={styles.popoverCloseButtonText}>X</Text>
        </TouchableOpacity>
      </View>
    </View>
  }
  /* eslint-enable react/jsx-no-bind */

  getWinStatus = (item: Player) => {
    switch (item.didWin) {
      case true: return 'WINNER'
      case false: return 'LOOSER'
      default: return ''
    }
  }

  makeWinner = (item: Player) => {
    PlayerHelper.updatePlayer({...item, didWin: true})
    this.setState({showPopover: false, selectedItem: undefined})
  }

  closePopover = () => {
    this.setState({showPopover: false, selectedItem: undefined})
  }

  openPopover = (selectedItem: Array<Player>) => {
    this.setState({showPopover: true, selectedItem})
  }
}

export default connect(state => state)(BracketsContainer)

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
  },
  contentContainer: {
    alignItems: 'center',
    paddingTop: commonStyles.space
  },
  bracket: {
    alignItems: 'flex-start',
    marginLeft: 0,
    marginRight: 0,
    margin: commonStyles.space,
    justifyContent: 'flex-start'
  },
  group: {
    margin: 10,
    marginBottom: 0,
    marginRight: commonStyles.space * 2,
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
    borderRadius: 10,
    backgroundColor: colors.mud,
    shadowColor: colors.black,
    shadowOffset: {
      width: 10,
      height: 10
    },
    shadowOpacity: 0.8,
    shadowRadius: 15,
    elevation: 5
  },
  popoverHeader: {
    top: commonStyles.space,
    alignSelf: 'center',
    fontSize: 20,
    color: colors.white,
    position: 'absolute'
  },
  popoverCloseButton: {
    position: 'absolute',
    top: 5,
    right: 5,
    alignSelf: 'flex-end',
    height: 20,
    width: 20
  },
  popoverCloseButtonText: {
    fontSize: 20,
    color: colors.white
  },
  popoverItem: {
    flexDirection: 'row',
    height: 45,
    alignSelf: 'center',
    justifyContent: 'space-between',
    paddingLeft: commonStyles.smallSpace,
    paddingRight: commonStyles.smallSpace,
    alignItems: 'center',
    margin: commonStyles.space,
    borderRadius: 10,
    borderColor: colors.white,
    borderWidth: 2
  },
  popoverItemText: {
    fontWeight: '600',
    color: colors.white
  },
  closeButton: {
    position: 'absolute',
    top: 80,
    right: commonStyles.space
  },
  closeButtonText: {
    fontSize: 20,
    color: colors.white
  }
})
