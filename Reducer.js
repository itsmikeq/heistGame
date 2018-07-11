import Moment from 'react-moment'
import moment from 'moment'
import split from 'lodash/split'


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
  heist: {label: "START"},
  loading: false,
  phase: null,
}

export function calculateDate(futureDate = new Date(), currentDate = new Date()) {
  const formattedDate = moment(moment(futureDate) - currentDate)
  return formattedDate.format('mm:ss')
}

function timerSounds(timeCode) {
  switch (timeCode) {
    case "00:60":
      console.log("6 minutes left")
      return
    case "00:50":
      console.log("5 minutes left")
      return
    case "00:40":
      console.log("4 minutes left")
      return
    case "00:20":
      console.log("2 minutes left")
      return
    default:
      return
  }
}

export default function reducer(state = initialState, action) {
  const now = new Date()
  const tenMinutes = moment(now).add(1, 'm')
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
      return {
        ...state,
        timer: Object.assign(state.timer, {running: false, paused: true, pausedAt: new Date()}),
        heist: {label: "RESUME"}
      }
    case TIMER_STOP:
      return {...state, timer: Object.assign(state.timer, {running: false})}
    case TIMER_CONTINUE:
      console.debug("CONTINUING FROM REDUCER")
      let t = moment(now).diff(state.timer.pausedAt)
      let d = moment.duration(t)
      let newRunUntil = moment(state.timer.runUntil).add(d, 's')
      let newStartedAt = moment(state.timer.startedAt).add(d, 's')
      return {
        ...state,
        timer: {
          running: true,
          paused: false,
          startedAt: newStartedAt,
          timeRemaining: calculateDate(newRunUntil, newStartedAt),
          runUntil: newRunUntil,
        }, startCountdownPressed: true,
        heist: {label: "PAUSE"}
      }
    case TIMER_TICK:
      // Remaining is what is used to display the remaining time
      const remaining = calculateDate(state.timer.runUntil, now)
      console.log("Remaining", remaining)
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
      return {
        ...state, timer: Object.assign(state.timer, {
          running: false,
          paused: false,
          startedAt: now,
          timeRemaining: calculateDate(tenMinutes, now),
          runUntil: tenMinutes,
        }), heist: {label: "START HEIST"},
        phase: null
      }
    case
    TIMER_START:
      console.debug("Starting timer")
      return {
        ...state, timer: {
          running: true,
          startedAt: now,
          timeRemaining: calculateDate(tenMinutes, now),
          runUntil: tenMinutes,
        }, startCountdownPressed: true,
        heist: {label: "PAUSE"}
      }
    default:
      return {
        ...initialState,
        timer: Object.assign(initialState.timer, {timeRemaining: calculateDate(initialState.timer.timeRemaining, now)})
      }
  }
}

export function timerTick(timeLeft) {
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

export function continueTimer() {
  return {
    type: TIMER_CONTINUE,
  }
}


export function startTimer() {
  console.debug("start timer")
  return {
    type: TIMER_START,
  }
}

export function pauseTimer() {
  console.debug("paused timer")
  return {
    type: TIMER_PAUSE,
  }
}

