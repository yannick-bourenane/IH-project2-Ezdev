const inputSearch = document.getElementById("search_language");
const btnSearch = document.getElementById("btn_language");
const langList = document.getElementById("languages_list");
let allLangs;

function getAllLangs() {
    return allLangs = document.querySelectorAll("#languages_list .language");
}
getAllLangs()
const arrLangs = [];
let newArr;

function nodeListToArray(nodelist, arr) {
    nodelist.forEach(lang => {
        let getText = lang.querySelector(".lang_name").textContent;
        arr.push(getText);
        lang.onclick = () => {
            inputSearch.value = getText;
            showLangList(false);
        };
    });
}
nodeListToArray(allLangs, arrLangs);

inputSearch.oninput = () => {
    showLangList(true);
    (async () => {
        await ArrayFiltered(arrLangs);
        langList.innerHTML = ``
        await newArr.forEach(lang => {
            updateLangList(lang);
        });
        await getAllLangs()
        allLangs.forEach(lang => {
            let getText = lang.textContent;
            lang.onclick = () => {
                console.log('yo')
                updateSearchInputValue(getText);
                showLangList(false);
            };
        });
    })();
};

function updateLangList(lang) {
    langList.innerHTML += `<div class="language">${lang}</div>`;
}

function showLangList(boolean) {
    boolean ? langList.classList.add("show") : langList.classList.remove("show");
}

function getCurrentSearchInputValue() {
    return inputSearch.value;
}

function ArrayFiltered(arr) {
    newArr = [...arr];
    let currentInput = getCurrentSearchInputValue();
    if (currentInput) {
        let currentInputCapital = currentInput.toUpperCase();
        newArr = newArr.filter(element => element.toUpperCase().startsWith(currentInputCapital));
    }
    return newArr;
}

function updateSearchInputValue(value) {
    inputSearch.value = value;
}

function showOnFocus() {
    inputSearch.addEventListener("focus", event => {
        showLangList(true);
    });
}
showOnFocus();

function hideOnFocusOut() {
    document.querySelector('body').addEventListener("click", event => {
        if (event.target !== langList && event.target !== inputSearch && !langList.contains(event.target)) showLangList(false);
    });
}
hideOnFocusOut()