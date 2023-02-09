let curr = null

export function init() {
    const grid = document.getElementById('grid')
    const editor = document.getElementById('editor')

    for (const key of grid.children) {
        key.addEventListener('dblclick', edit)
    }

    editor.addEventListener('focusout', unfocus)
    editor.addEventListener('input', change)
}

function edit(event) {
    const target = event.target
    curr = target

    const editor = document.getElementById('editor')
    
    const rect = target.getBoundingClientRect()

    editor.style.width = `${target.clientWidth}px`

    editor.style.top = `${rect.top}px` 
    editor.style.left = `${rect.left}px`

    editor.hidden = false
    editor.focus()

    editor.value = target.innerHTML
    target.innerHTML = ''

}

function unfocus() {
    const editor = document.getElementById('editor')

    const letter = editor.value.toUpperCase()

    curr.className = `cell center ${letter}`
    curr.innerHTML = letter

    editor.value = ''
    editor.hidden = true
}

function change() {
    const editor = document.getElementById('editor')

    if (editor.value) {
        editor.value = editor.value.slice(-1)
    }
}