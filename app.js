var html = require('choo/html')
var choo = require('choo')
var fs = require('fs')
var path = require('path')

var Content = require('./lib/content')
var stores = require('./lib/stores')

var content = fs.readFileSync(path.join(__dirname, 'text.md'), 'utf8')
var TITLE = 'Green Spaces vs Urban Places'
var DESCRIPTION = 'A Year 11 Digital Art Show'
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
    'description': `${TITLE}. ${DESCRIPTION}. Takapuna Grammar School`,
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
        <h1>Green Spaces <br/>vs. <br/>Urban Places </h1>
        <small>A Year 11 virtual show</small>
        
      </header>
      ${state.cache(Content, 'content').render(content)}
    </body>
  `
}

