// @flow
import React, {PureComponent} from 'react'
import {Text, View, StyleSheet, ScrollView} from 'react-native'
import commonStyles from '../libs/CommonStyles'
import colors from '../libs/Colors'

type Props = {
    bracket: Array<Object>,
    tournamentName: string
}
type State = {}
export default class BracketsContainer extends PureComponent<Props, State> {
    state = {}

    render (): React$Node {
      let {bracket, tournamentName} = this.props
      return <>
        <View style={styles.header}>
          <Text style={styles.headerText}>{tournamentName}</Text>
        </View>
        <ScrollView contentContainerStyle={styles.contentContainer} style={styles.scroll}>
          <ScrollView horizontal contentContainerStyle={styles.contentContainer} style={styles.scroll}>
            {bracket.map(this.renderBracket)}
          </ScrollView>
        </ScrollView>
      </>
    }

  renderBracket = (item: Array<Object>, index: number) => {
    return <View key={index} style={styles.bracket}>
      {item.map(this.renderBracketGroup)}
    </View>
  }

  renderBracketGroup = (item: Array<Object>, index: number) => {
    return <View key={index} style={styles.group}>
      {item.map(this.renderItem)}
    </View>
  }

  renderItem = (item: Array<Object>, index: number) => {
    return [
      <View style={styles.item} key={index}>
        <Text>{item.id}</Text>
      </View>,
      index === 0 && item.id !== 100 ? <View style={styles.groupLine} key={201} /> : <View key={200} />
    ]
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
    flex: 1
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
  groupLine: {
    height: 2,
    width: 20,
    backgroundColor: colors.white,
    left: 40
  },
  item: {
    backgroundColor: colors.white,
    height: 20,
    margin: 5,
    width: 50
  }
})
