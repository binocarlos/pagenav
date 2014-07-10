var Emitter = require('emitter')
var classes = require('classes')

module.exports = PageNav;

var defaults = {}

function PageNav (book, opts) {
  if (!(this instanceof PageNav)) return new PageNav(book, opts);
  opts = opts || {}
  Object.keys(defaults || {}).forEach(function(key){
  	if(!opts[key]){
  		opts[key] = defaults[key]
  	}
  })
  this._book = book
  this._options = opts
  this.setupEvents()
}

Emitter(PageNav.prototype)

PageNav.prototype.setupEvents = function () {
  this._book.on('data', this.buildPages.bind(this))
}

PageNav.prototype.buildPages = function (pages) {
  var self = this

  this._pages = pages.map(function(page, i){
    var page = document.createElement('div')
    classes(page).add('pagenav-page')
    page.innerHTML = i
    page.addEventListener('click', self.clickPage.bind(self))
    self.emit('page', page)
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
  if(this._element){
    return this._element
  }
  this._element = document.createElement('div')
  classes(this._element).add('pagenav-bar')
  return this._element
}

PageNav.prototype.appendTo = function (target) {
  if (typeof target === 'string') target = document.querySelector(target)
  target.appendChild(this.render())
}