const Dialog = {
  el: document.querySelector('.intro-page__dialog'),
  
  show: function () {
    this.el.classList.add('intro-page__dialog--down')
  }
}

export default Dialog