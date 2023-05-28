const Switcher = {
  el: document.querySelector('[data-type="lamp-switcher"]'),
  
  disable: function () {
    this.el.disabled = true
  },
  enable: function () {
    this.el.disabled = false
  }
}
export default Switcher