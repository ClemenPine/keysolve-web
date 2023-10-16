import * as stats from './stats.mjs'

const corpora = [
    'akl', 'albanian', 'bokmal', 'czech', 'danish', 'dutch', 'dutch-repeat', 'english-10k', 'english-1k',
    'english-200', 'english-25k', 'english-450k', 'english-5k', 'english-leipzig', 'english-repeat', 'english-þ',
    'esperanto', 'finnish', 'finnish-repeat', 'french', 'french-qu', 'german', 'german-deadkey', 'hebrew',
    'hungarian', 'indonesian', 'italian', 'korean', 'malay', 'monkeyracer', 'monkeytype-quotes', 'nynorsk',
    'pinyin', 'pinyin_an', 'polish', 'polish-ł', 'portuguese', 'russian', 'shai', 'spanish', 'swedish', 'swiss',
    'toki-pona', 'turkish', 'typeracer-quotes', 'ukranian', 'vietnamese', 'welsh', 'welsh-deadkey'
]

export function init() {
    const selectCorpus = document.getElementById('corpora')

    for (let corpus of corpora) {
        let option = document.createElement('option')
        option.className = 'settings-text'
        option.value = corpus
        option.innerText = corpus.charAt(0).toUpperCase() + corpus.slice(1).replace("-", " ");

        selectCorpus.appendChild(option)
    }

    selectCorpus.addEventListener('change', setCorpus)
}

async function setCorpus(event) {
    let language = event.target.value.toLowerCase()

    await stats.init(language)

    await changeAlphabet(language)

    window.stats()
}

async function changeAlphabet(language) {
    let newAlphabet = new Set(
        await (await fetch(`corpora/${language}/alphabet.json`)).json()
    )

    let grid = document.getElementById("grid")
    let currentAlphabet = new Set(
        [...grid.children].map(k => k.innerText.toLowerCase())
    )

    let notInCurrent = [...currentAlphabet].filter(k => !newAlphabet.has(k))
    let notInNew = [...newAlphabet].filter(k => !currentAlphabet.has(k))

    let total = Object.values(stats.MONOGRAMS).reduce((acc, a) => acc + a, 0)

    for (let key of grid.children) {
        if (notInCurrent.includes(key.innerText.toLowerCase())) {
            let newKey = notInNew.pop();

            if (newKey.toUpperCase().length == 1) {
                newKey = newKey.toUpperCase()
            }
            
            key.classList.remove(key.innerText)
            key.classList.add(newKey)
            key.innerText = newKey
        }

        setKeyBackground(key, total)
    }
}

function setKeyBackground(key, total) {
    let freq = stats.MONOGRAMS[key.innerText.toLowerCase()] / total * 100

    if (freq > 4.5) {
        key.style.backgroundColor = "var(--color-1)"
    } else if (freq > 3) {
        key.style.backgroundColor = "var(--color-2)"
    } else if (freq > 1.5) {
        key.style.backgroundColor = "var(--color-3)"
    } else if (freq > 0.5) {
        key.style.backgroundColor = "var(--color-4)"
    } else {
        key.style.backgroundColor = "var(--color-5)"
    }
}