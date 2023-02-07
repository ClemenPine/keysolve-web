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
    const keys = document.getElementById('grid').children

    for (let i=0; i < matrix.length; i++) {
        const letter = matrix[i].toUpperCase()
        const key = keys[i]

        key.className = `cell center ${letter}`
        key.innerHTML = letter
    }
}