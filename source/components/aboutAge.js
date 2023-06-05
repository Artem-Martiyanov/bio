import {howManyYearsSince, plural} from './utils';

const ageSpan = document.querySelector('.about-page__age')

if (ageSpan) {
  let currentAge = howManyYearsSince({day: 13, month: 5, year: 1999})
  currentAge = currentAge + ' ' + plural(currentAge, {one: 'год', few: 'года', many: 'лет'})
  ageSpan.innerText = currentAge
}

