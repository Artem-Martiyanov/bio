const Cat = {
  el: document.querySelector('.cat'),
  tail: document.querySelector('.cat__touch-box'),
  claws: document.querySelector('.claws'),

  init: function () {
    if (localStorage.getItem('clawOffset')) {
      this.claws.style.transform = `translateX(${localStorage.getItem('clawOffset')}px)`
    }
  },

  ready: function () {
    this.el.classList.remove('cat--slow', 'cat--animated')
  },

  goBack: function () {
    this.el.classList.add('cat--slow', 'cat--animated')
    this.el.style.transform = 'translateX(0)'
  },

  move: function (position) {
    this.el.style.transform = `translateX(${position}px)`
  },

  moveClaws: function (position) {
    this.claws.style.transform = `translateX(${position}px)`
  },
}

export default Cat
