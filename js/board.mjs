export function stagger() {
    const grid = document.getElementById('grid')
    grid.style.padding = '4vw 7vw'

    const keys = grid.children

    for (let i=0; i < keys.length; i++) {
        let style = ''
        if (i < 10) {
            style = '-3vw'
        } else if (i < 20) {
            style = '-1vw'
        } else {
            style = '3vw'
        }

        keys[i].style.marginLeft = style
    }
}

export function ortho() {
    const grid = document.getElementById('grid')
    grid.style.padding = '4vw'

    const keys = grid.children

    for (let i=0; i < keys.length; i++) {
        keys[i].style.marginLeft = '0'
    }
}