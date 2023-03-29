const themes = ["Synthwave", "Tropics", "Playground", "Scuba"]

export function init() {
    const selectTheme = document.getElementById('themes')

    for (let theme of themes) {
        let option = document.createElement('option')
        option.className = 'settings-text';
        option.value = theme;
        option.innerText = theme;

        option.addEventListener('click', async (_) => {
            const cssUrl = `themes/${option.innerText.toLowerCase()}.json`;
            await fetch(cssUrl)
                .then((response) => response.json())
                .then(
                    setCssProperties,
                    () => console.error("This theme does not exist") // should be unreachable
                )
        })

        selectTheme.appendChild(option)
    }
}

function setCssProperties(jsonTheme) {
    const root = document.querySelector(':root')

    for (let property in jsonTheme) {
        console.log(property, jsonTheme[property])
        root.style.setProperty(property, jsonTheme[property])
    }
}