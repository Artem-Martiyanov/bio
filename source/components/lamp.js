const Lamp = {
  el: document.querySelector('.lamp'),
  
  change: function (then = () => {}) {
    this.el.classList.add('lamp--change')
    this.el.addEventListener('animationend', (event) => {
      if (event.animationName === 'lamp-change') {
        this.el.classList.remove('lamp--change')
        then()
      }
    })
  },
  
  toggle: function () {
    this.el.classList.toggle('lamp--toggle')
  }
}
export default Lamp