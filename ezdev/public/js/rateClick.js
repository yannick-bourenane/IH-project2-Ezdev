const input = document.getElementById("rate-teacher");
const rateClick = function colorStarOnClick(nodelist, cb) {
    console.log('aled')
    nodelist.forEach((star, i) => {
        star.onclick = () => {
            nodelist.forEach(element => element.classList.remove("star-selected"))
            for (let j = 0; j <= i; j++) {
                nodelist[j].classList.add("star-selected")
            }
            input.value = star.getAttribute("data-type-rate");
            if (cb) cb();
        }
    })

}
export default rateClick;