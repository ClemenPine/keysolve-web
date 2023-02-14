import {classify} from './classify.mjs'

let BIGRAMS = null
let SKIPGRAMS = null
let TRIGRAMS = null

export async function init() {
    BIGRAMS = await (await fetch('corpora/bigrams.json')).json()
    SKIPGRAMS = await (await fetch('corpora/skipgrams.json')).json()
    TRIGRAMS = await (await fetch('corpora/trigrams.json')).json()
}

export function analyze() {

    const keys = document.getElementById('grid').children
    
    const layout = {}
    for (let i=0; i < keys.length; i++) {
        const letter = keys[i].innerHTML
        layout[letter.toLowerCase()] = i
    }

    const res = {}
    for (const suffix of ['B', 'S', '']) {
        let grams

        switch (suffix) {
            case 'B':
                grams = BIGRAMS
                break
            case 'S':
                grams = SKIPGRAMS
                break
            default:
                grams = TRIGRAMS
                break
        }

        let curr = {}
        let total = 0

        for (const [gram, count] of Object.entries(grams)) {
            const key = [...gram].map(x => layout[x])
            total += count
            
            if (key.indexOf(undefined) !== -1) {
                continue
            }
            
            const stats = classify(key)

            for (let stat of stats) {
                stat = stat + suffix

                curr[stat] ??= 0
                curr[stat] += count
            }
        }

        for (const [stat, count] of Object.entries(curr)) {
            res[stat] = count / total
        }
    }

    return res
}