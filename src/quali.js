let circuit;
let selected = [];
function getParam () {
    var param = window.location.href.substring(1).split("?");
    circuit = param[1];
}

function createDrivers () {
    for (var i=0; i<20; i++) {
        let driver = document.createElement("div");
        let driversBox = document.getElementById("driver-box");
        driver.className = "driver-self";
        driver.style.background = "white";
        driver.onclick = function () {
            if (this.style.background == "white"){
                this.style.background = "grey";
                selected.push(this);
            }
            else {
                this.style.background = "white";
                var index = selected.indexOf(this);
                if (index > -1){
                    selected.splice(index, 1);
                }
            }
        };
        driver.id = "driver-" + String(i);
        let image = document.createElement("img");
        image.src = "static/driver_" + String(i) + ".webp";
        driver.appendChild(image);
        driversBox.appendChild(driver);
    }
}
createDrivers();