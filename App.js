import React, {Component} from 'react'
import {StyleSheet, Text, View, ImageBackground, Image} from 'react-native'
import {createStore, applyMiddleware} from 'redux'
import {Provider, connect} from 'react-redux'
// import {START_HEIST, START_GETAWAY, } from './Reducer';
import reducer from './Reducer'
import {composeWithDevTools} from 'redux-devtools-extension'
import Clock from './Clock'
import Heist from './Heist'
import Getaway from './Getaway'
import Reset from './Reset'

// const store = {}
const store = createStore(reducer)

function timerReset() {
  console.log("Hit reset")
}

export default class App extends React.Component {
  constructor(props) {
    super(props)
  }

  render() {
    let source = './assets/images/heist_game_background.png'

    return (
        <Provider store={store}>
          <View style={styles.container}>
            <Image
                source={require(source)}
                style={styles.backgroundImage}
            />
              <View style={styles.content}>
                <Heist store={store}/>
                <Clock store={store}/>
                <Getaway store={store}/>
                <Reset store={store}/>

              </View>
          </View>
        </Provider>
    )
  }
}

const styles = StyleSheet.create({
  content: {
    backgroundColor: 'transparent',
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
  container: {
    flex: 1,
    backgroundColor: 'transparent',
  },
  backgroundImage: {
    flex: 1,
    zIndex: -1,
    width: null,
    height: null,
    position: 'absolute',
    resizeMode: 'cover',
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
    opacity: 0.2,
  },
})
