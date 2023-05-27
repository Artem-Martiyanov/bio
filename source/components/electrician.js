const Electrician = {
  el: document.querySelector('.works-page__electrician'),
  
  show: function () {
    this.el.classList.add('works-page__electrician--shown')
  },
  reset: function () {
    this.el.classList.remove('works-page__electrician--shown')
  }
}
export default Electrician