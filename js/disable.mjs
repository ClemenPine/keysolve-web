export function init() {
    const grid = document.getElementById('grid')
    for (const key of grid.children) {
        if (!(key.classList.contains('cell'))) {
            continue
        }

        key.addEventListener('contextmenu', disable)
    }
}

function disable(event) {
    event.preventDefault()

    const key = event.target

    if (key.classList.contains("excluded")) {
        key.classList.remove("excluded")
    } else {
        key.classList.add("excluded")
    }
    
    window.stats()
}