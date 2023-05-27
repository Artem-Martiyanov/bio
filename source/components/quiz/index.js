const quizBox = document.querySelector('.quiz-box')
const quizBoxItems = quizBox.querySelectorAll('.quiz-box__question-item')
const prevButton = quizBox.querySelector('[data-direction = "prev"]')
const nextButton = quizBox.querySelector('[data-direction = "next"]')
const alarm = quizBox.querySelector('.quiz-box__alarm')

const getCurrentPage = () => {
  let current = 0
  quizBoxItems.forEach((page, index) => {
    if (page.classList.contains('quiz-box__question-item--shown')) {
      current = index + 1
    }
  })
  return current
}
const setPageIndicator = () => {
  const pageCountBlock = quizBox.querySelector('.quiz-box__page-number')
  const pageCount = quizBoxItems.length
  const currentPage = getCurrentPage()
  pageCountBlock.innerText = `${currentPage}/${pageCount}`
}

const isLastPage = () => getCurrentPage() === quizBoxItems.length
const isFirstPage = () => getCurrentPage() === 1
const checkFirstPageAndDisableButton = () => {
  if (isFirstPage()) {
    prevButton.setAttribute('disabled', 'disabled')
  } else {
    prevButton.removeAttribute('disabled')
  }
}
const checkLastPageAndDisableButton = () => {
  nextButton.innerText = isLastPage() ? 'отправить' : 'далее'
}

const resetShine = () => {
  const reqInputs = document.querySelectorAll('.control__input:required')
  reqInputs.forEach(input => input.classList.remove('control__input--warn'))
}
const shineInputs = (inputs) => {
  inputs.forEach(input => {
    input.classList.add('control__input--warn')
  })
}

const resetAlarm = () => alarm.classList.remove('quiz-box__alarm--shown')
const showAlarm = () => alarm.classList.add('quiz-box__alarm--shown')

const resetPages = () => quizBoxItems.forEach(page => page.classList.remove('quiz-box__question-item--shown', 'quiz-box__question-item--anim-in'))

const moveToPage = (currentPage) => {
  quizBoxItems[currentPage - 1].classList.add('quiz-box__question-item--shown')
  
  setTimeout(() => {
    quizBoxItems[currentPage - 1].classList.add('quiz-box__question-item--anim-in')
  }, 0)
}

const validate = () => {
  let invalidInputs = []
  const reqInputs = document.querySelectorAll('.control__input:required')
  reqInputs.forEach(input => {
    if (input.value.trim() === '') {
      invalidInputs.push(input)
    }
  })
  
  if (invalidInputs.length === 0) {
    resetAlarm()
    return true
  } else {
    resetShine()
    showAlarm()
    shineInputs(invalidInputs)
    return false
  }
}

const interrogateTextInputs = () => {
  const textInputs = quizBox.querySelectorAll('.control__input:not([type="radio"]):not([type="checkbox"])')
  const result = {}
  textInputs.forEach(input => {
    result[input.name] = input.value
    input.value = ''
  })
  return result
}

const interrogateCheckboxInputs = () => {
  const checkboxInputs = quizBox.querySelectorAll('.control__input[type="radio"], .control__input[type="checkbox"]')
  const result = {}
  for (let key of checkboxInputs) {
    if (key.checked) {
      result[key.name] = key.value
    }
  }
  return result
}

const collectData = () => new Object({
  date: new Date(),
  ...interrogateTextInputs(),
  ...interrogateCheckboxInputs()
})

const sendData = (data) => {
  console.log(data)
}



function buttonHandler(e) {
  const currentPage = getCurrentPage()
  const buttonDirection = e.target.dataset.direction
  
  e.preventDefault()
  
  if (buttonDirection === 'prev') {
    resetPages()
    moveToPage(currentPage - 1)
  }
  
  if (buttonDirection === 'next') {
    
    if (isLastPage()) {
      if (validate()) {
        const data = collectData()
        sendData(data)
      }
      
    } else {
      resetPages()
      moveToPage(currentPage + 1)
    }
  }
  
  checkFirstPageAndDisableButton()
  checkLastPageAndDisableButton()
  setPageIndicator()
}


function initQuizForm() {
  quizBox.classList.remove('quiz-box--no-js')
  nextButton.innerText = 'далее'
  setPageIndicator()
  prevButton.addEventListener('click', buttonHandler)
  nextButton.addEventListener('click', buttonHandler)
}


initQuizForm()