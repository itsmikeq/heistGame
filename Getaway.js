import React, {Component} from 'react'
import {StyleSheet, Text, View, TouchableHighlight} from 'react-native'
import {Button} from 'react-native-common'
import {initTimer, startTimer, pauseTimer, continueTimer, timerTick, timerStop, disableGetawayButton} from './Reducer'
import {connect} from 'react-redux'

class Getaway extends Component {

  componentWillMount() {
    console.debug("Mounting")
    console.debug(this.props)
    // this.props.initTimer()
  }

  componentDidMount() {
  }

  handleStartStop() {
    // case 0 - started getaway phase from heist
    if (this.props.phase === 'HEIST') {
      // Disable the heist button
      this.props.disableHeistButton()
      // Do not return here, so the rest of the logic continues
    }

    // pause button
    if (this.props.timer.running && this.props.phase === 'GETAWAY') {
      console.debug("Running, Clearing interval")
      clearInterval(this.interval)
      // should be in an action...
      this.props.pauseTimer('GETAWAY')
      return
    }
    // restart
    if (this.props.timer.paused) {
      this.props.continueTimer('GETAWAY')
      this.props.timerTick()
    } else if (this.props.timer.running){
      // case 2 - start button clicked
      this.props.startTimer('GETAWAY')
      this.props.timerTick()
    }

    this.interval = setInterval(() => {
      if (!this.props.timer.running) {
        clearInterval(this.interval)
        return
      }
      this.props.timerTick()
    }, 1000)
  }

  render() {
    return (
        <View style={styles.buttonWrapper}>
          <Button
              onPress={this.handleStartStop.bind(this)}
              style={styles.button}
              title="getaway button"
          >
            <Text style={styles.text}>{this.props.getaway.label}</Text>
          </Button>
        </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  button: {
    width: '100%',
    backgroundColor: '#1D292F',
    borderRadius: 0,
  },
  text: {
    color: '#fff',
    textAlign: 'center',
    fontSize: 30,
  },
  buttonWrapper: {
    backgroundColor: '#1D292F',
    height: 70,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 50,
    flexDirection: 'row',
  },
})

function mapStateToProps(state) {
  return {
    timer: state.timer,
    getaway: state.getaway,
    phase: state.phase
  }
}

function mapDispatchToProps(dispatch) {
  return {
    initTimer: () => dispatch(initTimer('GETAWAY')),
    startTimer: () => {
      dispatch(startTimer('GETAWAY'))
    },
    timerTick: () => {
      dispatch(timerTick())
    },
    timerStop: () => {
      dispatch(timerStop())
    },
    pauseTimer: () => {
      dispatch(pauseTimer('GETAWAY'))
    },
    continueTimer: () => {
      dispatch(continueTimer('GETAWAY'))
    },
    disableHeistButton: () => {
      dispatch(disableGetawayButton())
    },
  }
}


export default connect(mapStateToProps, mapDispatchToProps)(Getaway)
