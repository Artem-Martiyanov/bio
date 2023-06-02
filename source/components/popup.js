const Popup = {
  el: document.querySelector('.popup'),

  show: function () {
    this.el.classList.add('popup--show')
    this.el.onanimationend = () => this.el.classList.remove('popup--show')
  }
}

export default Popup
