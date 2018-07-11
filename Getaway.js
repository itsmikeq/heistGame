import React, {Component} from 'react'
import {StyleSheet, Text, View} from 'react-native'
import {Button} from 'react-native-common'
import {initTimer, startTimer, pauseTimer, continueTimer, timerTick, timerStop} from './Reducer'
import {connect} from 'react-redux'

class Getaway extends React.Component {

  componentWillMount() {
    console.log(this.props)
    this.props.initTimer()
  }

  componentDidMount() {
  }

  handleStartStop() {
    // case 1 - stop button clicked
    if (this.props.timer.running) {
      clearInterval(this.interval)
      // should be in an action...
      this.props.pauseTimer('GETAWAY')
      // this.setState({timer: {labelHeist: "PAUSED"}})
      return
    }
    if (this.props.timer.paused){
      this.props.continueTimer('GETAWAY')
      // this.setState({timer: {labelHeist: "RUNNING"}})
    } else {
      // case 2 - start button clicked
      // this.setState({timer: {labelHeist: "RUNNING"}})
      this.props.startTimer('GETAWAY')
      this.props.timerTick()
    }

    this.interval = setInterval(() => {
      if (!this.props.timer.running){
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
              style={{width: 370}}
              borderRadius={10}
              title="getaway button"
              label={this.props.getaway.label}
              color="#1D292F"
          />
        </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    height: 40,
    backgroundColor: '#1D292F',
  },
  buttonWrapper: {
    marginTop: 50,
  },
})


function mapStateToProps(state) {
  return {
    timer: state.timer,
    getaway: state.getaway
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
  }
}


export default connect(mapStateToProps, mapDispatchToProps)(Getaway)
