import * as search from './search.mjs'
import * as drag from './drag.mjs'
import * as board from './board.mjs'
import {LAYOUTS} from './layouts.mjs'

window.onload = function() {
    search.init()
    drag.init()
    board.stagger()
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

window.store = function() {
    let layouts = {}

    if ('layouts' in localStorage) {
        layouts = JSON.parse(localStorage.layouts)
    }

    const name = document.getElementById('search').value.toLowerCase()

    if (name in LAYOUTS) {
        alert(`The name "${name}" is already taken`)
        return
    }

    const grid = document.getElementById('grid')

    let letters = ''
    for (const key of grid.children) {
        letters += key.innerHTML.toLowerCase()
    }

    layouts[name] = letters
    localStorage.layouts = JSON.stringify(layouts);
}

window.board = function(type) {
    switch (type) {
        case 'ortho':
            board.ortho()
            break
        case 'stagger':
            board.stagger()
            break
    }
}