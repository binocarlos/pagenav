pagenav
=======

navigation toolbar for a [pageturner](https://github.com/binocarlos/pageturner) book

## installation

```
$ component install binocarlos/pagenav
```

## example

Create a [pageturner](https://github.com/binocarlos/pageturner) book and pass it to pagehammer

```js
var PageTurner = require('pageturner')
var PageNav = require('pagenav')
var data = {
	title:"My Cool Book",
	pages:[{
		title:"Intro",
		html:"<p>This is the first page</p>"
	},
	...]
}

var book = PageTurner(data)
var nav = PageNav(book)

book.appendTo(document.querySelector('#container'))
nav.appendTo(document.querySelector('#nav'))

nav.on('page', function(){
	// the navbar was triggered and turned the book page
})
```

## api

### `var nav = PageNav(book)`

Create a new navbar from the given book and options

## css

The DOM structure for the navbar:

```html
<div class="pagenav-bar">
	<div class="pagenav-page">1</div>
	<div class="pagenav-page">2</div>
	<div class="pagenav-page pagenav-active">3</div>
	<div class="pagenav-page">4</div>
</div>
```

## licence
MIT