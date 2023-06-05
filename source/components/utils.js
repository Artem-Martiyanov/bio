/**
 * Плюрализация
 * Возвращает вариант с учётом правил множественного числа под указанную локаль
 * @param value {Number} Число, под которое выбирается вариант формы.
 * @param variants {Object<String>} Варианты форм множественного числа.
 * @example plural(5, {one: 'товар', few: 'товара', many: 'товаров'})
 * @param [locale] {String} Локаль (код языка)
 * @returns {*|string}
 */
export function plural(value, variants = {}, locale = 'ru-RU') {
  // Получаем форму кодовой строкой: 'zero', 'one', 'two', 'few', 'many', 'other'
  // В русском языке 3 формы: 'one', 'few', 'many', и 'other' для дробных
  // В английском 2 формы: 'one', 'other'
  const key = new Intl.PluralRules(locale).select(value);
  // Возвращаем вариант по ключу, если он есть
  return variants[key] || '';
}

/**
 * Конвертирует формат в webp
 *
 * @param url {String} Адрес к картинке
 * @example convertToWebp('./images/example.jpeg') => './images/example.webp'
 * @returns {string}
 */
export const convertToWebp = (url) => {
  const arr = url.split('.')
  arr.pop()
  arr.push('.webp')
  return arr.join('')
}

/**
 * Считает количество лет, прошедших с момента входной даты
 *
 * @param startDate {Object} Дата отсчёта
 * @example {day: 13, month: 5, year: 1999}
 * @returns {Number}
 */
export const howManyYearsSince = (startDate) => {
  const [day, month, year] = new Date(Date.now()).toLocaleDateString().split('.')
  let countOfYears = +year - startDate.year
  if (+month < startDate.month) {
    countOfYears--
  } else if (+month === startDate.month && +day < startDate.day) {
    countOfYears--
  }

  return countOfYears
}

export const iterator = (start = 0) => () => ++start


export const getRandom = (min, max) => Math.random() * (max - min) + min // не включая min


export const isMyReview = (id) => localStorage.getItem('reviewsId') ? localStorage.getItem('reviewsId').split(',').includes(id) : false


export const pushReviewToLocalStorage = (id) => {
  const reviewsId = localStorage.getItem('reviewsId')
  if (reviewsId) {
    const newReviewsId = reviewsId.split(',')
    newReviewsId.push(id)
    localStorage.setItem('reviewsId', newReviewsId.join(','))
  } else {
    localStorage.setItem('reviewsId', id)
  }
}
