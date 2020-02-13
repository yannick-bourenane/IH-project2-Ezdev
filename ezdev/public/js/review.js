const rates = document.querySelectorAll(".box-rate-review > .rating");
// rates.forEach(rate => displayStars(rate));

const stars = document.querySelectorAll("#rate-review i")
const btnReview = document.getElementById("btn-review");
const input = document.getElementById("rate-teacher");

function countAverage() {
    let sum = 0;
    let avgRate = 0;
    rates.forEach(rate => {
        sum += Number(rate.getAttribute("data-type-rate"))
    });
    return avgRate = sum / rates.length;
}

function colorStarOnClick() {
    stars.forEach((star, i) => {
        star.onclick = () => {
            stars.forEach(element => element.classList.remove("star-selected"))
            for (let j = 0; j <= i; j++) {
                stars[j].classList.add("star-selected")
            }
            input.value = star.getAttribute("data-type-rate");
        }
    })
}


colorStarOnClick();
countAverage();
//addValueToName();
