import Moment from 'react-moment'
import moment from 'moment'
import Sound from 'react-native-sound'


export const START_GETAWAY = 'heist-game/app/START_GETAWAY'
export const START_GETAWAY_SUCCESS = 'heist-game/app/START_GETAWAY_SUCCESS'
// when the timer is running
export const TIMER_RUNNING = 'heist-game/app/TIMER_RUNNING'
// when the timer is paused
export const TIMER_PAUSE = 'heist-game/app/TIMER_PAUSE'
// when the timer is reset
export const TIMER_RESET = 'heist-game/app/TIMER_RESET'
export const TIMER_START = 'heist-game/app/TIMER_START'
export const TIMER_CONTINUE = 'heist-game/app/TIMER_CONTINUE'
export const STORE_TIME = 'heist-game/app/STORE_TIME'
export const TIMER_TICK = 'heist-game/app/TIMER_TICK'
export const TIMER_STOP = 'heist-game/app/TIMER_STOP'
export const DISABLE_GETAWAY_BUTTON = 'heist-game/app/DISABLE_GETAWAY_BUTTON'

const tenMinutes = 60 * 10

const initialState = {
  timer: {
    running: false,
    paused: false,
    totalDuration: tenMinutes * 1000,
    timeRemaining: moment(new Date()).add(10, 'm'),
    runUntil: moment(new Date()).add(10, 'm'),
    pausedAt: null,
    complete: false
  },
  heist: {label: "START HEIST", disabled: null},
  getaway: {label: "START GETAWAY"},
  loading: false,
  phase: null,
}

const sound = new Sound('bb_king_lucille.mp3', Sound.MAIN_BUNDLE, (error) => {
  if (error) {
    console.debug('failed to load the sound', error)
    return null
  }
  // loaded successfully
  console.debug('duration in seconds: ' + sound.getDuration() + 'number of channels: ' + sound.getNumberOfChannels())
})

export function calculateDate(futureDate = new Date(), currentDate = new Date()) {
  const formattedDate = moment(moment(futureDate) - currentDate)
  return formattedDate.format('mm:ss')
}

function timerSounds(timeCode) {
  switch (timeCode) {
    case "00:60":
      console.debug("6 minutes left")
      return
    case "00:50":
      console.debug("5 minutes left")
      return
    case "00:40":
      console.debug("4 minutes left")
      return
    case "00:20":
      console.debug("2 minutes left")
      return
    default:
      return
  }
}

export default function reducer(state = initialState, action) {
  const now = new Date()
  const tenMinutes = moment(now).add(1, 'm')
  const startGetawayLabel = "START GETAWAY"
  const startHeistLabel = "START HEIST"
  switch (action.type) {
    case START_GETAWAY:
      return {
        ...state,
        phase: 'GETAWAY'
      }
    case START_GETAWAY_SUCCESS:
      return {...state}
    case TIMER_RUNNING:
      return {...state}
    case TIMER_PAUSE:
      sound.pause()
      if (action.phase === 'HEIST') {
        state = Object.assign(state, {heist: {label: "RESUME"}})
      } else if (action.phase === 'GETAWAY') {
        state = Object.assign(state, {getaway: {label: "RESUME"}})
      }
      return {
        ...state,
        timer: Object.assign(state.timer, {running: false, paused: true, pausedAt: new Date()})
      }
    case TIMER_STOP:
      sound.stop()
      sound.release()
      return {...state, timer: Object.assign(state.timer, {running: false})}
    case TIMER_CONTINUE:
      console.debug("CONTINUING FROM REDUCER")
      sound.play()
      let t = moment(now).diff(state.timer.pausedAt)
      let d = moment.duration(t)
      let newRunUntil = moment(state.timer.runUntil).add(d, 's')
      let newStartedAt = moment(state.timer.startedAt).add(d, 's')
      if (action.phase === 'HEIST') {
        state = Object.assign(state, {heist: {label: "PAUSE"}})
      } else if (action.phase === 'GETAWAY') {
        state = Object.assign(state, {getaway: {label: "PAUSE"}})
      }
      return {
        ...state,
        timer: {
          running: true,
          paused: false,
          startedAt: newStartedAt,
          timeRemaining: calculateDate(newRunUntil, newStartedAt),
          runUntil: newRunUntil,
        }, startCountdownPressed: true
      }
    case TIMER_TICK:
      // Remaining is what is used to display the remaining time
      const remaining = calculateDate(state.timer.runUntil, now)
      console.debug("Remaining", remaining)
      sound.getCurrentTime((seconds) => console.debug('at ' + seconds))

      timerSounds(remaining)
      if (state.timer.runUntil >= now) {
        return {
          ...state, timer: Object.assign(state.timer, {timeRemaining: remaining})
        }
      } else {
        console.debug("ALl done")
        return {
          ...state,
          timer: Object.assign(state.timer, {timeRemaining: "00:00", running: false, complete: true})
        }
      }
    case
    TIMER_RESET:
      console.debug("hit reset")
      sound.stop()
      return {
        ...state, timer: Object.assign(state.timer, {
          running: false,
          paused: false,
          startedAt: now,
          timeRemaining: calculateDate(tenMinutes, now),
          runUntil: tenMinutes,
        }), heist: {label: startHeistLabel},
        getaway: {label: startGetawayLabel},
        phase: 'HEIST'
      }
    case
    TIMER_START:
      console.debug("Starting timer")
      sound.play()
      if (action.phase === 'HEIST') {
        state = Object.assign(state, {heist: {label: "PAUSE"}})
      } else if (action.phase === 'GETAWAY') {
        state = Object.assign(state, {getaway: {label: "PAUSE"}})
      }
      // going from heist to getaway
      if (state.phase === 'HEIST' && action.phase === 'GETAWAY') {
        console.debug("Switching from heist to getaway")
        state = Object.assign(state, {getaway: {label: "PAUSE"}})
        // return with only the phase having changed
        // so we dont reset the timer
        return {
          ...state,
          phase: action.phase
        }
      }
      return {
        ...state, timer: {
          running: true,
          startedAt: now,
          timeRemaining: calculateDate(tenMinutes, now),
          runUntil: tenMinutes,
        }, startCountdownPressed: true,
        phase: action.phase
      }
    case DISABLE_GETAWAY_BUTTON:
      return {
        ...state, heist: {label: 'GETAWAY IN PROGRESS', disabled: true}
      }
    default:
      return {
        ...initialState,
        timer: Object.assign(initialState.timer, {timeRemaining: calculateDate(initialState.timer.timeRemaining, now)})
      }
  }
}

export function timerTick() {
  return {
    type: TIMER_TICK
  }
}

export function timerStop() {
  return {
    type: TIMER_STOP
  }
}

export function timerReset() {
  return {
    type: TIMER_RESET
  }
}

// load the sounds here, so they're available when we need then
export function initTimer() {
  console.debug("initted timer")
  return {
    type: TIMER_RESET,
  }
}

export function continueTimer(phase = null) {
  return {
    type: TIMER_CONTINUE,
    phase: phase
  }
}


export function startTimer(phase = null) {
  console.debug("start timer")
  return {
    type: TIMER_START,
    phase: phase
  }
}

export function pauseTimer(phase = null) {
  console.debug("paused timer")
  return {
    type: TIMER_PAUSE,
    phase: phase
  }
}

export function disableGetawayButton() {
  return {
    type: DISABLE_GETAWAY_BUTTON
  }
}

