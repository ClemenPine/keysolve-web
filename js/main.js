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

window.mirror = function() {
    const grid = document.getElementById('grid')
    const keys = grid.children

    let letters = []
    for (const key of keys) {
        letters.push(key.innerHTML)
    }

    for (let row=0; row < 3; row++) {
        for (let col=0; col < 10; col++) {
            const key = keys[(2-row)*10 + col]
            const letter = letters.pop()

            key.className = `cell center ${letter}`
            key.innerHTML = letter
        }
    }
}

window.copy = function() {
    const grid = document.getElementById('grid')
    
    let text = ''
    let row = []

    for (const key of grid.children) {
        const letter = key.innerHTML.toLowerCase()
        row.push(letter)

        if (row.length == 10) {
            text += row.join(' ') + '\n'
            row = []
        }
    }

    text = text.slice(0, -1)

    navigator.clipboard.writeText(text)
}