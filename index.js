var Emitter = require('emitter')
var classes = require('classes')

module.exports = PageNav;

var defaults = {}

function PageNav (opts) {
  if (!(this instanceof PageNav)) return new PageNav(opts);
  opts = opts || {}
  Object.keys(defaults || {}).forEach(function(key){
    if(!opts[key]){
      opts[key] = defaults[key]
    }
  })
  this._options = opts
  this._element = document.createElement('div')
  classes(this._element).add('pagenav-bar')
}

Emitter(PageNav.prototype)

PageNav.prototype.buildPages = function (pages) {
  var self = this

  this._pages = pages.map(function(data, i){
    var page = document.createElement('span')
    classes(page).add('pagenav-page')
    page.style.display = 'inline-block'
    page.style.cursor = 'pointer'
    page.innerHTML = i
    page.addEventListener('click', self.clickPage.bind(self))
    self.emit('page', page)
    self._element.appendChild(page)
    return page
  })
  this.setPage(0)
}

PageNav.prototype.clickPage = function (index) {
  this.emit('click', index)
}

PageNav.prototype.setPage = function (index) {
  this._currentPage = index
  this._pages.forEach(function(page, i){
    classes(page).remove('pagenav-active')
    if(i==index){
      classes(page).add('pagenav-active')
    }
  })
}

PageNav.prototype.render = function () {
  return this._element
}

PageNav.prototype.appendTo = function (target) {
  if (typeof target === 'string') target = document.querySelector(target)
  target.appendChild(this.render())
}

PageNav.prototype.remove = function () {
  this._element.parentNode.removeChild(this._element)
}