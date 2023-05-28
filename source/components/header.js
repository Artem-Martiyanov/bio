const Header = {
  el: document.querySelector('.header'),
  
  darken: function () {
    if (this.el) {
      this.el.classList.add('header--scrolled')
    }
  },
  
  lighten: function () {
    if (this.el) {
      this.el.classList.remove('header--scrolled')
    }
  }
}

export default Header