export function stagger() {
    const grid = document.getElementById('grid')
    grid.style.margin = 'calc(var(--size) * 4) calc(var(--size) * 7)'

    const keys = grid.children

    for (let i=0; i < keys.length; i++) {
        let style = ''
        if (i < 10) {
            style = 'calc(min(1vw, 1.66vh) * -3)'
        } else if (i < 20) {
            style = 'calc(min(1vw, 1.66vh) * -1)'
        } else {
            style = 'calc(min(1vw, 1.66vh) * 3)'
        }

        keys[i].style.marginLeft = style
    }
}

export function ortho() {
    const grid = document.getElementById('grid')
    grid.style.margin = 'calc(var(--size) * 4)'

    const keys = grid.children

    for (let i=0; i < keys.length; i++) {
        keys[i].style.marginLeft = '0'
    }
}