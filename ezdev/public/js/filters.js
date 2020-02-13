import langClick from './languageClick.js'
import rateClick from './rateClick.js'
import service from './APIHandler.js';

const languages = document.querySelectorAll('.language_list_item');
const stars = document.querySelectorAll("#rate-review i")

const teachersContainer = document.getElementById('boxes-teacher')
let filteredTeachers;
let filteredLanguages;
let filteredRate;

let priceOutput = document.getElementById("price_output");
let inputRange = document.querySelector(".range");
let inputRate = document.getElementById("rate-teacher")

langClick(languages, updateLanguage)
console.log(rateClick)
rateClick(stars, updateRate)


inputRange.oninput = updatePriceRange

function updatePriceRange() {
    let temp = 0;
    temp = Number(inputRange.value);
    priceOutput.innerHTML = temp;
    filterByPrice(temp)
};

function filterByPrice(price) {
    service
        .post("/filters/price", {
            price
        })
        .then(apiRes => {
            console.log(apiRes);
            filteredTeachers = apiRes.data;
            displayFiltered(filteredTeachers)
        })
        .catch(apiErr => console.log(apiErr));
    return filteredTeachers
}

// function ratesAverage(arr) {
//     return Math.round(arr.reduce((acc, cValue) => acc += cValue, 0) / arr.length * 10) / 10
// }

function displayFiltered(arr) {
    teachersContainer.innerHTML = ``
    arr.forEach(teacher => {
        let teacherLanguages = "";
        teacher.id_languages.forEach(language => {
            teacherLanguages += `<li>
                <div id="box-logo-same">
                    ${language.logo}
                </div>
            </li>`
        })
        let teacherRate = "";
        teacher.id_languages.forEach(language => {
            teacherRate += `<li>
                <div id="box-logo-same">
                    ${language.logo}
                </div>
            </li>`
        })
        let teacherRateGrey = "";
        for (let i = 0; i < 5; i++) {
            teacherRateGrey += `<i class="fa fa-star"></i> `;
        }
        let teacherRateYellow = "";
        for (let i = 0; i < teacher.averageRate; i++) {
            teacherRateYellow += `<i class="fa fa-star star-selected"></i> `;
        }
        teachersContainer.innerHTML +=
            `<a href="/teacher/${teacher._id}">
                <div class="box-same-teacher">
                    <div class="box-img-same">
                        <img src="${teacher.avatar}" alt="${teacher.firstname} ${teacher.lastname}">
                    </div>        
                    <div class="info-teacher-same">
                        <div class="box-name-same">
                            <h3>${teacher.firstname} ${teacher.lastname}</h3>
                        </div>
        
                        <div class="box-rate-same">
                            <div class="box-rate-review">
                                <div class="rating star">
                                <div class="yellow">${teacherRateYellow}</div>
                                <div class="grey">${teacherRateGrey}</div>
                                </div>
                            </div>
                        </div>
                        <div class="box-lg-same">
                            <ul>` + teacherLanguages + `</ul>
                        </div>
                    </div>
                </div>
            </a>`
    })
}

//languages filters
function filterByLanguages(languages) {
    service
        .post("/filters/language", {
            languages
        })
        .then(apiRes => {
            filteredLanguages = apiRes.data;
            displayFiltered(filteredLanguages)
        })
        .catch(apiErr => console.log("hey", apiErr));
    return filteredLanguages;
}

function updateLanguage() {
    let arrLanguages = [];
    languages.forEach(language => {
        if (language.classList.contains("selected")) {
            arrLanguages.push(language.querySelector('input[type="hidden"]').getAttribute("data-tag-id"));
        }
    })
    console.log(arrLanguages);
    filterByLanguages(arrLanguages)
};

function filterByRate(rate) {
    service
        .post("/filters/rate", {
            rate
        })
        .then(apiRes => {
            console.log(apiRes)
            filteredRate = apiRes.data;
            displayFiltered(filteredRate)
        })
        .catch(apiErr => console.log("ho", apiErr));
    return filteredRate;
}

function updateRate() {
    console.log('oyo')
    filterByRate(inputRate.value)
}