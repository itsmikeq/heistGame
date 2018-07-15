import React, {Component} from 'react'
import {StyleSheet, Text, View} from 'react-native'
import {Button} from 'react-native-common'
import {timerReset} from './Reducer'
import {connect} from 'react-redux'


class Reset extends React.Component {

  constructor(props) {
    super(props)
  }

  componentWillMount() {
  }

  componentDidMount() {
  }

  reset() {
    console.debug("Handling RESET")
    this.props.timerReset()
  }

  render() {
    return (
        <View style={styles.buttonWrapper}>
          <Button
              onPress={this.reset.bind(this)}
              style={styles.button}
              color="#1D292F"
          ><Text style={styles.text}>RESET</Text></Button>
        </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    height: 40,
    backgroundColor: '#1D292F',
  },
  button: {
    width: 370,
    backgroundColor: '#1D292F',
    borderRadius: 0,
  },
  buttonWrapper: {
    marginTop: 50,
  },
  text: {
    color: '#fff',
    textAlign: 'center',
  },
})


function mapStateToProps(state) {
  return {
    timer: state.timer
  }
}

function mapDispatchToProps(dispatch) {
  return {
    timerReset: () => dispatch(timerReset()),
  }
}


export default connect(mapStateToProps, mapDispatchToProps)(Reset)
