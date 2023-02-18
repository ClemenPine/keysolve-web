import * as board from './board.mjs'
import * as drag from './drag.mjs'
import {LAYOUTS} from './layouts.mjs'

export function init() {
    const input = document.getElementById('search')
    input.addEventListener("input", change)
    input.addEventListener("focusout", unfocus)
}

function unfocus() {
    const complete = document.getElementById('complete')
    complete.style.display = 'none'
}

function change() {
    let stored = {}
    if ('layouts' in localStorage) {
        stored = JSON.parse(localStorage.layouts)
    }
    
    for (const name in stored) {
        LAYOUTS[name] = stored[name]
    }

    const input = document.getElementById('search')
    const layout = input.value.toLowerCase()

    const complete = document.getElementById('complete')
    
    let completion = ''
    for (const key in LAYOUTS) {
        if (layout === '') {
            break
        }

        if (key === layout) {
            continue
        }

        if (key.startsWith(layout)) {
            completion = key.slice(layout.length, key.length)
            break
        }
    }
    
    complete.innerHTML = (
        ' '.repeat(completion.length) + 
        ' '.repeat(input.value.length) + 
        completion
    )

    complete.style.display = 'flex'

    if (!(layout in LAYOUTS)) {
        return
    }

    const matrix = LAYOUTS[layout]
    grid.innerHTML = ''

    for (let i=0; i < matrix.length; i++) {
        const letter = matrix[i].toUpperCase()

        const key = document.createElement('div')
        key.className = `cell center ${letter}`
        key.innerHTML = letter

        key.setAttribute('draggable', 'true')
        grid.appendChild(key)
    }

    if (board.board == 'stagger') {
        board.stagger()
    }

    drag.init()
    window.stats()
}