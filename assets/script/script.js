// setTimeout() - запускает функцию с задержкой
// setInterval() - перезапускает ваш код каждые n-секунд,сколько укажете

// const sayHello = () => {
//   console.log('hello world');
// }

// setTimeout(sayHello, 4000)

// const interval = setInterval(sayHello, 1000)

// clearInterval(interval) // останавл. код


const timerTag = document.querySelector('.timer__time') // <h1>00:00:00</h1>
const startBtn = document.querySelector('.timer__btn_success') // кнопка старт
const pausetBtn = document.querySelector('.timer__btn_warn')
const stopBtn = document.querySelector('.timer__btn_danger')

let ss = 0 // подсчет секунд,let чтоб менять
let mm = 0 // минут
let hh = 0 // часов

let isStarted = true // для устранения бага с кнопкой старт

// ф-я кот доб 0 в начало цифры:
const addZero = (num) => {
  const str = num.toString() // число превратим в строку,чтобы исп метод length
  if(str.length === 1) { // если длина строки равна 1
    return `0${num}` // то доб 0 спереди
  } 
  return num // иначе верни само число
}

// ф-я увелич сек мин часы:
const runTimer = () => {
  ss++ // увелич сек на 1
  if (ss === 60) {
    ss = 0
    mm++ // увел мин
    if (mm === 60) {
      mm = 0
      hh++ // увел часы
      if (hh === 24) {
        hh = 1
      }
    }
  }
  const time = `${addZero(hh)}:${addZero(mm)}:${addZero(ss)}` // примен ф-ю доб 0
  timerTag.innerText = time // вывели на экран
}

let startInterval = null // чтобы могли исп clearInterval,и перем-я была глобальной

// setInterval(runTimer, 1000)

startBtn.addEventListener('click', () => {
  if (isStarted) { // если isStarted true,т.е кнопка старт нажата
    startInterval = setInterval(runTimer, 1)
    isStarted = false // закинем фолс,чтобы нажим на нее было нельзя,т.е блокировка кнопки старт
  }
})

pausetBtn.addEventListener('click', () => {
  isStarted = true // разблокировка кнопки старт
  clearInterval(startInterval) // останавл-т ф-ю
})

stopBtn.addEventListener('click', () => {
  isStarted = true // разблокировка кнопки старт
  clearInterval(startInterval) // останавл таймер
  ss = 0 // секунды обнуляем
  mm = 0
  hh = 0
  timerTag.innerText = '00:00:00'
})