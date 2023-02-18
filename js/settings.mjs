import * as board from './board.mjs'

export function init() {
    const popups = document.getElementById('pop-ups')
    const matrix = document.getElementById('matrix')

    popups.addEventListener('mousedown', function(event) {
        if (popups.isSameNode(event.target)) {
            popups.setAttribute('hidden', true)
        }
    })

    matrix.addEventListener('input', matrix_change)
}

export function open() {
    const grid = document.getElementById('grid')
    const popups = document.getElementById('pop-ups')
    const textarea = document.getElementById('matrix')
    
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

    text += row.join(' ') + '\n'
    text = text.slice(0, -1)
    textarea.value = text

    popups.removeAttribute('hidden')
}

function matrix_change() {
    const grid = document.getElementById('grid')
    const matrix = document.getElementById('matrix')

    const lines = matrix.value.split('\n')

    let layout = lines.reduce(
        (sum, x) => sum + x.split(' ').filter(i => i).slice(0, 10).join(''),
        ''
    )

    layout = layout.padEnd(30)
    board.update(layout)
}