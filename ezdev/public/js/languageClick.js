const langClick = function languageClick(nodelist,cb) {
    nodelist.forEach(language => {
        language.onclick = () => {
            language.classList.toggle('selected')
            language.querySelector('input[type="hidden"]').toggleAttribute('disabled')
           if(cb)cb();
        }
    })
}

export default langClick;