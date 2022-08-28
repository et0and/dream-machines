var html = require('choo/html')
var choo = require('choo')
var fs = require('fs')
var path = require('path')

var Content = require('./lib/content')
var stores = require('./lib/stores')

var content = fs.readFileSync(path.join(__dirname, 'text.md'), 'utf8')
var TITLE = 'The Future That Never Was - a virtual art show'
var DESCRIPTION = 'A (post-)phenomenological index of digital specters'
var URL = 'https://hex22.org/inside-dream-machines/'

var app = choo()

app.use(require('choo-meta')())
app.use(stores.header)
app.use(stores.animateGrain)
app.use(stores.concepts)

app.route('/', view)

module.exports = app.mount('body')

function view (state, emit) {
  emit('meta', {
    'title': TITLE,
    'description': `${TITLE}. ${DESCRIPTION}. By Hunor Karamán`,
    'keywords': 'Dream machines, digital, new worlds, simulosis, cyborg, post phenomenology, new hallucinations',
    'og:title': TITLE,
    'og:site_name': 'hex22.org',
    'og:url': URL,
    'og:description': DESCRIPTION,
    'og:type': 'website',
    'og:locale': 'en_US',
    'twitter:card': 'summary',
    'twitter:title': TITLE,
    'twitter:description': DESCRIPTION,
    'twitter:url': URL
  })

  function _onClick () {
    emit('header:toggle')
  }

  function _highlight (i) {
    emit('concepts:highlight', i)
  }
  
  return html`
    <body>
      <header id='header'>
        <div id="grain" class="grain"></div>
        <h1>The <br/>Future <br/>That </br>Never </br>Was</h1>
        
      </header>
      ${state.cache(Content, 'content').render(content)}
    </body>
  `
}

