const rates = document.querySelectorAll(".box-rate-review > .rating");
rates.forEach(rate => displayStars(rate))


function countAverage() {
    let sum = 0;
    let avgRate = 0;
    rates.forEach(rate => {
        sum += Number(rate.getAttribute("data-type-rate"))
    });
    return avgRate = sum / rates.length;
}

function displayAverage() {
    
}



function displayStars(rate) {
    const rateNumber = rate.getAttribute("data-type-rate");
    rate.innerHTML = ``;
    for (let i=0; i<rateNumber; i++) {
        rate.innerHTML += `<i class="fas fa-star" style="color: orange"></i>`
    }
}

countAverage();
