// @flow
import React, {PureComponent} from 'react'
import {KeyboardAvoidingView, StyleSheet, View, Pressable, Text, TextInput, Platform} from 'react-native'
import colors from '../libs/Colors'
import commonStyles from '../libs/CommonStyles'
import {createBracket} from '../libs/BracketHelper'
type Props = {}
type State = {
    numberOfPlayers: number,
    tournamentName: string
}

export default class StartContainer extends PureComponent<Props, State> {
    state = {
      numberOfPlayers: 0,
      tournamentName: ''
    }

    render (): React$Node {
      let {tournamentName, numberOfPlayers} = this.state
      return <>
        <View style={styles.header}>
          <Text style={styles.headerText}>Create Tournament bracket</Text>
        </View>
        <KeyboardAvoidingView style={styles.container} behavior={Platform.OS === "ios" ? "padding" : "height"}>
          <View style={styles.wrapper}>
            <TextInput placeholderTextColor={colors.white} placeholder='Tournament name (optional)' onChangeText={this.onChangeTournamentName} maxLength={40} value={tournamentName} style={styles.input} />
            <TextInput placeholderTextColor={colors.white} placeholder='Number of players' onChangeText={this.onChangeNoPlayers} maxLength={2} keyboardType='numeric' value={numberOfPlayers ? numberOfPlayers.toString() : ''} style={styles.input} />
          </View>
          {this.renderButton()}
        </KeyboardAvoidingView>
      </>
    }

    renderButton = () => {
      let {numberOfPlayers} = this.state
      let disabled = numberOfPlayers < 1 || numberOfPlayers > 99
      return <Pressable disabled={disabled} style={[styles.button, disabled ? styles.disabledButton : {}]} onPress={this.createBracket}>
        <Text style={styles.buttonText}>CREATE</Text>
      </Pressable>
    }

  onChangeNoPlayers = (numberOfPlayers: string) => this.setState({numberOfPlayers: Number(numberOfPlayers)})

    onChangeTournamentName = (tournamentName: string) => this.setState({tournamentName})

    createBracket = () => {
      let {tournamentName, numberOfPlayers} = this.state
      createBracket(tournamentName, Number(numberOfPlayers))
    }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.mud,
    flex: 1
  },
  wrapper: {
    flex: 1,
    marginTop: commonStyles.space * 3,
    justifyContent: 'flex-start'
  },
  header: {
  },
  headerText: {
    color: colors.white,
    fontWeight: '800',
    fontSize: 30,
    marginLeft: commonStyles.space,
    maxWidth: '80%'
  },
  button: {
    height: 55,
    width: '100%',
    backgroundColor: colors.orange,
    alignItems: 'center',
    justifyContent: 'center'
  },
  disabledButton: {
    backgroundColor: colors.gray
  },
  buttonText: {
    fontWeight: '600',
    color: colors.white
  },
  input: {
    borderWidth: 2,
    marginTop: commonStyles.space,
    borderColor: colors.white,
    height: 50,
    width: '90%',
    color: colors.white,
    paddingLeft: commonStyles.smallSpace,
    marginLeft: commonStyles.space
  }
})
