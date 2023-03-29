import * as search from './search.mjs'
import * as drag from './drag.mjs'
import * as board from './board.mjs'
import * as disable from './disable.mjs'
import * as stats from './stats.mjs'
import * as settings from './settings.mjs'
import * as themes from './themes.mjs'

let base = {}

window.onload = async function() {
    search.init()
    drag.init()
    disable.init()
    stats.init()
    settings.init()
    themes.init()

    board.stagger()

    base = await (await fetch('percentiles.json')).json()
}

window.info = function() {
    const url = 'https://github.com/ClemenPine/keysolve-web'
    window.open(url, '_blank')
}

window.prev = function(prevalence) {
    let color = prevalence * 30 + Math.log(prevalence * 120 + 1);
    let base = 95;

    let r = Math.round(base * 0.9 + color * 18);
    let g = Math.round(base * 1.3 - color * 10);
    let b = Math.round(base * 1.325 - color * 10);

    return `#${Number(r).toString(16)}${Number(g).toString(16)}${Number(b).toString(16)}`
}

window.toggle = function() {
    const ngrams = document.getElementById('ngrams')
    const use = document.getElementById('use')

    if (ngrams.hasAttribute('hidden')) {
        ngrams.removeAttribute('hidden')
    } else {
        ngrams.setAttribute('hidden', 'true')
    }

    if (use.hasAttribute('hidden')) {
        use.removeAttribute('hidden')
    } else {
        use.setAttribute('hidden', 'true')
    }
}

window.stats = function() {
    const res = stats.analyze()

    for (const [stat, freq] of Object.entries(res)) {
        const cell = document.getElementById(stat)
        const perc = freq.toLocaleString(
            undefined, { style: 'percent', minimumFractionDigits:2 }
        )

        if (!(stat in base)) {
            continue
        }

        let color = ''
        for (let i=0; i < 5; i++) {
            if (freq > base[stat][i]) {
                color = `var(--color-${4-i})`
            }
        }

        cell.innerHTML = `${stat}: ${perc}`
        cell.style.background = color
    } 
}

window.theme = function(name) {
    const curr = document.getElementById('theme')
    curr.href = `themes/${name}.css`
}

window.mirror = function() {
    const grid = document.getElementById('grid')
    const keys = grid.children

    let letters = []
    for (const key of keys) {
        letters.push(key.innerHTML)
    }

    letters = letters.slice(0, 30)

    for (let row=0; row < 3; row++) {
        for (let col=0; col < 10; col++) {
            const key = keys[(2-row)*10 + col]
            const letter = letters.pop()

            key.className = `cell center ${letter}`
            key.innerHTML = letter
        }
    }

    window.stats()
}

window.invert = function() {
    const grid = document.getElementById('grid')
    const keys = grid.children

    let letters = []
    for (const key of keys) {
        letters.push(key.innerHTML)
    }

    letters = letters.slice(0, 30)

    for (let row=0; row < 3; row++) {
        for (let col=0; col < 10; col++) {
            const key = keys[(2-row)*10 + col]
            const letter = letters.shift()

            key.className = `cell center ${letter}`
            key.innerHTML = letter
        }
    }

    window.stats()
}

window.copy = function() {
    const matrix = document.getElementById('matrix')
    navigator.clipboard.writeText(matrix.value)
}

window.settings = function() {
    settings.open()
}

window.board = function() {
    switch (board.board) {
        case 'stagger':
            board.ortho()
            break
        case 'ortho':
            board.stagger()
            break
        }
}

window.heatmap = function() {
    const repeatmap = document.getElementById('repeatmap')

    if (repeatmap.disabled) {
        repeatmap.removeAttribute('disabled')
    } else {
        repeatmap.setAttribute('disabled', '')
    }
}