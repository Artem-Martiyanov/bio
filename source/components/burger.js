const Burger = {
  el: document.querySelector('.burger'),
  nav: document.querySelector('.nav'),
  
  toggle: function () {
    this.el.classList.toggle('burger--active')
    this.nav.classList.toggle('nav--toggle')
  }
}

export default Burger