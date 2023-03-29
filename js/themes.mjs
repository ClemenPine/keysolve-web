const themes = ["Synthwave", "Tropics", "Playground", "Scuba"]

export function init() {
    const selectTheme = document.getElementById('themes')

    for (let theme of themes) {
        let option = document.createElement('option')
        option.className = 'settings-text';
        option.value = theme;
        option.innerText = theme;

        option.addEventListener('click', setTheme)

        selectTheme.appendChild(option)
    }
}

async function setTheme(event) {
    const curr = document.getElementById('theme')
    curr.href = `themes/${event.target.innerText.toLowerCase()}.css`
}