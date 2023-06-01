const Form = {
  el: document.forms.review,

  listen: function (then) {
    const formElements = this.el.elements

    this.el.addEventListener('input', () => {
      // Валидация
      this.validate(formElements)
    })

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

      // Добавляем к объекту данных дату
      data.date = new Date(Date.now()).toString()

      // Вызываем колбек
      then(data)
    })
  },

  validate: function (formElements) {
    const submitButton = this.el.querySelector('button[type=submit]')
    const isValid = (input, link) => {
      if (input.value.trim() !== '' && !input.value.includes(link)) {
        input.parentNode.classList.add('textfield--invalid')
        return true
      } else {
        input.parentNode.classList.remove('textfield--invalid')
        return false
      }
    }
    const isTelegramValid = isValid(formElements.userTelegram, 'https://t.me/')
    const isVkontakteValid = isValid(formElements.userVkontakte, 'https://vk.com/')
    const isUserNameValid = formElements.userName.value.trim() !== ''
    const isContentValid = formElements.content.value.trim() !== ''
    const isRatingValid = formElements.rating.value !== ''

    submitButton.disabled = !(isUserNameValid && isContentValid && isRatingValid && !isTelegramValid && !isVkontakteValid)
  },
}
export default Form
