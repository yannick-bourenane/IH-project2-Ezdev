const langClick = function languageClick(nodelist) {
    nodelist.forEach(language => {
        language.onclick = () => {
            language.classList.toggle('selected')
            language.querySelector('input[type="hidden"]').toggleAttribute('disabled')
        }
    })
}
export default langClick;