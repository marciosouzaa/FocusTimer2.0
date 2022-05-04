//elements
const buttonPlay = document.querySelector('.play')
const buttonPause = document.querySelector('.pause')
const buttonStop = document.querySelector('.stop')
const buttonNature = document.querySelector('.card.nature')
const buttonRain = document.querySelector('.card.rain')
const buttonCoffee = document.querySelector('.card.coffee')
const buttonFire = document.querySelector('.card.fire')
const buttonLightMode = document.querySelector('.light-mode')
const buttonDarkMode = document.querySelector('.dark-mode')
const minutesDisplay = document.querySelector('.minutes')
const secondsDisplay = document.querySelector('.seconds')
const buttonIncrease = document.querySelector('.increase')
const buttonDecrease = document.querySelector('.decrease')
const bgNature = document.querySelector('.bgNature')
const bgRain = document.querySelector('.bgRain')
const bgCoffee = document.querySelector('.bgCoffee')
const bgFire = document.querySelector('.bgFire')
const bgDarkMode = document.querySelector('.body')
const bgLightkMode = document.querySelector('.body')

//timer
let timerTimeOut
let minutes = Number(minutesDisplay.textContent)

function updateDisplay(newMinutes, seconds) {
  newMinutes = newMinutes === undefined ? minutes : newMinutes
  seconds = seconds === undefined ? 0 : seconds
  minutesDisplay.textContent = String(newMinutes).padStart(2, '0')
  secondsDisplay.textContent = String(seconds).padStart(2, '0')
}
function increaseDisplay(newMinutes, seconds) {
  minutes = minutes + 5
  updateDisplay(minutes, seconds)
}

function decreaseDisplay(newMinutes, seconds) {
  minutes = minutes - 5
  if (minutes < 0) minutes = 0
  updateDisplay(minutes, seconds)
}

function reset() {
  updateDisplay(minutes, 0)
  clearTimeout(timerTimeOut)
}

function countDown() {
  timerTimeOut = setTimeout(function () {
    let seconds = Number(secondsDisplay.textContent)
    let minutes = Number(minutesDisplay.textContent)
    let isFinished = minutes <= 0 && seconds <= 0

    updateDisplay(minutes, 0)

    if (isFinished) {
      reset()
      updateDisplay()
      timeEnd()
      pause()
      return
    }
    if (seconds <= 0) {
      seconds = 4
      --minutes
    }
    updateDisplay(minutes, String(seconds - 1))
    countDown()
  }, 1000)
}
function updateMinutes(newMinutes) {
  minutes = newMinutes
}
function hold() {
  clearTimeout(timerTimeOut)
}

//events
buttonPlay.addEventListener('click', function () {
  play()
  countDown()
  pressButton()
})

buttonPause.addEventListener('click', function () {
  pause()
  hold()
  pressButton()
})

buttonStop.addEventListener('click', function () {
  reset()
  stop()
  pressButton()
})

buttonIncrease.addEventListener('click', function () {
  increaseDisplay()
  pressButton()
})
buttonDecrease.addEventListener('click', function () {
  decreaseDisplay()
  pressButton()
})
buttonLightMode.addEventListener('click', function () {
  pressButton()
  resetLightMode()
  bgAudioNature.pause()
  bgAudioRain.pause()
  bgAudioCoffee.pause()
  bgAudioFire.pause()
})
buttonDarkMode.addEventListener('click', function () {
  pressButton()
  resetDarkMode()
  bgAudioNature.pause()
  bgAudioRain.pause()
  bgAudioCoffee.pause()
  bgAudioFire.pause()
})

buttonNature.addEventListener('click', function () {
  pressButton()
  bgAudioNature.play()
  bgAudioRain.pause()
  bgAudioCoffee.pause()
  bgAudioFire.pause()
  nature()
})
buttonRain.addEventListener('click', function () {
  pressButton()
  bgAudioNature.pause()
  bgAudioRain.play()
  bgAudioCoffee.pause()
  bgAudioFire.pause()
  rain()
})
buttonCoffee.addEventListener('click', function () {
  pressButton()
  bgAudioNature.pause()
  bgAudioRain.pause()
  bgAudioCoffee.play()
  bgAudioFire.pause()
  coffee()
})
buttonFire.addEventListener('click', function () {
  pressButton()
  bgAudioNature.pause()
  bgAudioRain.pause()
  bgAudioCoffee.pause()
  bgAudioFire.play()
  fire()
})

//controls
function play() {
  buttonPlay.classList.add('hide')
  buttonPause.classList.remove('hide')
}
function pause() {
  buttonPause.classList.add('hide')
  buttonPlay.classList.remove('hide')
}

function stop() {
  buttonPlay.classList.remove('hide')
  buttonPause.classList.add('hide')
}

//sound
const buttonPressAudio = new Audio(
  'https://github.com/maykbrito/automatic-video-creator/blob/master/audios/button-press.wav?raw=true'
)
const kitchenTimer = new Audio(
  'https://github.com/maykbrito/automatic-video-creator/blob/master/audios/kichen-timer.mp3?raw=true'
)
const bgAudioNature = new Audio('./sounds/floresta.mp3')
const bgAudioRain = new Audio('./sounds/chuva.mp3')
const bgAudioCoffee = new Audio('./sounds/cafeteria.mp3')
const bgAudioFire = new Audio('./sounds/lareira.mp3')
bgAudio.loop = true
function pressButton() {
  buttonPressAudio.play()
}
function timeEnd() {
  kitchenTimer.play()
}
//video
function nature() {
  bgNature.classList.remove('hide')
  bgRain.classList.add('hide')
  bgCoffee.classList.add('hide')
  bgFire.classList.add('hide')

  buttonNature.classList.add('active')
  buttonRain.classList.remove('active')
  buttonCoffee.classList.remove('active')
  buttonFire.classList.remove('active')
  buttonDarkMode.classList.remove('hide')
  buttonLightMode.classList.add('hide')
}
function rain() {
  bgNature.classList.add('hide')
  bgRain.classList.remove('hide')
  bgCoffee.classList.add('hide')
  bgFire.classList.add('hide')

  buttonNature.classList.remove('active')
  buttonRain.classList.add('active')
  buttonCoffee.classList.remove('active')
  buttonFire.classList.remove('active')
  buttonDarkMode.classList.remove('hide')
  buttonLightMode.classList.add('hide')
}
function coffee() {
  bgNature.classList.add('hide')
  bgRain.classList.add('hide')
  bgCoffee.classList.remove('hide')
  bgFire.classList.add('hide')

  buttonNature.classList.remove('active')
  buttonRain.classList.remove('active')
  buttonCoffee.classList.add('active')
  buttonFire.classList.remove('active')
  buttonDarkMode.classList.remove('hide')
  buttonLightMode.classList.add('hide')
}
function fire() {
  bgNature.classList.add('hide')
  bgRain.classList.add('hide')
  bgCoffee.classList.add('hide')
  bgFire.classList.remove('hide')

  buttonNature.classList.remove('active')
  buttonRain.classList.remove('active')
  buttonCoffee.classList.remove('active')
  buttonFire.classList.add('active')
  buttonDarkMode.classList.remove('hide')
  buttonLightMode.classList.add('hide')
}
function resetLightMode() {
  bgNature.classList.add('hide')
  bgRain.classList.add('hide')
  bgCoffee.classList.add('hide')
  bgFire.classList.add('hide')

  buttonNature.classList.remove('active')
  buttonRain.classList.remove('active')
  buttonCoffee.classList.remove('active')
  buttonFire.classList.remove('active')
  buttonDarkMode.classList.remove('hide')
  buttonLightMode.classList.add('hide')
  bgDarkMode.classList.add('active')
}
function resetDarkMode() {
  bgNature.classList.add('hide')
  bgRain.classList.add('hide')
  bgCoffee.classList.add('hide')
  bgFire.classList.add('hide')

  buttonNature.classList.remove('active')
  buttonRain.classList.remove('active')
  buttonCoffee.classList.remove('active')
  buttonFire.classList.remove('active')
  buttonDarkMode.classList.add('hide')
  buttonLightMode.classList.remove('hide')
  bgDarkMode.classList.remove('active')
}

//card ativo
