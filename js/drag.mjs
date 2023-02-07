let dragged = null

export function init() {
    const grid = document.getElementById('grid')
    for (const key of grid.children) {
        key.addEventListener('dragstart', drag)
        key.addEventListener('dragover', allow_drop)
        key.addEventListener('drop', drop)
    }
}

function drag(event) {
    dragged = event.target
}

function allow_drop(event) {
    event.preventDefault()
}

function drop(event) {
    const target = event.target
    const temp = target.innerHTML

    target.className = `cell center ${dragged.innerHTML}`
    target.innerHTML = dragged.innerHTML

    dragged.className = `cell center ${temp}`
    dragged.innerHTML = temp
}