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
        <View style={styles.container}>
          <View style={styles.buttonWrapper}>
            <Button
                onPress={this.reset.bind(this)}
                style={styles.button}
            >
              <Text style={styles.text}>RESET</Text>
            </Button>
          </View>
        </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'transparent',
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
    timer: state.timer
  }
}

function mapDispatchToProps(dispatch) {
  return {
    timerReset: () => dispatch(timerReset()),
  }
}


export default connect(mapStateToProps, mapDispatchToProps)(Reset)
