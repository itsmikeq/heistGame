import React, {Component} from 'react'
import {connect} from 'react-redux'
import {StyleSheet, Text, View} from 'react-native'
import TimerFormatter from 'minutes-seconds-milliseconds'
import Moment from 'react-moment'
import moment from 'moment'

// import {setTimeRemaining, startTimer, timerTick} from './Reducer'

export function toggleTimer() {
  this.setState({timerStart: !this.state.timerStart, timerReset: false})
}

export function resetTimer() {
  this.setState({timerStart: false, timerReset: true})
}


class Clock extends React.Component {
  componentWillMount() {
  }

  componentDidMount() {
  }

  constructor(props) {
    super(props)
  }

  render() {
    console.debug("Time remaining", this.props.timeRemaining)
    return (
        <View style={styles.timerWrapper}>
          <View style={styles.timerWrapperInner}>
            <Text style={styles.text}>
              {this.props.timeRemaining}
            </Text>
          </View>
        </View>
    )
  }
}

const styles = StyleSheet.create({
  timerWrapper: {
    justifyContent: 'center',
    alignSelf: 'center',
  },
  timerWrapperInner: {
    borderWidth: 0.0,
    alignSelf: 'center',
    margin: 10,
  },
  text: {
    fontSize: 40,
    color: '#ff0325',
    marginLeft: 7,
    fontWeight: 'bold',
  }

})


// AppRegistry.registerComponent('Clock', () => Clock);
const mapStateToProps = state => {
  return {
    timeRemaining: state.timer.timeRemaining
  }
}

function mapDispatchToProps(dispatch, dispatchProps, ownProps) {
  return {}
}


export default connect(mapStateToProps, mapDispatchToProps)(Clock)
