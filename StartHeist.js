import React, {Component} from 'react'
import {StyleSheet, Text, View} from 'react-native'
import {Button} from 'react-native-common'
import {initTimer, startTimer, pauseTimer, continueTimer, timerTick, timerStop} from './Reducer'
import {connect} from 'react-redux'

class StartHeist extends React.Component {

  // constructor(props) {
  //   super(props)
  //   console.log("constructor props", props)
  //   this.state = props.props
  // }

  componentWillMount() {
    // console.debug("Props in StartHeist after componentWillMount", this.props)
    this.props.initTimer()
  }

  componentDidMount() {
    // console.debug("Props in StartHeist", this.props)
  }

  handleStartStop() {
    console.debug("Handling START/STOP")
    // case 1 - stop button clicked
    if (this.props.timer.running) {
      clearInterval(this.interval)
      // should be in an action...
      this.props.pauseTimer()
      // this.setState({timer: {labelHeist: "PAUSED"}})
      return
    }
    if (this.props.timer.paused){
      console.debug("Continuing")
      this.props.continueTimer()
      // this.setState({timer: {labelHeist: "RUNNING"}})
    } else {
      console.debug("STARTING")
      // case 2 - start button clicked
      // this.setState({timer: {labelHeist: "RUNNING"}})
      this.props.startTimer()
      this.props.timerTick()
    }

    this.interval = setInterval(() => {
      if (!this.props.timer.running){
        console.debug("NOT RUNNING")
        clearInterval(this.interval)
        return
      }
      this.props.timerTick()
    }, 1000)
  }

  getLabel(){
    console.log("Timer props", this.props.timer)
    // console.log("PAUSED?", this.props.timer.paused)
    if (this.props.timer.paused){
      return "PAUSED"
    } else if (this.props.timer.running){
      return "RUNNING"
    } else {
      return "START HEIST"
    }
  }

  render() {
    console.log("GOT PROPS: ", this.props)

    return (
        <View style={styles.buttonWrapper}>
          <Button
              onPress={this.handleStartStop.bind(this)}
              style={{width: 370}}
              borderRadius={10}
              title="heist button"
              label={this.props.heist.label}
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
  console.log("map state to props", state)
  return {
    timer: state.timer,
    heist: state.heist
  }
}

function mapDispatchToProps(dispatch) {
  return {
    initTimer: () => dispatch(initTimer()),
    startTimer: () => {
      dispatch(startTimer())
    },
    timerTick: () => {
      dispatch(timerTick())
    },
    timerStop: () => {
      dispatch(timerStop())
    },
    pauseTimer: () => {
      dispatch(pauseTimer())
    },
    continueTimer: () => {
      dispatch(continueTimer())
    },
  }
}


export default connect(mapStateToProps, mapDispatchToProps)(StartHeist)
