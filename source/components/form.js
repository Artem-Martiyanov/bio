const Form = {
  el: document.forms.review,

  listen: function (then) {
    const formElements = this.el.elements

    this.el.addEventListener('input', () => {
      // Валидация
      this.validateRequiredFields(formElements)
      this.validateLinks(formElements)
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

  validateRequiredFields: function (formElements) {
    const submitButton = this.el.querySelector('button[type=submit]')

    const isUserNameValid = formElements.userName.value.trim() !== ''
    const isContentValid = formElements.content.value.trim() !== ''
    const isRatingValid = formElements.rating.value !== ''

    submitButton.disabled = !(isUserNameValid && isContentValid && isRatingValid)
  },

  validateLinks: function (formElements) {
    const submitButton = this.el.querySelector('button[type=submit]')

    const validate = (input, link) => {
      if (input.value.trim() !== '' && !input.value.includes(link)) {
        submitButton.disabled = true
        input.parentNode.classList.add('textfield--invalid')
      } else {
        submitButton.disabled = false
        input.parentNode.classList.remove('textfield--invalid')
      }
    }

    validate(formElements.userTelegram, 'https://t.me/')
    validate(formElements.userVkontakte, 'https://vk.com/')
  }

}
export default Form
