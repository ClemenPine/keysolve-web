export let board = 'stagger'

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