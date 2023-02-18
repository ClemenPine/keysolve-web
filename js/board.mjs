import * as drag from './drag.mjs'

export let board = 'stagger'

export function layout() {
    const grid = document.getElementById('grid')
    let layout = ''

    for (const key of grid.children) {
        if (key.classList.contains('empty')) {
            continue
        }

        layout += key.innerHTML.toLowerCase()
    }

    return layout
}

export function update(layout) {
    grid.innerHTML = ''

    for (let i=0; i < layout.length; i++) {
        if (i == 30) {
            for (let j=0; j < 6; j++) {
                const filler = document.createElement('div')
                filler.className = 'empty'
                grid.appendChild(filler)
            }
        }

        const letter = layout[i].toUpperCase()

        const key = document.createElement('div')
        key.className = `cell center ${letter}`
        key.innerHTML = letter

        key.setAttribute('draggable', 'true')
        grid.appendChild(key)
    }

    if (board == 'stagger') {
        stagger()
    }

    drag.init()
    window.stats()
}

export function stagger() {
    const grid = document.getElementById('grid')
    const keys = grid.children

    for (let i=0; i < keys.length; i++) {
        let style = ''
        if (i < 10) {
            style = 'calc(var(--size) * -3)'
        } else if (i < 20) {
            style = 'calc(var(--size) * -1)'
        } else if (i < 30) {
            style = 'calc(var(--size) * 3)'
        } else {
            style = 'calc(var(--size) * -1)'
        }
        
        keys[i].style.marginLeft = style
    }

    board = 'stagger'
}

export function ortho() {
    const grid = document.getElementById('grid')
    const keys = grid.children

    for (let i=0; i < keys.length; i++) {
        keys[i].style.marginLeft = '0'
    }

    board = 'ortho'
}