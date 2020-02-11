import langClick from './languageClick.js'
import service from './APIHandler.js';

const languages = document.querySelectorAll('.language_list_item');
const teachersContainer = document.getElementById('teachers_container')
let filteredTeachers;

langClick(languages)

let priceOutput = document.getElementById("price_output");
let inputRange = document.querySelector(".range");

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
            filteredTeachers = apiRes.data;
            displayFiltered(filteredTeachers)
        })
        .catch(apiErr => console.log(apiErr));
    return filteredTeachers
}

function ratesAverage(arr) {
    return Math.round(arr.reduce((acc, cValue) => acc += cValue, 0) / arr.length * 10) / 10
}

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
                            
                        </div>
                        <div class="box-lg-same">
                            <ul>` + teacherLanguages + `</ul>
                        </div>
                    </div>
                </div>
            </a>`
    })
}