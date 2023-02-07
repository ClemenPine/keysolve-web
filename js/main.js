import * as search from './search.mjs'
import * as drag from './drag.mjs'

window.onload = function() {
    search.init()
    drag.init()
}

window.theme = function(name) {
    const curr = document.getElementById('theme')
    curr.href = `themes/${name}.css`
}