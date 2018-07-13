import Sound from 'react-native-sound'
import React, {Component} from 'react'
import {connect} from 'react-redux'

class SoundAround extends Component {

  constructor(props) {
    super(props)
    this.playSound().bind(this)
    this.preloadSounds().bind(this)
    this.setState({sound: this.sound()})
  }

  componentWillMount() {
    this.preloadSounds()
  }

  preloadSounds() {
    // Enable playback in silence mode
    Sound.setCategory('Playback')
  }

  sound() {
    return new Sound('bb_king_lucille.mp3', Sound.MAIN_BUNDLE, (error) => {
      if (error) {
        console.log('failed to load the sound', error)
        return
      }
    })
  }

  playSound() {
    // Play the sound with an onEnd callback
    return this.sound.play((success) => {
      if (success) {
        console.log('successfully finished playing')
      } else {
        console.log('playback failed due to audio decoding errors')
        // reset the player to its uninitialized state (android only)
        // this is the only option to recover after an error occured and use the player again
        this.sound.reset()
      }
    })
  }

  render() {
    return null
  }
}

function mapStateToProps(state) {
  return {
    props: state
  }
}

function mapDispatchToProps(dispatch) {
  return {}
}

export default connect(mapStateToProps, mapDispatchToProps)(SoundAround)