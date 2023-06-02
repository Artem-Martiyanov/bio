import popup from './popup';

const Form = {
  el: document.forms.review,

  listen: function (then) {
    const formElements = this.el.elements

    // ОБРАБОТКА ВВОДА В ПОЛЯ
    this.el.addEventListener('input', () => {
      const data = Object.fromEntries(new FormData(this.el).entries())
      // Валидация
      this.validate(formElements)
      this.loadToStorage(data)
    })

    // ОБРАБОТКА ОТПРАВКИ ФОРМЫ
    this.el.addEventListener('submit', (event) => {
      event.preventDefault()

      const formData = new FormData(this.el)

      // Получаем данные из формы
      const data = Object.fromEntries(formData.entries())

      // Очищаем поля ввода
      for (let dataKey in data) {
        data[dataKey] = data[dataKey].trim()
        this.el.elements[dataKey].value = ''
      }

      this.clearStorage()
      popup.show()

      // Добавляем к объекту данных дату
      data.date = new Date(Date.now()).toString()
      this.validate(this.el.elements)
      // Вызываем колбек
      then(data)
    })
  },

  onLoad: function () {
    const data = this.checkStorage()

    // Заполняем поля данными
    for (let dataKey in data) {
      this.el.elements[dataKey].value = data[dataKey]
    }
    this.validate(this.el.elements)
  },

  validate: function (formElements) {
    const submitButton = this.el.querySelector('button[type=submit]')
    const isValidLink = (input, link) => {
      if (input.value.trim() !== '' && !input.value.includes(link)) {
        input.parentNode.classList.add('textfield--invalid')
        return false
      } else {
        input.parentNode.classList.remove('textfield--invalid')
        return true
      }
    }
    const inValidText = (input, className) => {
      if (input.value.trim() !== '') {
        input.parentNode.classList.remove(className)
        return true
      } else {
        input.parentNode.classList.add(className)
        return false
      }
    }
    const inValidNumber = (input, start, end) => {
      if (input.value.trim() !== '' && Number(input.value) >= start && Number(input.value) <= end) {
        input.parentNode.classList.remove('textfield--invalid')
        return true
      } else {
        input.parentNode.classList.add('textfield--invalid')
        return false
      }
    }

    const isTelegramValid = isValidLink(formElements.userTelegram, 'https://t.me/')
    const isVkontakteValid = isValidLink(formElements.userVkontakte, 'https://vk.com/')
    const isUserNameValid = inValidText(formElements.userName, 'textfield--invalid')
    const isContentValid = inValidText(formElements.content, 'textarea--invalid')
    const isRatingValid = inValidNumber(formElements.rating, 0, 10)

    submitButton.disabled = !(isUserNameValid && isContentValid && isRatingValid && isTelegramValid && isVkontakteValid)
  },

  checkStorage: function () {
    const lastData = localStorage.getItem('lastFormData')
    return lastData ? JSON.parse(lastData) : null
  },

  loadToStorage: function (data) {
    localStorage.setItem('lastFormData', JSON.stringify(data))
  },

  clearStorage: function () {
    localStorage.removeItem('lastFormData')
  }
}
export default Form
