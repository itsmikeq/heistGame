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
              style={{width: 370}}
              borderRadius={10}
              title="reset"
              label="RESET"
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
    timer: state.timer
  }
}

function mapDispatchToProps(dispatch) {
  return {
    timerReset: () => dispatch(timerReset()),
  }
}


export default connect(mapStateToProps, mapDispatchToProps)(Reset)
